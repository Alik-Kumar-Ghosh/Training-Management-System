import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../utils/api';
import './trainerDashboard.css';


function TrainerDashboard() {
    const [ongoingTrainings, setOngoingTrainings] = useState([]);
    const [pastTrainings, setPastTrainings] = useState([]);
    const [upcomingTrainings, setUpcomingTrainings] = useState([]);
    // const [participants, setParticipants] = useState([]);
    const [activeSection, setActiveSection] = useState('');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // Toggle profile dropdown
    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    // Fetch ongoing trainings
    const fetchOngoingTrainings = async () => {
        setActiveSection('ongoing');
        try {
            const response = await axios.get(`${BASE_URL}/trainer/ongoing-trainings`);
            setOngoingTrainings(response.data);
        } catch (error) {
            console.error("Error fetching ongoing trainings:", error);
        }
    };

    // Fetch past trainings
    const fetchPastTrainings = async () => {
        setActiveSection('past');
        try {
            const response = await axios.get(`${BASE_URL}/trainer/past-trainings`);
            setPastTrainings(response.data);
        } catch (error) {
            console.error("Error fetching past trainings:", error);
        }
    };

    //Fetch Upcoming Trainings
    const fetchUpcomingTrainings = async () => {
        setActiveSection('upcoming');
        try {
            const response = await axios.get(`${BASE_URL}/trainer/upcoming-trainings`);
            setUpcomingTrainings(response.data);
        } catch (error) {
            console.error("Error fetching upcoming trainings:", error);
        }
    };

    // Fetch participant information
    // const fetchParticipants = async () => {
    //     setActiveSection('participants');
    //     try {
    //         const response = await axios.get(`${BASE_URL}/trainings/participants`,{
    //             params: {userId, trainingId}
    //         });
    //         setParticipants(response.data);
    //     } catch (error) {
    //         console.error("Error fetching participant information:", error);
    //     }
    // };

    return (
        <div className="trainer-dashboard-container">
            <header className="trainer-dashboard-header">
                <h2>Trainer Dashboard</h2>
                <div className="user-profile" onClick={toggleProfileDropdown}>
                    <img src="https://via.placeholder.com/40" alt="Profile" className="profile-icon" />
                    {showProfileDropdown && (
                        <div className="profile-dropdown">
                             {/* <button onClick={() => console.log('View Profile')}>View Profile</button>
                            <button onClick={() => console.log('Settings')}>Settings</button>
                            <button onClick={() => console.log('Logout')}>Logout</button> */}
                             <Link to="/profile"><button>View Profile</button></Link>
                            <button>Logout</button>
                        </div>
                    )}
                </div>
            </header>

            {/* <section className="trainer-section">
                <button onClick={fetchOngoingTrainings}>Ongoing Trainings</button>
                <button onClick={fetchPastTrainings}>Past Trainings</button>
                <button onClick={fetchParticipants}>Participant Information</button>
            </section> */}

            <section className="trainer-section">
            <button onClick={fetchOngoingTrainings}>Ongoing Trainings</button>
                {activeSection === 'ongoing' && (
                    <div className="training-section">
                        <h3>Ongoing Trainings</h3>
                        <ul>
                            {ongoingTrainings.slice(0,3).length > 0 ? (
                                ongoingTrainings.map((training, index) => (
                                    <li key={index}>{training.topic} - {training.startDate} to {training.endDate}</li>
                                ))
                            ) : (
                                <p>No ongoing trainings.</p>
                            )}
                        </ul>
                    </div>
                )}
                {ongoingTrainings.length > 3 && (
        <Link to="/trainer/ongoing" className="see-more">...see more</Link>
      )}
                </section>

                <section className="trainer-section">
                <button onClick={fetchPastTrainings}>Past Trainings</button>
                {activeSection === 'past' && (
                    <div className="training-section">
                        <h3>Past Trainings</h3>
                        <ul>
                            {pastTrainings.slice(0,3).length > 0 ? (
                                pastTrainings.map((training, index) => (
                                    <li key={index}>{training.topic} - {training.startDate} to {training.endDate}</li>
                                ))
                            ) : (
                                <p>No past trainings.</p>
                            )}
                        </ul>
                    </div>
                )}
                {pastTrainings.length > 3 && (
        <Link to="/trainer/past" className="see-more">...see more</Link>
      )}
                 </section>
                
                 <section className="trainer-section">
                <button onClick={fetchUpcomingTrainings}>Upcoming Trainings</button>
                {activeSection === 'upcoming' && (
                    <div className="training-section">
                        <h3>Upcoming Trainings</h3>
                        <ul>
                            {upcomingTrainings.slice(0,3).length > 0 ? (
                                upcomingTrainings.map((training, index) => (
                                    <li key={index}>{training.topic} - {training.startDate} to {training.endDate}</li>
                                ))
                            ) : (
                                <p>No upcoming trainings.</p>
                            )}
                        </ul>
                    </div>
                )}
                {upcomingTrainings.length > 3 && (
        <Link to="/trainer/upcoming" className="see-more">...see more</Link>
      )}
                 </section>

                {/* <section className="trainer-section">
                <button onClick={fetchParticipants}>Participant Information</button>
                {activeSection === 'participants' && (
                    <div className="participant-section">
                        <h3>Participant Information</h3>
                        <ul>
                            {participants.length > 0 ? (
                                participants.map((participant, index) => (
                                    <li key={index}>{participant.name} - {participant.email}</li>
                                ))
                            ) : (
                                <p>No participants information available.</p>
                            )}
                        </ul>
                    </div>
                )}
                 </section> */}
            </div>
      
    );
}

export default TrainerDashboard;
