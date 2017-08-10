package org.trvlport.Database.budget.repo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.trvlport.Database.budget.entity.Month;
import org.trvlport.Database.budget.entity.Projection;

@CrossOrigin(origins="*", maxAge = 3600)
@RepositoryRestResource
public interface ProjectionRepository extends JpaRepository<Projection, Long>{
	Projection findById(long id);
	
	ArrayList<Projection> findAll();
	
	ArrayList<Projection> findByProjectCsrAndMonth(String csr, Month month);
	
	List<Projection> findByProjectCsr(String csr);
	
	
}
