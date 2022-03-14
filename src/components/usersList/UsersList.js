import './usersList.scss';

import React from 'react';
import UsersListItem from '../usersListItem/UsersListItem';
import Loader from '../UI/loader/Loader';

const UsersList = ({users, isLoading, error}) => {
    
    return (
        <div className='user-list'>
            <h2 className='user-list__title'>Список пользователей</h2>
            {isLoading ? <Loader /> :
                <>
                    <ul className='user-list__wrapper'>
                        {users.map(user => 
                            <UsersListItem key={user.id} user={user}/>
                        )}
                    </ul>
                    <div className='user-list__count'>Найдено {users.length} пользователей</div>
                </>
            }
            
        </div>
    );
};

export default UsersList;