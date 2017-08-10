package org.trvlport.Database.budget.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.trvlport.Database.budget.entity.Project;

@CrossOrigin(origins="*", maxAge = 3600)
@RepositoryRestResource
public interface ProjectRepository extends JpaRepository<Project, Long>{
	Project findByCsr(String csr);
}
