package com.training.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.training.model.Training;

@Repository
public interface TrainingRepo extends JpaRepository<Training, Integer> {
	
}