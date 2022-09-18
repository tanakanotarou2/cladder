import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, ListItem, ListItemText, styled, Typography} from "@mui/material";
import {Choice} from "../../../../api/@types";
import React from "react";

interface Props {
    choice: Choice;
    onUpvote: Function;
}

const StyledListItem = styled(ListItem)(({theme}) => ({
    // 偶数行目の背景色を変える
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
}));


const ChoiceItem = (props: Props) => {
    const {choice, onUpvote} = props;
    const [enableVote,setEnableVote] =React.useState(true);

    const onClickVote=()=>{
        onUpvote(choice)
        setEnableVote(false)
        window.setTimeout(()=>{
            setEnableVote(true)
    }, 1000);
    }
    return (
        <StyledListItem
            secondaryAction={
                (<>
                    <Typography variant="button">{props.choice.votes}</Typography>
                    <IconButton edge="end" aria-label="up vote" color="primary" onClick={onClickVote}  disabled={!enableVote}>
                        <KeyboardArrowUpIcon/>
                    </IconButton>
                </>)
            }
        >
            <ListItemText primary={props.choice.choice_text}/>
        </StyledListItem>
    )
}


export default ChoiceItem;