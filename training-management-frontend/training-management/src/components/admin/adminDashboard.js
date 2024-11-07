  import React, { useEffect, useState, useRef } from "react";
  import "./adminDashboard.css";
  import BASE_URL from "../../utils/api";
  import { useLocation, Link } from "react-router-dom";
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
      fetchTrainingRequests();
      fetchPreviousTrainings();
      fetchOngoingTrainings();
    }, [userId]);

    const fetchTrainingRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/pending-requests`, { withCredentials: true });
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching training requests:", error);
      }
    };

    const fetchPreviousTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/training/past`, { withCredentials: true });
        console.log(response.data);
        setPreviousTrainings(response.data);
      } catch (error) {
        console.error("Error fetching previous trainings:", error);
      }
    };

    const fetchOngoingTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/training/ongoing`, { withCredentials: true });
        console.log(response.data);
        setOngoingTrainings(response.data);
      } catch (error) {
        console.error("Error fetching ongoing trainings:", error);
      }
    };

    const handleAccept = async (id) => {
      try {
        const url = `${BASE_URL}/update-training?requestId=${id}&status=accepted`;
        const response = await axios.put(url, {}, { withCredentials: true });
        console.log("Accepted:", response.data);
        fetchTrainingRequests();
        fetchPreviousTrainings();
        fetchOngoingTrainings();
      } catch (error) {
        console.error("Error accepting the training request:", error);
      }
    };

    const handleReject = async (id) => {
      try {
        const url = `${BASE_URL}/update-training?requestId=${id}&status=rejected`;
        const response = await axios.put(url, {}, { withCredentials: true });
        console.log("Rejected:", response.data);
        fetchTrainingRequests();
        fetchPreviousTrainings();
        fetchOngoingTrainings();
      } catch (error) {
        console.error("Error rejecting the training request:", error);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Prepare the data to be sent in the POST request
        const trainingData = {
          startDate: newTraining.startDate,
          endDate: newTraining.endDate,
          topic: newTraining.topic,
          trainerUserName: newTraining.trainerUserName,
          location: newTraining.location,
          description: newTraining.description,
        };
        console.log(trainingData)
    
        // Making the POST request using axios
        const response = await axios.post(
          `${BASE_URL}/training/create`,
          trainingData,
          {
            withCredentials: true,
          }
        );
    
        console.log("Training created:", response.data);
        // Optionally, reset the form state or show a success message
        resetFormState();
      } catch (error) {
        console.error("Error creating training:", error);
      }
    };
    

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewTraining({ ...newTraining, [name]: value });
    };

    const handleNewTrainingRequestClick = async () => {
      setShowNewTrainingForm(true);
      // Fetch trainers when the form is opened
      await fetchTrainers();
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
    };

    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trainers`, { withCredentials: true });
        console.log("Trainers:", response.data);
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
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

    const handleLogout = async () => {
      try {
        await axios.post(`${BASE_URL}/logout`);
        console.log("Logged out successfully");
        window.location.href = "/";
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    const [approvalRequests, setApprovalRequests] = useState([]);

    useEffect(() => {
      fetchApprovalRequests();
    }, []);
  
    const fetchApprovalRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/pending-approvals`, { withCredentials: true });
        console.log("Pending Approvals:", response.data);
        setApprovalRequests(response.data);
      } catch (error) {
        console.error("Error fetching approval requests:", error);
      }
    };
  
    const handleAccept1 = async (applyId) => {
      try {
        const url = `${BASE_URL}/update-application?applicationId=${applyId}&status=accepted`;
        const response = await axios.put(url, {}, { withCredentials: true });
        console.log("Accepted:", response.data);
        fetchApprovalRequests(); // Refresh the approval requests
      } catch (error) {
        console.error("Error accepting the approval request:", error);
      }
    };
  
    const handleReject1 = async (applyId) => {
      try {
        const url = `${BASE_URL}/update-application?applicationId=${applyId}&status=rejected`;
        const response = await axios.put(url, {}, { withCredentials: true });
        console.log("Rejected:", response.data);
        fetchApprovalRequests(); // Refresh the approval requests
      } catch (error) {
        console.error("Error rejecting the approval request:", error);
      }
    };
  

    return (
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <UserProfileBubble />
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
        <div className="admin-dashboard">
      <h3>Pending Training Approvals</h3>
      <table className="approvals-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Applicant Name</th>
            <th>Trainer</th>
            <th>Location</th>
            <th>Apply Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {approvalRequests.map((request) => (
            <tr key={request.applyId}>
              <td>{request.training.topic}</td>
              <td>{request.user.name}</td>
              <td>{request.training.trainer.name}</td>
              <td>{request.training.location}</td>
              <td>{request.applyDate}</td>
              <td>
                <button onClick={() => handleAccept1(request.applyId)}>Accept</button>
                <button onClick={() => handleReject1(request.applyId)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<<<<<<< HEAD
=======

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
              <label htmlFor="topic">Location:</label>
              <input type="text" id="location" name="location" placeholder="Enter location" onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="trainerUserName">Trainer Name:</label>
              <select id="trainerUserName" name="trainerUserName" onChange={handleInputChange} required>
                <option value="">Select a trainer</option>
                {trainers.map((trainer) => (
                  <option key={trainer.userName} value={trainer.userName}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" ref={textareaRef} name="description" placeholder="Enter training description" onChange={handleInputChange}></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </section>
>>>>>>> 5db0e6210bcbab13eb059bb2e75994c28201902f
    </div>
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
          <button onClick={handleNewTrainingRequestClick}>Create New Training</button>
          {showNewTrainingForm && (
            <form className="new-training-form" onSubmit={handleSubmit}>
              <div className="form-group">
                {/* <label htmlFor="startDate">Start Date:</label> */}
                <input type="date" id="startDate" name="startDate" onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                {/* <label htmlFor="endDate">End Date:</label> */}
                <input type="date" id="endDate" name="endDate" onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                {/* <label htmlFor="topic">Topic:</label> */}
                <input type="text" id="topic" name="topic" placeholder="Enter topic" onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                {/* <label htmlFor="topic">Topic:</label> */}
                <input type="text" id="location" name="location" placeholder="Enter location" onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                {/* <label htmlFor="trainerUserName">Trainer Name:</label> */}
                <select id="trainerUserName" name="trainerUserName" onChange={handleInputChange} required>
                  <option value="">Select a trainer</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.userName} value={trainer.userName}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                {/* <label htmlFor="description">Description:</label> */}
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
