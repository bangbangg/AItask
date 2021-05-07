import React, { useState } from 'react';
import './App.scss';
import { getUsers } from './util/api';
import AgeGroupsTable from './Components/AgeGroupsTable/AgeGroupsTable';
import LoadingSpinner from './reusable/LoadingSpinner';
import FavoriteUsers from './Components/FavoriteUsers/FavoriteUsers';


const favoriteInitialData = {id: 2, users: []};

function App() {

  const [users, setUsers] = useState({});
  const [favoriteUsers, setFavoriteUsers] = useState(favoriteInitialData);
  const [currentList, setCurrentList] = useState({});
  const [currentCard, setCurrentCard] = useState({});

  if (!Object.keys(users)[0]) {
    getUsers('500', setUsers);
    return <LoadingSpinner />
  }

  const sortedUsersArray = users.users.sort(function(a, b){return a.registered.age - b.registered.age});
  const fromMinToMaxAge = {...users, ...{users: sortedUsersArray}}

  function compareAndSetNewList(list) {
    list.id === 1? setUsers({...list}) : setFavoriteUsers({...list});
  }

  function dragOverHandler(ev) {
    ev.preventDefault();
    if (ev.target.className === 'user-card'){
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
    const currentIndex = currentList.users.indexOf(currentCard);
    currentList.users.splice(currentIndex, 1);
    const dropIndex = list.users.indexOf(user)
    list.users.splice(dropIndex + 1, 0, currentCard);
    compareAndSetNewList(list);
    compareAndSetNewList(currentList);
  }

  function dropCardHandler(ev, list) {
    if (!ev.target.className.includes('user-card')) {
      console.log(ev.target.className)
      list.users.push(currentCard);
      const currentIndex = currentList.users.indexOf(currentCard);
      currentList.users.splice(currentIndex, 1);
      setFavoriteUsers({...list});
    }
  }

  return (
    <div className="users-wrapper">
      {
        users.users.length &&
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
        dropCardHandler={dropCardHandler}
      />
    </div>
  );
}

export default App;
