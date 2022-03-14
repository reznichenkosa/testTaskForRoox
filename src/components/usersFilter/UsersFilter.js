import React from 'react';
import MyButton from '../UI/button/MyButton';
import './usersFilter.scss';

const UsersFilter = ({setFilter}) => {
    return (
        <div className='filter-bar'>
            <span>Сортировка</span>
            <div className="filter-bar__btn-wrapper">
                <MyButton onClick={() => setFilter('city')}>по городу</MyButton>
                <MyButton onClick={() => setFilter('company')}>по компании</MyButton>    
            </div>
        </div>
    );
};

export default UsersFilter;