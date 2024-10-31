package com.training.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.training.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
	@Query("select u from User u where u.name = :name")
	List<User> findByName(String name);
}