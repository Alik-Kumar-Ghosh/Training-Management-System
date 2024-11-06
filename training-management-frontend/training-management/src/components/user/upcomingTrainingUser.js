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


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './upcomingTrainingUser.css';

const UpcomingTrainingUser = () => {
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace API fetch with dummy data
    const dummyTrainings = [
      {
        id: 1,
        topic: "Advanced Java",
        location: "Room 101, Main Building",
        startDate: "2024-11-10",
        endDate: "2024-11-15",
        trainerName: "John Doe"
      },
      {
        id: 2,
        topic: "React Basics",
        location: "Room 202, Tech Park",
        startDate: "2024-11-18",
        endDate: "2024-11-20",
        trainerName: "Jane Smith"
      },
      {
        id: 3,
        topic: "Spring Boot for Beginners",
        location: "Online",
        startDate: "2024-11-22",
        endDate: "2024-11-25",
        trainerName: "Michael Lee"
      }
    ];

    setUpcomingTrainings(dummyTrainings);
  }, []);

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
            {/* <button className="apply-button" onClick={() => handleApplyTraining(training.id)}>Apply</button> */}
          </div>
        ))}
      </div>
      <Link to="/" className="back-link">Go Back to Home</Link>
    </div>
  );
};

export default UpcomingTrainingUser;


