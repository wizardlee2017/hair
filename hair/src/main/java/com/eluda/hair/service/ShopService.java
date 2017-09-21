package com.eluda.hair.service;


import com.eluda.hair.persistence.dto.RegisterProcedureBasicInfo;
import com.eluda.hair.persistence.dto.ShopCustomerInfo;
import com.eluda.hair.persistence.vo.CustomerVo;
import com.eluda.hair.persistence.vo.ShopCustomerVo;
import com.eluda.hair.persistence.vo.ShopVo;

public interface ShopService {
	public ShopVo getShopInfo(String id);
	
	public CustomerVo getCustomerInfo(String shopId, String customerId);
	
	//public void registerCustomer(String shopId, CustomerVo customerInfo, boolean isNewCustomer);
	public void registerCustomer(ShopCustomerInfo pShopCustomerInfo, boolean isNewCustomer);
	
}
