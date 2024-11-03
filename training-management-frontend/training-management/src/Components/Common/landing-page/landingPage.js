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
import React ,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';
import logo from './logo.png';

const LandingPage = () => {

    // const [ongoingTrainings, setOngoingTrainings] = useState([]);
    // const [pastTrainings, setPastTrainings] = useState([]);
    // const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  
    // useEffect(() => {
    //   // Fetch Ongoing Trainings
    //   const fetchOngoingTrainings = async () => {
    //     try {
    //       const response = await axios.get('/api/trainings/ongoing');
    //       setOngoingTrainings(response.data.slice(0, 5)); // Only show top 5
    //     } catch (error) {
    //       console.error('Error fetching ongoing trainings:', error);
    //     }
    //   };
  
    //   // Fetch Past Trainings
    //   const fetchPastTrainings = async () => {
    //     try {
    //       const response = await axios.get('/api/trainings/past');
    //       setPastTrainings(response.data.slice(0, 5)); // Only show top 5
    //     } catch (error) {
    //       console.error('Error fetching past trainings:', error);
    //     }
    //   };
  
    //   // Fetch Upcoming Trainings
    //   const fetchUpcomingTrainings = async () => {
    //     try {
    //       const response = await axios.get('/api/trainings/upcoming');
    //       setUpcomingTrainings(response.data.slice(0, 5)); // Only show top 5
    //     } catch (error) {
    //       console.error('Error fetching upcoming trainings:', error);
    //     }
    //   };
  
    //   fetchOngoingTrainings();
    //   fetchPastTrainings();
    //   fetchUpcomingTrainings();
    // }, []);

  // State variables for ongoing, upcoming, and past trainings
    // State variables for ongoing, upcoming, and past trainings
    const [ongoingTrainings, setOngoingTrainings] = useState([]);
    const [upcomingTrainings, setUpcomingTrainings] = useState([]);
    const [pastTrainings, setPastTrainings] = useState([]);
  
    useEffect(() => {
      // Dummy ongoing training data for demonstration
      const dummyOngoingTrainings = [
        {
          id: 1,
          topic: 'React Basics',
          location: 'Online',
          startDate: '2024-11-01',
          endDate: '2024-11-10',
        },
        {
          id: 2,
          topic: 'Python for Data Science',
          location: 'Mumbai',
          startDate: '2024-11-05',
          endDate: '2024-11-15',
        },
        {
          id: 3,
          topic: 'Advanced CSS Techniques',
          location: 'Delhi',
          startDate: '2024-11-10',
          endDate: '2024-11-20',
        },
        {
          id: 4,
          topic: 'JavaScript ES6 Features',
          location: 'Bangalore',
          startDate: '2024-11-12',
          endDate: '2024-11-22',
        },
        {
          id: 5,
          topic: 'Machine Learning for Beginners',
          location: 'Online',
          startDate: '2024-11-15',
          endDate: '2024-11-25',
        },
        {
          id: 6,
          topic: 'Introduction to TypeScript',
          location: 'Chennai',
          startDate: '2024-11-20',
          endDate: '2024-11-30',
        },
        {
          id: 7,
          topic: 'DevOps Fundamentals',
          location: 'Pune',
          startDate: '2024-11-25',
          endDate: '2024-12-05',
        },
        {
          id: 8,
          topic: 'Cloud Computing Essentials',
          location: 'Hyderabad',
          startDate: '2024-12-01',
          endDate: '2024-12-10',
        },
        {
          id: 9,
          topic: 'Agile Methodologies',
          location: 'Delhi',
          startDate: '2024-12-05',
          endDate: '2024-12-12',
        },
        {
          id: 10,
          topic: 'UI/UX Design Principles',
          location: 'Bangalore',
          startDate: '2024-12-10',
          endDate: '2024-12-20',
        },
      ];
  
      // Dummy upcoming training data for demonstration
      const dummyUpcomingTrainings = [
        {
          id: 11,
          topic: 'Introduction to Docker',
          location: 'Online',
          startDate: '2024-11-20',
          endDate: '2024-11-27',
        },
        {
          id: 12,
          topic: 'Advanced JavaScript Concepts',
          location: 'Chennai',
          startDate: '2024-11-25',
          endDate: '2024-12-05',
        },
        {
          id: 13,
          topic: 'Data Visualization with D3.js',
          location: 'Mumbai',
          startDate: '2024-12-01',
          endDate: '2024-12-08',
        },
        {
          id: 14,
          topic: 'Ethical Hacking and Cybersecurity',
          location: 'Delhi',
          startDate: '2024-12-10',
          endDate: '2024-12-15',
        },
        {
          id: 15,
          topic: 'Mobile App Development with React Native',
          location: 'Bangalore',
          startDate: '2024-12-12',
          endDate: '2024-12-20',
        },
        {
          id: 16,
          topic: 'Machine Learning with TensorFlow',
          location: 'Online',
          startDate: '2024-12-15',
          endDate: '2024-12-25',
        },
        {
          id: 17,
          topic: 'Blockchain Basics',
          location: 'Hyderabad',
          startDate: '2024-12-20',
          endDate: '2024-12-30',
        },
        {
          id: 18,
          topic: 'Introduction to Quantum Computing',
          location: 'Delhi',
          startDate: '2024-12-25',
          endDate: '2025-01-05',
        },
        {
          id: 19,
          topic: 'Digital Marketing Strategies',
          location: 'Pune',
          startDate: '2025-01-02',
          endDate: '2025-01-10',
        },
        {
          id: 20,
          topic: 'Game Development with Unity',
          location: 'Online',
          startDate: '2025-01-10',
          endDate: '2025-01-20',
        },
      ];
  
      // Dummy past training data for demonstration
      const dummyPastTrainings = [
        {
          id: 21,
          topic: 'Introduction to SQL',
          location: 'Bangalore',
          startDate: '2024-09-01',
          endDate: '2024-09-05',
        },
        {
          id: 22,
          topic: 'Agile Project Management',
          location: 'Chennai',
          startDate: '2024-09-15',
          endDate: '2024-09-20',
        },
        {
          id: 23,
          topic: 'Data Analysis with Python',
          location: 'Delhi',
          startDate: '2024-08-20',
          endDate: '2024-08-25',
        },
        {
          id: 24,
          topic: 'Introduction to HTML & CSS',
          location: 'Mumbai',
          startDate: '2024-08-01',
          endDate: '2024-08-10',
        },
        {
          id: 25,
          topic: 'Software Testing Fundamentals',
          location: 'Online',
          startDate: '2024-07-15',
          endDate: '2024-07-20',
        },
        {
          id: 26,
          topic: 'Intro to Machine Learning',
          location: 'Pune',
          startDate: '2024-07-10',
          endDate: '2024-07-15',
        },
        {
          id: 27,
          topic: 'Full Stack Development Bootcamp',
          location: 'Bangalore',
          startDate: '2024-06-01',
          endDate: '2024-06-30',
        },
        {
          id: 28,
          topic: 'Network Security Basics',
          location: 'Delhi',
          startDate: '2024-06-15',
          endDate: '2024-06-20',
        },
        {
          id: 29,
          topic: 'React Native Development',
          location: 'Hyderabad',
          startDate: '2024-05-10',
          endDate: '2024-05-15',
        },
        {
          id: 30,
          topic: 'Creating REST APIs with Node.js',
          location: 'Online',
          startDate: '2024-04-05',
          endDate: '2024-04-10',
        },
      ];
  
      // Set the state variables with the dummy data
      setOngoingTrainings(dummyOngoingTrainings);
      setUpcomingTrainings(dummyUpcomingTrainings);
      setPastTrainings(dummyPastTrainings);
    }, []);

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#benefits">Benefits</a></li>
            <li><a href="#trainings">Trainings</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <section className="hero">
        <h1>Welcome to Training Management System</h1>
        <p>Manage your training programs effectively and efficiently.</p>
        <Link to="/login">
          <button className="hero-button">Login</button>
        </Link>
      </section>
      <section className="info">
        <h1>We are on a mission to upskill India Inc’s tech talent pool.</h1>
        <p>We work with large enterprises in providing disruptive digital learning solutions to transform talent for the future. We provide an experiential immersive learning experience that equips teams with the skills of tomorrow.</p>
      </section>

      <section id="about" className="about-section">
      <h2>ABOUT US</h2>
        <p>We leverage state-of-the-art Learning Platform and Industry-leading expertise to deliver impactful talent building & training ecosystem that fuels your business outcomes.</p>
      <div className="about-cards">
          <div className="about-card">
            <div className="icon new-hire"></div>
              <h3>New Hire Bootcamps</h3>
              <p>Focused immersive, experiential learning with graduate engineers to make them 'Production Ready'</p>
          </div>
          <div className="about-card">
            <div className="icon deep-skilling"></div>
            <h3>Lateral Deep Skilling Programs</h3>
            <p>Customized Programs to upskill/reskill and retool existing experienced talent in your organization.</p>
          </div>
          <div className="about-card">
            <div className="icon certification"></div>
            <h3>Certification Programs</h3>
            <p>Credentialing programs which lead to investing talent at scale for business differentiation</p>
          </div>
          <div className="about-card">
              <div className="icon product-training"></div>
              <h3>Product Training Programs</h3>
              <p>Partner with L&D teams to co-create and execute high-value programs & webinars throughout the year.</p>
          </div>
          <div className="about-card">
              <div className="icon leadership"></div>
              <h3>Leadership Programs</h3>
              <p>Product Management, Design Thinking, New Manager, ELITE Leadership Program</p>
          </div>
          <div className="about-card">
              <div className="icon soft-skills"></div>
              <h3>Soft Skills</h3>
              <p>Partner with L&D teams to co-create and execute high-value programs & webinars throughout the year.</p>
          </div>
      </div>
      </section>


      <section id="benefits" className="benefits-section">
      <h2>BENEFITS</h2>

      <div className="benefits">
        <div className="benefit-item">
          <h3>1. Streamlined Processes</h3>
          <p>Our platform simplifies the training management workflow, making it easier for organizations to plan, execute, and track training programs. This efficiency saves time and resources, allowing you to focus on what matters most.</p>
        </div>
        <div className="benefit-item">
          <h3>2. Improved Efficiency</h3>
          <p>With tailored learning paths and interactive modules, our training solutions enhance the learning experience, leading to faster skill acquisition and better performance on the job. Empower your team to become more productive and effective in their roles.</p>
        </div>
        <div className="benefit-item">
          <h3>3. Enhanced Tracking and Reporting</h3>
          <p>Our system provides robust analytics and reporting tools that allow you to monitor progress and measure the impact of training programs. Gain valuable insights into your team's performance and identify areas for improvement.</p>
        </div>
        <div className="benefit-item">
          <h3>4. Customizable Learning Solutions</h3>
          <p>We understand that every organization is unique. Our platform offers customizable training solutions that can be tailored to meet your specific requirements and align with your business goals.</p>
        </div>
        <div className="benefit-item">
          <h3>5. Engaging Learning Experiences</h3>
          <p>We prioritize engagement in our training programs. Our experiential learning approach combines interactive content, real-world scenarios, and gamification elements to keep learners motivated and invested in their development.</p>
        </div>
        <div className="benefit-item">
          <h3>6. Future-Ready Skills</h3>
          <p>Stay ahead of the curve with our training solutions that focus on emerging technologies and industry trends. Equip your team with the skills needed to thrive in a fast-paced digital landscape.</p>
        </div>
      </div>
    </section>

      <section id="trainings">
      {/* Ongoing Trainings Section */}
      <section id="ongoing-trainings" className="section">
      <h2>Ongoing Trainings</h2>
      <div className="cards-container">
        {ongoingTrainings.slice(0, 3).map((training) => (
          <div key={training.id} className="training-card">
            <h3>{training.topic}</h3>
            <p><strong>Location:</strong> {training.location}</p>
            <p><strong>Duration:</strong> {training.startDate} to {training.endDate}</p>
          </div>
        ))}
      </div>
      {ongoingTrainings.length > 5 && (
        <Link to="/trainings/ongoing" className="see-more">...see more</Link>
      )}
    </section>

    {/* Ongoing Trainings Section */}
    <section id="upcoming-trainings" className="section">
      <h2>Upcoming Trainings</h2>
      <div className="cards-container">
        {upcomingTrainings.slice(0, 3).map((training) => (
          <div key={training.id} className="training-card">
            <h3>{training.topic}</h3>
            <p><strong>Location:</strong> {training.location}</p>
            <p><strong>Duration:</strong> {training.startDate} to {training.endDate}</p>
          </div>
        ))}
      </div>
      {upcomingTrainings.length > 5 && (
        <Link to="/trainings/upcoming" className="see-more">...see more</Link>
      )}
    </section>

        {/* Ongoing Trainings Section */}
        <section id="past-trainings" className="section">
      <h2>Past Trainings</h2>
      <div className="cards-container">
        {pastTrainings.slice(0, 3).map((training) => (
          <div key={training.id} className="training-card">
            <h3>{training.topic}</h3>
            <p><strong>Location:</strong> {training.location}</p>
            <p><strong>Duration:</strong> {training.startDate} to {training.endDate}</p>
          </div>
        ))}
      </div>
      {ongoingTrainings.length > 5 && (
        <Link to="/trainings/past" className="see-more">...see more</Link> //add for new tr past
      )}
    </section></section>

    <section id="contact" class="contact-section">
      <h2>Contact</h2>
        <div class="contact-wrapper">
        <div class="contact-info">
          <p><strong>Get in touch with us for more information or to schedule a demo.</strong></p>
          <p>We’d love to hear from you! Whether you have questions, feedback, or want to learn more about our offerings, feel free to reach out.</p>
           <p>You can contact us via:</p>
        </div>
        <div class="contact-details">
          <ul>
              <li><strong>Email:</strong> support@trainingmanagement.com</li>
              <li><strong>Phone:</strong> +1 (800) 555-0199</li>
              <li><strong>Address:</strong> 123 Learning Lane, Education City, IN 45678</li>
          </ul>
        <p>We look forward to connecting with you!</p>
      </div>
    </div>
    </section>

      <footer className="footer">
        <p>&copy; 2024 Training Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
