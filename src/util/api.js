import axios from './axiosConfig';

export function getUsers(numberOfUsers, setUsers){
  axios
    .get(`?results=${numberOfUsers}`)
    .then(response => {
      setUsers(response.data.results)
    })
    .catch(error => {
      console.log(error);
    })
}