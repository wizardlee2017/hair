package com.eluda.hair.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eluda.hair.persistence.vo.CustomerVo;
import com.eluda.hair.persistence.vo.ShopVo;
import com.eluda.hair.persistence.mapper.CustomerMapper;
import com.eluda.hair.persistence.mapper.ShopCustomerMapper;
import com.eluda.hair.persistence.mapper.ShopMapper;
import com.eluda.hair.service.ShopService;

@Service
public class ShopServiceImpl implements ShopService {

	@Autowired
	private ShopMapper shopMapper;
	
	@Autowired
	private ShopCustomerMapper shopCustomerMapper;
	
	@Autowired
	private CustomerMapper customerMapper;
	
	@Override
	public ShopVo getShopInfo(String id) {
		
		return shopMapper.getShopInfo(id);
	}

	@Override
	public CustomerVo getCustomerInfo(String shopId, String customerId) {
		return shopMapper.getCustomerInfo(shopId, customerId) ;
	}

	@Override
	@Transactional
	public void registerCustomer(String shopId, CustomerVo customerInfo, boolean isNewCustomer) {
		
		if(isNewCustomer) {
			customerMapper.insertCustomer(customerInfo);
		}
		//
		shopCustomerMapper.insertShopCustomer(shopId, customerInfo.getId());
		return;
		
	}

}
