package com.training.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.training.dto.LoginDTO;
import com.training.dto.UserDTO;
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
	public ResponseEntity<UserDTO> login(@RequestBody LoginDTO obj, HttpServletResponse response) {
		String userName=obj.getUserName();
		String password=obj.getPassword();
		System.out.println(obj);
		if(userName.isEmpty() || password.isEmpty())
			throw new InvalidRequestException("Please enter all the required fields");

		User user = userService.findByUserName(userName);
		if(user == null)
			throw new UserNotFoundException("No user found with username: " + userName);
		
		boolean isVerified = authenticationService.verifyPassword(userName, password);
		if(isVerified) {
			Cookie userId = new Cookie("userId", "" + user.getUserId());
			Cookie userType = new Cookie("userType", user.getUserType());

	        userId.setPath("/");
//	        userId.setMaxAge(7 * 24 * 60 * 60);
	        userId.setHttpOnly(false);
	        userId.setSecure(false);
	        userType.setPath("/");
//	        userType.setMaxAge(7 * 24 * 60 * 60);
	        userType.setHttpOnly(false);
	        userType.setSecure(false);
	        response.addCookie(userId);
			response.addCookie(userType);
			
			UserDTO dto = new UserDTO(user);
			return ResponseEntity.ok(dto);
		}
		else
			throw new InvalidRequestException("Incorrect username/password combination! Please try again.");
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletResponse response){
		Cookie userId = new Cookie("userId", null);
		Cookie userType = new Cookie("userType", null);
		
		userId.setPath("/");
        userId.setMaxAge(0);
        userId.setHttpOnly(false);
        userId.setSecure(false);
        userType.setPath("/");
        userType.setMaxAge(0);
        userType.setHttpOnly(false);
        userType.setSecure(false);
		response.addCookie(userId);
		response.addCookie(userType);
		
		return ResponseEntity.ok("Logout successful");
	}
	
	@GetMapping("/user/profile")
	public ResponseEntity<UserDTO> getProfile(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else {
			UserDTO dto = new UserDTO(user);
			return ResponseEntity.ok().body(dto);
		}
	}

	@GetMapping("/trainers")
	public ResponseEntity<List<UserDTO>> getAllTrainers(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);
		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		
		List<UserDTO> usersDTO = new ArrayList<>();
		List<User> users = userService.findAllTrainers();
		for(User trainer: users) {
			UserDTO dto = new UserDTO(trainer);
			usersDTO.add(dto);
		}
		return ResponseEntity.ok(usersDTO);
	}

	@GetMapping("/user/user-type")
	public ResponseEntity<String> getUserType(HttpServletRequest request) {
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else
			return ResponseEntity.ok().body(user.getUserType());
	}

	@PutMapping("/user/update-user")
	public ResponseEntity<UserDTO> updateUser(@RequestBody User obj, HttpServletRequest request) {
		String phone = obj.getPhone();
		String password = obj.getPassword();
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("No user found with given details");
		else {
			if(!password.isEmpty())
				user.setPassword(authenticationService.hashPassword(password));
			if(!phone.isEmpty())
				user.setPhone(phone);

			User updatedUser = userService.updateUser(user);
			UserDTO dto = new UserDTO(updatedUser);
			
			return ResponseEntity.ok(dto);
		}
	}

	@GetMapping("/trainer/past-trainings")
	public ResponseEntity<List<Training>> getTrainerPastTrainings(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);
		
		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		if(!user.getUserType().equalsIgnoreCase("trainer"))
			throw new InvalidRequestException("You don't have permissions to send this request");
		
		return ResponseEntity.ok(userService.getTrainerPastTrainings(user));
	}
	
	@GetMapping("/trainer/ongoing-trainings")
	public ResponseEntity<List<Training>> getTrainerOngoingTrainings(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);
		
		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		if(!user.getUserType().equalsIgnoreCase("trainer"))
			throw new InvalidRequestException("You don't have permissions to send this request");
		
		return ResponseEntity.ok(userService.getTrainerOngoingTrainings(user));
	}

	@GetMapping("/trainer/upcoming-trainings")
	public ResponseEntity<List<Training>> getTrainerUpcomingTrainings(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);
		
		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		if(!user.getUserType().equalsIgnoreCase("trainer"))
			throw new InvalidRequestException("You don't have permissions to send this request");
		
		return ResponseEntity.ok(userService.getTrainerUpcomingTrainings(user));
	}
		
	@GetMapping("/user/past-trainings")
	public ResponseEntity<List<Training>> getUserPastTrainings(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else
			return ResponseEntity.ok(userService.getMyPastTrainings(user));
	}

	@GetMapping("/user/ongoing-trainings")
	public ResponseEntity<List<Training>> getUserOngoingTrainings(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else
			return ResponseEntity.ok(userService.getMyOngoingTrainings(user));
	}

	@GetMapping("/user/upcoming-trainings")
	public ResponseEntity<List<Training>> getUserUpcomingTrainings(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else
			return ResponseEntity.ok(userService.getMyUpcomingTrainings(user));
	}

	@GetMapping("/user/applications")
	public ResponseEntity<List<TrainingApply>> getUserApplications(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else
			return ResponseEntity.ok(userService.getMyApplications(user));
	}

	@GetMapping("/user/requests")
	public ResponseEntity<List<TrainingRequest>> getUserRequests(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else
			return ResponseEntity.ok(userService.getMyRequests(user));
	}

	@GetMapping("/manager/pending-approvals")
	public ResponseEntity<List<TrainingApply>> getManagerPendingApprovals(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else
			return ResponseEntity.ok(userService.getPendingApplicationsManager(user));
	}

	@GetMapping("/admin/pending-approvals")
	public ResponseEntity<List<TrainingApply>> getAdminPendingApprovals(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else {
			if(user.getUserType().equalsIgnoreCase("admin"))
				return ResponseEntity.ok(userService.getPendingApplicationsAdmin());
			throw new InvalidRequestException("You don't have the permissions to send this request!!!");
		}
	}

	@GetMapping("/admin/pending-requests")
	public ResponseEntity<List<TrainingRequest>> getAdminPendingRequests(HttpServletRequest request){
		User user = authenticationService.getLoggedInUser(request);

		if(user == null)
			throw new UserNotFoundException("User not found with the given user id");
		else {
			if(user.getUserType().equalsIgnoreCase("admin"))
				return ResponseEntity.ok(userService.getPendingRequests());
			throw new InvalidRequestException("You don't have the permissions to send this request!!!");
		}
	}
}