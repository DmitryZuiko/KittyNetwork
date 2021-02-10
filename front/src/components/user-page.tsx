import React from 'react';
import './user-page.css';
import { News } from './news';
import { MainInfo } from "./main-info";

export const UserPage: React.FC = () => {

    return (
        <div className='container'>
                <MainInfo />
                <News />
        </div>
    )
}