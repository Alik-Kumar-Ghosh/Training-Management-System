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
public class Training {
	@Id
	@SequenceGenerator(name = "trainingidseq", initialValue = 1, allocationSize = 0)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "trainingidseq")
	private int trainingId;
	private Date startDate;
	private Date endDate;
	private String topic;
	@ManyToOne
	@JoinColumn(name = "trainerId")
	private User trainer;
	private String location;
	private String description;

	public Training() {
		super();
	}
	public Training(int trainingId, Date startDate, Date endDate, String topic, User trainer, String location, String description) {
		super();
		this.trainingId = trainingId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.topic = topic;
		this.trainer = trainer;
		this.location = location;
		this.description = description;
	}

	public int getTrainingId() {
		return trainingId;
	}
	public void setTrainingId(int trainingId) {
		this.trainingId = trainingId;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getTopic() {
		return topic;
	}
	public void setTopic(String topic) {
		this.topic = topic;
	}
	public User getTrainer() {
		return trainer;
	}
	public void setTrainer(User trainer) {
		this.trainer = trainer;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Training [trainingId=" + trainingId + ", startDate=" + startDate + ", endDate=" + endDate + ", topic="
				+ topic + ", trainer=" + trainer + ", location=" + location + ", description=" + description + "]";
	}
}