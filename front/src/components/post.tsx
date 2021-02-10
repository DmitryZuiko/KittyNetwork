import React, {useState} from 'react';
import './post.css';
import {useDispatch, useSelector} from "react-redux";
import comments from '../image/comment.png';
import {getAllPostFromServer, updateLikes} from "../services/post-fetch-service";
import {Comments} from "./comments";
import {addCommentToServer, getAllCommentsFromServer} from "../services/comment-fetch-service";

interface postProps {
    post: any
}

export const Post: React.FC<postProps> = ({post}): any => {

    const dispatch = useDispatch();

    const userId = useSelector((state: any) => state.userReducer.id);
    const login = useSelector((state: any) => state.userReducer.login);
    const avatar = useSelector((state: any) => state.userReducer.avatar);
    const commentState = useSelector((state: any) => state.commentReducer.commentState);

    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [commentText, setCommentText] = useState("");

    const showComments = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsCommentOpen(!isCommentOpen);
    }

    const like = async(e: React.MouseEvent<HTMLAnchorElement>, postId: string) => {
        e.preventDefault();
        await updateLikes({
            postId,
            userId
        })
        dispatch({
            type: "GET_ALL_POSTS",
            payload: await getAllPostFromServer()
        })
    }

    const addComment = async(e: React.MouseEvent<HTMLAnchorElement>, postId: string) => {
        e.preventDefault();
        await addCommentToServer({
            login: login,
            avatar: avatar,
            userID: userId,
            postID: postId,
            text: commentText
        })
        dispatch({
            type: "GET_ALL_COMMENTS",
            payload: await getAllCommentsFromServer()
        })
        setCommentText("");
    }

    // if (postState.length === 0) {
    //     return (
    //         <div className="no-posts">
    //             <div>
    //                 <img className="empty-cat" src={cat} alt=""/>
    //                 <p className="empty-text">No posts yet</p>
    //             </div>
    //         </div>
    //     )
    // }

            return (
                <div className='post'>
                    <div className="post-container">
                        <div className="post-user-info">
                            <img className="post-user" src={post.avatar} alt=""/>
                            <p className="post-user-name">{post.login}</p>
                        </div>
                        <p className="post-text">{post.text}</p>
                        <img className="post-image" src={post.image} alt=""/>
                        <div className="like-cont">
                            <a
                                className={!post.likes.includes(userId) ? "like-button" :  "like-button liked"}
                                href="/#"
                                onClick={(e) => like(e, post._id)}
                            >
                            </a>
                            <p className="likes">{post.likes.length}</p>
                            <a
                                href="/#"
                                onClick={showComments}
                            >
                                <img
                                    src={comments}
                                    alt="comments"
                                    className="comment-icon"
                                />
                            </a>
                            <p className="comments-count">{commentState.filter((comment: any) => comment.postID === post._id).length}</p>
                        </div>
                        <div style={isCommentOpen ? {display: "block"} : {display: "none"}}>
                            <div className="comment-info">
                                <textarea
                                    value={commentText}
                                    onChange={(e) => {setCommentText(e.target.value)}}
                                    placeholder="Leave comment..."
                                >
                                </textarea>
                                <a
                                    onClick={(e) => addComment(e, post._id)}
                                    href="/#"
                                    className="add-post"
                                >Send</a>
                            </div>
                            <Comments id={post._id} />
                        </div>
                    </div>
                </div>
            )
}