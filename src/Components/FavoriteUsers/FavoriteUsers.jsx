import React from 'react';
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
import './FavoriteUsers.scss';


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
  tableCellHeader: {
    height: '56px'
  },
  userCard: {
    padding: 0,
    width: '50%'
  },
  tableRow: {
    height: '55px'
  }
});

const FavoriteUsers = ({ favoriteUsers, setFavoriteUsers, dragOverHandler, dragLeaveHandler, dragEndHandler, dropHandler, dragStartHandler }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCellHeader}>
            Избранные
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody className='draggable-container'>
        {
          !!favoriteUsers && !!favoriteUsers.length &&
          favoriteUsers.map(user =>
            <UserCard
              className='favorite_users'
              user={user}
              favoriteUser={true}
              list={favoriteUsers}
              dragOverHandler={dragOverHandler}
              dragEndHandler={dragEndHandler}
              dragLeaveHandler={dragLeaveHandler}
              dropHandler={dropHandler}
              dragStartHandler={dragStartHandler}
            />
          )
        }
      </TableBody>
    </Table>
  </TableContainer>
  );
}

FavoriteUsers.propTypes = {
  favoriteUsers: PropTypes.array,
  setFavoriteUsers: PropTypes.func.isRequired,
  dragOverHandler: PropTypes.func.isRequired,
  dragEndHandler: PropTypes.func.isRequired,
  dragLeaveHandler: PropTypes.func.isRequired,
  dropHandler: PropTypes.func.isRequired,
  dragStartHandler: PropTypes.func.isRequired
};

export default FavoriteUsers;