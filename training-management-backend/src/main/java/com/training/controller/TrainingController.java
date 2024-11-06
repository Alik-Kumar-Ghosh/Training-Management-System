package com.training.controller;

import java.sql.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.training.model.Training;
import com.training.model.User;
import com.training.services.AuthenticationService;
import com.training.services.TrainingService;
import com.training.services.UserService;

@RestController
@RequestMapping("/training")
public class TrainingController {
	@Autowired
    private TrainingService trainingService;
	@Autowired
	private UserService userService;
	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping("/create")
	public ResponseEntity<Training> createTraining(HttpServletRequest request, @RequestParam Date startDate, @RequestParam Date endDate,
			@RequestParam String topic, @RequestParam String trainerUserName, @RequestParam String location, @RequestParam String description){

		User user = authenticationService.getLoggedInUser(request);
		if(user == null || !user.getUserType().equalsIgnoreCase("admin"))
			throw new InvalidRequestException("You don't have the permissions to send this request!!!");

		try {
			User trainer = userService.findByUserName(trainerUserName);
			if(trainer == null || !trainer.getUserType().equalsIgnoreCase("trainer"))
				throw new UserNotFoundException("Invalid trainer details!!!");

			Training training = new Training(0, startDate, endDate, topic, trainer, location, description);
			Training createdTraining = trainingService.createTraining(training);
			return ResponseEntity.ok(createdTraining);
		}catch(Exception e) {
			throw new InvalidRequestException("Error creating training! Kindly check your input data");
		}
	}

	@GetMapping()
	public ResponseEntity<Training> getTrainingById(@RequestParam int trainingId){
		Training training = trainingService.findTrainingById(trainingId);

		if(training == null)
			throw new TrainingNotFoundException("No such training found!!!");
		return ResponseEntity.ok(training);
	}

	@GetMapping("/topic")
	public ResponseEntity<List<Training>> getTrainingsByTopic(@RequestParam String topic){
		if(topic.isEmpty())
			throw new InvalidRequestException("Topic can't be null!");

		List<Training> trainings = trainingService.findTrainingByTopic(topic);
		return ResponseEntity.ok(trainings);
	}

	@GetMapping("/past")
    public ResponseEntity<List<Training>> getPastTrainings(){
        List<Training> pastTrainings = trainingService.getPastTrainings();
        return ResponseEntity.ok(pastTrainings);
    }

	@GetMapping("/ongoing")
    public ResponseEntity<List<Training>> getOngoingTrainings(){
        List<Training> ongoingTrainings = trainingService.getOngoingTrainings();
        return ResponseEntity.ok(ongoingTrainings);
    }

	@GetMapping("/upcoming")
	public ResponseEntity<List<Training>> getUpcomingTrainings(){
		List<Training> upcomingTrainings = trainingService.getUpcomingTrainings();
		return ResponseEntity.ok(upcomingTrainings);
	}

    @GetMapping("/all")
    public ResponseEntity<List<Training>> getAllTrainings(){
    	 List<Training> trainings = trainingService.getAllTrainings();
    	 return ResponseEntity.ok(trainings);
    }

    @PutMapping("/update-training")
    public ResponseEntity<Training> updateTraining(HttpServletRequest request, @RequestBody Training updateTraining){
    	User user = authenticationService.getLoggedInUser(request);
		if(user == null || !user.getUserType().equalsIgnoreCase("admin"))
			throw new InvalidRequestException("You don't have the permissions to send this request!!!");
    	
    	Training training = trainingService.findTrainingById(updateTraining.getTrainingId());
    	if(training == null)
    		throw new TrainingNotFoundException("No training found with given training id");
    	
    	if(updateTraining.getStartDate() != null)
    		training.setStartDate(updateTraining.getStartDate());
    	if(updateTraining.getEndDate() != null)
    		training.setEndDate(updateTraining.getEndDate());
    	if(!updateTraining.getTopic().isEmpty())
    		training.setTopic(updateTraining.getTopic());
    	if(!updateTraining.getTrainer().getUserName().isEmpty()) {
    		User trainer = userService.findByUserName(updateTraining.getTrainer().getUserName());
    		if(trainer == null || !trainer.getUserType().equalsIgnoreCase("trainer"))
    			throw new UserNotFoundException("No trainer found with given username");
    		
    		training.setTrainer(trainer);
    	}
    	if(!updateTraining.getLocation().isEmpty())
    		training.setLocation(updateTraining.getLocation());
    	if(!updateTraining.getDescription().isEmpty())
    		training.setDescription(updateTraining.getDescription());
    	
    	Training updatedTraining = trainingService.updateTraining(training);
    	
    	return ResponseEntity.ok(updatedTraining);
    }
}