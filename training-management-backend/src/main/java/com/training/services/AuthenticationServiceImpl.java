package com.training.services;

import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
	@Override
	public boolean verifyPassword(String password) {
		
		return false;
	}

	@Override
	public String hashPassword(String password) {
		
		return null;
	}
}