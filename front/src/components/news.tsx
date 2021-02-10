import React, {useState} from "react";
import image from "../image/image.png";
import { Post } from "./post";
import { useDispatch, useSelector } from "react-redux";
import { addPostToServer, getAllPostFromServer } from "../services/post-fetch-service";
import {getAllCommentsFromServer} from "../services/comment-fetch-service";
import cat from '../image/cat-empty.png';

export const News: React.FC = () => {

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPhoto, setIsOpenPhoto] = useState(false);
    const [postText, setPostText] = useState("");
    const [postImage, setPostImage] = useState("");

    const avatar = useSelector((state: any) => state.userReducer.avatar);
    const login = useSelector((state: any) => state.userReducer.login);
    const userId = useSelector((state: any) => state.userReducer.id);
    const postState = useSelector((state: any) => state.postReducer.postState);

    const showMoreInfo = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    const addPhoto = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsOpenPhoto(!isOpenPhoto);
    }

    const addPost = async(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await addPostToServer({
            userID: userId,
            avatar: avatar,
            login: login,
            text: postText,
            image: postImage
        });
        dispatch( {
            type: "GET_ALL_POSTS",
            payload: await getAllPostFromServer()
        });
        dispatch({
            type: "GET_ALL_COMMENTS",
            payload: await getAllCommentsFromServer()
        })
        setPostText("");
    }

    return (
        <div className='news'>
            <div
                className="modal"
                style={isOpenPhoto ? {display: "block"} : {display: "none"}}
            >
                <div className="modal-content">
                    <span
                        onClick={addPhoto}
                        className="close"
                    >&times;</span>
                    <p className="settings">Add photo</p>
                    <form>
                        <label className="label1">
                            <p className="settings-text">Put image address:</p>
                            <div className="settings-cont">
                                <input
                                    className="input1"
                                    placeholder="https://..."
                                    value={postImage}
                                    onChange={(e) => {setPostImage(e.target.value)}}
                                />
                                <a
                                    href="/#"
                                    onClick={addPhoto}
                                    className="upload"
                                >Upload</a>
                            </div>
                        </label>
                    </form>
                </div>
            </div>
            <div className="create-new-post">
                <a
                    className="show-more"
                    href="/#"
                    onClick={showMoreInfo}
                >
                    Create new post
                </a>
                <div
                    className="hide-zone"
                    style={isOpen ? {display: "block"} : {display: "none"}}
                >
                    <div className="post-info">
                        <textarea
                            value={postText}
                            onChange={(e) => {setPostText(e.target.value)}}
                            placeholder="Some info..."
                        >
                        </textarea>
                        <a
                            className="add-image-container"
                            onClick={addPhoto}
                            href="/#"
                        >
                            <img src={image} className="add-image" alt=""/>
                        </a>
                        <a
                            href="/#"
                            className="add-post"
                            onClick={addPost}
                        >Post</a>
                    </div>
                </div>
            </div>
            <div className="posts">
                {
                    postState.length !== 0
                    ? postState.map((post: any) => {
                            return (
                                <Post post={post} key={post._id} />
                            )
                        })
                    : (
                            <div className="no-posts">
                                <div>
                                    <img className="empty-cat" src={cat} alt=""/>
                                    <p className="empty-text">No posts yet</p>
                                </div>
                            </div>
                        )

                }
            </div>
        </div>
    )
}