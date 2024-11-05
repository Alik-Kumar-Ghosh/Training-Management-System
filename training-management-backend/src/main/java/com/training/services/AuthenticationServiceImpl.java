package com.training.services;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.training.controller.ForbiddenException;
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

	@Override
	public User getLoggedInUser(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if(cookies == null)
			throw new ForbiddenException();
		int idx = cookies[0].getName().equals("userId") ? 0 : 1; 
		int userId = Integer.parseInt(cookies[idx].getValue());
		return userService.findById(userId);
	}
}