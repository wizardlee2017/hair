package com.eluda.hair.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eluda.hair.persistence.vo.CustomerInfo;
import com.eluda.hair.persistence.vo.ShopInfo;
import com.eluda.hair.persistence.mapper.ShopCustomerMapper;
import com.eluda.hair.persistence.mapper.ShopMapper;
import com.eluda.hair.service.ShopService;

@Service
public class ShopServiceImpl implements ShopService {

	@Autowired
	private ShopMapper shopMapper;
	
	@Autowired
	private ShopCustomerMapper shopCustomerMapper;
	
	@Override
	public ShopInfo getShopInfo(String id) {
		
		return shopMapper.getShopInfo(id);
	}

	@Override
	public CustomerInfo getCustomerInfo(String shopId, String customerId) {
		return shopMapper.getCustomerInfo(shopId, customerId) ;
	}

	@Override
	public void registerCustomer(String shopId, String customerId) {
		shopCustomerMapper.insertShopCustomer(shopId, customerId);
		return;
		
	}

}
