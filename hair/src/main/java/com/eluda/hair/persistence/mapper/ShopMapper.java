package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.dto.CustomerInfo;
import com.eluda.hair.persistence.dto.ShopInfo;

@Mapper
public interface ShopMapper {
	public ShopInfo getShopInfo(@Param("id") String id);
	
	public CustomerInfo getCustomerInfo(@Param("shopId") String shopId, @Param("customerId") String customerId);
	
	public List<CustomerInfo> getCustomerList(@Param("shopId") String shopId, @Param("name") String name, @Param("phoneNumber") String phoneNumber);
	
	public String getShopInfo2();
}
