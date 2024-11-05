package com.training.services;

import javax.servlet.http.HttpServletRequest;
import com.training.model.User;

public interface AuthenticationService {
	boolean verifyPassword(String userName, String password);
	String hashPassword(String password);
	User getLoggedInUser(HttpServletRequest request);
}