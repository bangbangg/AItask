import axios from './axiosConfig';

export function getUsers(numberOfUsers, setUsers, setFavoriteUsers){
  axios
    .get(`?results=${numberOfUsers}`)
    .then(response => {
      setUsers({id: 1, users: response.data.results})
    })
    .catch(error => {
      console.log(error);
    })
}