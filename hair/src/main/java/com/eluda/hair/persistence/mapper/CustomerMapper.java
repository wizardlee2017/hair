package com.eluda.hair.persistence.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.dto.ShopInfo;

@Mapper
public interface CustomerMapper {
	public ShopInfo getShopCustomerInfo(@Param("shopId") String shopId, @Param("customerId") String customerId);
}
