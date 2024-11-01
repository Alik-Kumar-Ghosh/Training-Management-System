package com.training.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.training.model.Training;
import com.training.model.TrainingParticipant;
import com.training.model.User;
import com.training.services.TrainingService;
import com.training.services.UserService;

@RestController
public class TrainingParticipantController {

	@Autowired
	private TrainingService trainingService;
	@Autowired
	private UserService userService;

	@GetMapping("/training/participants")
	public List<User> getParticipants(@RequestParam("training") Training training) {
		return trainingService.getTrainingParticipants(training);
	}

	@PostMapping("/training/participants")
	public TrainingParticipant addParticipant(@RequestParam("trainingId") int trainingId,
			@RequestParam("userId") int userId) {
		Training training = trainingService.findTrainingById(trainingId);
		User user = userService.findById(userId);
		if (training != null && user != null) {
			TrainingParticipant participant = new TrainingParticipant();
			participant.setTraining(training);
			participant.setParticipant(user);
			return trainingService.createTrainingParticipant(participant);
		} else {
			throw new IllegalArgumentException("Invalid training or user ID");
		}
	}

}