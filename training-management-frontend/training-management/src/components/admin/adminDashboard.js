import React, { useEffect, useState, useRef } from "react";
import "./adminDashboard.css";
import BASE_URL from "../../utils/api";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserProfileBubble from "../common/profilePage/userProfileBubble";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [previousTrainings, setPreviousTrainings] = useState([]);
  const [ongoingTrainings, setOngoingTrainings] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [showNewTrainingForm, setShowNewTrainingForm] = useState(false);
  const [newTraining, setNewTraining] = useState({
    startDate: "",
    endDate: "",
    topic: "",
    trainerUserName: "",
    location: "",
    description: "",
  });
  const textareaRef = useRef(null);
  const [newTrainingDescription, setNewTrainingDescription] = useState("");

  const location = useLocation();
  const { userId, userType } = location.state || {};

  useEffect(() => {
    // Fetch training requests, previous trainings, and ongoing trainings from the API
    fetchTrainingRequests();
    fetchPreviousTrainings();
    fetchOngoingTrainings();
  }, [userId]);

  const fetchTrainingRequests = async () => {
    // Replace with your API call
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/pending-requests`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching training requests:", error);
    }
  };

  const fetchPreviousTrainings = async () => {
    try {
      // Making the API call with axios
      const response = await axios.get( `${BASE_URL}/training/past`, {
        withCredentials: true, // Include credentials (cookies) in the request
      });
      console.log(response.data)
      setPreviousTrainings(response.data); // Update state with the response data
    } catch (error) {
      console.error("Error fetching previous trainings:", error);
    }
  };

  // Function to fetch ongoing trainings using axios
  const fetchOngoingTrainings = async () => {
    try {
      // Making the API call with axios
      const response = await axios.get( `${BASE_URL}/training/ongoing`, {
        withCredentials: true, // Include credentials (cookies) in the request
      });
      console.log(response.data)
      setOngoingTrainings(response.data); // Update state with the response data
    } catch (error) {
      console.error("Error fetching ongoing trainings:", error);
    }
  };
  const handleAccept = async (id) => {
    try {
      // Construct the URL with query parameters for the training request
      const url = `${BASE_URL}/update-training?requestId=${id}&status=accepted`;
  
      // Send the PUT request using Axios
      const response = await axios.put(url, {}, { withCredentials: true });
  
      console.log('Accepted:', response.data);
      // Optionally, update the state or reload the data
      fetchTrainingRequests();
      fetchPreviousTrainings();
      fetchOngoingTrainings();
    } catch (error) {
      console.error('Error accepting the training request:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      // Construct the URL with query parameters for the training request
      const url = `${BASE_URL}/update-training?requestId=${id}&status=rejected`;
  
      // Send the PUT request using Axios
      const response = await axios.put(url, {}, { withCredentials: true });
  
      console.log('Rejected:', response.data);
      // Optionally, update the state or reload the data
      fetchTrainingRequests();
      fetchPreviousTrainings();
      fetchOngoingTrainings();
    } catch (error) {
      console.error('Error rejecting the training request:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Making the POST request using axios
      const response = await axios.post(
        `${BASE_URL}/training/create`,
        {
          ...newTraining,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );

      console.log("Training created:", response.data);
      // Optionally, you can update the state to reflect the new training
    } catch (error) {
      console.error("Error creating training:", error);
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

  
  const resetFormState = () => {
    setShowNewTrainingForm(false);
    setNewTraining({
      startDate: "",
      endDate: "",
      topic: "",
      trainerUserName: "",
      location: "",
      description: "",
    });
    setNewTrainingDescription("");
  };
  const fetchTrainers = async () => {
    try { 
      const response = await axios.get(`${BASE_URL}/trainers`); 
      setTrainers(response.data);
    } 
    catch (error) { 
      console.error('Error fetching trainers:', error); 
    } 
  };
  
  






  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2>Admin Dashboard </h2>
        <UserProfileBubble/>
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
    {requests.map((request) => (
      <tr key={request.requestId}>
        <td>{request.trainingTopic}</td>
        <td>{request.user.name}</td>
        <td>
          <button onClick={() => handleAccept(request.requestId)}>Accept</button>
          <button onClick={() => handleReject(request.requestId)}>Reject</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <h2>Previous Trainings</h2>
      <ul className="trainings-list">
        {previousTrainings.map((training) => (
          <li key={training.trainingId}>
            <h3>{training.topic}</h3>
            <p>{training.description}</p>
          </li>
        ))}
      </ul>
      <h2>Ongoing Trainings</h2>
      <ul className="trainings-list">
        {ongoingTrainings.map((training) => (
          <li key={training.trainingId}>
            <h3>{training.topic}</h3>
            <p>{training.description}</p>
          </li>
        ))}
      </ul>
      <section className="create-training">
        <button onClick={handleNewTrainingRequestClick}>
          Create New Training
        </button>
        {showNewTrainingForm && (
          <form className="new-training-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="topic">Topic:</label>
              <input
                type="text"
                id="topic"
                name="topic"
                placeholder="Enter topic"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="trainerUserName">Trainername:</label>
              <input
                type="text"
                id="trainerUserName"
                name="trainerUserName"
                placeholder="Enter username"
                onChange={handleInputChange}
                required
              />
            </div> */}

            <div className="form-group"> 
              <label htmlFor="trainerUserName">Trainer Name:</label> 
              <select id="trainerUserName" name="trainerUserName" onChange={handleInputChange} required > 
                <option value="">Select a trainer</option> 
                {trainers.map(trainer => ( 
                  <option key={trainer.userName} 
                          value={trainer.userName}> 
                          {trainer.name} 
                    </option> ))} 
                </select> 
              </div>


            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                ref={textareaRef}
                name="description"
                placeholder="Enter training description"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
