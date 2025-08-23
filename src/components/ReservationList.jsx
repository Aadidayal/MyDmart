// src/components/ReservationList.js

import React from 'react';

function ReservationList({ reservations }) {
  return (
    <div>
      <h2>Reservations</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation, index) => (
            <li key={index}>
              {reservation.name} - {reservation.date} at {reservation.time} ({reservation.partySize} people)
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations yet!</p>
      )}
    </div>
  );
}

export default ReservationList;
