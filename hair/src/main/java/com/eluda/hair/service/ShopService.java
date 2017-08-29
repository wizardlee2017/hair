package com.eluda.hair.service;


import com.eluda.hair.persistence.dto.RegisterProcedureBasicInfo;
import com.eluda.hair.persistence.vo.CustomerInfo;
import com.eluda.hair.persistence.vo.ShopInfo;

public interface ShopService {
	public ShopInfo getShopInfo(String id);
	
	public CustomerInfo getCustomerInfo(String shopId, String customerId);
	
	public void registerCustomer(String shopId, CustomerInfo customerInfo, boolean isNewCustomer);
	
}
