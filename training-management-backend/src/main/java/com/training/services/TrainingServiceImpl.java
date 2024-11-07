package com.training.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.controller.InvalidRequestException;
import com.training.model.Training;
import com.training.model.TrainingApply;
import com.training.model.TrainingParticipant;
import com.training.model.TrainingRequest;
import com.training.model.User;
import com.training.repo.TrainingApplyRepo;
import com.training.repo.TrainingParticipantRepo;
import com.training.repo.TrainingRepo;
import com.training.repo.TrainingRequestRepo;

@Service
public class TrainingServiceImpl implements TrainingService {
	@Autowired
	TrainingRepo trainingRepo;
	@Autowired
	TrainingApplyRepo trainingApplyRepo;
	@Autowired
	TrainingParticipantRepo trainingParticipantRepo;
	@Autowired
	TrainingRequestRepo trainingRequestRepo;

	@Override
	public Training createTraining(Training training) {
		if(training.getStartDate().compareTo(training.getEndDate()) < 0)
			return trainingRepo.save(training);
		throw new InvalidRequestException("Error creating training! Kindly check your input data");
	}

	@Override
	public TrainingApply createTrainingApply(TrainingApply trainingApplication) {
		User user = trainingApplication.getUser();
		Training training = trainingApplication.getTraining();
		List<TrainingApply> applications = getTrainingApplications(training);
		for(TrainingApply application: applications) {
			if(application.getUser() == user)
				throw new InvalidRequestException("You can't apply more than once to the same training!!!");
		}
		return trainingApplyRepo.save(trainingApplication);
	}

	@Override
	public TrainingParticipant createTrainingParticipant(TrainingParticipant participant) {
		return trainingParticipantRepo.save(participant);
	}

	@Override
	public TrainingRequest createTrainingRequest(TrainingRequest trainingRequest) {
		return trainingRequestRepo.save(trainingRequest);
	}

	@Override
	public Training findTrainingById(int trainingId) {
		Optional<Training> optTraining = trainingRepo.findById(trainingId);
		
		if(optTraining.isEmpty())
			return null;
		return optTraining.get();
	}

	@Override
	public TrainingApply findApplicationById(int applicationId) {
		Optional<TrainingApply> optApplication = trainingApplyRepo.findById(applicationId);
		
		if(optApplication.isEmpty())
			return null;
		return optApplication.get();
	}

	@Override
	public TrainingRequest findRequestById(int requestId) {
		Optional<TrainingRequest> optRequest = trainingRequestRepo.findById(requestId);
		
		if(optRequest.isEmpty())
			return null;
		return optRequest.get();
	}

	@Override
	public List<Training> findTrainingByTopic(String topic) {
		return trainingRepo.findTrainingByName(topic);
	}

	@Override
	public List<User> getTrainingParticipants(Training training) {
		return trainingParticipantRepo.findParticipants(training);
	}

	@Override
	public List<Training> getUpcomingTrainings() {
		return trainingRepo.findUpcomingTrainings(Date.valueOf(LocalDate.now()));
	}

	@Override
	public List<Training> getOngoingTrainings() {
		return trainingRepo.findOngoingTrainings(Date.valueOf(LocalDate.now()));
	}

	@Override
	public List<Training> getPastTrainings() {
		return trainingRepo.findPastTrainings(Date.valueOf(LocalDate.now()));
	}
	
	@Override
	public List<Training> getAllTrainings() {
		return trainingRepo.findAll();
	}

	@Override
	public List<TrainingApply> getTrainingApplications(Training training) {
		return trainingApplyRepo.findApplications(training);
	}

	@Override
	public List<TrainingRequest> getTrainingRequests() {
		return trainingRequestRepo.findAll();
	}

	@Override
	public Training updateTraining(Training training) {
		Optional<Training> optTraining = trainingRepo.findById(training.getTrainingId());
		if(optTraining.isEmpty())
			return null;
		return trainingRepo.save(training);
	}

	@Override
	public TrainingApply updateTrainingApplication(TrainingApply trainingApplication) {
		Optional<TrainingApply> optApplication = trainingApplyRepo.findById(trainingApplication.getApplyId());
		if(optApplication.isEmpty())
			return null;
		return trainingApplyRepo.save(trainingApplication);
	}

	@Override
	public TrainingRequest updateTrainingRequest(TrainingRequest trainingRequest) {
		Optional<TrainingRequest> optRequest = trainingRequestRepo.findById(trainingRequest.getRequestId());
		if(optRequest.isEmpty())
			return null;
		return trainingRequestRepo.save(trainingRequest);
	}

	@Override
	public TrainingParticipant updateTrainingParticipant(TrainingParticipant participant) {
		Optional<TrainingParticipant> optParticipant = trainingParticipantRepo.findById(participant.getTpId());
		if(optParticipant.isEmpty())
			return null;
		return trainingParticipantRepo.save(participant);
	}
	
}