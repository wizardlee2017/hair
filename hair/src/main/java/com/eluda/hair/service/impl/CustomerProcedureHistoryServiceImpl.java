package com.eluda.hair.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eluda.hair.persistence.dto.CustomerProcedureHistoryInfo;
import com.eluda.hair.persistence.mapper.CustomerProcedureHistoryMapper;
import com.eluda.hair.persistence.vo.CustomerProcedureHistoryVo;
import com.eluda.hair.service.CustomerProcedureHistoryService;

@Service
public class CustomerProcedureHistoryServiceImpl implements CustomerProcedureHistoryService {

	Logger logger = LoggerFactory.getLogger(CustomerProcedureHistoryServiceImpl.class);
			
	@Autowired
	private CustomerProcedureHistoryMapper customerProcedureHistoryMapper;
	
	@Override
	public List<CustomerProcedureHistoryInfo> getShopCustomerProcedureHistoryList(String shopId, String customerId) {
		return customerProcedureHistoryMapper.getShopCustomerProcedureHistoryList(shopId, customerId);
	}

	@Override
	@Transactional
	public void insertCustomerProcedureHistory(CustomerProcedureHistoryVo customerProcedureHistoryVo) {
		customerProcedureHistoryMapper.insertCustomerProcedureHistory(customerProcedureHistoryVo);
	}

}
