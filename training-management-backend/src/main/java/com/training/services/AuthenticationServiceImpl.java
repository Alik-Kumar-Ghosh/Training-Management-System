package com.training.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.training.model.User;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	UserService userService;

	@Override
	public boolean verifyPassword(String userName, String password) {
		User user = userService.findByUserName(userName);
		if(user == null)
			return false;
		String storedPassword = user.getPassword();
		return passwordEncoder.matches(password, storedPassword);
	}

	@Override
	public String hashPassword(String password) {
		return passwordEncoder.encode(password);
	}
}