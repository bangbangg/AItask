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
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { changeSearchTextColor, getAgeGroups } from './../../util/misk';
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
    cursor: 'pointer',
    border: '1px solid black',
  },
  userCard: {
    padding: 0,
    width: '50%'
  },
  tableRow: {
    height: '55px'
  }
});

const AgeGroupsTable = ({ usersArray }) => {

  const classes = useStyles();

  const [searching, setSearching] = useState('');

  const [usersList, setUsersList] = useState(usersArray);

   //тут стоит ввести крайнее значение групп для таблицы
  const ageGroupsArray = getAgeGroups(50);

  function sortUsersWithGroups(ageGroup) {
    const currentList = usersList;
    const categoryAgeArray = ageGroup.split('-');
    const minAge = +categoryAgeArray[0];
    const maxAge = +categoryAgeArray[1];
    return currentList.users.filter(user => minAge < user.registered.age && user.registered.age <= maxAge);
  }

  function initialAgeGroupsData() {
    let initialObject = {}
    for (let i=0; i<ageGroupsArray.length; i++) {
      initialObject[ageGroupsArray[i]] = 0
    }
    return initialObject;
  }

  const groupsInitialData = initialAgeGroupsData();

  const [isOpened, setIsOpened] = useState(groupsInitialData);

  useEffect(() => {
    if (usersArray.users.length !== usersList.users.length && !!searching) {
      changeSearchTextColor(searching);
    }
  }, [usersList, isOpened])

  function toggleUserList(ageGroup){
    if (!!isOpened[ageGroup]) {
      const currentList = {[ageGroup]: 0}
      setIsOpened({...isOpened, ...currentList})
    } else {
      const currentList = {[ageGroup]: 100}
      setIsOpened({...isOpened, ...currentList})
    }
  }

  function showMoreUsers(ageGroup) {
    const currentList = {[ageGroup]: isOpened[ageGroup] + 100}
    setIsOpened({...isOpened, ...currentList})
  }

  function searchInUsersArray() {
    const searchingFor = searching.toLowerCase();
    const searchingArray = usersArray.users.filter(user =>
        user.name.first.toLowerCase().includes(searchingFor) || user.name.last.toLowerCase().includes(searchingFor)
      )
    return searchingArray;
  }

  function onKeyPressHandler(ev) {
    if (ev.key === 'Enter') {
      setIsOpened(groupsInitialData);
      setUsersList({...usersArray, ...{users: searchInUsersArray()}});
    }
  }

  return (
    <TableContainer component={Paper} className='age-groups__container'>
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
                  onKeyPress={(ev) => onKeyPressHandler(ev)}
                />
              </FormControl>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            ageGroupsArray.map(ageGroup => {

              const ageGroupUsers = sortUsersWithGroups(ageGroup);
              const arrayLength = ageGroupUsers.length;

              function showPartOfUsers() {
                return ageGroupUsers.slice(0, isOpened[ageGroup]);
              }

              const showedArray = showPartOfUsers();

              console.log(!!ageGroupUsers.length && !!isOpened[ageGroup])

              return (
                <React.Fragment>
                  <TableRow className={classes.tableRow}>
                    <TableCell
                      className={clsx(classes.tableCell, 'flex', { 'disabled': !ageGroupUsers.length })}
                      component="th"
                      scope="row"
                      onClick={() => {
                        toggleUserList(ageGroup);
                      }}
                    >
                      <span>{ageGroup}</span>
                      {!!ageGroupUsers.length && <span className={!!isOpened[ageGroup]? 'arrow-up' : 'arrow-down'} />}
                    </TableCell>
                  </TableRow>
                  {
                    !!isOpened[ageGroup] &&
                    showedArray.map(user =>
                      <UserCard
                        user={user}
                        isFavoriteUser={false}
                        list={usersList}
                      />
                    )
                  }
                  {
                    !!isOpened[ageGroup] &&
                    showedArray.length < arrayLength &&
                    <Button
                      variant="contained"
                      className='show-more__button'
                      onClick={() => showMoreUsers(ageGroup)}
                    >
                      Показать еще ...
                    </Button>
                  }
                </React.Fragment>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AgeGroupsTable.propTypes = {
  usersArray: PropTypes.object.isRequired,
};

export default AgeGroupsTable;