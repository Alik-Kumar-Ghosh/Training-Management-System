package com.training.dto;

public class LoginDTO {
	private String userName;
	private String password;
	private String newPassword;
	private String phone;

	public LoginDTO(){
		super();
	}
	public LoginDTO(String userName, String password, String newPassword, String phone) {
		this.userName = userName;
		this.password = password;
		this.newPassword = newPassword;
		this.phone = phone;
	}

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
}