import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
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

  useEffect(() => {
    if (userType === "manager") {
      loadPendingApprovals();
    }
  }, [userType]); // Call only once when the component mounts

  const loadOngoingTrainings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/ongoing-trainings`, {
        withCredentials: true,
      });
      setOngoingTrainings(response.data);
      setOpenSection("ongoing");
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
      setOpenSection("past");
    } catch (error) {
      console.error("Error fetching past trainings:", error);
    }
  };

  const loadAvailableTrainings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/training/upcoming`, {
        withCredentials: true,
      });
      setAvailableTrainings(response.data);
      setOpenSection("available");
    } catch (error) {
      console.error("Error fetching available trainings:", error);
    }
  };

  const loadPendingApprovals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/manager/pending-approvals`, {
        withCredentials: true,
      });
      setPendingApprovals(response.data);
    } catch (error) {
      console.error("Error fetching pending approvals:", error);
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setOpenSection("requested");
  };

  const handleApproval = async (applicationId, status) => {
    try {
      await axios.put(
        `http://localhost:8084/update-application`,
        null, // No request body needed
        {
          params: { applicationId, status },
          withCredentials: true,
        }
      );
      // Remove the approved/rejected request from the list
      setPendingApprovals((prev) => prev.filter((req) => req.applyId !== applicationId));
    } catch (error) {
      console.error(`Error updating approval status for request ${applicationId}:`, error);
    }
  };

  const handleApplyTraining = async (trainingId) => {
    try {
      await axios.post(
        `${BASE_URL}/apply/${trainingId}`,
        { userId, trainingId },
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
    navigate('/trainingdetails', { state: { trainingId } });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>User Dashboard</h2>
        <UserProfileBubble />
      </header>

      {/* Ongoing Trainings Section */}
      <section className="training-section">
        <button onClick={loadOngoingTrainings} className="primary">Ongoing Trainings</button>
        {openSection === "ongoing" && (
          <ul>
            {ongoingTrainings.slice(0, 3).length > 0 ? (
              ongoingTrainings.map((training) => (
                <li key={training.trainingId}>
                  <strong>{training.topic}</strong> - {training.location} from{" "}
                  {training.startDate} to {training.endDate}
                  <button onClick={() => handleViewDetails(training.trainingId)} className="view-details-button">View Details</button>
                </li>
              ))
            ) : (
              <p>No ongoing trainings.</p>
            )}
          </ul>
        )}
        {ongoingTrainings.length > 3 && (
          <Link to="/user/ongoing" className="see-more">...see more</Link>
        )}
      </section>

      {/* Past Trainings Section */}
      <section className="training-section">
        <button onClick={loadPastTrainings}className="secondary">Past Trainings</button>
        {openSection === "past" && (
          <ul>
            {pastTrainings.slice(0, 3).length > 0 ? (
              pastTrainings.map((training) => (
                <li key={training.trainingId}>
                  <strong>{training.topic}</strong> - {training.location} (Ended on {training.endDate})
                  <button onClick={() => handleViewDetails(training.trainingId)} className="view-details-button" >View Details</button>
                </li>
              ))
            ) : (
              <p>No past trainings.</p>
            )}
          </ul>
        )}
        {pastTrainings.length > 3 && (
          <Link to="/user/past" className="see-more">...see more</Link>
        )}
      </section>

      {/* Available Trainings Section */}
      <section className="training-apply">
        <button onClick={loadAvailableTrainings}className="primary">Available Trainings</button>
        {openSection === "available" && (
          <ul>
            {availableTrainings.slice(0, 3).length > 0 ? (
              availableTrainings.map((training) => (
                <li key={training.trainingId}>
                  <strong>{training.topic}</strong> - {training.location} (Starts on {training.startDate})
                  <button onClick={() => handleViewDetails(training.trainingId)} className="view-details-button">View Details</button>
                  <button onClick={() => handleApplyTraining(training.trainingId)} className="view-details-button">Apply</button>
                </li>
              ))
            ) : (
              <p>No available trainings.</p>
            )}
          </ul>
        )}
        {ongoingTrainings.length > 3 && (
          <Link to="/user/upcoming" className="see-more">...see more</Link>
        )}
      </section>

      {/* Request New Training Section */}
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

      {/* Manager's Pending Approvals Section */}
      {userType === "manager" && (
        <section className="approval-section">
          <h3>Pending Approvals</h3>
          <ul>
            {pendingApprovals.map((request) => (
              <li key={request.applyId}>
                <button onClick={() => handleRequestClick(request)}>
                  {request.user.name} - {request.training.topic}
                </button>
              </li>
            ))}
          </ul>
          {selectedRequest && (
            <div className="request-details">
              <h4>Request Details</h4>

              <p><strong>Trainee:</strong> {selectedRequest.user.name}</p>
              <p><strong>Training Topic:</strong> {selectedRequest.training.topic}</p>
              <p><strong>Location:</strong> {selectedRequest.training.location}</p>
              <p><strong>Trainer:</strong> {selectedRequest.training.trainer.name}</p>
              <button onClick={() => handleApproval(selectedRequest.applyId, "Approved")}>Approve</button>
              <button onClick={() => handleApproval(selectedRequest.applyId, "Rejected")}>Reject</button>
            </div>
          )}
        </section>
      )}

      {/* Trainee's Pending Approvals Section */}
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
