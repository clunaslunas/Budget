package org.trvlport.Database.budget.repo;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.trvlport.Database.budget.entity.Actual;

@CrossOrigin(origins="*", maxAge = 3600)
@RepositoryRestResource
public interface ActualRepository extends JpaRepository<Actual, Long>{
	Optional<Actual> findById(@Param("id") long id);
	Actual findByProjectCsr(String csr);
	
	ArrayList<Actual> findAll();
}
