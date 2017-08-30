package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.vo.CustomerVo;
import com.eluda.hair.persistence.vo.ShopVo;

@Mapper
public interface ShopMapper {
	public ShopVo getShopInfo(@Param("id") String id);
	
	public CustomerVo getCustomerInfo(@Param("shopId") String shopId, @Param("customerId") String customerId);
	
	//public List<CustomerInfo> getShopCustomerList(@Param("shopId") String shopId, @Param("customerName") String name, @Param("phoneNumber") String phoneNumber);
	
}
