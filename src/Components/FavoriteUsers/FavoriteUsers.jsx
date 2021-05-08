import React, { useContext } from 'react';
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
import {Context} from './../../context';


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

const FavoriteUsers = ({ favoriteUsers, listHightLight }) => {
  const classes = useStyles();

  const {dropCardHandler, dragOverHandler} = useContext(Context);

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
      <TableBody
        className={listHightLight}
        onDragOver={(ev) => dragOverHandler(ev)}
        onDrop={(ev) => dropCardHandler(ev, favoriteUsers)}
      >
        {
          !!favoriteUsers.users.length
          ?
          (favoriteUsers.users.map(user =>
            <UserCard
              className='favorite_user'
              user={user}
              isFavoriteUser={true}
              list={favoriteUsers}
            />
          ))
          :
          (
            <TableRow>
              <TableCell className={classes.tableCellHeader} />
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  </TableContainer>
  );
}

FavoriteUsers.propTypes = {
  favoriteUsers: PropTypes.object.isRequired,
  listHightLight: PropTypes.string.isRequired
};

export default FavoriteUsers;