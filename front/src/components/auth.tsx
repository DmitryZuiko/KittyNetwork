import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './auth.css';
import {authorization} from "../services/fetchService";

export const Authorization: React.FC = () => {

    const history = useHistory();

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isAuth, setAuth] = useState(false);

    const authHandler = async(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const result = await authorization({
            login,
            email,
            password
        });
        if (result.message === "user created") {
            history.push('/login');
        } else {
            alert(result.message);
        }
    }

    return (
        <div className="login-box">
            <h2>Registration</h2>
            <form>
                <div className="user-box">
                    <input
                        type="text"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <label>Username</label>
                </div>
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
                    href="/#"
                    className="auth-reg"
                    onClick={authHandler}
                >Sign in</a>
                <a className="move1" href="/login">I have an account</a>
            </form>
        </div>
    )
}