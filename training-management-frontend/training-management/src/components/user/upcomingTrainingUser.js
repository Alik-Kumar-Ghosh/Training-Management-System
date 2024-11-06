// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import BASE_URL from '../../../utils/api';
// import './upcomingTrainingUser.css';

// const UpcomingTrainingUser = () => {
//   const [upcomingTrainings, setUpcomingTrainings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUpcomingTrainings = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/user/upcoming-trainings`);
//         setUpcomingTrainings(response.data);
//       } catch (error) {
//         console.error('Error fetching upcoming trainings:', error);
//       }
//     };

//     fetchUpcomingTrainings();
//   }, []);
//   const handleViewDetails = (trainingId) => {
//     navigate(`/training-details/${trainingId}`);
//   };

//   return (
//     <div className="upcoming-training-page">
//       <h2>Upcoming Trainings</h2>
//       <div className="training-list">
//         {upcomingTrainings.map((training) => (
//           <div className="training-item" key={training.id}>
//             <h3>{training.topic}</h3>
//             <p><strong>Location:</strong> {training.location}</p>
//             <p><strong>Duration:</strong> {training.startDate} to {training.endDate}</p>
//             <p><strong>Trainer:</strong> {training.trainerName}</p>
//             <button onClick={() => handleViewDetails(training.id)}>View Details</button>
//           </div>
//         ))}
//       </div>
//       <Link to="/" className="back-link">Go Back to Home</Link>
//     </div>
//   );
// };

// export default UpcomingTrainingUser;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../utils/api';
import './upcomingTrainingUser.css';

const UpcomingTrainingUser = () => {
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/upcoming-trainings`);
        setUpcomingTrainings(response.data);
      } catch (error) {
        console.error('Error fetching upcoming trainings:', error);
      }
    };

    fetchUpcomingTrainings();
  }, []);

  const handleApplyTraining = async (trainingId) => {
    try {
        await axios.post(`${BASE_URL}/apply?trainingId=${trainingId}`);
        console.log(`Applied for training ID: ${trainingId}`);
    } catch (error) {
        console.error(`Error applying for training ${trainingId}:`, error);
    }
};
  const handleViewDetails = (trainingId) => {
    navigate(`/training-details/${trainingId}`);
  };

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
            <button onClick={() => handleViewDetails(training.id)}>View Details</button>
            <button className='apply-button' onClick={() => handleApplyTraining(training.id)}>Apply</button>
          </div>
        ))}
      </div>
      <Link to="/" className="back-link">Go Back to Home</Link>
    </div>
  );
};

export default UpcomingTrainingUser;


