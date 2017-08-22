package com.eluda.hair.persistence.dto;

public class CustomerProcedureHistoryInfo {
	
	private String procedureName;
	private String procedureDate;
	private Double defaultPrice;
	private Double procedurePrice;
	
	public String getProcedureName() {
		return procedureName;
	}
	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}
	public String getProcedureDate() {
		return procedureDate;
	}
	public void setProcedureDate(String procedureDate) {
		this.procedureDate = procedureDate;
	}
	public Double getDefaultPrice() {
		return defaultPrice;
	}
	public void setDefaultPrice(Double defaultPrice) {
		this.defaultPrice = defaultPrice;
	}
	public Double getProcedurePrice() {
		return procedurePrice;
	}
	public void setProcedurePrice(Double procedurePrice) {
		this.procedurePrice = procedurePrice;
	}
	
}
