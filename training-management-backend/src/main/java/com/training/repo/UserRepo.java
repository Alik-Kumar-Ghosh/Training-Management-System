package com.training.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.training.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
	@Query("select u from User u where u.name = :name")
	List<User> findByName(String name);

	@Query("select u from User u where u.userName = :userName")
	Optional<User> findByUserName(String userName);
}