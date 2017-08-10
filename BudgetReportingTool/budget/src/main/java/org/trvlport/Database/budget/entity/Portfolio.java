package org.trvlport.Database.budget.entity;

import java.math.BigDecimal;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class, 
		  property = "id")
public class Portfolio {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String year;
	
	private String portfolioName;
	
	@Enumerated(EnumType.STRING)
	private PortfolioType portfolioType;
	
	private BigDecimal annualBudget;
	
	@OneToMany(mappedBy="portfolio", cascade = CascadeType.ALL)
	private Set<Project> projects;
	

	public Portfolio() {
	}
	
	public Portfolio(String year, String portfolioName, PortfolioType portfolioType, BigDecimal annualBudget,
			Set<Project> projects) {
		super();
		this.year = year;
		this.portfolioName = portfolioName;
		this.portfolioType = portfolioType;
		this.annualBudget = annualBudget;
		this.projects = projects;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	
	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getPortfolioName() {
		return portfolioName;
	}

	public void setPortfolioName(String portfolioName) {
		this.portfolioName = portfolioName;
	}

	public PortfolioType getPortfolioType() {
		return portfolioType;
	}

	public void setPortfolioType(PortfolioType portfolioType) {
		this.portfolioType = portfolioType;
	}

	public BigDecimal getAnnualBudget() {
		return annualBudget;
	}

	public void setAnnualBudget(BigDecimal annualBudget) {
		this.annualBudget = annualBudget;
	}

	public Set<Project> getProjects() {
		return projects;
	}

	public void setProjects(Set<Project> projects) {
		this.projects = projects;
	}
}
