/**
 * 
 */
package com.eluda.hair.service;

import java.util.List;

import com.eluda.hair.persistence.dto.CustomerProcedureHistoryInfo;

/**
 * @author wizardlee
 *
 */
public interface CustomerProcedureHistoryService {
	public List<CustomerProcedureHistoryInfo> getShopCustomerProcedureHistoryList(String shopId, String customerId);
}
