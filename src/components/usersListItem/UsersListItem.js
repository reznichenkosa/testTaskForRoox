import './usersListItem.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

const UsersListItem = ({user}) => {
    const {id, name, address, company} = user;
    return (
        <li className='userWrapper'>
            <div className='userWrapper__info'><span>ФИО:</span>{name}</div>
            <div className='userWrapper__info'><span>Город:</span>{address.city}</div>
            <div className='userWrapper__info'><span>Компания:</span>{company.name}</div>
            <NavLink to={`/users/${id}`} className='userWrapper__link'>Подробнее</NavLink>
        </li>
    );
};

export default UsersListItem;