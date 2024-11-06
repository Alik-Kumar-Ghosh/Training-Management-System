import React, { useEffect, useState, useRef } from 'react';
import './adminDashboard.css';
import BASE_URL from '../../utils/api';
import { Link } from 'react-router-dom';

const AdminDashboard = ({userId }) => {
  const [requests, setRequests] = useState([]);
  const [previousTrainings, setPreviousTrainings] = useState([]);
  const [ongoingTrainings, setOngoingTrainings] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewTrainingForm, setShowNewTrainingForm] = useState(false);
  const [newTraining, setNewTraining] = useState({
    startDate: '',
    endDate: '',
    topic: '',
    trainerUserName: '',
    location: '',
    description: ''
  });
  const textareaRef = useRef(null);
  const [newTrainingDescription, setNewTrainingDescription] = useState('');

  useEffect(() => {
    // Fetch training requests, previous trainings, and ongoing trainings from the API
    fetchTrainingRequests();
    fetchPreviousTrainings();
    fetchOngoingTrainings();
  }, [userId]);

  const fetchTrainingRequests = async () => {
    // Replace with your API call
    try {
      const response = await fetch(`/admin/pending-requests?userId=${userId}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching training requests:', error);
    }
  };
  

  const fetchPreviousTrainings = async () => {
    // Replace with your API call
    const data = await fetch('/training/past').then(res => res.json());
    setPreviousTrainings(data);
  };

  const fetchOngoingTrainings = async () => {
    // Replace with your API call
    const data = await fetch('/training/ongoing').then(res => res.json());
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/training/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, ...newTraining })
      });
      const data = await response.json();
      console.log('Training created:', data);
      // Optionally, you can update the state to reflect the new training
    } catch (error) {
      console.error('Error creating training:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTraining({ ...newTraining, [name]: value });
  };
  
  const handleNewTrainingRequestClick = () => {
    setShowNewTrainingForm(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0); // Use timeout to ensure it runs after rendering
  };
  
  const toggleProfileMenu = () => setShowProfileMenu((prevState) => !prevState);

  const resetFormState = () => {
    setShowNewTrainingForm(false);
    setNewTraining({
      startDate: '',
      endDate: '',
      topic: '',
      trainerUserName: '',
      location: '',
      description: ''
    });
    setNewTrainingDescription('');
  };


  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
                <h2>Admin Dashboard </h2>
                <div className="user-profile" onClick={toggleProfileMenu}>
                    <img src="https://via.placeholder.com/40" alt="User" className="profile-icon" />
                    {showProfileMenu && (
                        <div className="profile-dropdown">
                          <Link to="/profile"> <button onClick={() => console.log('View Profile')}>View Profile</button></Link> 
                            <button onClick={() => console.log('Settings')}>Settings</button>
                            <button onClick={() => console.log('Logout')}>Logout</button>
                        </div>
                    )}
                </div>
            </header>
      
      <table className="requests-table">
        <thead>
          <tr>
            <th>Training Request</th>
            <th>User Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.trainingName}</td>
              <td>{request.userName}</td>
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
  <section className="create-training">
  <button onClick={handleNewTrainingRequestClick}>Create New Training</button>
  {showNewTrainingForm && (
    <form className="new-training-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" name="startDate" onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" name="endDate" onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="topic">Topic:</label>
        <input type="text" id="topic" name="topic" placeholder="Enter topic" onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="trainerUserName">Username:</label>
        <input type="text" id="trainerUserName" name="trainerUserName" placeholder="Enter username" onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea id="description" ref={textareaRef} name="description" placeholder="Enter training description" onChange={handleInputChange}></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  )}
</section>

    </div>
  );
};

export default AdminDashboard;

// import React, { useEffect, useState, useRef } from 'react';
// import './adminDashboard.css';
// import BASE_URL from '../../utils/api';
// import { Link } from 'react-router-dom';

// const AdminDashboard = ({ userId }) => {
//   const [requests, setRequests] = useState([]);
//   const [previousTrainings, setPreviousTrainings] = useState([]);
//   const [ongoingTrainings, setOngoingTrainings] = useState([]);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showNewTrainingForm, setShowNewTrainingForm] = useState(false);
//   const [newTraining, setNewTraining] = useState({
//     startDate: '',
//     endDate: '',
//     topic: '',
//     trainerUserName: '',
//     location: '',
//     description: ''
//   });
//   const [newTrainingDescription, setNewTrainingDescription] = useState(''); 
//   const textareaRef = useRef(null);

//   useEffect(() => {
//     fetchTrainingRequests();
//     fetchPreviousTrainings();
//     fetchOngoingTrainings();
//   }, [userId]);

//   const fetchTrainingRequests = async () => {
//     try {
//       const response = await fetch(`/admin/pending-requests?userId=${userId}`);
//       const data = await response.json();
//       setRequests(data);
//     } catch (error) {
//       console.error('Error fetching training requests:', error);
//     }
//   };

//   const fetchPreviousTrainings = async () => {
//     const data = await fetch('/training/past').then(res => res.json());
//     setPreviousTrainings(data);
//   };

//   const fetchOngoingTrainings = async () => {
//     const data = await fetch('/training/ongoing').then(res => res.json());
//     setOngoingTrainings(data);
//   };

//   const handleAccept = (id) => {
//     console.log(`Accepted request with id: ${id}`);
//   };

//   const handleReject = (id) => {
//     console.log(`Rejected request with id: ${id}`);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${BASE_URL}/training/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ userId, ...newTraining, description: newTrainingDescription })
//       });
//       const data = await response.json();
//       console.log('Training created:', data);
//     } catch (error) {
//       console.error('Error creating training:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTraining({ ...newTraining, [name]: value });  // This updates the newTraining state correctly
//   };

//   const handleNewTrainingRequestClick = () => {
//     setShowNewTrainingForm(true);
//     setTimeout(() => {
//       if (textareaRef.current) {
//         textareaRef.current.focus();
//       }
//     }, 0);
//   };

//   const toggleProfileMenu = () => setShowProfileMenu((prevState) => !prevState);

//   const resetFormState = (event) => {
//     event.preventDefault();
//     setShowNewTrainingForm(false);
//     setNewTrainingDescription('');
//   };

//   return (
//     <div className="admin-dashboard">
//       <header className="dashboard-header">
//         <h2>Admin Dashboard</h2>
//         <div className="user-profile" onClick={toggleProfileMenu}>
//           <img src="https://via.placeholder.com/40" alt="User" className="profile-icon" />
//           {showProfileMenu && (
//             <div className="profile-dropdown">
//               <Link to="/profile">
//                 <button onClick={() => console.log('View Profile')}>View Profile</button>
//               </Link>
//               <button onClick={() => console.log('Settings')}>Settings</button>
//               <button onClick={() => console.log('Logout')}>Logout</button>
//             </div>
//           )}
//         </div>
//       </header>

//       <table className="requests-table">
//         <thead>
//           <tr>
//             <th>Training Request</th>
//             <th>User Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map(request => (
//             <tr key={request.id}>
//               <td>{request.trainingName}</td>
//               <td>{request.userName}</td>
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

//       <section className="training-apply">
//         <h2>Create New Training</h2>
//         <button onClick={handleNewTrainingRequestClick}>Create New Training</button>
//         {showNewTrainingForm && (
//           <form onSubmit={handleSubmit} className="new-training-form1">
//             <label className='label-1'>
//               Start Date:
//               <input type="date" name="startDate" value={newTraining.startDate} onChange={handleInputChange} required />
//             </label>
//             <label className='label-1'>
//               End Date:
//               <input type="date" name="endDate" value={newTraining.endDate} onChange={handleInputChange} required />
//             </label>
//             <label className='label-1'>
//               Topic:
//               <input type="text" name="topic" value={newTraining.topic} onChange={handleInputChange} required />
//             </label>
//             <label className='label-1'>
//               Trainer User Name:
//               <input type="text" name="trainerUserName" value={newTraining.trainerUserName} onChange={handleInputChange} required />
//             </label>
//             <label className='label-1'>
//               Location:
//               <input type="text" name="location" value={newTraining.location} onChange={handleInputChange} required />
//             </label>
//             <label className='label-1'>
//               Description:
//               <textarea
//                 ref={textareaRef}
//                 name="description"
//                 value={newTrainingDescription}
//                 onChange={(e) => setNewTrainingDescription(e.target.value)}
//                 placeholder="Describe your Training you need"
//                 required
//               />
//             </label>
//             <button type="submit">Create Training</button>
//           </form>
//         )}
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;
