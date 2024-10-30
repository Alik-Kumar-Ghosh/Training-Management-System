package com.training.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.training.model.Training;
import com.training.model.TrainingParticipant;
import com.training.model.User;

@Repository
public interface TrainingParticipantRepo extends JpaRepository<TrainingParticipant, Integer> {
	@Query("select t.participant from TrainingParticipant t where t.training = :training")
	List<User> findParticipants(Training training);
}