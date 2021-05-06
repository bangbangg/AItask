import React from 'react';
import './UserCard.scss';
import PropTypes from 'prop-types';
import { getReadableDate } from './../../util/misk';
import clsx from 'clsx';


const UserCard = ({ user, favoriteUser }) => {

  return (
    <div className='user-card'>
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
  favoriteUser: PropTypes.bool.isRequired
};

export default UserCard;
