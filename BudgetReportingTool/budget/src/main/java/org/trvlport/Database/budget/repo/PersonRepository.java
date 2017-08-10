package org.trvlport.Database.budget.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.trvlport.Database.budget.entity.Person;

@CrossOrigin(origins="*", maxAge = 3600)
@RepositoryRestResource
public interface PersonRepository extends JpaRepository<Person, Long> {
	Optional<Person> findById(@Param("id")long id);
	Person findByIdAndLastName(@Param("id")long id, @Param("lastName") String lastName);
}
