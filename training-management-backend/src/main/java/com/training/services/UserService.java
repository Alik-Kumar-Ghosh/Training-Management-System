package com.training.services;

import java.util.List;
import com.training.model.Training;
import com.training.model.User;

public interface UserService {
	List<Training> getMyOngoingTrainings(User user);
	List<Training> getMyUpcomingTrainings(User user);
	List<Training> getMyPastTrainings(User user);
}