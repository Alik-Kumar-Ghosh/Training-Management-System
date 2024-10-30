package com.training.services;

import java.util.List;

import org.springframework.stereotype.Service;
import com.training.model.Training;
import com.training.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Override
	public List<Training> getMyOngoingTrainings(User user) {
		return null;
	}

	@Override
	public List<Training> getMyUpcomingTrainings(User user) {
		return null;
	}

	@Override
	public List<Training> getMyPastTrainings(User user) {
		return null;
	}
}