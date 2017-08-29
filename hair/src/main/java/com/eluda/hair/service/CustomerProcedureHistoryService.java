/**
 * 
 */
package com.eluda.hair.service;

import java.util.List;

import com.eluda.hair.persistence.dto.CustomerProcedureHistoryInfo;
import com.eluda.hair.persistence.dto.RegisterProcedureBasicInfo;
import com.eluda.hair.persistence.vo.CustomerProcedureHistoryVo;

/**
 * @author wizardlee
 *
 */
public interface CustomerProcedureHistoryService {
	public List<CustomerProcedureHistoryInfo> getShopCustomerProcedureHistoryList(String shopId, String customerId);
	
	public void insertCustomerProcedureHistory(CustomerProcedureHistoryVo customerProcedureHistoryVo);
	
	public RegisterProcedureBasicInfo getRegisterProcedureBasicInfo( String shopId );
}
