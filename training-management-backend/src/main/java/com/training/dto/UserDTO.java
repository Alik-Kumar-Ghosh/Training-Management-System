package com.training.dto;

import java.sql.Date;

import com.training.model.User;

public class UserDTO {
	private int userId;
	private String name;
	private String userName;
	private String email;
	private String userType;
	private String phone;
	private Date dob;
	private Date doj;
	private String managerName;
	private int managerId;

	public UserDTO() {
		super();
	}
	public UserDTO(User user) {
		super();
		this.userId = user.getUserId();
		this.name = user.getName();
		this.userName = user.getUserName();
		this.email = user.getEmail();
		this.userType = user.getUserType();
		this.phone = user.getPhone();
		this.dob = user.getDob();
		this.doj = user.getDoj();
		this.managerName = user.getManager().getName();
		this.managerId = user.getManager().getUserId();
	}

	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public Date getDoj() {
		return doj;
	}
	public void setDoj(Date doj) {
		this.doj = doj;
	}
	public String getManagerName() {
		return managerName;
	}
	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}
	public int getManagerId() {
		return managerId;
	}
	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}

	@Override
	public String toString() {
		return "UserDTO [userId=" + userId + ", name=" + name + ", userName=" + userName + ", email=" + email
				+ ", userType=" + userType + ", phone=" + phone + ", dob=" + dob + ", doj=" + doj + ", managerId="
				+ managerId + ", managerName=" + managerName + "]";
	}	
}