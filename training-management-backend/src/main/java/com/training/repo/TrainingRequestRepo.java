package com.training.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.training.model.TrainingRequest;

@Repository
public interface TrainingRequestRepo extends JpaRepository<TrainingRequest, Integer> {

}