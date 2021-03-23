import React from 'react';
import Card from '../Card/Card';
import Header from '../Header/Header';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Header></Header>
            <Card></Card>
        </div>
    );
};

export default Home;