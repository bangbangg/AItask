import axios from './axiosConfig';

export function getUsers(numberOfUsers, setUsers, setFavoriteUsers){
  axios
    .get(`?results=${numberOfUsers}`)
    .then(response => {
      setUsers(response.data.results)
    })
    .catch(error => {
      console.log(error);
    })
}