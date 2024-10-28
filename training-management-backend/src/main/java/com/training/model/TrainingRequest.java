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
public class TrainingRequest {
	@Id
	@SequenceGenerator(name = "reqidseq", initialValue = 101, allocationSize = 0)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reqidseq")
	private int requestId;
	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;
	private String trainingTopic;
	private String descrption;
	private String status;
	private Date requestDate;

	public TrainingRequest() {
		super();
	}
	public TrainingRequest(int requestId, User user, String trainingTopic, String descrption, String status, Date requestDate) {
		super();
		this.requestId = requestId;
		this.user = user;
		this.trainingTopic = trainingTopic;
		this.descrption = descrption;
		this.status = status;
		this.requestDate = requestDate;
	}

	public int getRequestId() {
		return requestId;
	}
	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getTrainingTopic() {
		return trainingTopic;
	}
	public void setTrainingTopic(String trainingTopic) {
		this.trainingTopic = trainingTopic;
	}
	public String getDescrption() {
		return descrption;
	}
	public void setDescrption(String descrption) {
		this.descrption = descrption;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getRequestDate() {
		return requestDate;
	}
	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}

	@Override
	public String toString() {
		return "TrainingRequest [requestId=" + requestId + ", user=" + user + ", trainingTopic=" + trainingTopic
				+ ", descrption=" + descrption + ", status=" + status + ", requestDate=" + requestDate + "]";
	}
}