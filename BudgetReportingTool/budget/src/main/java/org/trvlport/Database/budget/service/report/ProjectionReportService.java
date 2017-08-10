package org.trvlport.Database.budget.service.report;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.trvlport.Database.budget.entity.Portfolio;
import org.trvlport.Database.budget.entity.Project;
import org.trvlport.Database.budget.entity.report.PersonMap;
import org.trvlport.Database.budget.entity.report.ProjectionReport;
import org.trvlport.Database.budget.entity.Person;
import org.trvlport.Database.budget.entity.Month;
import org.trvlport.Database.budget.service.PortfolioService;

@Component
public class ProjectionReportService {
	
	private PortfolioService portfolioService;
	private List<ProjectionReport> projectionReports = new ArrayList<ProjectionReport>();
	private final BigDecimal MONTHLY_HOURS = new BigDecimal("168");
	
	@Autowired
	public ProjectionReportService(PortfolioService portfolioService) {
		this.portfolioService = portfolioService;
	}
	
	public ProjectionReport getProjectionReport() {
		List<PersonMap> personMaps = new ArrayList<PersonMap>();
		
		portfolioService.findAll().stream().forEach(portfolio ->{
			String portfolioName = portfolio.getPortfolioName();
			portfolio.getProjects().stream().forEach(project -> {
				String projectName = project.getCsr() + " : " + project.getDescription();
				HashMap<Month, BigDecimal> monthlySpending = new HashMap<Month, BigDecimal>();
				project.getProjections().stream().forEach(projection ->{
					
					Person person = projection.getPerson();
					BigDecimal hourlyRate = person.getRate().getHourlyRate();
					BigDecimal allocation = projection.getPercentAllocation();
					String name = projection.getPerson().getFirstName() + " " + projection.getPerson().getLastName();
					BigDecimal monthlyRate = MONTHLY_HOURS.multiply(hourlyRate).multiply(allocation);
					Month month = projection.getMonth();
					monthlySpending.put(month, monthlyRate);
					PersonMap personMapToAdd = new PersonMap(name, monthlySpending);
					personMaps.add(personMapToAdd);
				});
			});
		});
		return null;
	}
	
	

}
