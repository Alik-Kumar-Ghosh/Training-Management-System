import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './pastTraining.css';

const PastTraining = () => {
  const [pastTrainings, setPastTrainings] = useState([]);

  useEffect(() => {
    const fetchPastTrainings = async () => {
      try {
        const response = await axios.get('/api/trainings/past');
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

// import React, { useEffect, useState } from 'react';
// import './pastTraining.css';

// const PastTraining = () => {
//   const [pastTrainings, setPastTrainings] = useState([]);

//   useEffect(() => {
//     // Hardcoded demo data for past trainings
//     const demoData = [
//       {
//         id: 1,
//         topic: 'Advanced Java Programming',
//         location: 'Room A101, Office Building',
//         startDate: '2024-09-01',
//         endDate: '2024-09-05',
//         trainerName: 'Alice Johnson',
//       },
//       {
//         id: 2,
//         topic: 'Leadership & Management Skills',
//         location: 'Room B202, Office Building',
//         startDate: '2024-09-15',
//         endDate: '2024-09-19',
//         trainerName: 'Michael Brown',
//       },
//       {
//         id: 3,
//         topic: 'Data Science with Python',
//         location: 'Online',
//         startDate: '2024-09-20',
//         endDate: '2024-09-25',
//         trainerName: 'Lisa Green',
//       },
//       {
//         id: 4,
//         topic: 'Cybersecurity Basics',
//         location: 'Room C303, Office Building',
//         startDate: '2024-10-01',
//         endDate: '2024-10-05',
//         trainerName: 'Tom White',
//       },
//       {
//         id: 5,
//         topic: 'Public Speaking & Presentation',
//         location: 'Online',
//         startDate: '2024-10-10',
//         endDate: '2024-10-12',
//         trainerName: 'Sophia Miller',
//       },
//     ];

//     setPastTrainings(demoData);
//   }, []);

//   return (
//     <div className="past-training-page">
//       <h2>Past Trainings</h2>
//       <div className="training-list">
//         {pastTrainings.map((training) => (
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

// export default PastTraining;

