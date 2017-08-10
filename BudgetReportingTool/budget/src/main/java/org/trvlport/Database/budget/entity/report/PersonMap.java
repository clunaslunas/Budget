package org.trvlport.Database.budget.entity.report;

import java.math.BigDecimal;
import java.util.HashMap;

import org.trvlport.Database.budget.entity.Month;

public class PersonMap {

	private String name;
	private HashMap<Month, BigDecimal> monthlySpending = new HashMap<Month, BigDecimal>();
		
	public PersonMap(String name, HashMap<Month, BigDecimal> monthlySpending) {
		super();
		this.name = name;
		this.monthlySpending = monthlySpending;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public HashMap<Month, BigDecimal> getMonthlySpending() {
		return monthlySpending;
	}

	public void setMonthlySpending(HashMap<Month, BigDecimal> monthlySpending) {
		this.monthlySpending = monthlySpending;
	}	
}
