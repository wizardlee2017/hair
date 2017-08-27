package com.eluda.hair.persistence.vo;

public class CustomerProcedureHistoryVo {
	private int customerId;
	private String shopId;
	private String shopMenuId;
	private String dateYyyyMmDd;
	private int hairdresserId;
	private String procedureTypeId;
	private double price;
	private double defaultPrice;
	private String memo;
	
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getShopId() {
		return shopId;
	}
	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
	public String getShopMenuId() {
		return shopMenuId;
	}
	public void setShopMenuId(String shopMenuId) {
		this.shopMenuId = shopMenuId;
	}
	public String getDateYyyyMmDd() {
		return dateYyyyMmDd;
	}
	public void setDateYyyyMmDd(String dateYyyyMmDd) {
		this.dateYyyyMmDd = dateYyyyMmDd;
	}
	public int getHairdresserId() {
		return hairdresserId;
	}
	public void setHairdresserId(int hairdresserId) {
		this.hairdresserId = hairdresserId;
	}
	public String getProcedureTypeId() {
		return procedureTypeId;
	}
	public void setProcedureTypeId(String procedureTypeId) {
		this.procedureTypeId = procedureTypeId;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getDefaultPrice() {
		return defaultPrice;
	}
	public void setDefaultPrice(double defaultPrice) {
		this.defaultPrice = defaultPrice;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
}
