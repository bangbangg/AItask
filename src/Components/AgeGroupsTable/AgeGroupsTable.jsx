import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import UserCard from '../UserCard/UserCard';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import { changeSearchTextColor } from './../../util/misk';
import './AgeGroupsTable.scss';


const useStyles = makeStyles({
  table: {
    minWidth: 350,
    maxWidth: 375,
    margin: '0 auto',
    border: '1px solid black'
  },
  tableCell: {
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer'
  },
  userCard: {
    padding: 0,
    width: '50%'
  },
  tableRow: {
    height: '55px'
  }
});

const AgeGroupsTable = ({ usersArray, dragOverHandler, dragLeaveHandler, dragEndHandler, dropHandler, dragStartHandler }) => {
  const classes = useStyles();

  const [searching, setSearching] = useState('');

  const [usersList, setUsersList] = useState(usersArray);

  //тут стоит ввести возраст, кратный десяти, чтоб получить крайнее значение возрастных групп
  function getAgeGroups(maxAge) {
    const registrationAges = Array.apply(null, {length: maxAge + 1}).map(Number.call, Number);
    const ageGroupsMinAge = registrationAges.filter(age => age%10 === 0);
    return ageGroupsMinAge.map(age => `${age}-${age+10}`)
  }

  function getGroupUsersArray(ageGroup) {
    const categoryAgeArray = ageGroup.split('-');
    const minAge = +categoryAgeArray[0];
    const maxAge = +categoryAgeArray[1];
    return usersList.filter(user => minAge < user.registered.age && user.registered.age <= maxAge )
  }

  const ageGroupsArray = getAgeGroups(50);

  function initialData() {
    let initialObject = {}
    for (let i=0; i<ageGroupsArray.length; i++) {
      initialObject[ageGroupsArray[i]] = false
    }
    return initialObject;
  }

  const isUserlistOpened = initialData();

  const [isOpened, setIsOpened] = useState(isUserlistOpened);

  useEffect(() => {
    if (usersArray.length !== usersList.length && !!searching) {
      changeSearchTextColor(searching);
    }
  }, [usersList, isOpened])

  function toggleUserList(ageGroup){
    const currentList = {[ageGroup]: !isOpened[ageGroup]}
    setIsOpened({...isOpened, ...currentList})
  }

  function searchInUsersArray() {
    const searchingFor = searching.toLowerCase();
    const searchingArray = usersArray.filter(user =>
        user.name.first.toLowerCase().includes(searchingFor) || user.name.last.toLowerCase().includes(searchingFor)
      )
    return searchingArray;
  }

  function keyPressHandler(ev) {
    if (ev.key === 'Enter') {
      setUsersList(searchInUsersArray());
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Поиск</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={searching}
                  onChange={(ev) => setSearching(ev.target.value)}
                  labelWidth={70}
                  onKeyPress={(ev) => keyPressHandler(ev)}
                />
            </FormControl>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            ageGroupsArray.map(ageGroup => {

            const ageGroupUsers = getGroupUsersArray(ageGroup);

            return (
              <React.Fragment>
                <TableRow className={classes.tableRow}>
                  <TableCell
                    className={clsx(classes.tableCell, {'disabled': !ageGroupUsers.length})}
                    component="th"
                    scope="row"
                    onClick={() => {
                      toggleUserList(ageGroup);
                    }}
                  >
                    {ageGroup}
                  </TableCell>
                </TableRow>
                { isOpened[ageGroup] &&
                  ageGroupUsers.map(user =>
                    <UserCard
                      user={user}
                      favoriteUser={false}
                      list={usersList}
                      dragOverHandler={dragOverHandler}
                      dragEndHandler={dragEndHandler}
                      dragLeaveHandler={dragLeaveHandler}
                      dropHandler={dropHandler}
                      dragStartHandler={dragStartHandler}
                    />
                  )
                }
              </React.Fragment>
            )})
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AgeGroupsTable.propTypes = {
  usersArray: PropTypes.array.isRequired,
  dragOverHandler: PropTypes.func.isRequired,
  dragEndHandler: PropTypes.func.isRequired,
  dragLeaveHandler: PropTypes.func.isRequired,
  dropHandler: PropTypes.func.isRequired,
  dragStartHandler: PropTypes.func.isRequired
};

export default AgeGroupsTable;