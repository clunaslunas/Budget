package org.trvlport.Database.budget.controller.report;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.trvlport.Database.budget.entity.report.ProjectionReport;
import org.trvlport.Database.budget.service.report.ProjectionReportService;

@RestController
public class ProjectionReportController {
	
	@Autowired
	ProjectionReportService projectionReportService;
	
	@RequestMapping(path = "/ProjectionReport", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public @ResponseBody List<ProjectionReport> getProjectionReport() {
		return null;
	}

}
