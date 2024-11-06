import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./userDashboard.css";
import BASE_URL from "../../utils/api";
import UserProfileBubble from '../common/profilePage/userProfileBubble';

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
  const location = useLocation();
  const { userId, userType } = location.state || {};

  const loadOngoingTrainings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/ongoing-trainings`, {
      } ,{ withCredentials: true });
      setOngoingTrainings(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching ongoing trainings:", error);
    }
  };

  const loadPastTrainings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/past-trainings`, {
      },{ withCredentials: true });
      setPastTrainings(response.data);
    } catch (error) {
      console.error("Error fetching past trainings:", error);
    }
  };

  const loadAvailableTrainings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/upcoming-trainings`, {
      },{ withCredentials: true });
      setAvailableTrainings(response.data);
    } catch (error) {
      console.error("Error fetching available trainings:", error);
    }
  };

  const loadPendingApprovals = async () => {
    if (userType === "manager") {
      try {
        const response = await axios.get(
          `${BASE_URL}/manager/pending-approvals`,
        );
        setPendingApprovals(response.data);
      } catch (error) {
        console.error("Error fetching pending approvals:", error);
      }
    }
  };
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setOpenSection(openSection === "available" ? null : "requested");
  };

  const handleApproval = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/update-application/${id}`, {
        userId,
        id,
        status,
      },{ withCredentials: true });
      console.log(`Request ID: ${id}, Status: ${status}`);
      setPendingApprovals((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error(`Error updating approval status for request ${id}:`, error);
    }
  };

  const handleApplyTraining = async (trainingId) => {
    try {
      await axios.post(`${BASE_URL}/apply/${trainingId}`, {
        params: { userId, trainingId },
      },{ withCredentials: true });
      console.log(`Applied for training ID: ${trainingId}`);
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
    }, 0); // Use timeout to ensure it runs after rendering
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(
      "New training requested with description:",
      newTrainingDescription
    );
    setShowNewTrainingForm(false);
    setNewTrainingDescription("");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>User Dashboard</h2>
        <UserProfileBubble/>
      </header>

      <section className="training-section">
        <button id="ongoing" onClick={loadOngoingTrainings}>
          Ongoing Trainings
        </button>
        {openSection === "ongoing" && ( // Show only if this section is open
          <ul>
            {ongoingTrainings.map((training, index) => (
              <li key={index}>
                <strong>{training.topic}</strong> - {training.location} from{" "}
                {training.startDate} to {training.endDate}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="training-section">
        <button id="past" onClick={loadPastTrainings}>
          Past Trainings
        </button>
        {openSection === "past" && ( // Show only if this section is open
          <ul>
            {pastTrainings.map((training, index) => (
              <li key={index}>
                <strong>{training.topic}</strong> - {training.location} (Ended
                on {training.endDate})
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="training-apply">
        <button id="available" onClick={loadAvailableTrainings}>
          Available Trainings
        </button>
        {openSection === "available" && ( // Show only if this section is open
          <ul>
            {availableTrainings.map((training) => (
              <li className="list-wala" key={training.id}>
                <strong>{training.topic}</strong> - {training.location} (Starts
                on {training.startDate})
                <button
                  className="apply-button"
                  onClick={() => handleApplyTraining(training.id)}
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="training-section">
        <button id="request" onClick={handleNewTrainingRequestClick}>
          Request New Training
        </button>
        {showNewTrainingForm && (
          <form onSubmit={handleFormSubmit} className="new-training-form">
            <label>
              Training Description:
              <textarea
                ref={textareaRef} // Add the ref here
                value={newTrainingDescription}
                onChange={(e) => setNewTrainingDescription(e.target.value)}
                placeholder="Describe the training you need"
                required
              />
            </label>
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
              <p>
                <strong>Trainee:</strong> {selectedRequest.trainee}
              </p>
              <p>
                <strong>Training:</strong> {selectedRequest.training}
              </p>
              <button
                onClick={() => handleApproval(selectedRequest.id, "Approved")}
              >
                Approve
              </button>
              <button
                onClick={() => handleApproval(selectedRequest.id, "Rejected")}
              >
                Reject
              </button>
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
