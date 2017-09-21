package com.eluda.hair.persistence.dto;

public class ShopCustomerInfo {
	private String  shopId;
	private int		customerId;
	private	String	customerName;
	private	String	customerPhoneNumber;
	private String  registerShopId;
	private String	memo;
	private int		obnoxiousScore;
	
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
	public String getRegisterShopId() {
		return registerShopId;
	}
	public void setRegisterShopId(String registerShopId) {
		this.registerShopId = registerShopId;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public int getObnoxiousScore() {
		return obnoxiousScore;
	}
	public void setObnoxiousScore(int obnoxiousScore) {
		this.obnoxiousScore = obnoxiousScore;
	}
	
}
