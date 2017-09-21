package com.eluda.hair.persistence.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.vo.ShopCustomerVo;

@Mapper
public interface ShopCustomerMapper {
	//public void insertShopCustomer(@Param("shopId") String shopId, @Param("customerId") int customerId);
	public void insertShopCustomer(ShopCustomerVo customerInfo);
}
