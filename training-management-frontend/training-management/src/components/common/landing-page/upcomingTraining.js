import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './upcomingTraining.css';
import BASE_URL from '../../../utils/api';

const UpcomingTraining = () => {
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);

  useEffect(() => {
    const fetchUpcomingTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/training/upcoming`);
        setUpcomingTrainings(response.data);
      } catch (error) {
        console.error('Error fetching upcoming trainings:', error);
      }
    };

    fetchUpcomingTrainings();
  }, []);

  return (
    <div className="upcoming-training-page">
      <h2>Upcoming Trainings</h2>
      <div className="training-list">
        {upcomingTrainings.map((training) => (
          <div className="training-item" key={training.id}>
            <h3>{training.topic}</h3>
            <p><strong>Location:</strong> {training.location}</p>
            <p><strong>Duration:</strong> {training.startDate} to {training.endDate}</p>
            <p><strong>Trainer:</strong> {training.trainerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTraining;

