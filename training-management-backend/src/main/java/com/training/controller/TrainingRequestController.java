package com.training.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.training.model.TrainingRequest;
import com.training.model.User;
import com.training.services.AuthenticationService;
import com.training.services.TrainingService;
import com.training.services.UserService;
@CrossOrigin(
	    origins = {
	        "http://localhost:3000"
	        },
	    allowCredentials = "true",
	    methods = {
	                RequestMethod.OPTIONS,
	                RequestMethod.GET,
	                RequestMethod.PUT,
	                RequestMethod.DELETE,
	                RequestMethod.POST
	})
@RestController
public class TrainingRequestController {
	@Autowired
	TrainingService trainingService;
	@Autowired
	UserService userService;
	@Autowired
	AuthenticationService authenticationService;

	@PostMapping("/request-training")
	public ResponseEntity<TrainingRequest> requestNewTraining(HttpServletRequest request, @RequestParam String topic, 
			@RequestParam String description){
		
		User user = authenticationService.getLoggedInUser(request);
		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		
		try {
			TrainingRequest trainingRequest = new TrainingRequest(0, user, topic, description, "Pending", Date.valueOf(LocalDate.now()));
			TrainingRequest newTrainingRequest = trainingService.createTrainingRequest(trainingRequest);
			return ResponseEntity.ok(newTrainingRequest);
		}catch(Exception e) {
			throw new InvalidRequestException("Request can't be raised! Kindly check your input data.");
		}
	}

	@GetMapping("/request/{requestId}")
	public ResponseEntity<TrainingRequest> getTrainingRequest(HttpServletRequest request, @RequestParam int requestId){
		TrainingRequest trainingRequest = trainingService.findRequestById(requestId);
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		if(trainingRequest == null)
			throw new ApplicationNotFoundException("Training request with given id is not available");
		if(trainingRequest.getUser() != user && !user.getUserType().equalsIgnoreCase("admin"))
			throw new InvalidRequestException("You don't have permissions to send this request");

		return ResponseEntity.ok(trainingRequest);
	}

	@GetMapping("/request/all")
	public ResponseEntity<List<TrainingRequest>> getAllRequests(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);
		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		if(!user.getUserType().equalsIgnoreCase("admin"))
			throw new InvalidRequestException("You don't have permissions to send this request");

		List<TrainingRequest> requests = trainingService.getTrainingRequests();
		return ResponseEntity.ok(requests);
	}

	@PutMapping("/update-training")
	public ResponseEntity<TrainingRequest> updateTraining(HttpServletRequest request, @RequestParam int requestId,
			@RequestParam String status) throws Exception{
		User user = authenticationService.getLoggedInUser(request);
		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		if(!user.getUserType().equalsIgnoreCase("admin"))
			throw new InvalidRequestException("You don't have permissions to send this request");

		TrainingRequest trainingRequest = trainingService.findRequestById(requestId);
		if(trainingRequest == null)
			throw new ApplicationNotFoundException("Training request with given id is not available");
		if(!trainingRequest.getStatus().equalsIgnoreCase("pending"))
			throw new InvalidRequestException("You can't change the status of the request now!");

		trainingRequest.setStatus(status);
		try {
			TrainingRequest updatedRequest = trainingService.updateTrainingRequest(trainingRequest);
			return ResponseEntity.ok(updatedRequest);
		}catch(Exception e) {
			throw new Exception("Some error occurred: " + e.getMessage());
		}
	}
}