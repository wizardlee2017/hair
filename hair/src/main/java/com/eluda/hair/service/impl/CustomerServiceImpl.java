/**
 * 
 */
package com.eluda.hair.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eluda.hair.persistence.dto.CustomerInfo;
import com.eluda.hair.persistence.mapper.CustomerMapper;
import com.eluda.hair.service.CustomerService;

/**
 * @author wizardlee
 *
 */
@Service
public class CustomerServiceImpl implements CustomerService {
	@Autowired
	private CustomerMapper customerMapper;
	
	/* (non-Javadoc)
	 * @see com.eluda.hair.service.CustomerService#getCustomerInfo(java.lang.String, java.lang.String)
	 */
	@Override
	public CustomerInfo getCustomerInfo(String shopId, String customerId) {
		return customerMapper.getShopCustomerInfo(shopId, customerId);
	}

	@Override
	public List<CustomerInfo> getShopCustomerList(String shopId, String customerName, String customerPhoneNumber) {
		return customerMapper.getShopCustomerList(shopId, customerName, customerPhoneNumber);
	}

}
