package com.training.services;

public interface AuthenticationService {
	boolean verifyPassword(String userName, String password);
	String hashPassword(String password);
}