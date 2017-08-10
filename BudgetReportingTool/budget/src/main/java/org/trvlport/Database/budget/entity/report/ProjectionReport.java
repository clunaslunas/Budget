package org.trvlport.Database.budget.entity.report;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.trvlport.Database.budget.entity.Month;
import org.trvlport.Database.budget.entity.Person;
import org.trvlport.Database.budget.entity.Portfolio;
import org.trvlport.Database.budget.entity.Project;

public class ProjectionReport {
	
	private HashMap<String, ProjectMap> projectionMap = new HashMap<String, ProjectMap>();

	public ProjectionReport(HashMap<String, ProjectMap> projectionMap) {
		super();
		this.projectionMap = projectionMap;
	}

	public HashMap<String, ProjectMap> getProjectionMap() {
		return projectionMap;
	}

	public void setProjectionMap(HashMap<String, ProjectMap> projectionMap) {
		this.projectionMap = projectionMap;
	}	
}
