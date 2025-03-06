// src/pages/ReservationPage.jsx

import React, { useState, useEffect } from 'react';
import ReservationForm from '../components/ReservationForm'; // Ensure correct path
import ReservationList from '../components/ReservationList'; // Ensure correct path

function ReservationPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations'));
    if (storedReservations) {
      setReservations(storedReservations);
    }
  }, []);

  const addReservation = (newReservation) => {
    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  };

  return (
    <div>
      <h1>Restaurant Table Reservation</h1>
      <ReservationForm addReservation={addReservation} />
      <ReservationList reservations={reservations} />
    </div>
  );
}

export default ReservationPage;
