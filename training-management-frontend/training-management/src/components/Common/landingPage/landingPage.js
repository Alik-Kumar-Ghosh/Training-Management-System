// import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   return (
//     <div>
//       <h1>Welcome to Training Management System</h1>
//       <p>About Us</p>
//       <p>Contact</p>
//       <Link to="/login">
//         <button>Login</button>
//       </Link>
//     </div>
//   );
// };

// export default LandingPage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './landingPage.css'; // Import the CSS file for styling

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       <header className="header">
//         <h1>Welcome to Training Management System</h1>
//         <nav>
//           <ul>
//             <li><a href="#about">About</a></li>
//             <li><a href="#benefits">Benefits</a></li>
//             <li><a href="#help">Help</a></li>
//             <li><a href="#contact">Contact</a></li>
//           </ul>
//         </nav>
//       </header>
//       <section id="login" className="login-section">
//         <h2>Login</h2>
//         <Link to="/login">
//           <button className="login-button">Login</button>
//         </Link>
//       </section>
//       <section id="about" className="section">
//         <h2>About Us</h2>
//         <p>Learn more about our Training Management System and how it can help you manage your training programs efficiently.</p>
//       </section>
//       <section id="benefits" className="section">
//         <h2>Benefits</h2>
//         <p>Discover the benefits of using our system, including streamlined processes, improved tracking, and enhanced reporting.</p>
//       </section>
//       <section id="help" className="section">
//         <h2>Help</h2>
//         <p>Need assistance? Our support team is here to help you with any questions or issues you may have.</p>
//       </section>
//       <section id="contact" className="section">
//         <h2>Contact</h2>
//         <p>Get in touch with us for more information or to schedule a demo.</p>
//       </section>
     
//     </div>
//   );
// };

// export default LandingPage;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

const LandingPage = () => {
  const [ongoingTrainings, setOngoingTrainings] = useState([]);
  const [pastTrainings, setPastTrainings] = useState([]);
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);

  useEffect(() => {
    // Fetch Ongoing Trainings
    const fetchOngoingTrainings = async () => {
      try {
        const response = await axios.get('/api/trainings/ongoing');
        setOngoingTrainings(response.data.slice(0, 5)); // Only show top 5
      } catch (error) {
        console.error('Error fetching ongoing trainings:', error);
      }
    };

    // Fetch Past Trainings
    const fetchPastTrainings = async () => {
      try {
        const response = await axios.get('/api/trainings/past');
        setPastTrainings(response.data.slice(0, 5)); // Only show top 5
      } catch (error) {
        console.error('Error fetching past trainings:', error);
      }
    };

    // Fetch Upcoming Trainings
    const fetchUpcomingTrainings = async () => {
      try {
        const response = await axios.get('/api/trainings/upcoming');
        setUpcomingTrainings(response.data.slice(0, 5)); // Only show top 5
      } catch (error) {
        console.error('Error fetching upcoming trainings:', error);
      }
    };

    fetchOngoingTrainings();
    fetchPastTrainings();
    fetchUpcomingTrainings();
  }, []);

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <img src="D:\TrainingManagement\Training-Management-System\training-management-frontend\training-management\src\components\common\landing-page\logo.png" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#benefits">Benefits</a></li>
            <li><a href="#help">Help</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      
      <section className="hero">
        <h1>Welcome to Training Management System</h1>
        <p>Manage your training programs effectively and efficiently.</p>
        <Link to="/login">
          <button className="hero-button">Get Started</button>
        </Link>
      </section>

      {/* Ongoing Trainings Section */}
      <section id="ongoing-trainings" className="section">
        <h2>Ongoing Trainings</h2>
        <ul>
          {ongoingTrainings.map((training) => (
            <li key={training.id}>
              <strong>{training.topic}</strong> - {training.location} from {training.startDate} to {training.endDate}
            </li>
          ))}
        </ul>
        <Link to="/trainings/ongoing" className="see-more">...see more</Link>
      </section>

      {/* Past Trainings Section */}
      <section id="past-trainings" className="section">
        <h2>Past Trainings</h2>
        <ul>
          {pastTrainings.map((training) => (
            <li key={training.id}>
              <strong>{training.topic}</strong> - {training.location} (Ended on {training.endDate})
            </li>
          ))}
        </ul>
        <Link to="/trainings/past" className="see-more">...see more</Link>
      </section>

      {/* Upcoming Trainings Section */}
      <section id="upcoming-trainings" className="section">
        <h2>Upcoming Trainings</h2>
        <ul>
          {upcomingTrainings.map((training) => (
            <li key={training.id}>
              <strong>{training.topic}</strong> - {training.location} (Starts on {training.startDate})
            </li>
          ))}
        </ul>
        <Link to="/trainings/upcoming" className="see-more">...see more</Link>
      </section>

      {/* Other sections */}
      <section id="about" className="section">
        <h2>About Us</h2>
        <p>Learn more about our training management system and how it can help you manage your training programs effectively.</p>
      </section>

      <section id="benefits" className="section">
        <h2>Benefits</h2>
        <p>Discover the benefits of using our system, including streamlined processes, improved efficiency, and better tracking.</p>
      </section>

      <section id="help" className="section">
        <h2>Help</h2>
        <p>Need assistance? Our support team is here to help you with any questions or issues you may have.</p>
      </section>

      <section id="contact" className="section">
        <h2>Contact</h2>
        <p>Get in touch with us for more information or to schedule a demo.</p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Training Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

