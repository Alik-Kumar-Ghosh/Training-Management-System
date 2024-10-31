package com.training.controller;

import com.training.model.Training;
import com.training.services.TrainingServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/trainings")
public class TrainingController {

    private final TrainingServiceImpl trainingService;

    @Autowired
    public TrainingController(TrainingServiceImpl trainingService) {
        this.trainingService = trainingService;
    }

    @GetMapping
    public List<Training> getAllTrainings() {
    	 List<Training> lstraining = trainingService.getAllTrainings();
    	 System.out.println(lstraining);
    	 return lstraining;
    }
}
