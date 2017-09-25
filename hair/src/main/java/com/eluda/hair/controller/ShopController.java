package com.eluda.hair.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eluda.hair.persistence.vo.CustomerVo;
import com.eluda.hair.persistence.vo.ShopCustomerVo;
import com.eluda.hair.persistence.vo.CustomerProcedureHistoryVo;
import com.eluda.hair.persistence.vo.ShopMenuVo;
import com.eluda.hair.persistence.dto.CustomerProcedureHistoryInfo;
import com.eluda.hair.persistence.dto.RegisterProcedureBasicInfo;
import com.eluda.hair.persistence.dto.ShopCustomerInfo;
import com.eluda.hair.service.CustomerProcedureHistoryService;
import com.eluda.hair.service.CustomerService;
import com.eluda.hair.service.ShopMenuService;
import com.eluda.hair.service.ShopService;

@Controller
@RequestMapping("shops")
public class ShopController {
	
	Logger logger = LoggerFactory.getLogger(ShopController.class);

	@Autowired
    private ShopService shopService;
	@Autowired
	private CustomerService customerService;
	@Autowired
	private CustomerProcedureHistoryService customerProcedureHistoryService;
	@Autowired
	private ShopMenuService shopMenuService;
	
	@RequestMapping(value = { "", "/searchProcedureHistory" }, method = RequestMethod.GET)
	public String searchProcedureHistory(Model model) {
		return "shop/customer_procedure_history";
	}
	
	@RequestMapping(value = {"/{shopId}/customer/list"}, 
					method= RequestMethod.GET)
    public @ResponseBody List<ShopCustomerInfo> getShopCustomerList(@PathVariable("shopId") String shopId, 
    															@RequestParam(value="customerName", required=false) String customerName,
    															@RequestParam(value="customerPhoneNumber", required=false) String customerPhoneNumber,
    															@RequestParam(value="accuracy", required=false, defaultValue="like") String accuracy){
		logger.debug("shopId : {}", shopId);
		logger.debug("customerName : {}", customerName);
		logger.debug("customerPhoneNumber : ", customerPhoneNumber);
		
		return customerService.getShopCustomerList(shopId, customerName, customerPhoneNumber);
		
    }
	
	@RequestMapping(value = {"/customer/list/phone-number"}, 
			method= RequestMethod.GET)
	public @ResponseBody List<CustomerVo> getCustomerListByPhoneNumber(@RequestParam(value="customerPhoneNumber", required=false) String customerPhoneNumber){
	logger.debug("customerPhoneNumber : ", customerPhoneNumber);
	
	return customerService.getCustomerListByPhoneNumber(customerPhoneNumber);
	}
	
	@RequestMapping(value = {"/{shopId}/customer/{customerId}/procedure-history/list"}, 
					method= RequestMethod.GET)
	public @ResponseBody List<CustomerProcedureHistoryInfo> getShopCustomerProcedureHistoryList(@PathVariable("shopId") String shopId,
															@PathVariable("customerId") String customerId){
		logger.debug("shopId : {}", shopId);
		logger.debug("customerId : {}", customerId);
		
		return customerProcedureHistoryService.getShopCustomerProcedureHistoryList(shopId, customerId);
	}
	
	@RequestMapping(path = {"/{shopId}/customer"}, method= RequestMethod.POST)
	@ResponseBody
	public Response registerShopCustomer(@PathVariable("shopId") String shopId,			
			@RequestBody ShopCustomerInfo pShopCustomerInfo ) {
		
		logger.debug("shopId : {}", shopId);
		logger.debug("customerName : {}", pShopCustomerInfo.getCustomerName());
		logger.debug("customerPhoneNumber : {}", pShopCustomerInfo.getCustomerPhoneNumber());
		
		boolean isNewCustomer = false;
		int lv_nCustomerId = 0;
		
		
		if( pShopCustomerInfo.getCustomerId() <= 0 ) {
			isNewCustomer = true;
			pShopCustomerInfo.setRegisterShopId(shopId);
		}
		
		try {
			lv_nCustomerId = shopService.registerCustomer(pShopCustomerInfo, isNewCustomer);
			Map<String, Integer> lv_cResult = new HashMap<String, Integer>();
			lv_cResult.put("customerId", lv_nCustomerId);
			//Response lv_cResult = Response.status(Response.Status.OK).build();
					
					
			
			//return lv_cResult;
			return Response.ok(lv_cResult).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@RequestMapping(path = {"/{shopId}/customer/{customerId}/procedure-history"}, method= RequestMethod.POST)
	@ResponseBody
	public Response insertCustomerProcedureHistory(@PathVariable("shopId") String shopId,
			@PathVariable("customerId") int customerId,
			@RequestBody CustomerProcedureHistoryVo pCustomerProcedureHistoryInfo) {
		
		logger.debug("shopId : {}", shopId);
		logger.debug("customerId : {}", customerId);
		
		try {
			pCustomerProcedureHistoryInfo.setShopId(shopId);
			pCustomerProcedureHistoryInfo.setCustomerId(customerId);
			customerProcedureHistoryService.insertCustomerProcedureHistory(pCustomerProcedureHistoryInfo);
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@RequestMapping(value = { "/{shopId}/register-procedure-basic-info" }, method = RequestMethod.GET)
	public @ResponseBody RegisterProcedureBasicInfo getRegisterProcedureBasicInfo(@PathVariable("shopId") String shopId) {
		logger.debug("shopId : {}", shopId);

		return customerProcedureHistoryService.getRegisterProcedureBasicInfo(shopId);
	}
	
	@RequestMapping(value = { "/{shopId}/menu-list" }, method = RequestMethod.GET)
	public @ResponseBody List<ShopMenuVo> getShopMenuList(@PathVariable("shopId") String shopId, @RequestParam(value="menuTypeId", required=false) String menuTypeId) {
		logger.debug("shopId : {}", shopId);
		logger.debug("menuTypeId : {}", menuTypeId);

		return shopMenuService.getShopMenuList(shopId, menuTypeId);
	}

}
