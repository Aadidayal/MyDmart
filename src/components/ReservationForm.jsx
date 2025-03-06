// src/components/ReservationForm.js

import React, { useState } from 'react';
import "../sec.css"

function ReservationForm({ addReservation }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = { name, date, time, partySize };
    addReservation(newReservation);
    setName('');
    setDate('');
    setTime('');
    setPartySize('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>
      <div>
        <label>Party Size:</label>
        <input type="number" value={partySize} onChange={(e) => setPartySize(e.target.value)} required />
      </div>
      <button type="submit">Reserve Table</button>
    </form>
  );
}

export default ReservationForm;
