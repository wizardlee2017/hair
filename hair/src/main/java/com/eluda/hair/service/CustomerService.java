/**
 * 
 */
package com.eluda.hair.service;

import java.util.List;

import com.eluda.hair.persistence.vo.CustomerInfo;

/**
 * @author wizardlee
 *
 */
public interface CustomerService {
	public CustomerInfo getCustomerInfo(String shopId, String customerId);
	
	public List<CustomerInfo> getShopCustomerList(String shopId, String customerName, String customerPhoneNumber);
	
	public List<CustomerInfo> getCustomerListByPhoneNumber(String phoneNumber);
	
	public CustomerInfo insertCustomer(CustomerInfo customerInfo);
	
	public void insertCustomer2(CustomerInfo customerInfo);
}
