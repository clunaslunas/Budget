package org.trvlport.Database.budget.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.trvlport.Database.budget.entity.Month;
import org.trvlport.Database.budget.entity.Project;
import org.trvlport.Database.budget.entity.Projection;
import org.trvlport.Database.budget.repo.ProjectRepository;
import org.trvlport.Database.budget.repo.ProjectionRepository;

@Component
public class ProjectionService {
	
	ProjectionRepository projectionRepository;
	ProjectRepository projectRepository;
	
	@Autowired
	public ProjectionService(ProjectionRepository projectionRepository,
			ProjectRepository projectRepository) {
		this.projectionRepository = projectionRepository;
		this.projectRepository = projectRepository;
	}
	
	public Projection createProjection(Projection projection, String csr, long peopleId) {
		Projection existingProjection = projectionRepository.findById(projection.getId());
		Project projectToAdd = projectRepository.findByCsr(csr);
		
		if(existingProjection != null) {
			throw new RuntimeException("Projection already exists!");
		} else {
			projection.setProject(projectToAdd);
			projectionRepository.save(projection);
		}
		return projection;
	}
	
	public ArrayList<Projection> findAll() {
		return projectionRepository.findAll();
	}
	
	
	public ArrayList<Projection> findByProjectCsrAndMonth(String csr, Month month) {
		return this.projectionRepository.findByProjectCsrAndMonth(csr, month);
	}
	
	public List<Projection> findByCsr(String csr) {
		return this.projectionRepository.findByProjectCsr(csr);
	}
}
