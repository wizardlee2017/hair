package com.eluda.hair.persistence.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ShopCustomerMapper {
	public void insertShopCustomer(@Param("shopId") String shopId, @Param("customerId") String customerId);
}
