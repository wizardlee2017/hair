package com.eluda.hair.persistence.vo;

import com.eluda.hair.persistence.dto.ShopCustomerInfo;

public class CustomerVo {
	private int id;
	private String name;
	private String phoneNumber;
	private String registerShopId;
	
	
	public CustomerVo() {
		
	}
	
	public CustomerVo(ShopCustomerInfo pShopCustomerInfo) {
		this.id = pShopCustomerInfo.getCustomerId();
		this.name = pShopCustomerInfo.getCustomerName();
		this.phoneNumber = pShopCustomerInfo.getCustomerPhoneNumber();
		this.registerShopId = pShopCustomerInfo.getRegisterShopId();
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getRegisterShopId() {
		return registerShopId;
	}
	public void setRegisterShopId(String registerShopId) {
		this.registerShopId = registerShopId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
}
