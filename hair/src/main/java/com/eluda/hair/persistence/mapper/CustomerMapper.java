package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.vo.CustomerInfo;

@Mapper
public interface CustomerMapper {
	public CustomerInfo getShopCustomerInfo(@Param("shopId") String shopId, @Param("customerId") String customerId);
	
	public List<CustomerInfo> getShopCustomerList(@Param("shopId") String shopId, @Param("customerName") String customerName, @Param("customerPhoneNumber") String customerPhoneNumber);
	
	public CustomerInfo insertCustomer(CustomerInfo customerInfo);
	
	public void insertCustomer2(@Param("name") String name, @Param("phoneNumber") String phoneNumber);
	
	public List<CustomerInfo> getCustomerListByPhoneNumber(@Param("phoneNumber") String phoneNumber);
}
