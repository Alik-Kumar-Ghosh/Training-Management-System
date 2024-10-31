import React, { useState, useEffect } from 'react';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [previousTrainings, setPreviousTrainings] = useState([]);
  const [ongoingTrainings, setOngoingTrainings] = useState([]);

  useEffect(() => {
    // Fetch training requests, previous trainings, and ongoing trainings from the API
    fetchTrainingRequests();
    fetchPreviousTrainings();
    fetchOngoingTrainings();
  }, []);

  const fetchTrainingRequests = async () => {
    // Replace with your API call
    const data = await fetch('/api/training-requests').then(res => res.json());
    setRequests(data);
  };

  const fetchPreviousTrainings = async () => {
    // Replace with your API call
    const data = await fetch('/api/previous-trainings').then(res => res.json());
    setPreviousTrainings(data);
  };

  const fetchOngoingTrainings = async () => {
    // Replace with your API call
    const data = await fetch('/api/ongoing-trainings').then(res => res.json());
    setOngoingTrainings(data);
  };

  const handleAccept = (id) => {
    // Handle accept logic
    console.log(`Accepted request with id: ${id}`);
  };

  const handleReject = (id) => {
    // Handle reject logic
    console.log(`Rejected request with id: ${id}`);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Training Request</th>
            <th>User Name</th>
            <th>Manager Approval</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.trainingName}</td>
              <td>{request.userName}</td>
              <td>{request.managerApproved ? 'Approved' : 'Pending'}</td>
              <td>
                <button onClick={() => handleAccept(request.id)}>Accept</button>
                <button onClick={() => handleReject(request.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Previous Trainings</h2>
      <ul className="trainings-list">
        {previousTrainings.map(training => (
          <li key={training.id}>
            <h3>{training.name}</h3>
            <p>{training.details}</p>
          </li>
        ))}
      </ul>
      <h2>Ongoing Trainings</h2>
      <ul className="trainings-list">
        {ongoingTrainings.map(training => (
          <li key={training.id}>
            <h3>{training.name}</h3>
            <p>{training.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import './adminDashboard.css';

// const AdminDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [previousTrainings, setPreviousTrainings] = useState([]);
//   const [ongoingTrainings, setOngoingTrainings] = useState([]);

//   useEffect(() => {
//     // Use mock data instead of fetching from the API
//     const mockRequests = [
//       { id: 1, trainingName: 'React Basics', userName: 'John Doe', managerApproved: true },
//       { id: 2, trainingName: 'Advanced JavaScript', userName: 'Jane Smith', managerApproved: false },
//     ];
//     const mockPreviousTrainings = [
//       { id: 1, name: 'Python for Data Science', details: 'Completed on 2023-12-01' },
//     ];
//     const mockOngoingTrainings = [
//       { id: 1, name: 'Machine Learning 101', details: 'Started on 2024-01-15' },
//     ];

//     setRequests(mockRequests);
//     setPreviousTrainings(mockPreviousTrainings);
//     setOngoingTrainings(mockOngoingTrainings);
//   }, []);

//   const handleAccept = (id) => {
//     // Handle accept logic
//     console.log(`Accepted request with id: ${id}`);
//   };

//   const handleReject = (id) => {
//     // Handle reject logic
//     console.log(`Rejected request with id: ${id}`);
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
//       <table className="requests-table">
//         <thead>
//           <tr>
//             <th>Training Request</th>
//             <th>User Name</th>
//             <th>Manager Approval</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map(request => (
//             <tr key={request.id}>
//               <td>{request.trainingName}</td>
//               <td>{request.userName}</td>
//               <td>{request.managerApproved ? 'Approved' : 'Pending'}</td>
//               <td>
//                 <button onClick={() => handleAccept(request.id)}>Accept</button>
//                 <button onClick={() => handleReject(request.id)}>Reject</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h2>Previous Trainings</h2>
//       <ul className="trainings-list">
//         {previousTrainings.map(training => (
//           <li key={training.id}>
//             <h3>{training.name}</h3>
//             <p>{training.details}</p>
//           </li>
//         ))}
//       </ul>
//       <h2>Ongoing Trainings</h2>
//       <ul className="trainings-list">
//         {ongoingTrainings.map(training => (
//           <li key={training.id}>
//             <h3>{training.name}</h3>
//             <p>{training.details}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;
