import React, { useContext } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { getReadableDate } from './../../util/misk';
import { Context } from './../../context';
import './UserCard.scss';


const UserCard = ({ user, isFavoriteUser, list }) => {

  const {dragOverHandler, dragLeaveHandler, dragEndHandler, dropHandler, dragStartHandler, setFavoriteUsers} = useContext(Context);

  function onDeleteUser(user) {
    const deleteIndex = list.users.indexOf(user);
    list.users.splice(deleteIndex, 1);
    setFavoriteUsers({...list});
  }

  return (
    <div
      className='user-card'
      draggable='true'
      onDragOver={(ev) => dragOverHandler(ev)}
      onDragLeave={(ev) => dragLeaveHandler(ev)}
      onDragStart={(ev) => dragStartHandler(ev, list, user)}
      onDragEnd={(ev) => dragEndHandler(ev)}
      onDrop={(ev) => dropHandler(ev, list, user)}
    >
      <div className='user-card__photo' style={{ backgroundImage: `url(${user.picture.medium})` }} />
      <div className={clsx('user-card__info', {'small-width': isFavoriteUser})}>
        <div className='user-card__infoField'>
          <span className='bold-text'>Имя:</span>
          {` ${user.name.first} ${user.name.last}`}
        </div>
        <div className='user-card__infoField'>
          <span className='bold-text'>Дата регистрации:</span>
          {' ' + getReadableDate(user.registered.date)}
        </div>
        <div className='user-card__infoField'>
          <span className='bold-text'>Эл.адрес:</span>
          {' ' + user.email}
        </div>
      </div>
      {
        isFavoriteUser &&
        <div className='user-card__delete-from-favorite'>
          <Button
            className='user-card_delete-from-favorite__button'
            variant="outlined"
            onClick={() => onDeleteUser(user)}
          >
            &#10006;
          </Button>
        </div>
      }
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  isFavoriteUser: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
};

export default UserCard;
