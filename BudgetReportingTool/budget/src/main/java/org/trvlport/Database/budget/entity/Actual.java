package org.trvlport.Database.budget.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class, 
		  property = "id")
public class Actual {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="project_id")
	private Project project;
	
	@Enumerated(EnumType.STRING)
	private Month monthNumber;
	
	private BigDecimal total;
	
	private BigDecimal capEx;

	public Actual() {
	}

	public Actual(Project project, Month monthNumber, BigDecimal total, BigDecimal capEx) {
		super();
		this.project = project;
		this.monthNumber = monthNumber;
		this.total = total;
		this.capEx = capEx;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Month getMonthNumber() {
		return monthNumber;
	}

	public void setMonthNumber(Month monthNumber) {
		this.monthNumber = monthNumber;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public BigDecimal getCapEx() {
		return capEx;
	}

	public void setCapEx(BigDecimal capEx) {
		this.capEx = capEx;
	}
	
}
