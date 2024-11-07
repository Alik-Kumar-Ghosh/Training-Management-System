import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './trainingDetails.css';
import BASE_URL from '../../../utils/api';

const TrainingDetails = () => {
  const [trainingDetails, setTrainingDetails] = useState(null);
  const [participants, setParticipants] = useState([]);
  const location = useLocation();
  const { trainingId } = location.state || {};

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        console.log(trainingId);

        // Fetch training details
        const response = await axios.get(`${BASE_URL}/training/?trainingId=${trainingId}`);
        setTrainingDetails(response.data);
        console.log(response.data);

        // Fetch participants
        const participantResponse = await axios.get(`${BASE_URL}/training/participants`, {
          params: { trainingId },
        });
        setParticipants(participantResponse.data);
      } catch (error) {
        console.error('Error fetching training details:', error);
      }
    };

    fetchTrainingDetails();
  }, [trainingId]);

  function getCookieValue(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        // console.log(`Found cookie: ${cookieName} = ${cookieValue}`); // Debugging
        return decodeURIComponent(cookieValue);
      }
    }
    // console.warn(`Cookie ${name} not found`); // Debugging
    return null;
  }

  const userId = getCookieValue('userId');
  const userType = getCookieValue('userType');
  console.log(userId)
  console.log(userType)

  if (!trainingDetails) return <p>Loading...</p>;

  return (
    <div className="training-details-page">
      <h2>{trainingDetails.topic} - Details</h2>
      <p><strong>Description:</strong> {trainingDetails.description}</p>
      <p><strong>Location:</strong> {trainingDetails.location}</p>
      <p><strong>Duration:</strong> {trainingDetails.startDate} to {trainingDetails.endDate}</p>
      <p><strong>Trainer:</strong> {trainingDetails.trainer.name}</p>

      {/* <h3>Participants</h3>
      {participants && participants.length > 0 ? (
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      ) : (
        <p>No participants found.</p>
      )} */}

      {userType === 'admin' || userType === 'trainer' ? (
        <>
          <h3>Participants</h3>
          {participants.length > 0 ? (
            <ul>
              {participants.map((participant) => (
                <li key={participant.id}>{participant.name}</li>
              ))}
            </ul>
          ) : (
            <p>No participants found.</p>
          )}
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default TrainingDetails;
