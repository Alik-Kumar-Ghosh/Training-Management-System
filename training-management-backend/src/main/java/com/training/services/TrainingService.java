package com.training.services;

import java.util.List;

import com.training.model.Training;
import com.training.model.TrainingApply;
import com.training.model.TrainingParticipant;
import com.training.model.TrainingRequest;
import com.training.model.User;

public interface TrainingService {
	// Creation services
	Training createTraining(Training training);
	TrainingApply createTrainingApply(TrainingApply trainingApplication);
	TrainingParticipant createTrainingParticipant(TrainingParticipant participant);
	TrainingRequest createTrainingRequest(TrainingRequest trainingRequest);
	
	// Fetching services
	Training findTrainingById(int trainingId);
	TrainingApply findApplicationById(int applicationId);
	TrainingRequest findRequestById(int requestId);
	List<Training> findTrainingByTopic(String topic);
	List<User> getTrainingParticipants(Training training);
	List<Training> getUpcomingTrainings();
	List<Training> getOngoingTrainings();
	List<Training> getPastTrainings();
	List<Training> getAllTrainings();
	List<TrainingApply> getTrainingApplications(Training training);
	List<TrainingRequest> getTrainingRequests();

	// Updation services
	Training updateTraining(Training training);
	TrainingApply updateTrainingApplication(TrainingApply trainingApplication);
	TrainingRequest updateTrainingRequest(TrainingRequest trainingRequest);
	TrainingParticipant updateTrainingParticipant(TrainingParticipant participant);
}