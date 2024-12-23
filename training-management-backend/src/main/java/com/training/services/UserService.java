package com.training.services;

import java.util.List;
import com.training.model.Training;
import com.training.model.TrainingApply;
import com.training.model.TrainingRequest;
import com.training.model.User;

public interface UserService {
	// creation services
	User createUser(User user);

	// Fetching services
	User findById(int userId);
	List<User> findByName(String name);
	User findByUserName(String userName);
	List<User> findAllTrainers();
	List<Training> getMyOngoingTrainings(User user);
	List<Training> getMyUpcomingTrainings(User user);
	List<Training> getMyPastTrainings(User user);
	List<Training> getTrainerOngoingTrainings(User user);
	List<Training> getTrainerUpcomingTrainings(User user);
	List<Training> getTrainerPastTrainings(User user);
	List<TrainingApply> getPendingApplicationsManager(User user); // Applications that the manager needs to approve
	List<TrainingApply> getPendingApplicationsAdmin(); // Applications that the admin needs to approve
	List<TrainingRequest> getPendingRequests(); // Requests that the admin needs to approve
	List<TrainingApply> getMyApplications(User user); // Requests that the user has applied for
	List<TrainingRequest> getMyRequests(User user);

	// Updation services
	User updateUser(User user);
}