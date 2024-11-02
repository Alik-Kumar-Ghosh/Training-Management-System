import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ongoingTraining.css';

const OngoingTraining = () => {
  const [ongoingTrainings, setOngoingTrainings] = useState([]);

  useEffect(() => {
    const fetchOngoingTrainings = async () => {
      try {
        const response = await axios.get('/api/trainings/ongoing');
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

// import React, { useEffect, useState } from 'react';
// import './ongoingTraining.css';

// const OngoingTraining = () => {
//   const [ongoingTrainings, setOngoingTrainings] = useState([]);

//   useEffect(() => {
//     // Hardcoded demo data for ongoing trainings
//     const demoData = [
//       {
//         id: 1,
//         topic: 'Machine Learning Basics',
//         location: 'Room D302, Office Building',
//         startDate: '2024-11-01',
//         endDate: '2024-11-05',
//         trainerName: 'John Doe',
//       },
//       {
//         id: 2,
//         topic: 'Project Management Essentials',
//         location: 'Room E104, Office Building',
//         startDate: '2024-11-02',
//         endDate: '2024-11-06',
//         trainerName: 'Jane Smith',
//       },
//       {
//         id: 3,
//         topic: 'Python for Data Analysis',
//         location: 'Online',
//         startDate: '2024-11-03',
//         endDate: '2024-11-07',
//         trainerName: 'Mark Wilson',
//       },
//       {
//         id: 4,
//         topic: 'Cloud Computing Fundamentals',
//         location: 'Room F203, Office Building',
//         startDate: '2024-11-04',
//         endDate: '2024-11-08',
//         trainerName: 'Sarah Lee',
//       },
//       {
//         id: 5,
//         topic: 'Effective Communication Skills',
//         location: 'Online',
//         startDate: '2024-11-05',
//         endDate: '2024-11-09',
//         trainerName: 'Emily Davis',
//       },
//     ];

//     setOngoingTrainings(demoData);
//   }, []);

//   return (
//     <div className="ongoing-training-page">
//       <h2>Ongoing Trainings</h2>
//       <div className="training-list">
//         {ongoingTrainings.map((training) => (
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

// export default OngoingTraining;
