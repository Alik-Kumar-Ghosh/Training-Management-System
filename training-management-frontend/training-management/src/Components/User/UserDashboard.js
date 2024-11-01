

import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';



const UserDashboard = ({ userType }) => {
    const [ongoingTrainings, setOngoingTrainings] = useState([]);
    const [pastTrainings, setPastTrainings] = useState([]);
    const [availableTrainings, setAvailableTrainings] = useState([]);
    const [pendingApprovals, setPendingApprovals] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNewTrainingForm, setShowNewTrainingForm] = useState(false);
    const [newTrainingDescription, setNewTrainingDescription] = useState('');

    const loadOngoingTrainings = async () => {
        try {
            const response = await axios.get('/api/trainings/ongoing');
            setOngoingTrainings(response.data);
        } catch (error) {
            console.error('Error fetching ongoing trainings:', error);
        }
    };

    const loadPastTrainings = async () => {
        try {
            const response = await axios.get('/api/trainings/past');
            setPastTrainings(response.data);
        } catch (error) {
            console.error('Error fetching past trainings:', error);
        }
    };

    const loadAvailableTrainings = async () => {
        try {
            const response = await axios.get('/api/trainings/available');
            setAvailableTrainings(response.data);
        } catch (error) {
            console.error('Error fetching available trainings:', error);
        }
    };

    const loadPendingApprovals = async () => {
        if (userType === 'manager') {
            try {
                const response = await axios.get('/api/approvals/pending');
                setPendingApprovals(response.data);
            } catch (error) {
                console.error('Error fetching pending approvals:', error);
            }
        }
    };

    const handleRequestClick = (request) => setSelectedRequest(request);

    const handleApproval = async (id, status) => {
        try {
            await axios.post(`/api/approvals/${id}`, { status });
            console.log(`Request ID: ${id}, Status: ${status}`);
            setPendingApprovals((prev) => prev.filter((req) => req.id !== id));
        } catch (error) {
            console.error(`Error updating approval status for request ${id}:`, error);
        }
    };

    const handleApplyTraining = async (trainingId) => {
        try {
            await axios.post(`/api/trainings/apply/${trainingId}`);
            console.log(`Applied for training ID: ${trainingId}`);
        } catch (error) {
            console.error(`Error applying for training ${trainingId}:`, error);
        }
    };

    const toggleProfileMenu = () => setShowProfileMenu((prevState) => !prevState);

    const handleNewTrainingRequestClick = () => {
        setShowNewTrainingForm(true);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/trainings/request', { description: newTrainingDescription });
            console.log('New training requested with description:', newTrainingDescription);
            setShowNewTrainingForm(false);
            setNewTrainingDescription('');
        } catch (error) {
            console.error('Error requesting new training:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>User Dashboard</h2>
                <div className="user-profile" onClick={toggleProfileMenu}>
                    <img src="https://via.placeholder.com/40" alt="User" className="profile-icon" />
                    {showProfileMenu && (
                        <div className="profile-dropdown">
                            <Link to="/profile">
                            <button onClick={() => console.log('View Profile')}>View Profile</button> </Link>
                            <button onClick={() => console.log('Settings')}>Settings</button>
                            <button onClick={() => console.log('Logout')}>Logout</button>
                        </div>
                    )}
                </div>
            </header>

            {/* Ongoing Trainings Section */}
            <section className="training-section">
                <button onClick={loadOngoingTrainings}>Ongoing Trainings</button>
                <ul>
                    {ongoingTrainings.map((training, index) => (
                        <li key={index}>
                            <strong>{training.topic}</strong> - {training.location} from {training.startDate} to {training.endDate}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Past Trainings Section */}
            <section className="training-section">
                <button onClick={loadPastTrainings}>Past Trainings</button>
                <ul>
                    {pastTrainings.map((training, index) => (
                        <li key={index}>
                            <strong>{training.topic}</strong> - {training.location} (Ended on {training.endDate})
                        </li>
                    ))}
                </ul>
            </section>

            {/* Available Trainings Section */}
            <section className="training-section">
                <button onClick={loadAvailableTrainings}>Available Trainings</button>
                <ul>
                    {availableTrainings.map((training) => (
                        <li key={training.id}>
                            <strong>{training.topic}</strong> - {training.location} (Starts on {training.startDate})
                            <button onClick={() => handleApplyTraining(training.id)}>Apply</button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Request New Training Section */}
            <section className="training-section">
                <button onClick={handleNewTrainingRequestClick}>Request New Training</button>
                {showNewTrainingForm && (
                    <form onSubmit={handleFormSubmit} className="new-training-form">
                        <label>
                            Training Description:
                            <textarea
                                value={newTrainingDescription}
                                onChange={(e) => setNewTrainingDescription(e.target.value)}
                                placeholder="Describe the training you need"
                                required
                            />
                        </label>
                        <button type="submit">Submit Request</button>
                    </form>
                )}
            </section>

            {/* Pending Approvals Section for Manager */}
            {userType === 'manager' && ( 
                <section className="approval-section">
                    <button onClick={loadPendingApprovals}>Pending Approvals</button>
                    <ul>
                        {pendingApprovals.map((request) => (
                            <li key={request.id}>
                                <button onClick={() => handleRequestClick(request)}>{request.trainee} - {request.training}</button>
                            </li>
                        ))}
                    </ul>
                    {selectedRequest && (
                        <div className="request-details">
                            <h4>Request Details</h4>
                            <p><strong>Trainee:</strong> {selectedRequest.trainee}</p>
                            <p><strong>Training:</strong> {selectedRequest.training}</p>
                            <button onClick={() => handleApproval(selectedRequest.id, 'approved')}>Approve</button>
                            <button onClick={() => handleApproval(selectedRequest.id, 'rejected')}>Reject</button>
                        </div>
                    )}
                </section>
                 )}
           

            {/* Pending Approvals Section for Trainee */}
            {userType === 'trainee' && (
                <section className="approval-section">
                    <h3>Pending Approvals</h3>
                    <p>No pending approvals.</p>
                </section>
            )}
        </div>
    );
};

export default UserDashboard;


// import React, { useState } from 'react';
// import './UserDashboard.css';

// const mockData = {
//     ongoing: [{ topic: 'React Basics', startDate: '2024-10-01', endDate: '2024-10-05', location: 'Room 101' }],
//     past: [{ topic: 'Java Fundamentals', startDate: '2024-09-01', endDate: '2024-09-03', location: 'Room 202' }],
//     available: [{ id: 1, topic: 'Advanced Spring Boot', startDate: '2024-11-01', location: 'Room 303' }]
// };

// const TraineeManagerDashboard = ({ userType }) => {
//     const [ongoingTrainings, setOngoingTrainings] = useState([]);
//     const [pastTrainings, setPastTrainings] = useState([]);
//     const [availableTrainings, setAvailableTrainings] = useState([]);
//     const [pendingApprovals, setPendingApprovals] = useState([]);
//     const [selectedRequest, setSelectedRequest] = useState(null);
//     const [showProfileMenu, setShowProfileMenu] = useState(false);
//     const [showNewTrainingForm, setShowNewTrainingForm] = useState(false);
//     const [newTrainingDescription, setNewTrainingDescription] = useState('');

//     const loadOngoingTrainings = () => setOngoingTrainings(mockData.ongoing);
//     const loadPastTrainings = () => setPastTrainings(mockData.past);
//     const loadAvailableTrainings = () => setAvailableTrainings(mockData.available);

//     const handleRequestClick = (request) => setSelectedRequest(request);
//     const handleApproval = (id, status) => console.log(`Request ID: ${id}, Status: ${status}`);
//     const handleApplyTraining = (trainingId) => console.log(`Applied for training ID: ${trainingId}`);
//     const toggleProfileMenu = () => setShowProfileMenu((prevState) => !prevState);

//     const handleNewTrainingRequestClick = () => {
//         setShowNewTrainingForm(true);
//     };

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         console.log('New training requested with description:', newTrainingDescription);
//         setShowNewTrainingForm(false);
//         setNewTrainingDescription('');
//     };

//     return (
//         <div className="dashboard-container">
//             <header className="dashboard-header">
//                 <h2>Trainee Manager Dashboard</h2>
//                 <div className="user-profile" onClick={toggleProfileMenu}>
//                     <img src="https://via.placeholder.com/40" alt="User" className="profile-icon" />
//                     {showProfileMenu && (
//                         <div className="profile-dropdown">
//                             <button onClick={() => console.log('View Profile')}>View Profile</button>
//                             <button onClick={() => console.log('Settings')}>Settings</button>
//                             <button onClick={() => console.log('Logout')}>Logout</button>
//                         </div>
//                     )}
//                 </div>
//             </header>

//             <section className="training-section">
//                 <button onClick={loadOngoingTrainings}>Ongoing Trainings</button>
//                 <ul>
//                     {ongoingTrainings.map((training, index) => (
//                         <li key={index}>
//                             <strong>{training.topic}</strong> - {training.location} from {training.startDate} to {training.endDate}
//                         </li>
//                     ))}
//                 </ul>
//             </section>

//             <section className="training-section">
//                 <button onClick={loadPastTrainings}>Past Trainings</button>
//                 <ul>
//                     {pastTrainings.map((training, index) => (
//                         <li key={index}>
//                             <strong>{training.topic}</strong> - {training.location} (Ended on {training.endDate})
//                         </li>
//                     ))}
//                 </ul>
//             </section>

//             <section className="training-section">
//                 <button onClick={loadAvailableTrainings}>Available Trainings</button>
//                 <ul>
//                     {availableTrainings.map((training) => (
//                         <li key={training.id}>
//                             <strong>{training.topic}</strong> - {training.location} (Starts on {training.startDate})
//                             <button onClick={() => handleApplyTraining(training.id)}>Apply</button>
//                         </li>
//                     ))}
//                 </ul>
//             </section>

//             <section className="training-section">
//                 <button onClick={handleNewTrainingRequestClick}>Request New Training</button>
//                 {showNewTrainingForm && (
//                     <form onSubmit={handleFormSubmit} className="new-training-form">
//                         <label>
//                             Training Description:
//                             <textarea
//                                 value={newTrainingDescription}
//                                 onChange={(e) => setNewTrainingDescription(e.target.value)}
//                                 placeholder="Describe the training you need"
//                                 required
//                             />
//                         </label>
//                         <button type="submit">Submit Request</button>
//                     </form>
//                 )}
//             </section>

//             {userType === 'manager' && (
//                 <section className="approval-section">
//                     <h3>Pending Approvals</h3>
//                     <ul>
//                         {pendingApprovals.map((request) => (
//                             <li key={request.id}>
//                                 <button onClick={() => handleRequestClick(request)}>{request.trainee} - {request.training}</button>
//                             </li>
//                         ))}
//                     </ul>
//                     {selectedRequest && (
//                         <div className="request-details">
//                             <h4>Request Details</h4>
//                             <p><strong>Trainee:</strong> {selectedRequest.trainee}</p>
//                             <p><strong>Training:</strong> {selectedRequest.training}</p>
//                             <button onClick={() => handleApproval(selectedRequest.id, 'approved')}>Approve</button>
//                             <button onClick={() => handleApproval(selectedRequest.id, 'rejected')}>Reject</button>
//                         </div>
//                     )}
//                 </section>
//             )}

//             {userType === 'trainee' && (
//                 <section className="approval-section">
//                     <h3>Pending Approvals</h3>
//                     <p>No pending approvals.</p>
//                 </section>
//             )}
//         </div>
//     );
// };

// export default TraineeManagerDashboard;

