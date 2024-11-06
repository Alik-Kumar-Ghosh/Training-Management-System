import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/api";
import UserProfileBubble from '../common/profilePage/userProfileBubble';
import "./userDashboard.css";

const TraineeManagerDashboard = () => {
  const [ongoingTrainings, setOngoingTrainings] = useState([]);
  const [pastTrainings, setPastTrainings] = useState([]);
  const [availableTrainings, setAvailableTrainings] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showNewTrainingForm, setShowNewTrainingForm] = useState(false);
  const [newTrainingDescription, setNewTrainingDescription] = useState("");
  const textareaRef = useRef(null);
  const [openSection, setOpenSection] = useState(null); // Add state to track the opened section
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userType } = location.state || {};

  const loadOngoingTrainings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/ongoing-trainings`, {
        withCredentials: true,
      });
      setOngoingTrainings(response.data);
      setOpenSection("ongoing"); // Set the open section to "ongoing"
    } catch (error) {
      console.error("Error fetching ongoing trainings:", error);
    }
  };

  const loadPastTrainings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/past-trainings`, {
        withCredentials: true,
      });
      setPastTrainings(response.data);
      setOpenSection("past"); // Set the open section to "past"
    } catch (error) {
      console.error("Error fetching past trainings:", error);
    }
  };

  const loadAvailableTrainings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/upcoming-trainings`, {
        withCredentials: true,
      });
      setAvailableTrainings(response.data);
      setOpenSection("available"); // Set the open section to "available"
    } catch (error) {
      console.error("Error fetching available trainings:", error);
    }
  };

  const loadPendingApprovals = async () => {
    if (userType === "manager") {
      try {
        const response = await axios.get(`${BASE_URL}/manager/pending-approvals`);
        setPendingApprovals(response.data);
      } catch (error) {
        console.error("Error fetching pending approvals:", error);
      }
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setOpenSection("requested"); // Set the open section to "requested"
  };

  const handleApproval = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/update-application/${id}`,
        { userId, id, status },
        { withCredentials: true }
      );
      setPendingApprovals((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error(`Error updating approval status for request ${id}:`, error);
    }
  };

  const handleApplyTraining = async (trainingId) => {
    try {
      await axios.post(
        `${BASE_URL}/apply/${trainingId}`,
        { params: { userId, trainingId } },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(`Error applying for training ${trainingId}:`, error);
    }
  };

  const handleNewTrainingRequestClick = () => {
    setShowNewTrainingForm(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowNewTrainingForm(false);
    setNewTrainingDescription("");
  };
  const handleViewDetails = (trainingId) => {
    console.log(trainingId);
    ///training?trainingId=10
    navigate('/trainingdetails',{ state: {trainingId} });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>User Dashboard</h2>
        <UserProfileBubble/>
      </header>

      <section className="training-section">
        <button onClick={loadOngoingTrainings} className="primary">Ongoing Trainings</button>
        {openSection === "ongoing" && (
          <ul>
            {ongoingTrainings.slice(0,3).length > 0 ? (
            ongoingTrainings.map((training) => (
              <li key={training.trainingId}>
                <strong>{training.topic}</strong> - {training.location} from{" "}
                {training.startDate} to {training.endDate}
                <button onClick={() => handleViewDetails(training.trainingId)}>View Details</button>
              </li>
            )) ) : (
                <p>No ongoing trainings.</p>
            )}
          </ul>
        )}
        {ongoingTrainings.length > 3 && (
        <Link to="/user/ongoing" className="see-more">...see more</Link>
      )}
      </section>

      <section className="training-section">
        <button onClick={loadPastTrainings}className="secondary">Past Trainings</button>
        {openSection === "past" && (
          <ul>
            
            {pastTrainings.slice(0,3).length > 0 ? (
                pastTrainings.map((training) => (
              <li key={training.trainingId}>
                <strong>{training.topic}</strong> - {training.location} (Ended on {training.endDate})
                <button onClick={() => handleViewDetails(training.trainingId)} >View Details</button>
                

              </li>
            ) ) ) : (
                <p>No past trainings.</p>
            ) }
          </ul>
        )}
        {pastTrainings.length > 3 && (
        <Link to="/user/past" className="see-more">...see more</Link>
      )}
      </section>

      <section className="training-apply">
        <button onClick={loadAvailableTrainings}className="primary">Available Trainings</button>
        {openSection === "available" && (
          <ul>
             {availableTrainings.slice(0,3).length > 0 ? (
            availableTrainings.map((training) => (
              <li key={training.trainingId}>
                <strong>{training.topic}</strong> - {training.location} (Starts on {training.startDate})
                <button onClick={() => handleViewDetails(training.trainingId)}>View Details</button>
                <button onClick={() => handleApplyTraining(training.trainingId)}>Apply</button>
              </li>
            )) ) : (
                <p>No available trainings.</p>
            )}
          </ul>
        )}
        {ongoingTrainings.length > 3 && (
        <Link to="/user/upcoming" className="see-more">...see more</Link>
      )}
      </section>

      <section className="training-section">
        <button onClick={handleNewTrainingRequestClick} className="neutral">Request New Training</button>
        {showNewTrainingForm && (
          <form onSubmit={handleFormSubmit} className="new-training-form">
           
              <label for="topic"></label>
              <input type="text" id="topic" name="topic" placeholder="Enter training topic"></input>
<label for="description"></label>
    <textarea id="description" name="description" placeholder="Describe the training you need"></textarea>

            <button type="submit">Submit Request</button>
          </form>
        )}
      </section>

      {userType === "manager" && (
        <section className="approval-section">
          <h3>Pending Approvals</h3>
          <ul>
            {pendingApprovals.map((request) => (
              <li key={request.id}>
                <button onClick={() => handleRequestClick(request)}>
                  {request.trainee} - {request.training}
                </button>
              </li>
            ))}
          </ul>
          {selectedRequest && (
            <div className="request-details">
              <h4>Request Details</h4>
              <p><strong>Trainee:</strong> {selectedRequest.trainee}</p>
              <p><strong>Training:</strong> {selectedRequest.training}</p>
              <button onClick={() => handleApproval(selectedRequest.id, "Approved")}className="approve">Approve</button>
              <button onClick={() => handleApproval(selectedRequest.id, "Rejected")}className="reject">Reject</button>
            </div>
          )}
        </section>
      )}

      {userType === "trainee" && (
        <section className="approval-section">
          <h3>Pending Approvals</h3>
          <p>No pending approvals.</p>
        </section>
      )}
    </div>
  );
};

export default TraineeManagerDashboard;
