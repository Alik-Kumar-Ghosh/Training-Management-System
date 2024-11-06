import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../utils/api';
import UserProfileBubble from '../common/profilePage/userProfileBubble';
import './trainerDashboard.css';

function TrainerDashboard() {
    const [ongoingTrainings, setOngoingTrainings] = useState([]);
    const [pastTrainings, setPastTrainings] = useState([]);
    const [upcomingTrainings, setUpcomingTrainings] = useState([]);
    // const [participants, setParticipants] = useState([]);
    const [activeSection, setActiveSection] = useState('');

    

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

    const handleViewDetails = (trainingId) => {
        console.log(trainingId);
        ///training?trainingId=10
        navigate('/trainingdetails',{ state: {trainingId} });
      };

    return (
        <div className="trainer-dashboard-container">
            <header className="trainer-dashboard-header">
                <h2>Trainer Dashboard</h2>
                <UserProfileBubble/>
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
                                    <li key={index}>{training.topic} - {training.startDate} to {training.endDate}
                                    <button onClick={() => handleViewDetails(training.trainingId)}>View Details</button>
                                    </li>
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
                                    <li key={index}>{training.topic} - {training.startDate} to {training.endDate}
                                    <button onClick={() => handleViewDetails(training.trainingId)}>View Details</button>
                                    </li>
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
                                    <li key={index}>{training.topic} - {training.startDate} to {training.endDate}
                                    <button onClick={() => handleViewDetails(training.trainingId)}>View Details</button>
                                    </li>
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
