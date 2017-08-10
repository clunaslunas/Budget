package org.trvlport.Database.budget.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.trvlport.Database.budget.entity.Portfolio;

@CrossOrigin(origins="*", maxAge = 3600)
@RepositoryRestResource
public interface PortfolioRepository extends JpaRepository<Portfolio, Long>{
	Optional<Portfolio> findById(@Param("id")long id);
	
	Portfolio findByPortfolioName(@Param("portfolioName")String portfolioName);
	
	List<Portfolio> findAll();
	
}
