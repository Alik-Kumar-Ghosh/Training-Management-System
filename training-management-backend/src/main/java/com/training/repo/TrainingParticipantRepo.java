package com.training.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.training.model.TrainingParticipant;

@Repository
public interface TrainingParticipantRepo extends JpaRepository<TrainingParticipant, Integer> {

}