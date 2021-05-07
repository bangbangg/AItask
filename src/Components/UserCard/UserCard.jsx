import React from 'react';
import './UserCard.scss';
import PropTypes from 'prop-types';
import { getReadableDate } from './../../util/misk';
import clsx from 'clsx';


const UserCard = ({ user, favoriteUser, list, dragOverHandler, dragLeaveHandler, dragEndHandler, dropHandler, dragStartHandler }) => {

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
      <div className={clsx('user-card__info', {'small-width': favoriteUser})}>
        <div className='user-card__infoField'>
          {`${user.name.first} ${user.name.last}, дата регистрации: ${getReadableDate(user.registered.date)}`}
        </div>
        <div className='user-card__infoField'>
          {user.email}
        </div>
      </div>
      {
        favoriteUser &&
        <div className='user-card__delete-from-favorite'>
          <button className='user-card_delete-from-favorite__button'>
            Удалить
          </button>
        </div>
      }
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  favoriteUser: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  dragOverHandler: PropTypes.func.isRequired,
  dragEndHandler: PropTypes.func.isRequired,
  dragLeaveHandler: PropTypes.func.isRequired,
  dropHandler: PropTypes.func.isRequired,
  dragStartHandler: PropTypes.func.isRequired
};

export default UserCard;
