package com.training.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.model.Training;
import com.training.model.TrainingApply;
import com.training.model.TrainingRequest;
import com.training.model.User;
import com.training.repo.TrainingApplyRepo;
import com.training.repo.TrainingParticipantRepo;
import com.training.repo.TrainingRepo;
import com.training.repo.TrainingRequestRepo;
import com.training.repo.UserRepo;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepo userRepo;
	@Autowired
	TrainingRepo trainingRepo;
	@Autowired
	TrainingParticipantRepo trainingParticipantRepo;
	@Autowired
	TrainingApplyRepo trainingApplyRepo;
	@Autowired
	TrainingRequestRepo trainingRequestRepo;

	@Override
	public User createUser(User user) {
		return userRepo.save(user);
	}

	@Override
	public User findById(int userId) {
		Optional<User> optUser = userRepo.findById(userId);
		if(optUser.isEmpty())
			return null;
		return optUser.get();
	}

	@Override
	public List<User> findByName(String name) {
		return userRepo.findByName(name);
	}

	@Override
	public User findByUserName(String userName) {
		Optional<User> optUser = userRepo.findByUserName(userName);
		if(optUser.isEmpty())
			return null;
		return optUser.get();
	}

	@Override
	public List<Training> getMyOngoingTrainings(User user) {
		List<Training> ongoingTrainings = trainingRepo.findOngoingTrainings(Date.valueOf(LocalDate.now()));
		List<Training> myTrainings = trainingParticipantRepo.findUserTrainings(user);
		
		myTrainings.retainAll(ongoingTrainings);
		return myTrainings;
	}

	@Override
	public List<Training> getMyUpcomingTrainings(User user) {
		List<Training> upcomingTrainings = trainingRepo.findUpcomingTrainings(Date.valueOf(LocalDate.now()));
		List<Training> myTrainings = trainingParticipantRepo.findUserTrainings(user);
		
		myTrainings.retainAll(upcomingTrainings);
		return myTrainings;
	}

	@Override
	public List<Training> getMyPastTrainings(User user) {
		List<Training> pastTrainings = trainingRepo.findPastTrainings(Date.valueOf(LocalDate.now()));
		List<Training> myTrainings = trainingParticipantRepo.findUserTrainings(user);
		
		myTrainings.retainAll(pastTrainings);
		return myTrainings;
	}

	@Override
	public List<TrainingApply> getPendingApplicationsManager(User user) {
		return trainingApplyRepo.findPendingApplicationsManager(user, "pending");
	}
	
	@Override
	public List<TrainingApply> getPendingApplicationsAdmin(){
		return trainingApplyRepo.findPendingApplicationsAdmin("approved");
	}

	@Override
	public List<TrainingRequest> getPendingRequests() {
		return trainingRequestRepo.findPendingRequests("pending");
	}

	@Override
	public List<TrainingApply> getMyApplications(User user) {
		return trainingApplyRepo.findMyApplications(user);
	}

	@Override
	public List<TrainingRequest> getMyRequests(User user) {
		return trainingRequestRepo.findMyRequests(user);
	}

	@Override
	public User updateUser(User user) {
		Optional<User> optUser = userRepo.findById(user.getUserId());
		if(optUser.isEmpty())
			return null;
		return userRepo.save(user);
	}
}