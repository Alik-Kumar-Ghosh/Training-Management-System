package com.training.model;

import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity
public class TrainingApply {
	@Id
	@SequenceGenerator(name = "applyidseq", initialValue = 1, allocationSize = 0)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "applyidseq")
	private int applyId;
	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;
	private String status;
	private Date applyDate;

	public TrainingApply() {
		super();
	}
	public TrainingApply(int applyId, User user, String status, Date applyDate) {
		super();
		this.applyId = applyId;
		this.user = user;
		this.status = status;
		this.applyDate = applyDate;
	}

	public int getApplyId() {
		return applyId;
	}
	public void setApplyId(int applyId) {
		this.applyId = applyId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}

	@Override
	public String toString() {
		return "TrainingApply [applyId=" + applyId + ", user=" + user + ", status=" + status + ", applyDate="
				+ applyDate + "]";
	}	
}