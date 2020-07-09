import React from 'react';
import style from './Home.module.css'
import { api } from '../../api/api'

const Home = () => {
    const onClick = () => {
        api.geMe()
            .then(res => {
                console.log(res.json());
            });
    }
    const getToken = () => {
        api.checkToken()
            .then(res => {
                console.log(res.json);
            })
    }
    return (
        <div className={style.container}>
            <h1>Welcome to the club</h1>
            <button onClick={onClick}>Click me</button>
            <button onClick={getToken}>Get Token</button>
        </div>
    )
}

export default Home;