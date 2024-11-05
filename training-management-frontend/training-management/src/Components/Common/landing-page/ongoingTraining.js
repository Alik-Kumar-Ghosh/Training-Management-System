import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ongoingTraining.css';
import BASE_URL from '../../../utils/api';

const OngoingTraining = () => {
  const [ongoingTrainings, setOngoingTrainings] = useState([]);

  useEffect(() => {
    const fetchOngoingTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/training/ongoing`);
        setOngoingTrainings(response.data);
      } catch (error) {
        console.error('Error fetching ongoing trainings:', error);
      }
    };

    fetchOngoingTrainings();
  }, []);

  return (
    <div className="ongoing-training-page">
      <h2>Ongoing Trainings</h2>
      <div className="training-list">
        {ongoingTrainings.map((training) => (
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

export default OngoingTraining;
