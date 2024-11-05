package com.training.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.training.model.Training;
import com.training.model.TrainingApply;
import com.training.model.TrainingParticipant;
import com.training.model.User;
import com.training.services.AuthenticationService;
import com.training.services.TrainingService;

@RestController
public class TrainingApplyController {
    @Autowired
    private TrainingService trainingService;
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/apply/{trainingId}")
    public ResponseEntity<TrainingApply> apply(HttpServletRequest request, @RequestParam int trainingId){
    	User user = authenticationService.getLoggedInUser(request);
    	if(user == null)
    		throw new UserNotFoundException("User not found with the given user id");
    	
    	Training training = trainingService.findTrainingById(trainingId);
    	if(training == null)
    		throw new TrainingNotFoundException("No training found with given training id");
    	
    	try {
    		TrainingApply application = new TrainingApply(0, user, "Pending", Date.valueOf(LocalDate.now()), training);
    		TrainingApply trainingApply = trainingService.createTrainingApply(application);
    		return ResponseEntity.ok(trainingApply);
    	}catch(Exception e) {
    		throw new InvalidRequestException("Error applying for training! Kindly check your input data");
    	}
    }

    @GetMapping("/application/{applicationId}")
    public ResponseEntity<TrainingApply> getApplication(HttpServletRequest request, @RequestParam int applicationId){
    	TrainingApply application = trainingService.findApplicationById(applicationId);
    	User user = authenticationService.getLoggedInUser(request);

    	if(user == null)
    		throw new UserNotFoundException("User not found with the given user id");
    	if(application == null)
    		throw new ApplicationNotFoundException("Application with given id is not available");
    	if(user != application.getUser() && user != application.getUser().getManager() && !user.getUserType().equalsIgnoreCase("admin"))
    		throw new InvalidRequestException("You don't have permissions to send this request");
    	return ResponseEntity.ok(application);
    }

    @GetMapping("/applications/{trainingId}")
    public ResponseEntity<List<TrainingApply>> getTrainingApplications(HttpServletRequest request, @RequestParam int trainingId){
    	User user = authenticationService.getLoggedInUser(request);
    	if(user == null || !user.getUserType().equalsIgnoreCase("admin"))
    		throw new InvalidRequestException("You don't have permissions to send this request");

    	Training training = trainingService.findTrainingById(trainingId);
    	if(training == null)
    		throw new TrainingNotFoundException("No training found with given training id");

    	List<TrainingApply> applications = trainingService.getTrainingApplications(training);
    	return ResponseEntity.ok(applications);
    }

    @PutMapping("/update-application/{applicationId}")
    public ResponseEntity<TrainingApply> updateTrainingApplication(HttpServletRequest request, @RequestParam int applicationId,
    		@RequestParam String status) throws Exception{
    	User user = authenticationService.getLoggedInUser(request);
    	if(user == null)
    		throw new UserNotFoundException("No user found with user id");
    	TrainingApply application = trainingService.findApplicationById(applicationId);
    	if(application == null)
    		throw new ApplicationNotFoundException("No application found with given application id");

    	String applicationStatus = application.getStatus();
    	if(applicationStatus.equalsIgnoreCase("accepted") || applicationStatus.equalsIgnoreCase("rejected"))
    		throw new InvalidRequestException("You can't change the status of the application now!");

    	String userType = user.getUserType();
    	if(userType.equalsIgnoreCase("trainee"))
    		throw new InvalidRequestException("You don't have permissions to send this request");
    	if(application.getUser().getManager() != user && !userType.equalsIgnoreCase("admin"))
    		throw new InvalidRequestException("You don't have permissions to send this request");
    	if(application.getUser().getManager() == user && !applicationStatus.equalsIgnoreCase("pending"))
    		throw new InvalidRequestException("You don't have permissions to send this request");
    	if(userType.equalsIgnoreCase("admin") && !applicationStatus.equalsIgnoreCase("approved"))
    		throw new InvalidRequestException("You don't have permissions to send this request");

    	application.setStatus(status);
    	if(status.equalsIgnoreCase("accepted")) {
    		try {
    			TrainingParticipant participant = new TrainingParticipant(0, application.getTraining(), application.getUser());
    			trainingService.createTrainingParticipant(participant);
    		}catch(Exception e) {
    			throw new Exception("Some error occurred: " + e.getMessage());
    		}
    	}

    	TrainingApply updatedApplication = trainingService.updateTrainingApplication(application);
    	return ResponseEntity.ok(updatedApplication);
    }
}