import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../utils/api';
import './pastTrainingTrainer.css';

const PastTrainingTrainer = () => {
  const [pastTrainings, setPastTrainings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPastTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trainer/past-trainings`);
        setPastTrainings(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching past trainings:', error);
      }
    };

    fetchPastTrainings();
  }, []);
 // , { state: { userId , userType}}
  const handleViewDetails = (trainingId) => {
    console.log(trainingId);
    ///training?trainingId=10
    navigate('/trainingdetails',{ state: {trainingId} });
  };

  return (
    <div className="past-training-page">
      <h2>Past Trainings</h2>
      <div className="training-list">

        {pastTrainings.map((training) => (
          <div className="training-item" key={training.trainingId}>
            <h3>{training.topic}</h3>
            <p><strong>Location:</strong> {training.location}</p>
            <p><strong>Duration:</strong> {training.startDate} to {training.endDate}</p>
            <p><strong>Trainer:</strong> {training.trainer.name}</p>
            <button onClick={() => handleViewDetails(training.trainingId)}>View Details</button>
          </div>
        ))}
      </div>
      <Link to="/" className="back-link">Go Back to Home</Link>
    </div>
  );
};

export default PastTrainingTrainer;

