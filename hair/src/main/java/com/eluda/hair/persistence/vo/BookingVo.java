package com.eluda.hair.persistence.vo;

public class BookingVo {
	private String shopId;
	private int customerId;
	private String bookingDatetime;
	private int procedureHairdresserId;
	private int progress;
	private int bookingWay;
	private String memo;
	
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
}