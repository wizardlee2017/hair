package com.eluda.hair.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eluda.hair.persistence.dto.CustomerProcedureHistoryInfo;
import com.eluda.hair.persistence.dto.RegisterProcedureBasicInfo;
import com.eluda.hair.persistence.mapper.CustomerProcedureHistoryMapper;
import com.eluda.hair.persistence.mapper.HairdresserMapper;
import com.eluda.hair.persistence.mapper.MenuTypeMapper;
import com.eluda.hair.persistence.mapper.ProcedureTypeMapper;
import com.eluda.hair.persistence.vo.CustomerProcedureHistoryVo;
import com.eluda.hair.persistence.vo.HairdresserVo;
import com.eluda.hair.persistence.vo.MenuTypeVo;
import com.eluda.hair.persistence.vo.ProcedureTypeVo;
import com.eluda.hair.service.CustomerProcedureHistoryService;

@Service
public class CustomerProcedureHistoryServiceImpl implements CustomerProcedureHistoryService {

	Logger logger = LoggerFactory.getLogger(CustomerProcedureHistoryServiceImpl.class);
			
	@Autowired
	private CustomerProcedureHistoryMapper customerProcedureHistoryMapper;
	
	@Autowired
	private	HairdresserMapper hairdresserMapper;
	
	@Autowired
	private	MenuTypeMapper menuTypeMapper;
	
	@Autowired
	private	ProcedureTypeMapper procedureTypeMapper;
	
	@Override
	public List<CustomerProcedureHistoryInfo> getShopCustomerProcedureHistoryList(String shopId, String customerId) {
		return customerProcedureHistoryMapper.getShopCustomerProcedureHistoryList(shopId, customerId);
	}

	@Override
	@Transactional
	public void insertCustomerProcedureHistory(CustomerProcedureHistoryVo customerProcedureHistoryVo) {
		customerProcedureHistoryMapper.insertCustomerProcedureHistory(customerProcedureHistoryVo);
	}

	@Override
	public RegisterProcedureBasicInfo getRegisterProcedureBasicInfo(String shopId) {
		RegisterProcedureBasicInfo result = new RegisterProcedureBasicInfo();
		
		List<HairdresserVo> hairdresserList = new ArrayList<HairdresserVo>(); 
		List<MenuTypeVo> menuTypeList = new ArrayList<MenuTypeVo>();
		List<ProcedureTypeVo> procedureTypeList = new ArrayList<ProcedureTypeVo>();
		
		hairdresserList = hairdresserMapper.getShopHairDresserList(shopId);
		menuTypeList = menuTypeMapper.getMenuTypeList("kor");
		procedureTypeList = procedureTypeMapper.getProcedureTypeList("kor");
		
		result.setHairdresserList(hairdresserList);
		result.setMenuTypeList(menuTypeList);
		result.setProcedureTypeList(procedureTypeList);
		
		return result;
	}

}
