package com.training.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.training.model.Training;
import com.training.model.TrainingApply;
import com.training.model.TrainingRequest;
import com.training.model.User;
import com.training.services.AuthenticationService;
import com.training.services.UserService;

@RestController
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestParam String userName, @RequestParam String password) {
		if(userName.isEmpty() || password.isEmpty())
			throw new InvalidRequestException("Please enter all the required fields");

		User user = userService.findByUserName(userName);
		if(user == null)
			throw new UserNotFoundException("No user found with username: " + userName);
		
		boolean isVerified = authenticationService.verifyPassword(userName, password);
		if(isVerified)
			return ResponseEntity.ok(user);
		else
			throw new InvalidRequestException("Incorrect username/password combination! Please try again.");
	}
	
	@GetMapping("/user/profile")
	public ResponseEntity<User> getProfile(@RequestParam int userId){
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else
			return ResponseEntity.ok().body(user);
	}

	@GetMapping("/user/user-type")
	public ResponseEntity<String> getUserType(@RequestParam int userId) {
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else
			return ResponseEntity.ok().body(user.getUserType());
	}

	@PutMapping("/user/update-user")
	public ResponseEntity<User> updateUser(@RequestParam int userId, @RequestParam String phone, @RequestParam String password) {
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("No user found with given details");
		else {
			if(!password.isEmpty())
				user.setPassword(authenticationService.hashPassword(password));
			if(!phone.isEmpty())
				user.setPhone(phone);

			userService.updateUser(user);
			return ResponseEntity.ok(user);
		}
	}

	@GetMapping("/trainer/past-trainings")
	public ResponseEntity<List<Training>> getTrainerPastTrainings(@RequestParam int userId){
		User user = userService.findById(userId);
		
		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		if(!user.getUserType().equalsIgnoreCase("trainer"))
			throw new InvalidRequestException("You don't have permissions to send this request");
		
		return ResponseEntity.ok(userService.getTrainerPastTrainings(user));
	}
	
	@GetMapping("/trainer/ongoing-trainings")
	public ResponseEntity<List<Training>> getTrainerOngoingTrainings(@RequestParam int userId){
		User user = userService.findById(userId);
		
		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		if(!user.getUserType().equalsIgnoreCase("trainer"))
			throw new InvalidRequestException("You don't have permissions to send this request");
		
		return ResponseEntity.ok(userService.getTrainerOngoingTrainings(user));
	}

	@GetMapping("/trainer/upcoming-trainings")
	public ResponseEntity<List<Training>> getTrainerUpcomingTrainings(@RequestParam int userId){
		User user = userService.findById(userId);
		
		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		if(!user.getUserType().equalsIgnoreCase("trainer"))
			throw new InvalidRequestException("You don't have permissions to send this request");
		
		return ResponseEntity.ok(userService.getTrainerUpcomingTrainings(user));
	}
		
	@GetMapping("/user/past-trainings")
	public ResponseEntity<List<Training>> getUserPastTrainings(@RequestParam int userId){
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		else
			return ResponseEntity.ok(userService.getMyPastTrainings(user));
	}

	@GetMapping("/user/ongoing-trainings")
	public ResponseEntity<List<Training>> getUserOngoingTrainings(@RequestParam int userId){
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		else
			return ResponseEntity.ok(userService.getMyOngoingTrainings(user));
	}

	@GetMapping("/user/upcoming-trainings")
	public ResponseEntity<List<Training>> getUserUpcomingTrainings(@RequestParam int userId){
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		else
			return ResponseEntity.ok(userService.getMyUpcomingTrainings(user));
	}

	@GetMapping("/user/applications")
	public ResponseEntity<List<TrainingApply>> getUserApplications(@RequestParam int userId){
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		else
			return ResponseEntity.ok(userService.getMyApplications(user));
	}

	@GetMapping("/user/requests")
	public ResponseEntity<List<TrainingRequest>> getUserRequests(@RequestParam int userId){
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		else
			return ResponseEntity.ok(userService.getMyRequests(user));
	}

	@GetMapping("/manager/pending-approvals")
	public ResponseEntity<List<TrainingApply>> getManagerPendingApprovals(@RequestParam int userId){
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		else
			return ResponseEntity.ok(userService.getPendingApplicationsManager(user));
	}

	@GetMapping("/admin/pending-approvals")
	public ResponseEntity<List<TrainingApply>> getAdminPendingApprovals(@RequestParam int userId){
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		else {
			if(user.getUserType().equalsIgnoreCase("admin"))
				return ResponseEntity.ok(userService.getPendingApplicationsAdmin());
			throw new InvalidRequestException("You don't have the permissions to send this request!!!");
		}
	}

	@GetMapping("/admin/pending-requests")
	public ResponseEntity<List<TrainingRequest>> getAdminPendingRequests(@RequestParam int userId){
		User user = userService.findById(userId);

		if(user == null)
			throw new UserNotFoundException("No user found with user id: " + userId);
		else {
			if(user.getUserType().equalsIgnoreCase("admin"))
				return ResponseEntity.ok(userService.getPendingRequests());
			throw new InvalidRequestException("You don't have the permissions to send this request!!!");
		}
	}
}