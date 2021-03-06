/**
 * 
 */
package com.eluda.hair.service;

import java.util.List;

import com.eluda.hair.persistence.dto.ShopCustomerInfo;
import com.eluda.hair.persistence.vo.CustomerVo;

/**
 * @author wizardlee
 *
 */
public interface CustomerService {
	public CustomerVo getCustomerInfo(String shopId, int customerId);
	
	public List<ShopCustomerInfo> getShopCustomerList(String shopId, String customerName, String customerPhoneNumber);
	
	public List<CustomerVo> getCustomerListByPhoneNumber(String phoneNumber);
	
	public void insertCustomer(CustomerVo customerInfo);
}
