import React, {useState} from "react";
import post from "../image/post.png";
import message from "../image/message.png";
import friends from "../image/friends.png";
import settings from "../image/settings.png";
import exit from "../image/exit.png";
import {useHistory, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateAvatar, updateLogin} from "../services/fetchService";
import {getAllPostFromServer} from "../services/post-fetch-service";
import {getAllCommentsFromServer} from "../services/comment-fetch-service";

export const MainInfo: React.FC = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const avatar = useSelector((state: any) => state.userReducer.avatar);
    const login = useSelector((state: any) => state.userReducer.login);
    const id = useSelector((state: any) => state.userReducer.id);

    const [isOpen, setIsOpen] = useState(false);
    const [newAvatar, setNewAvatar] = useState("");
    const [newLogin, setNewLogin] = useState("");

    const showSettings = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    const logOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const conf = window.confirm("Are you sure you want to log out");
        if (conf) {
            history.push("/login");
            localStorage.removeItem("token");
            dispatch({type: "CLEAN_USER"});
        }
    }

    const uploadAvatarHandler = async(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await updateAvatar({
            id,
            avatar: newAvatar
        })
        dispatch({
            type: "UPDATE_AVATAR",
            payload: newAvatar
        })
        dispatch({
            type: "GET_ALL_POSTS",
            payload: await getAllPostFromServer()
        })
        dispatch({
            type: "GET_ALL_COMMENTS",
            payload: await getAllCommentsFromServer()
        })
        setIsOpen(!isOpen);
        setNewAvatar("");
    }

    const uploadLoginHandler = async(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await updateLogin({
            id,
            login: newLogin
        })
        dispatch({
            type: "UPDATE_LOGIN",
            payload: newLogin
        })
        dispatch({
            type: "GET_ALL_POSTS",
            payload: await getAllPostFromServer()
        })
        dispatch({
            type: "GET_ALL_COMMENTS",
            payload: await getAllCommentsFromServer()
        })
        setIsOpen(!isOpen);
        setNewLogin("");
    }
    return (
        <>
            <div
                className="modal"
                style={isOpen ? {display: "block"} : {display: "none"}}
            >
                <div className="modal-content">
                    <span
                        onClick={showSettings}
                        className="close"
                    >&times;</span>
                    <p className="settings">Settings</p>
                    <form>
                        <label className="label1">
                            <p className="settings-text">Put image address:</p>
                            <div className="settings-cont">
                                <input
                                    className="input1"
                                    placeholder="https://..."
                                    value={newAvatar}
                                    onChange={(e) => setNewAvatar(e.target.value)}
                                />
                                <a
                                    href="/#"
                                    onClick={uploadAvatarHandler}
                                    className="upload"
                                >Upload</a>
                            </div>
                        </label>
                        <label className="label1">
                            <p className="settings-text">Put new username:</p>
                            <div className="settings-cont">
                                <input
                                    className="input1"
                                    value={newLogin}
                                    onChange={(e) => setNewLogin(e.target.value)}
                                />
                                <a
                                    href="/#"
                                    onClick={uploadLoginHandler}
                                    className="upload"
                                >Upload</a>
                            </div>
                        </label>
                    </form>

                </div>
            </div>
            <div className='user-info-container'>
                <div className="sticky">
                    <div className='user-info'>
                        <div className='avatar-container'>
                            <div className="avatar">
                                <img  className="ava" src={avatar} alt="avatar"/>
                            </div>
                        </div>
                        <h1 className="user-name">{login}</h1>
                    </div>
                    <div className="user-info v2">
                        <NavLink to='/home' className="nav">
                            <div className="exit-container">
                                <img className="exit" src={post} alt="post"/>
                                <p className="text">Posts</p>
                            </div>
                        </NavLink>
                        <a href="/#" className="nav">
                            <div className="exit-container">
                                <img className="exit" src={message} alt="message"/>
                                <p className="text">Message</p>
                            </div>
                        </a>
                        <NavLink to='/friends' className="nav">
                            <div className="exit-container">
                                <img className="exit" src={friends} alt="friends"/>
                                <p className="text">Friends</p>
                            </div>
                        </NavLink>
                        <a
                            href="/#"
                            className="nav"
                            onClick={showSettings}
                        >
                            <div className="exit-container">
                                <img className="exit" src={settings} alt="settings"/>
                                <p className="text">Settings</p>
                            </div>
                        </a>
                    </div>
                    <div className="user-info v2">
                        <a
                            className="nav"
                            href='/#'
                            onClick={logOut}
                        >
                            <div className="exit-container">
                                <img className="exit" src={exit} alt="exit"/>
                                <p className="text">Exit</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}