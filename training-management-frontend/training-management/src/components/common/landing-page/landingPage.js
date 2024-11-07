import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
import BASE_URL from "../../../utils/api";
import Navbar from "./navbar";

const LandingPage = () => {
  const [ongoingTrainings, setOngoingTrainings] = useState([]);
  const [pastTrainings, setPastTrainings] = useState([]);
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    // Fetch Ongoing Trainings
    const fetchOngoingTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/training/ongoing`);
        setOngoingTrainings(response.data.slice(0, 5)); // Only show top 5
      } catch (error) {
        console.error("Error fetching ongoing trainings:", error);
      }
    };

    // Fetch Past Trainings
    const fetchPastTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/training/past`);
        setPastTrainings(response.data.slice(0, 5)); // Only show top 5
      } catch (error) {
        console.error("Error fetching past trainings:", error);
      }
    };

    // Fetch Upcoming Trainings
    const fetchUpcomingTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/training/upcoming`);
        setUpcomingTrainings(response.data.slice(0, 5)); // Only show top 5
      } catch (error) {
        console.error("Error fetching upcoming trainings:", error);
      }
    };

    

    fetchOngoingTrainings();
    fetchPastTrainings();
    fetchUpcomingTrainings();
  }, []);

  return (
    <div className="landing-page">
      <header className="header">
       
        <Navbar/>
      </header>
      <section className="hero">
        <h1>Welcome to Skill forge</h1>
        <p>Manage your training programs effectively and efficiently.</p>
        <Link to="/login">
          <button className="hero-button">Login</button>
        </Link>
      </section>
      <section className="info">
        <h1>We are on a mission to upskill India Inc’s tech talent pool.</h1>
        <p>
          We work with large enterprises in providing disruptive digital
          learning solutions to transform talent for the future. We provide an
          experiential immersive learning experience that equips teams with the
          skills of tomorrow.
        </p>
      </section>

      <section id="about" className="about-section">
        <h2>ABOUT US</h2>
        <p>
          We leverage state-of-the-art Learning Platform and Industry-leading
          expertise to deliver impactful talent building & training ecosystem
          that fuels your business outcomes.
        </p>
        <div className="about-cards">
          <div className="about-card">
            <div className="icon new-hire"></div>
            <h3>New Hire Bootcamps</h3>
            <p>
              Focused immersive, experiential learning with graduate engineers
              to make them 'Production Ready'
            </p>
          </div>
          <div className="about-card">
            <div className="icon deep-skilling"></div>
            <h3>Lateral Deep Skilling Programs</h3>
            <p>
              Customized Programs to upskill/reskill and retool existing
              experienced talent in your organization.
            </p>
          </div>
          <div className="about-card">
            <div className="icon certification"></div>
            <h3>Certification Programs</h3>
            <p>
              Credentialing programs which lead to investing talent at scale for
              business differentiation
            </p>
          </div>
          <div className="about-card">
            <div className="icon product-training"></div>
            <h3>Product Training Programs</h3>
            <p>
              Partner with L&D teams to co-create and execute high-value
              programs & webinars throughout the year.
            </p>
          </div>
          <div className="about-card">
            <div className="icon leadership"></div>
            <h3>Leadership Programs</h3>
            <p>
              Product Management, Design Thinking, New Manager, ELITE Leadership
              Program
            </p>
          </div>
          <div className="about-card">
            <div className="icon soft-skills"></div>
            <h3>Soft Skills</h3>
            <p>
              Partner with L&D teams to co-create and execute high-value
              programs & webinars throughout the year.
            </p>
          </div>
        </div>
      </section>

      <section id="benefits" className="benefits-section">
        <h2>BENEFITS</h2>

        <div className="benefits">
          <div className="benefit-item">
            <h3>1. Streamlined Processes</h3>
            <p>
              Our platform simplifies the training management workflow, making
              it easier for organizations to plan, execute, and track training
              programs. This efficiency saves time and resources, allowing you
              to focus on what matters most.
            </p>
          </div>
          <div className="benefit-item">
            <h3>2. Improved Efficiency</h3>
            <p>
              With tailored learning paths and interactive modules, our training
              solutions enhance the learning experience, leading to faster skill
              acquisition and better performance on the job. Empower your team
              to become more productive and effective in their roles.
            </p>
          </div>
          <div className="benefit-item">
            <h3>3. Enhanced Tracking and Reporting</h3>
            <p>
              Our system provides robust analytics and reporting tools that
              allow you to monitor progress and measure the impact of training
              programs. Gain valuable insights into your team's performance and
              identify areas for improvement.
            </p>
          </div>
          <div className="benefit-item">
            <h3>4. Customizable Learning Solutions</h3>
            <p>
              We understand that every organization is unique. Our platform
              offers customizable training solutions that can be tailored to
              meet your specific requirements and align with your business
              goals.
            </p>
          </div>
          <div className="benefit-item">
            <h3>5. Engaging Learning Experiences</h3>
            <p>
              We prioritize engagement in our training programs. Our
              experiential learning approach combines interactive content,
              real-world scenarios, and gamification elements to keep learners
              motivated and invested in their development.
            </p>
          </div>
          <div className="benefit-item">
            <h3>6. Future-Ready Skills</h3>
            <p>
              Stay ahead of the curve with our training solutions that focus on
              emerging technologies and industry trends. Equip your team with
              the skills needed to thrive in a fast-paced digital landscape.
            </p>
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
                <p>
                  <strong>Location:</strong> {training.location}
                </p>
                <p>
                  <strong>Duration:</strong> {training.startDate} to{" "}
                  {training.endDate}
                </p>
              </div>
            ))}
          </div>
          {ongoingTrainings.length > 3 && (
            <Link to="/trainings/ongoing" className="see-more">
              ...see more
            </Link>
          )}
        </section>

        {/* upcoming Trainings Section */}
        <section id="upcoming-trainings" className="section">
          <h2>Upcoming Trainings</h2>
          <div className="cards-container">
            {upcomingTrainings.slice(0, 3).map((training) => (
              <div key={training.id} className="training-card">
                <h3>{training.topic}</h3>
                <p>
                  <strong>Location:</strong> {training.location}
                </p>
                <p>
                  <strong>Duration:</strong> {training.startDate} to{" "}
                  {training.endDate}
                </p>
              </div>
            ))}
          </div>
          {upcomingTrainings.length > 3 && (
            <Link to="/trainings/upcoming" className="see-more">
              ...see more
            </Link>
          )}
        </section>

        {/* Ongoing Trainings Section */}
        <section id="past-trainings" className="section">
          <h2>Past Trainings</h2>
          <div className="cards-container">
            {pastTrainings.slice(0, 3).map((training) => (
              <div key={training.id} className="training-card">
                <h3>{training.topic}</h3>
                <p>
                  <strong>Location:</strong> {training.location}
                </p>
                <p>
                  <strong>Duration:</strong> {training.startDate} to{" "}
                  {training.endDate}
                </p>
              </div>
            ))}
          </div>
          {ongoingTrainings.length > 3 && (
            <Link to="/trainings/past" className="see-more">
              ...see more
            </Link> //add for new tr past
          )}
        </section>
      </section>

      <section id="contact" class="contact-section">
        <h2>Contact</h2>
        <div class="contact-wrapper">
          <div class="contact-info">
            <p>
              <strong>
                Get in touch with us for more information or to schedule a demo.
              </strong>
            </p>
            <p>
              We’d love to hear from you! Whether you have questions, feedback,
              or want to learn more about our offerings, feel free to reach out.
            </p>
            <p>You can contact us via:</p>
          </div>
          <div class="contact-details">
            <ul>
              <li>
                <strong>Email:</strong> support@trainingmanagement.com
              </li>
              <li>
                <strong>Phone:</strong> +1 (800) 555-0199
              </li>
              <li>
                <strong>Address:</strong> 123 Learning Lane, Education City, IN
                45678
              </li>
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
