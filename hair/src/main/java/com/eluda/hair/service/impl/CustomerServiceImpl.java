/**
 * 
 */
package com.eluda.hair.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eluda.hair.persistence.vo.CustomerInfo;
import com.eluda.hair.persistence.mapper.CustomerMapper;
import com.eluda.hair.service.CustomerService;

/**
 * @author wizardlee
 *
 */
@Service
public class CustomerServiceImpl implements CustomerService {
	
	Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
	
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

	@Override
	public List<CustomerInfo> getCustomerListByPhoneNumber(String phoneNumber) {		
		return customerMapper.getCustomerListByPhoneNumber(phoneNumber);
	}

	@Override
	@Transactional
	public void insertCustomer(CustomerInfo customerInfo) {
		customerMapper.insertCustomer(customerInfo);
		
		logger.debug("inserted id : " + customerInfo.getId());
		
		return;
	}
	
}
