package com.training.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.training.model.Training;
import com.training.model.TrainingApply;
import com.training.services.TrainingService;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
public class TrainingApplyController {

    @Autowired
    private TrainingService trainingService;

    @GetMapping("/ongoing")
    public ResponseEntity<List<Training>> getOngoingTrainings() {
        List<Training> ongoingTrainings = trainingService.getOngoingTrainings();
        return ResponseEntity.ok(ongoingTrainings);
    }

    @GetMapping("/past")
    public ResponseEntity<List<Training>> getPastTrainings() {
        List<Training> pastTrainings = trainingService.getPastTrainings();
        return ResponseEntity.ok(pastTrainings);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Training>> getAvailableTrainings() {
        List<Training> availableTrainings = trainingService.getAllTrainings();
        return ResponseEntity.ok(availableTrainings);
    }

    @PostMapping("/apply/{trainingId}")
    public ResponseEntity<String> applyForTraining(@PathVariable int trainingId, @RequestBody TrainingApply trainingApplication) {
        try {
            trainingApplication.setApplyId(trainingId);
            TrainingApply savedApplication = trainingService.createTrainingApply(trainingApplication);

            if (savedApplication != null) {
                return ResponseEntity.ok("Successfully applied for training ID: " + trainingId);
            } else {
                return ResponseEntity.status(400).body("Failed to apply for training ID: " + trainingId);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error applying for training: " + e.getMessage());
        }
    }
}

 
