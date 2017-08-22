package com.eluda.hair.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eluda.hair.persistence.dto.CustomerProcedureHistoryInfo;
import com.eluda.hair.persistence.mapper.CustomerProcedureHistoryMapper;
import com.eluda.hair.service.CustomerProcedureHistoryService;

@Service
public class CustomerProcedureHistoryServiceImpl implements CustomerProcedureHistoryService {

	@Autowired
	private CustomerProcedureHistoryMapper customerProcedureHistoryMapper;
	
	@Override
	public List<CustomerProcedureHistoryInfo> getShopCustomerProcedureHistoryList(String shopId, String customerId) {
		return customerProcedureHistoryMapper.getShopCustomerProcedureHistoryList(shopId, customerId);
	}

}
