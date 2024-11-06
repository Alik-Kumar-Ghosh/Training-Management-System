import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './components/admin/adminDashboard';
import LandingPage from './components/common/landing-page/landingPage';
import OngoingTraining from './components/common/landing-page/ongoingTraining';
import PastTraining from './components/common/landing-page/pastTraining';
import UpcomingTraining from './components/common/landing-page/upcomingTraining';
import Login from './components/common/login/login';
import UserProfile from './components/common/profilePage/userProfile';
import OngoingTrainingTrainer from './components/trainer/ongoingTrainingTrainer';
import PastTrainingTrainer from './components/trainer/pastTrainingTrainer';
import TrainerDashboard from './components/trainer/trainerDashboard';
import UpcomingTrainingTrainer from './components/trainer/upcomingTrainingTrainer';
import OngoingTrainingUser from './components/user/ongoingTrainingUser';
import PastTrainingUser from './components/user/pastTrainingUser';
import UpcomingTrainingUser from './components/user/upcomingTrainingUser';
import UserDashboard from './components/user/userDashboard';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} exact />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/trainings/ongoing" element={<OngoingTraining />} />
      <Route path="/trainings/past" element={<PastTraining />} />
      <Route path="/trainings/upcoming" element={<UpcomingTraining/>} />
      <Route path="/user/upcoming" element={<UpcomingTrainingUser/>}/>
      <Route path="/user/past" element={<PastTrainingUser/>}/>
      <Route path="/user/ongoing" element={<OngoingTrainingUser/>}/>
      <Route path="/trainer/upcoming" element={<UpcomingTrainingTrainer/>}/>
      <Route path="/trainer/past" element={<PastTrainingTrainer/>}/>
      <Route path="/trainer/ongoing" element={<OngoingTrainingTrainer/>}/>
      
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
       <Route  path="/user/dashboard" element={<UserDashboard  />} />
       <Route  path="/trainer/dashboard" element={<TrainerDashboard/>}  />
       <Route path="/profile" element={<UserProfile />} />
      </Routes>
  </Router>
);

export default AppRoutes;
