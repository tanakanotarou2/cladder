import {apiClient} from '@/lib/apiClient';

import {format} from 'date-fns'
import {useMutation, useQueryClient} from 'react-query'
import {Box, Button, Divider, IconButton, Stack, TextField, Typography} from "@mui/material";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {QuestionDetailRequest} from "../../../../api/@types";
import DeleteIcon from '@mui/icons-material/Delete';
import axios, {AxiosError} from "axios";
import {useAtom} from "jotai";
import {messageAtom} from "@/lib/jotaiAtom";
import {apiErrorHandler, FormErrors, SingleErrorMessage} from "@/lib/apiErrorHandler";
import {useRouter} from "next/router";


const trimValues = (obj: any) => {
    if (typeof obj === "string") return obj.trim()

    for (const [key, value] of Object.entries(obj)) {
        obj[key] = trimValues(value)
    }
    return obj;
}

const setFormErrors = (setFnc: any, error: any, key = "") => {
    for (const [k, v] of Object.entries(error)) {

        const nxtkey = (key.length > 0 ? key + '.' : "") + k;
        if (Array.isArray(v)) {
            if (v.length == 0) continue;

            if (typeof v[0] === 'string') {
                // TODO: とりあえず先頭要素だけバインドしてる
                // 複数メッセージ対応のため、こっち使ったほうがよい
                // https://react-hook-form.com/api/useformstate/errormessage
                setFnc(nxtkey, {type: "api_error", message: v[0]});
                console.log("bind", nxtkey, v[0])
            } else {
                v.forEach((x, i) => {
                    setFormErrors(setFnc, x, `${nxtkey}.${i}`)
                });
            }
        } else if (typeof v === 'string') {
            setFnc(nxtkey, {type: "api_error", message: v});
        } else if (typeof v === 'object') {
            setFormErrors(setFnc, v, nxtkey)
        }
    }
}

export const CreateForm = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [, addMessage] = useAtom(messageAtom);
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        control,
        setError,
        formState: {errors}
    } = useForm<QuestionDetailRequest>();
    const postUrl = apiClient.polls.questions.$path();

    // 可変長項目
    // https://react-hook-form.com/api/usefieldarray
    const {fields: choiceFields, append: appendChoice, remove: removeChoice} = useFieldArray({
        control,
        name: "choice_set"
    });

    useEffect(() => {
        if (choiceFields.length <= 0) {
            appendChoice({choice_text: ''})
            appendChoice({choice_text: ''})
        }
    }, [])


    const mutation = useMutation(
        // [memo]
        // aspida は form data で送信されるが、
        // 入れ子の項目 choice があるので form data ではなく json で送信したい。(form data は入れ子にできないとのこと)
        // そのため aspida のクライアント(apiClient) を使用せずに axios で送信する。
        (postData: QuestionDetailRequest) => axios.post(postUrl, postData),
        {
            onSuccess: (resData, postData) => {
                // questions のキャッシュは全クリア
                queryClient.invalidateQueries(['questions'])
                addMessage({text: "登録しました", "variant": "success"});
                router.push("/")
            },
            onError: (error: AxiosError) => {
                const err: any = apiErrorHandler.putError(error);
                if (err instanceof SingleErrorMessage) {
                    addMessage({text: err.message, "variant": "warning"});
                } else if (err instanceof FormErrors) {
                    setFormErrors(setError, err.errors)
                } else {
                    console.log("err", error);
                    addMessage({text: "不明なエラー", "variant": "error"});
                }
            },
            onSettled: () => {
                setLoading(false)
            }
        }
    )
    const onSubmit = (_data: QuestionDetailRequest) => {
        setLoading(true)
        const data = trimValues(_data)
        mutation.mutate(data)
    }

    const choiceFieldComponent = (
        choiceFields.map((field, index) => (
            <div key={field.id}>
                <Controller
                    name={`choice_set.${index}.choice_text`}
                    control={control}
                    defaultValue=""
                    rules={{required: "入力してください"}}
                    render={({field}) => {
                        return (
                            <Stack direction='row'>
                                <TextField {...field}
                                           label={`回答${index + 1}`}
                                           sx={{width: '100%'}}
                                           InputLabelProps={{
                                               shrink: true,
                                           }}
                                           error={!!errors.choice_set?.at(index)?.choice_text}
                                           helperText={errors.choice_set?.at(index)?.choice_text?.message}
                                />
                                <IconButton aria-label="delete" color="inherit" onClick={() => removeChoice(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Stack>
                        )
                    }}/>
            </div>)
        )
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Controller
                    name="question_text"
                    control={control}
                    defaultValue=""
                    rules={{required: "入力してください"}}
                    render={({field}) =>
                        <TextField {...field}
                                   label="質問内容"
                                   placeholder="どうして..."
                                   required
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   error={!!errors.question_text}
                                   helperText={errors.question_text?.message}
                        />}
                />
                <Controller
                    name="pub_date"
                    control={control}
                    rules={{required: "入力してください"}}
                    defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                    render={({field}) =>
                        <TextField
                            {...field}
                            label="投票開始日時"
                            required
                            type="datetime-local"
                            sx={{width: 250}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!errors.pub_date}
                            helperText={errors.pub_date?.message}
                        />}
                />
                <Box>
                    <Typography variant="h6">回答</Typography>
                    <Typography variant="subtitle2">
                        質問への回答項目を入力してください
                    </Typography>
                </Box>

                {choiceFieldComponent}

                <Box sx={{display: "flex"}}>
                    <div style={{flexGrow: 1}}/>
                    <Button variant="outlined" color="inherit" aria-label="add choice" onClick={() => {
                        appendChoice({choice_text: ""})
                    }}>
                        回答追加
                    </Button>
                </Box>

                <Box pt={1} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Divider sx={{width: "100%", mb: 2}}/>
                    <Button type="submit" variant="contained" color="primary" size="medium"
                            disabled={loading}>登録</Button>
                </Box>
            </Stack>
        </form>
    )
}