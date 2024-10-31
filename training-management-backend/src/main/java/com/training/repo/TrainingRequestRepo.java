package com.training.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.training.model.TrainingRequest;
import com.training.model.User;

@Repository
public interface TrainingRequestRepo extends JpaRepository<TrainingRequest, Integer> {
	@Query("select t from TrainingRequest t where t.status = :status")
	List<TrainingRequest> findPendingRequests(String status);

	@Query("select t from TrainingRequest t where t.user = :user")
	List<TrainingRequest> findMyRequests(User user);
}