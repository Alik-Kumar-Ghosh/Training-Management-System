package com.training.repo;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.training.model.Training;

@Repository
public interface TrainingRepo extends JpaRepository<Training, Integer> {
	@Query("select t from Training t where t.topic = :topic")
	List<Training> findTrainingByName(String topic);

	@Query("select t from Training t where t.startDate > :date")
	List<Training> findUpcomingTrainings(Date date);

	@Query("select t from Training t where t.startDate <= :date and t.endDate >= :date")
	List<Training> findOngoingTrainings(Date date);

	@Query("select t from Training t where t.endDate < :date")
	List<Training> findPastTrainings(Date date);
}