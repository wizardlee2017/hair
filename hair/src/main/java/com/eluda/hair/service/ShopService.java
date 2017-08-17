package com.eluda.hair.service;

import java.util.List;

import com.eluda.hair.persistence.dto.CustomerInfo;
import com.eluda.hair.persistence.dto.ShopInfo;

public interface ShopService {
	public ShopInfo getShopInfo(String id);
	
	public CustomerInfo getCustomerInfo(String shopId, String customerId);
	
	public String getShopInfo2();
}
