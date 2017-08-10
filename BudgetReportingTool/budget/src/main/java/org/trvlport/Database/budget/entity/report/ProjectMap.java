package org.trvlport.Database.budget.entity.report;

import java.util.ArrayList;
import java.util.List;

import org.trvlport.Database.budget.entity.Person;

public class ProjectMap {
	
	private String project;
	private List<PersonMap> personMaps = new ArrayList<PersonMap>();
	
	public ProjectMap(String project, List<PersonMap> personMaps) {
		this.project = project;
		this.personMaps = personMaps;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public List<PersonMap> getPersonMaps() {
		return personMaps;
	}

	public void setPersonMaps(List<PersonMap> personMaps) {
		this.personMaps = personMaps;
	}
	
	
	
}
