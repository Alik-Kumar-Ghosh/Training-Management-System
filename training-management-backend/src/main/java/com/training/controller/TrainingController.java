package com.training.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.training.model.Training;
import com.training.services.TrainingService;

@RestController
@RequestMapping("/trainings")
public class TrainingController {
	@Autowired
    private TrainingService trainingService;

    @GetMapping
    public List<Training> getAllTrainings() {
    	 List<Training> trainings = trainingService.getAllTrainings();
    	 System.out.println(trainings);
    	 return trainings;
    }
}
