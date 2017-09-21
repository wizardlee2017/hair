package com.eluda.hair.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eluda.hair.persistence.vo.CustomerVo;
import com.eluda.hair.persistence.vo.ShopCustomerVo;
import com.eluda.hair.persistence.vo.ShopVo;
import com.eluda.hair.persistence.dto.ShopCustomerInfo;
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
	public void registerCustomer(ShopCustomerInfo pShopCustomerInfo, boolean isNewCustomer) {
		int lv_nNewCustomerId = 0;
		if(isNewCustomer) {
			CustomerVo lv_cCustomerInfo = new CustomerVo(pShopCustomerInfo);
			customerMapper.insertCustomer(lv_cCustomerInfo);
			lv_nNewCustomerId = lv_cCustomerInfo.getId();
		}
		//
		//shopCustomerMapper.insertShopCustomer(shopId, customerInfo.getId());
		ShopCustomerVo lv_cShopCustomerInfo = new ShopCustomerVo(pShopCustomerInfo);
		if( lv_nNewCustomerId > 0 ) {
			lv_cShopCustomerInfo.setCustomerId(lv_nNewCustomerId);
		}
		shopCustomerMapper.insertShopCustomer(lv_cShopCustomerInfo);
		return;
		
	}

}
