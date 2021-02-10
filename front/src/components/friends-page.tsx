import React from 'react';
import './user-page.css';
import { Friends } from "./friends";
import { MainInfo } from "./main-info";

export const FriendsPage: React.FC = () => {

    return (
        <div className='container'>
            <MainInfo />
            <Friends />
        </div>
    )
}