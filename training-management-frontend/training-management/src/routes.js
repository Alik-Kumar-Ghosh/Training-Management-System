import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './components/admin/adminDashboard';
import LandingPage from './components/common/landing-page/landingPage';
import Login from './components/common/login/login';
import UserProfile from './components/common/profilePage/userProfile';
import TrainerDashboard from './components/trainer/trainerDashboard';
import UserDashboard from './components/user/userDashboard';


const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>} exact />
      <Route path="/login" element={<Login/>} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
       {/* <Route path="/admin/manage-training" element={<ManageTraining/>} />
       <Route path="/admin/pending-approvals" element={<PendingApprovals />} />
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
       <Route path="/trainer/participant-information/:id" element={<ParticipantInformation/>} /> */}
       <Route  path="/user/dashboard" Component={UserDashboard} />
       <Route  path="/trainer/dashboard" Component={TrainerDashboard} />
       <Route path="/profile" element={<UserProfile />} />
      </Routes>
  </Router>
);

export default AppRoutes;
