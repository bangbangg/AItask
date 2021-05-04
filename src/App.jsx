import React, { useState } from 'react';
import axios from './util/axiosConfig';
import './main.scss';
import { getUsers } from './util/api';

function App() {

  const [users, setUsers] = useState([]);


  if (!users.length) {
    getUsers('300', setUsers);
  }

  console.log(users);

  return (
    <div className="App">
      { users.length  &&
        users.map(user =>
          <div>
            {`${user.name.title}. ${user.name.first} ${user.name.last}`}
          </div>
        )
      }
    </div>
  );
}

export default App;
