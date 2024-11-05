import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './pastTraining.css';
import BASE_URL from '../../../utils/api';

const PastTraining = () => {
  const [pastTrainings, setPastTrainings] = useState([]);

  useEffect(() => {
    const fetchPastTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/training/past`);
        setPastTrainings(response.data);
      } catch (error) {
        console.error('Error fetching past trainings:', error);
      }
    };

    fetchPastTrainings();
  }, []);

  return (
    <div className="past-training-page">
      <h2>Past Trainings</h2>
      <div className="training-list">
        {pastTrainings.map((training) => (
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

export default PastTraining;
