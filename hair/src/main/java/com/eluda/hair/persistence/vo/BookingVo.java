package com.eluda.hair.persistence.vo;

import com.eluda.hair.persistence.dto.BookingRequestInfo;

public class BookingVo {
	private String shopId;
	private int customerId;
	private String bookingDatetime;
	private String procedureMenuId;
	private int procedureHairdresserId;
	private int progress;
	private int bookingWay;
	private String memo;
	private String procedureExpectBeginDatetime;
	private String procedureExpectEndDatetime;
	
	public BookingVo() {		
	}
	
	public BookingVo( BookingRequestInfo pBookingRequestInfo ) {
		this.shopId = pBookingRequestInfo.getShopId();
		this.customerId = pBookingRequestInfo.getCustomerId();
		this.bookingDatetime = pBookingRequestInfo.getBookingDatetime();
		this.procedureMenuId = pBookingRequestInfo.getProcedureMenuId();
		this.procedureHairdresserId = pBookingRequestInfo.getProcedureHairdresserId();
		this.progress = pBookingRequestInfo.getProgress();
		this.bookingWay = pBookingRequestInfo.getBookingWay();
		this.memo = pBookingRequestInfo.getMemo();
	}
	
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
}
