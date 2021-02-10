import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './auth.css';
import {login} from "../services/login-fetch-service";
import {useDispatch} from "react-redux";
import {getAllPostFromServer} from "../services/post-fetch-service";
import {getAllCommentsFromServer} from "../services/comment-fetch-service";
import {getAllFriends} from "../services/friends-fetch-service";
import {getDataBaseUsers} from "../services/fetchService";

export const Login: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const result = await login({
            email,
            password
        })
        if (result.token) {
            localStorage.setItem("token", result.token)
            dispatch({
                type: "SET_USER",
                payload: {
                    id: result.id,
                    avatar: result.avatar,
                    login: result.login
                }
            })
            dispatch( {
                type: "GET_ALL_FRIENDS",
                payload: await getAllFriends(result.id)
            })
            dispatch( {
                type: "GET_ALL_POSTS",
                payload: await getAllPostFromServer()
            })
            dispatch({
                type: "GET_ALL_COMMENTS",
                payload: await getAllCommentsFromServer()
            })
            dispatch( {
                type: "GET_DATABASE_USERS",
                payload: await getDataBaseUsers()
            })
            history.push('/home');
        } else {
            alert(result.message);
        }
    }

    return (
        <div className="login-box">
             <h2>Login</h2>
            <form>
                <div className="user-box">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>Email Address</label>
                </div>
                <div className="user-box">
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                </div>
                <a
                    className="auth-reg"
                    href="/#"
                    onClick={loginHandler}
                >Log in</a>
                <a className="move2" href="/auth">I don't have an account</a>
            </form>
        </div>
    )
}