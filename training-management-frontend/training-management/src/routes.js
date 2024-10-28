import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/Common/LandingPage';
import Login from './Components/Common/Login';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ManageTraining from './Components/Admin/ManageTraining';
import PendingApprovals from './Components/Admin/PendingApprovals';
import ManagerDashboard from './Components/Manager/ManagerDashboard';
import PendingRequests from './Components/Manager/PendingRequests';
import RequestDetails from './Components/Manager/RequestDetails';
import TraineeDashboard from './Components/Trainee/TraineeDashboard';
import OngoingTraining from './Components/Trainee/OngoingTraining';
import CompletedTraining from './Components/Trainee/CompletedTraining';
import AvailableTraining from './Components/Trainee/AvailableTraining';
import RequestNewTraining from './Components/Trainee/RequestNewTraining';
import TrainerDashboard from './Components/Trainer/TrainerDashboard';
import PastTraining from './Components/Trainer/PastTraining';
import ParticipantInformation from './Components/Trainer/ParticipantInformation';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/manage-training" component={ManageTraining} />
      <Route path="/admin/pending-approvals" component={PendingApprovals} />
      <Route path="/manager/dashboard" component={ManagerDashboard} />
      <Route path="/manager/pending-requests" component={PendingRequests} />
      <Route path="/manager/request-details/:id" component={RequestDetails} />
      <Route path="/trainee/dashboard" component={TraineeDashboard} />
      <Route path="/trainee/ongoing-training" component={OngoingTraining} />
      <Route path="/trainee/completed-training" component={CompletedTraining} />
      <Route path="/trainee/available-training" component={AvailableTraining} />
      <Route path="/trainee/request-new-training" component={RequestNewTraining} />
      <Route path="/trainer/dashboard" component={TrainerDashboard} />
      <Route path="/trainer/past-training" component={PastTraining} />
      <Route path="/trainer/participant-information/:id" component={ParticipantInformation} />
    </Switch>
  </Router>
);

export default Routes;
