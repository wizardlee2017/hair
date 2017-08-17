/**
 * 
 */
package com.eluda.hair.service;

import java.util.List;

import com.eluda.hair.persistence.dto.CustomerInfo;

/**
 * @author wizardlee
 *
 */
public interface CustomerService {
	public CustomerInfo getCustomerInfo(String shopId, String customerId);
	
	public List<CustomerInfo> getShopCustomerList(String shopId, String customerName, String customerPhoneNumber);
}
