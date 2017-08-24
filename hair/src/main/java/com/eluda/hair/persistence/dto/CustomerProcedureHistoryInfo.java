package com.eluda.hair.persistence.dto;

public class CustomerProcedureHistoryInfo {
	
	private String visitNumber;
	private String procedureName;
	private String procedureDate;
	private Double defaultPrice;
	private Double procedurePrice;
	private String hairdresserName;
	private String memo;
	
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
	public String getVisitNumber() {
		return visitNumber;
	}
	public void setVisitNumber(String visitNumber) {
		this.visitNumber = visitNumber;
	}
	public String getHairdresserName() {
		return hairdresserName;
	}
	public void setHairdresserName(String hairdresserName) {
		this.hairdresserName = hairdresserName;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	
}
