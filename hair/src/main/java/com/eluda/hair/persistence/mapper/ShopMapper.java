package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.vo.CustomerInfo;
import com.eluda.hair.persistence.vo.ShopInfo;

@Mapper
public interface ShopMapper {
	public ShopInfo getShopInfo(@Param("id") String id);
	
	public CustomerInfo getCustomerInfo(@Param("shopId") String shopId, @Param("customerId") String customerId);
	
	//public List<CustomerInfo> getShopCustomerList(@Param("shopId") String shopId, @Param("customerName") String name, @Param("phoneNumber") String phoneNumber);
	
}
