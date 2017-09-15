package com.eluda.hair.persistence.dto;

public class BookingInfo {
	
	private String bookingDatetime;
	private int customerId;
	private String assignedOrNot;
	private String customerName;
	private String customerPhoneNumber;
	private String hairdresserId;
	private String hairdresserName;
	private String procedureName;
	private String procedureExpectBeginDatetime;
	private String procedureExpectEndDatetime;
	private String memo;
	
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerPhoneNumber() {
		return customerPhoneNumber;
	}
	public void setCustomerPhoneNumber(String customerPhoneNumber) {
		this.customerPhoneNumber = customerPhoneNumber;
	}
	public String getHairdresserId() {
		return hairdresserId;
	}
	public void setHairdresserId(String hairdresserId) {
		this.hairdresserId = hairdresserId;
	}
	public String getHairdresserName() {
		return hairdresserName;
	}
	public void setHairdresserName(String hairdresserName) {
		this.hairdresserName = hairdresserName;
	}
	public String getProcedureName() {
		return procedureName;
	}
	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}
	public String getProcedureExpectBeginDatetime() {
		return procedureExpectBeginDatetime;
	}
	public void setProcedureExpectBeginDatetime(String procedureExpectBeginDatetime) {
		this.procedureExpectBeginDatetime = procedureExpectBeginDatetime;
	}
	public String getProcedureExpectEndDatetime() {
		return procedureExpectEndDatetime;
	}
	public void setProcedureExpectEndDatetime(String procedureExpectEndDatetime) {
		this.procedureExpectEndDatetime = procedureExpectEndDatetime;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getAssignedOrNot() {
		return assignedOrNot;
	}
	public void setAssignedOrNot(String assignedOrNot) {
		this.assignedOrNot = assignedOrNot;
	}
	public String getBookingDatetime() {
		return bookingDatetime;
	}
	public void setBookingDatetime(String bookingDatetime) {
		this.bookingDatetime = bookingDatetime;
	}
	
}
