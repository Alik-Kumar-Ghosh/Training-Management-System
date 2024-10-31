package com.training.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.training.model.Training;
import com.training.model.TrainingApply;
import com.training.model.User;

@Repository
public interface TrainingApplyRepo extends JpaRepository<TrainingApply, Integer> {
	@Query("select t from TrainingApply t where t.training = :training")
	List<TrainingApply> findApplications(Training training);

	@Query("select t from TrainingApply t where t.status = :status and t.user.getManager() = :user")
	List<TrainingApply> findPendingApplicationsManager(User user, String status);

	@Query("select t from TrainingApply t where t.status = :status")
	List<TrainingApply> findPendingApplicationsAdmin(String status);

	@Query("select t from TrainingApply t where t.user = :user")
	List<TrainingApply> findMyApplications(User user);
}