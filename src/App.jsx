import React, { useState } from 'react';
import './App.scss';
import { getUsers } from './util/api';
import AgeGroupsTable from './Components/AgeGroupsTable/AgeGroupsTable';
import LoadingSpinner from './reusable/LoadingSpinner';

function App() {

  const [users, setUsers] = useState([]);

  if (!users.length) {
    getUsers('500', setUsers);
    return <LoadingSpinner />
  }

  const fromMinToMaxAge = users.sort(function(a, b){return a.registered.age - b.registered.age})

  return (
    <div className="users-wrapper">
      { users.length && <AgeGroupsTable  usersArray={fromMinToMaxAge} /> }
    </div>
  );
}

export default App;
