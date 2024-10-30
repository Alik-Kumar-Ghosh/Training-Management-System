package com.training.services;

public interface AuthenticationService {
	boolean verifyPassword(String password);
	String hashPassword(String password);
}