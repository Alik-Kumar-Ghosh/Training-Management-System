package com.training.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.training.model.Training;
import com.training.model.TrainingApply;
import com.training.model.User;
import com.training.services.TrainingService;
import com.training.services.UserService;

@RestController
@RequestMapping("/api/training/apply")
public class TrainingApplyController {

    @Autowired
    private TrainingService trainingService;
    
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<TrainingApply> applyForTraining(@RequestBody TrainingApply trainingApplication) {
        TrainingApply createdApplication = trainingService.createTrainingApply(trainingApplication);
        return new ResponseEntity<>(createdApplication, HttpStatus.CREATED);
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<TrainingApply> getApplicationById(@PathVariable int applicationId) {
        TrainingApply trainingApplication = trainingService.findApplicationById(applicationId);
        return trainingApplication != null ? 
            new ResponseEntity<>(trainingApplication, HttpStatus.OK) :
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/training/{trainingId}")
    public ResponseEntity<List<TrainingApply>> getApplicationsForTraining(@PathVariable int trainingId) {
        Training training = trainingService.findTrainingById(trainingId);
        if (training == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<TrainingApply> applications = trainingService.getTrainingApplications(training);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TrainingApply>> getApplicationsByUser(@PathVariable int userId) {
        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<TrainingApply> applications = userService.getMyApplications(user);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }


}
