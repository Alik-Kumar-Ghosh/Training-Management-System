package com.training.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<List<User>> getParticipants(@RequestParam("trainingId") int trainingId) {
		Training training = trainingService.findTrainingById(trainingId);
		if (training != null) {
			List<User> participants = trainingService.getTrainingParticipants(training);
			return new ResponseEntity<>(participants, HttpStatus.OK);
		} else {
			throw new TrainingNotFoundException("Training not found with id: " + trainingId);
		}
	}

	@PostMapping("/training/participants")
	public ResponseEntity<TrainingParticipant> addParticipant(@RequestParam("trainingId") int trainingId,
			@RequestParam("userId") int userId) {
		Training training = trainingService.findTrainingById(trainingId);
		User user = userService.findById(userId);
		if (training != null && user != null) {
			TrainingParticipant participant = new TrainingParticipant();
			participant.setTraining(training);
			participant.setParticipant(user);
			TrainingParticipant createdParticipant = trainingService.createTrainingParticipant(participant);
			return new ResponseEntity<>(createdParticipant, HttpStatus.CREATED);
		} else if (training == null) {
			throw new TrainingNotFoundException("Training not found with id: " + trainingId);
		} else {
			throw new UserNotFoundException("User not found with id: " + userId);
		}
	}
}