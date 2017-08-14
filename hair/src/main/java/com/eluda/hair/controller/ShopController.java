package com.eluda.hair.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.eluda.hair.persistence.dto.CustomerInfo;
import com.eluda.hair.persistence.dto.ShopInfo;
import com.eluda.hair.service.ShopService;

@RestController
public class ShopController {
	@Autowired
    private ShopService shopService;
     
    //@RequestMapping(path = {"/shop/info"}, method= RequestMethod.GET)
    @RequestMapping("/shop/info")
    //public @ResponseBody ShopInfo getShopInfo(@PathVariable ("id") String id){  
    public @ResponseBody ShopInfo getShopInfo(){
    	String id = "kor20170701001";
        return shopService.getShopInfo(id);
    }
    
    @RequestMapping("/shop/customerInfo")
    //public @ResponseBody ShopInfo getShopInfo(@PathVariable ("id") String id){  
    public @ResponseBody CustomerInfo getCustomerInfo(){
    	String shopId = "tst20170812001";
    	String customerId = "1";
        return shopService.getCustomerInfo(shopId, customerId);
    }
    
    @RequestMapping("/shop/customerList")
    //public @ResponseBody ShopInfo getShopInfo(@PathVariable ("id") String id){  
    public @ResponseBody List<CustomerInfo> getCustomerList(){
    	String shopId = "tst20170812001";
    	String name = "고객";
    	String phoneNumber = "1234";
        return shopService.getCustomerList(shopId, name, phoneNumber);
    }
    
    @RequestMapping("/shop/info2")
    public @ResponseBody String getShopInfo2(){
    	return shopService.getShopInfo2();
    	//return "aaaa";
    }
}
