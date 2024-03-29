import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation } from '../redux/slices/reservations/createReservationSlice';
import ErrorStatus from './ux/ErrorStatus';

const ReserveMentor = () => {
  const userId = useSelector((state) => state.authLogin.user.id);
  const mentorsList = useSelector((state) => state.mentorsList.mentors);
  const { loading, error } = useSelector((state) => state.createReservation);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [mentorId, setMentorId] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      return;
    }
    if (startTime === '' || endTime === '' || date === '' || mentorId === '') return;

    const newReservation = {
      start_time: `${startTime}:00`,
      end_time: `${endTime}:00`,
      date,
      user_id: userId,
      mentor_id: mentorId,
    };

    dispatch(createReservation(newReservation));
    setStartTime('');
    setEndTime('');
    setDate('');
    setMentorId('');
  };

  return (
    <section className="absolute lg:static top-0 left-0 px-4 flex gap-[3rem] flex-col justify-center items-center w-full h-full">
      <h1 className="text-3xl lg:text-4xl capitalize font-medium lg:font-semibold text-primary-black">
        Reserve a mentor
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full py-8 px-4 lg:px-6 border space-y-4 bg-white shadow-md rounded-lg"
      >
        <label htmlFor="startTime" className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-700">Start Time</span>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="px-4 py-2 border border-primary-gray/70 rounded-md focus:ring-primary-blue focus:border-primary-blue"
          />
        </label>

        <label htmlFor="endTime" className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-700">End Time</span>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="px-4 py-2 border border-primary-gray/70 rounded-md focus:ring-primary-blue focus:border-primary-blue"
          />
        </label>

        <label htmlFor="date" className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-700">Date</span>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="px-4 py-2 border border-primary-gray/70 rounded-md focus:ring-primary-blue focus:border-primary-blue"
          />
        </label>

        <label htmlFor="mentorId" className="flex flex-col mb-4 space-y-2">
          <span className="text-sm font-medium text-gray-700">Mentor</span>
          <select
            id="mentorId"
            value={mentorId}
            onChange={(e) => setMentorId(e.target.value)}
            required
            className="px-4 py-2 border border-primary-gray/70 rounded-md focus:ring-primary-blue focus:border-primary-blue"
          >
            <option value="">Select a mentor</option>
            {mentorsList.map((mentor) => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.name}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-8" />
        <button
          type="submit"
          className="px-6 py-2 mt-8 w-full bg-primary-green text-white rounded-md hover:bg-primary-green focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
        >
          {loading ? 'Submiting...' : 'Create Reservation'}
        </button>
      </form>
      {error && <ErrorStatus error={error} />}
    </section>
  );
};

export default ReserveMentor;
