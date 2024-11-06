package com.training.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {
	@Id
	@SequenceGenerator(name = "useridseq", initialValue = 101, allocationSize = 0)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "useridseq")
	private int userId;
	private String name;
	@Column(unique = true, nullable = false)
	private String userName;
	private String email;
	private String userType;
	private String phone;
	private Date dob;
	private Date doj;
	@JsonIgnore
	private String password;
	@ManyToOne
	@JoinColumn(name = "managerId")
	private User manager;

	public User() {
		super();
	}
	public User(int userId, String name, String userName, String email, String userType, String phone, Date dob, Date doj, String password, User manager) {
		super();
		this.userId = userId;
		this.name = name;
		this.userName = userName;
		this.email = email;
		this.userType = userType;
		this.phone = phone;
		this.dob = dob;
		this.doj = doj;
		this.password = password;
		this.manager = manager;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public User getManager() {
		return manager;
	}
	public void setManager(User manager) {
		this.manager = manager;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", name=" + name + ", userName=" + userName + ", email=" + email
				+ ", userType=" + userType + ", phone=" + phone + ", dob=" + dob + ", doj=" + doj + ", password="
				+ password + ", manager=" + manager + "]";
	}
}