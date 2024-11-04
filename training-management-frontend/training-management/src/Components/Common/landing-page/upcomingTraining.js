// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './upcomingTraining.css';

// const UpcomingTraining = () => {
//   const [upcomingTrainings, setUpcomingTrainings] = useState([]);

//   useEffect(() => {
//     const fetchUpcomingTrainings = async () => {
//       try {
//         const response = await axios.get('/api/trainings/upcoming');
//         setUpcomingTrainings(response.data);
//       } catch (error) {
//         console.error('Error fetching upcoming trainings:', error);
//       }
//     };

//     fetchUpcomingTrainings();
//   }, []);

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
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UpcomingTraining;

import React, { useEffect, useState } from 'react';
import './upcomingTraining.css';

const UpcomingTraining = () => {
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);

  useEffect(() => {
    // Hardcoded demo data for upcoming trainings
    const demoData = [
      {
        id: 1,
        topic: 'React Fundamentals',
        location: 'Online',
        startDate: '2024-11-10',
        endDate: '2024-11-12',
        trainerName: 'Alice Johnson',
      },
      {
        id: 2,
        topic: 'Advanced Java',
        location: 'Room A102, Office Building',
        startDate: '2024-11-15',
        endDate: '2024-11-18',
        trainerName: 'Bob Smith',
      },
      {
        id: 3,
        topic: 'Spring Boot Essentials',
        location: 'Room B203, Office Building',
        startDate: '2024-11-20',
        endDate: '2024-11-22',
        trainerName: 'Clara Roberts',
      },
      {
        id: 4,
        topic: 'Data Science Basics',
        location: 'Online',
        startDate: '2024-11-25',
        endDate: '2024-11-28',
        trainerName: 'David Lee',
      },
      {
        id: 5,
        topic: 'Cybersecurity Awareness',
        location: 'Room C101, Office Building',
        startDate: '2024-12-01',
        endDate: '2024-12-03',
        trainerName: 'Emily Clark',
      },
    ];

    setUpcomingTrainings(demoData);
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