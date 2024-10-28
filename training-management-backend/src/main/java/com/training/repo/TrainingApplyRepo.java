package com.training.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.training.model.TrainingApply;

@Repository
public interface TrainingApplyRepo extends JpaRepository<TrainingApply, Integer> {

}