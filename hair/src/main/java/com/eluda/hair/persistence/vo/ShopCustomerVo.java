package com.eluda.hair.persistence.vo;

import com.eluda.hair.persistence.dto.ShopCustomerInfo;

public class ShopCustomerVo {
	private String shopId;
	private int customerId;
	private String memo;
	private int obnoxiousScore;
	
	public ShopCustomerVo() {}
	
	public ShopCustomerVo( ShopCustomerInfo pShopCustomerInfo ) {
		this.shopId	=	pShopCustomerInfo.getShopId();
		this.customerId	=	pShopCustomerInfo.getCustomerId();
		this.memo		=	pShopCustomerInfo.getMemo();
		this.obnoxiousScore	=	pShopCustomerInfo.getObnoxiousScore();
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
