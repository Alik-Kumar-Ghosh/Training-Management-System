import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../utils/api';
import './ongoingTrainingTrainer.css';

const OngoingTrainingTrainer = () => {
  const [ongoingTrainings, setOngoingTrainings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOngoingTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trainer/ongoing-trainings`);
        setOngoingTrainings(response.data);
      } catch (error) {
        console.error('Error fetching ongoing trainings:', error);
      }
    };

    fetchOngoingTrainings();
  }, []);
  // const handleViewDetails = (trainingId) => {
  //   navigate(`/training-details/${trainingId}`);
  // };

  const handleViewDetails = (trainingId) => {
    console.log(trainingId);
    ///training?trainingId=10
    navigate('/trainingdetails',{ state: {trainingId} });
  };
  return (
    <div className="ongoing-training-page">
      <h2>Ongoing Trainings</h2>
      <div className="training-list">
        {ongoingTrainings.map((training) => (
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

export default OngoingTrainingTrainer;
