import React, { useContext } from 'react';
import clsx from 'clsx';
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
          {`${user.name.first} ${user.name.last}, дата регистрации: ${getReadableDate(user.registered.date)}`}
        </div>
        <div className='user-card__infoField'>
          {user.email}
        </div>
      </div>
      {
        isFavoriteUser &&
        <div className='user-card__delete-from-favorite'>
          <button
            className='user-card_delete-from-favorite__button'
            onClick={() => onDeleteUser(user)}
          >
            Удалить
          </button>
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
