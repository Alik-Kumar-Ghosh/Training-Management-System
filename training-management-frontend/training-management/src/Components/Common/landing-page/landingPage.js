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




import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

const LandingPage = () => {
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
