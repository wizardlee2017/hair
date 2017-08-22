package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.dto.CustomerProcedureHistoryInfo;

@Mapper
public interface CustomerProcedureHistoryMapper {
	
	public List<CustomerProcedureHistoryInfo> getShopCustomerProcedureHistoryList(@Param("shopId") String shopId, @Param("customerId") String customerId);
}
