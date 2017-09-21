package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.dto.ShopCustomerInfo;
import com.eluda.hair.persistence.vo.CustomerVo;

@Mapper
public interface CustomerMapper {
	public CustomerVo getShopCustomerInfo(@Param("shopId") String shopId, @Param("customerId") int customerId);
	
	public List<ShopCustomerInfo> getShopCustomerList(@Param("shopId") String shopId, @Param("customerName") String customerName, @Param("customerPhoneNumber") String customerPhoneNumber);
	
	public void insertCustomer(CustomerVo customerInfo);
		
	public List<CustomerVo> getCustomerListByPhoneNumber(@Param("phoneNumber") String phoneNumber);
}
