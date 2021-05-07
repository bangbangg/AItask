import React, { useState } from 'react';
import './App.scss';
import { getUsers } from './util/api';
import AgeGroupsTable from './Components/AgeGroupsTable/AgeGroupsTable';
import LoadingSpinner from './reusable/LoadingSpinner';
import FavoriteUsers from './Components/FavoriteUsers/FavoriteUsers';

function App() {

  const [users, setUsers] = useState([]);
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentCard, setCurrentCard] = useState({});

  console.log(currentCard);
  console.log(currentList);

  const fromMinToMaxAge = users.sort(function(a, b){return a.registered.age - b.registered.age})

  if (!users.length) {
    getUsers('500', setUsers, setFavoriteUsers);
    return <LoadingSpinner />
  }

  if (!favoriteUsers.length) {
    setFavoriteUsers([users[0]]);
  }

  function dragOverHandler(ev) {
    ev.preventDefault();
    if (ev.target.className == 'user-card'){
      ev.target.style.boxShadow = '0 4px 3px gray'
    }
  }

  function dragLeaveHandler(ev){
    ev.target.style.boxShadow = 'none'

  }

  function dragStartHandler(ev, list, user){
    setCurrentCard(user);
    setCurrentList(list);
  }

  function dragEndHandler(ev){
    ev.target.style.boxShadow = 'none'
  }

  function dropHandler(ev, list, user){
    ev.preventDefault();
    const currentIndex = currentList.indexOf(currentCard);
    currentList.splice(currentIndex, 1);
    const dropIndex = list.indexOf(user)
    list.splice(dropIndex + 1, 0, currentCard);
    console.log(list);
  }

  return (
    <div className="users-wrapper">
      { users.length &&
        <AgeGroupsTable
          className='users-table'
          usersArray={fromMinToMaxAge}
          dragOverHandler={dragOverHandler}
          dragEndHandler={dragEndHandler}
          dragLeaveHandler={dragLeaveHandler}
          dropHandler={dropHandler}
          dragStartHandler={dragStartHandler}
        />
      }
      <FavoriteUsers
        className='favorites-table'
        favoriteUsers={favoriteUsers}
        setFavoriteUsers={setFavoriteUsers}
        dragOverHandler={dragOverHandler}
        dragEndHandler={dragEndHandler}
        dragLeaveHandler={dragLeaveHandler}
        dropHandler={dropHandler}
        dragStartHandler={dragStartHandler}
      />
    </div>
  );
}

export default App;
