package com.eluda.hair.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eluda.hair.persistence.vo.CustomerInfo;
import com.eluda.hair.persistence.dto.CustomerProcedureHistoryInfo;
import com.eluda.hair.service.CustomerProcedureHistoryService;
import com.eluda.hair.service.CustomerService;
import com.eluda.hair.service.ShopService;

@Controller
public class ShopController {
	
	Logger logger = LoggerFactory.getLogger(ShopController.class);

	@Autowired
    private ShopService shopService;
	@Autowired
	private CustomerService customerService;
	@Autowired
	private CustomerProcedureHistoryService customerProcedureHistoryService;
	
	@RequestMapping("/shop/searchProcedureHistory")
	public String searchProcedureHistory(Model model) {
		return "shop/customer_procedure_history";
	}
	
	@RequestMapping("/shop/customerInfo")
    public @ResponseBody CustomerInfo getCustomerInfo(){
    	String shopId = "tst20170812001";
    	String customerId = "1";
        return shopService.getCustomerInfo(shopId, customerId);
    }
	
	@RequestMapping(value = {"/shop/{shopId}/customer/list"}, 
					method= RequestMethod.GET)
    public @ResponseBody List<CustomerInfo> getShopCustomerList(@PathVariable("shopId") String shopId, 
    															@RequestParam(value="customerName", required=false) String customerName,
    															@RequestParam(value="customerPhoneNumber", required=false) String customerPhoneNumber){
		logger.debug("shopId : {}", shopId);
		logger.debug("customerName : {}", customerName);
		logger.debug("customerPhoneNumber : ", customerPhoneNumber);
		
    	return customerService.getShopCustomerList(shopId, customerName, customerPhoneNumber);
    }
	
	@RequestMapping(value = {"/shop/{shopId}/customer/{customerId}/procedure-history/list"}, 
					method= RequestMethod.GET)
	public @ResponseBody List<CustomerProcedureHistoryInfo> getShopCustomerProcedureHistoryList(@PathVariable("shopId") String shopId,
															@PathVariable("customerId") String customerId){
		logger.debug("shopId : {}", shopId);
		logger.debug("customerId : {}", customerId);
		
		return customerProcedureHistoryService.getShopCustomerProcedureHistoryList(shopId, customerId);
	}

}
