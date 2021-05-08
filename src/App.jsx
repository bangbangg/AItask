import React, { useState } from 'react';
import './App.scss';
import { getUsers } from './util/api';
import AgeGroupsTable from './Components/AgeGroupsTable/AgeGroupsTable';
import LoadingSpinner from './reusable/LoadingSpinner';
import FavoriteUsers from './Components/FavoriteUsers/FavoriteUsers';
import { Context } from './context'


const FAVORITE_INITIAL_DATA = {id: 2, users: []};

function App() {

  const [users, setUsers] = useState({});
  const [favoriteUsers, setFavoriteUsers] = useState(FAVORITE_INITIAL_DATA);
  const [currentList, setCurrentList] = useState({});
  const [currentCard, setCurrentCard] = useState({});
  const [highLightFavorites, setHighLightFavorites] = useState('')

  //тут вводим необходимое количество пользователей (по доке макс. 5.000)
  if (!Object.keys(users)[0]) {
    getUsers('4000', setUsers);
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
    setHighLightFavorites('highlightList');
  }

  function dragEndHandler(ev){
    ev.target.style.boxShadow = 'none'
    setHighLightFavorites('');
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
    <Context.Provider value={{
      dragOverHandler, dragLeaveHandler, dragEndHandler, dragStartHandler,
      dropHandler, dropCardHandler, setFavoriteUsers
    }}>
      <div className="users-wrapper">
        {
          users.users.length &&
          <AgeGroupsTable
            className='users-table'
            usersArray={fromMinToMaxAge}
          />
        }
        <FavoriteUsers
          listHighLight={highLightFavorites}
          favoriteUsers={favoriteUsers}
        />
      </div>
    </Context.Provider>
  );
}

export default App;
