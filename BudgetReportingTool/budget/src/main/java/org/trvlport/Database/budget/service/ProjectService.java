package org.trvlport.Database.budget.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.trvlport.Database.budget.entity.Portfolio;
import org.trvlport.Database.budget.entity.Project;
import org.trvlport.Database.budget.repo.PortfolioRepository;
import org.trvlport.Database.budget.repo.ProjectRepository;

@Component
public class ProjectService {
	
	ProjectRepository projectRepository;
	PortfolioRepository portfolioRepository;
	
	@Autowired
	ProjectService(ProjectRepository projectRepository, PortfolioRepository portfolioRepository) {
		this.projectRepository = projectRepository;
		this.portfolioRepository = portfolioRepository;
	}
	public Project createProject(Project project, String portfolioName) {
		Project projectToCreate = projectRepository.findByCsr(project.getCsr());
		Portfolio portfolio = portfolioRepository.findByPortfolioName(portfolioName);
		if(projectToCreate != null) {
			throw new RuntimeException("Project already exists!");
		} else {
			project.setPortfolio(portfolio);
			projectRepository.save(project);
		}
		return project;
	}
	public Project addProject(Project project) {
		Project projectToAdd = projectRepository.findByCsr(project.getCsr());
		if(projectToAdd != null) {
			throw new RuntimeException("Project already exists!");
		} else {
			projectRepository.save(project);
		}
		return project;
	}
}
