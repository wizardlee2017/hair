package com.eluda.hair.persistence.dto;

public class BookingRequestInfo {
	private String shopId;
	private int customerId;
	private String customerName;
	private String customerPhoneNumber;
	private String bookingDatetime;
	private String procedureMenuId;
	private int procedureHairdresserId;
	private int progress;
	private int bookingWay;
	private String memo;
	private String procedureExpectBeginDatetime;
	private String procedureExpectEndDatetime;
	
	public String getShopId() {
		return shopId;
	}
	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getBookingDatetime() {
		return bookingDatetime;
	}
	public void setBookingDatetime(String bookingDatetime) {
		this.bookingDatetime = bookingDatetime;
	}
	public int getProcedureHairdresserId() {
		return procedureHairdresserId;
	}
	public void setProcedureHairdresserId(int procedureHairdresserId) {
		this.procedureHairdresserId = procedureHairdresserId;
	}
	public int getProgress() {
		return progress;
	}
	public void setProgress(int progress) {
		this.progress = progress;
	}
	public int getBookingWay() {
		return bookingWay;
	}
	public void setBookingWay(int bookingWay) {
		this.bookingWay = bookingWay;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
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
	public String getProcedureMenuId() {
		return procedureMenuId;
	}
	public void setProcedureMenuId(String procedureMenuId) {
		this.procedureMenuId = procedureMenuId;
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
}
