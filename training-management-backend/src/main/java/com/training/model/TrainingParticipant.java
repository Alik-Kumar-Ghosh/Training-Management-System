package com.training.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity
public class TrainingParticipant {
	@Id
	@SequenceGenerator(name = "tpidseq", initialValue = 1, allocationSize = 0)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tpidseq")
	private int tpId;
	@ManyToOne
	@JoinColumn(name = "trainingId")
	private Training training;
	@ManyToOne
	@JoinColumn(name = "participantId")
	private User participant;

	public TrainingParticipant() {
		super();
	}
	public TrainingParticipant(int tpId, Training training, User participant) {
		super();
		this.tpId = tpId;
		this.training = training;
		this.participant = participant;
	}

	public int getTpId() {
		return tpId;
	}
	public void setTpId(int tpId) {
		this.tpId = tpId;
	}
	public Training getTraining() {
		return training;
	}
	public void setTraining(Training training) {
		this.training = training;
	}
	public User getParticipant() {
		return participant;
	}
	public void setParticipant(User participant) {
		this.participant = participant;
	}

	@Override
	public String toString() {
		return "TrainingParticipant [tpId=" + tpId + ", training=" + training + ", participant=" + participant + "]";
	}
	
}