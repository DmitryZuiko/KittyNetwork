import React from "react";
import './comments.css';
import {useSelector} from "react-redux";

interface commentsProps {
    id: string
}

export const Comments: React.FC<commentsProps> = ({id}): any => {

    const commentState = useSelector((state: any) => state.commentReducer.commentState);

    return (
        commentState.filter((comment: any) => comment.postID === id).map((comment: any, index: number) => {
            return (
                <div className="comment" key={index}>
                    <img src={comment.avatar} className="comment-user-logo" alt="avatar" />
                    <div className="com-cont">
                        <p className="comment-user-login">{comment.login}</p>
                        <p className="comment-user-text">{comment.text}</p>
                    </div>
                </div>
            )
        })
    )
}