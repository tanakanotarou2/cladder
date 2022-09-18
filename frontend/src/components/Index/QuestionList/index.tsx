import {apiClient} from '@/lib/apiClient';
import {useMutation, useQuery, useQueryClient} from 'react-query'

import {Box, Card, CardContent, Divider, List, Pagination, Stack, Typography} from "@mui/material";

import {format} from 'date-fns'
import ChoiceItem from './ChoiceItem';
import React, {useEffect} from 'react';
import {Choice, PaginatedQuestionDetailList} from "../../../api/@types";
import {messageAtom} from '@/lib/jotaiAtom';
import {useAtom} from "jotai";
import {apiErrorHandler, SingleErrorMessage} from "@/lib/apiErrorHandler";

const parsePageInfo = (listPageResponse: any, limit: number, offset = 0) => {
    const count: number = listPageResponse.count
    const totalPages = Math.floor((count + limit - 1) / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    const next = offset + limit < count ? {offset: offset + limit, limit: limit} : null;
    const previous = offset > 0 ? {offset: Math.max(0, offset - limit), limit: limit} : null;

    return {
        count,
        totalPages,
        currentPage,
        next,
        previous
    }
};
const calcPageOffset = (page: number, limit: number) => {
    return (page - 1) * limit;
}


const QuestionList = () => {
    const LIMIT = 10;

    const [offset, setOffset] = React.useState(0)
    const [pageInfo, setPageInfo] = React.useState<any>()
    const [, addMessage] = useAtom(messageAtom);


    const queryClient = useQueryClient()
    // let getQuestionsParams={
    //     limit:10,
    //
    // };


    /* useAspidaQueryを使う場合 */
    // const {
    //     data: questionData,
    //     isLoading,
    //     refetch: questionRefetch
    // } = useAspidaQuery(apiClient.polls.questions, {query: {limit: 10,},});

    /* useAspidaQuery を使わず、 useQuery を使う場合は次のようになる */
    // 特定の key を設定したい場合はこちらを使う

    const fetchQuestions = (_offset = 0) => {
        return apiClient.polls.questions.$get({query: {limit: LIMIT, offset: _offset}})
    }

    const {
        data: questionData,
        isLoading,
        // refetch: questionRefetch
    } = useQuery(['questions', {offset: offset}],
        () => fetchQuestions(offset),
        {keepPreviousData: true},
    );

    const postUpvote = (choice: Choice) => {
        return apiClient.polls.questions._question_pk(choice.question).choices._id(choice.id).upvote.$post();
    };

    // const mutation = useMutation()
    const upvoteMutation = useMutation(postUpvote, {
            onSuccess: (resCoice, postChoice) => {
                // console.log("res",resCoice); // 新しいデータ
                // console.log("post",postChoice); // 古いデータ

                // useAspidaQuery を使った場合の key
                // const queryKey = apiClient.polls.questions.$path({query: {limit: 10}})

                const queryKey = ['questions', {offset: offset}];

                // 再検索する場合は, invalidateQueries を使う
                // 基本的にはこちらを使いたい
                // queryClient.invalidateQueries(queryKey)

                // response を使って キャッシュを更新
                const data = queryClient.getQueryData<PaginatedQuestionDetailList>(queryKey)
                if (!data) return;

                const newData = Object.assign({}, data);
                newData.results = data.results?.map(q => {
                    if (q.id !== resCoice.question) return q;

                    const newQuestion = Object.assign({}, q);
                    newQuestion.choice_set = q.choice_set.map((c: Choice) => {
                        if (c.id === resCoice.id) {
                            return resCoice;
                        }
                        return c;
                    });
                    return newQuestion;
                });
                // キャッシュをアップデート
                queryClient.setQueryData(queryKey, newData)
            },
            onError: (error: any) => {
                const err: any = apiErrorHandler.putError(error);
                if (err instanceof SingleErrorMessage) {
                    addMessage({text: err.message, "variant": "warning"});
                } else {
                    console.log(error, err)
                    addMessage({text: "不明なエラー", "variant": "error"});
                }
            }
        }
    )

    const onUpvote = (choice: Choice) => {
        upvoteMutation.mutate(choice)
    }


    useEffect(() => {
        if (!!questionData) setPageInfo(parsePageInfo(questionData, LIMIT, offset));
    }, [questionData, offset])


    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const nextOffset = calcPageOffset(value, LIMIT);
        if (offset == nextOffset) return;
        setOffset(nextOffset);

        // 画面を最上部に
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }
    let pagination = <></>;
    if (!!pageInfo) {
        pagination = (
            <Pagination
                count={pageInfo.totalPages}
                page={pageInfo.currentPage}
                onChange={handleChangePage}
                sx={{margin: "0 auto"}}
            />
        )
    }

    let questionCards;
    if (!isLoading && !!questionData) {
        questionCards = questionData.results?.map((question, index) => {
            return (
                <Box key={question.id} p={2} sx={{mx: "auto"}}>
                    <Card sx={{width: 600}} variant="outlined">
                        <CardContent>
                            <Box textAlign="right">
                                <Typography
                                    variant="caption">投票開始:{format(new Date(question.pub_date), 'yyyy-MM-dd HH:mm')}</Typography>
                            </Box>

                            <Typography variant="h5" mt={2} mb={2}>
                                {question.question_text}
                            </Typography>

                            <Divider/>
                            <Box mt="4">
                                <List>
                                    {question.choice_set.map((choice) => {
                                        return (
                                            <React.Fragment key={choice.id}>
                                                <ChoiceItem choice={choice} onUpvote={onUpvote}/>
                                            </React.Fragment>
                                        )
                                    })}
                                </List>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            )
        });
    } else {
        questionCards = (<div style={{margin:"0 auto"}}>loading中です。(初回アクセス時はサーバーの起動に少し時間がかかります)</div>);
    }
    return (
        <>
            <Stack direction="column" justifyContent="center">
                {pagination}
                {questionCards}
                {pagination}
            </Stack>
        </>
    )
}

export default QuestionList;