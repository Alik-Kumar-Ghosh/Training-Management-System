package com.training.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.training.model.User;
import com.training.services.AuthenticationService;
import com.training.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestParam String userName, @RequestParam String password) throws Exception {
		boolean isVerified = authenticationService.verifyPassword(userName, password);

		if (isVerified) {
			User user = userService.findByUserName(userName);
			if (user != null) {
				return ResponseEntity.ok(user.getUserType());
			} else {
				return ResponseEntity.status(404).body("User not found");
			}
		} else {
			throw new Exception("Invalid credentials");
		}
	}

	@GetMapping("/userType")
	public ResponseEntity<?> getUserType(@RequestParam int userId) {
		User user = userService.findById(userId);

		if (user != null) {
			return ResponseEntity.ok().body(user.getUserType());
		} else {
			throw new UserNotFoundException("User not found");
		}
	}

	@PostMapping("/createUser")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		User createdUser = userService.createUser(user);
		if (createdUser != null) {
			return ResponseEntity.ok(createdUser);
		} else {
			return ResponseEntity.status(400).body(null);
		}
	}

	@PutMapping("/updateUser")
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		User updatedUser = userService.updateUser(user);
		if (updatedUser != null) {
			return ResponseEntity.ok(updatedUser);
		} else {
			return ResponseEntity.status(404).body(null);
		}
	}
}
