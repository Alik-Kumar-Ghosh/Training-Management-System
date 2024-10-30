import React from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LandingPage from './components/common/landing-page/landingPage';
import Login from './components/common/login/login';
import AdminDashboard from './components/admin/adminDashboard';
import ManageTraining from './components/admin/manageTraining';
import PendingApprovals from './components/admin/pendingApprovals';
import ManagerDashboard from './components/manager/managerDashboard';
import PendingRequests from './components/manager/pendingRequests';
import RequestDetails from './components/manager/requestDetails';
import TraineeDashboard from './components/trainee/traineeDashboard';
import OngoingTraining from './components/trainee/ongoingTraining';
import CompletedTraining from './components/trainee/completedTraining';
import AvailableTraining from './components/trainee/availableTraining';
import RequestNewTraining from './components/trainee/requestNewTraining';
import TrainerDashboard from './components/trainer/trainerDashboard';
import PastTraining from './components/trainer/pastTraining';
import ParticipantInformation from './components/trainer/participantInformation';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>} exact />
      <Route path="/login" element={<Login/>} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      <Route path="/admin/manage-training" element={<ManageTraining/>} />
      <Route path="/admin/pending-approvals" element={<PendingApprovals/>} />
      <Route path="/manager/dashboard" element={<ManagerDashboard/>} />
      <Route path="/manager/pending-requests" element={<PendingRequests/>} />
      <Route path="/manager/request-details/:id" element={<RequestDetails/>} />
      <Route path="/trainee/dashboard" element={<TraineeDashboard/>} />
      <Route path="/trainee/ongoing-training" element={<OngoingTraining/>} />
      <Route path="/trainee/completed-training" element={<CompletedTraining/>} />
      <Route path="/trainee/available-training" element={<AvailableTraining/>} />
      <Route path="/trainee/request-new-training" element={<RequestNewTraining/>} />
      <Route path="/trainer/dashboard" element={<TrainerDashboard/>} />
      <Route path="/trainer/past-training" element={<PastTraining/>} />
      <Route path="/trainer/participant-information/:id" element={<ParticipantInformation/>} />
      </Routes>
  </Router>
);

export default AppRoutes;
