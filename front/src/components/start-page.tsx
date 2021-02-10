import React from "react";
import { useHistory } from 'react-router-dom';
import cat from "../image/cat.png";
import "./start-page.css";

export const StartPage: React.FC = () => {

    const history = useHistory();

    const goToAuth = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        history.push('/auth');
    }

    const goToLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        history.push('/login');
    }

    return (
        <div className="center">
            <img src={cat} alt="cat"/>
            <div className="cent-cont">
                <h1>Welcome to KittyNetwork</h1>
                <div className="buttons">
                    <a
                        href="/#"
                        onClick={goToAuth}
                    >Sign up</a>
                    <a
                        href="/#"
                        onClick={goToLogin}
                    >Log in</a>
                </div>
            </div>
        </div>
    )
}