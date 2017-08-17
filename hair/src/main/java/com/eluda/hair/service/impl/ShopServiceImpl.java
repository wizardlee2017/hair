package com.eluda.hair.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eluda.hair.persistence.dto.CustomerInfo;
import com.eluda.hair.persistence.dto.ShopInfo;
import com.eluda.hair.persistence.mapper.ShopMapper;
import com.eluda.hair.service.ShopService;

@Service
public class ShopServiceImpl implements ShopService {

	@Autowired
	private ShopMapper shopMapper;
	
	@Override
	public ShopInfo getShopInfo(String id) {
		
		return shopMapper.getShopInfo(id);
	}
	
	@Override
	public String getShopInfo2() {
		
		return shopMapper.getShopInfo2();
	}

	@Override
	public CustomerInfo getCustomerInfo(String shopId, String customerId) {
		return shopMapper.getCustomerInfo(shopId, customerId) ;
	}

}
