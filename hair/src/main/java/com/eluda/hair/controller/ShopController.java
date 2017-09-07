package com.eluda.hair.controller;

import java.util.List;

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
import com.eluda.hair.persistence.vo.CustomerProcedureHistoryVo;
import com.eluda.hair.persistence.vo.ShopMenuVo;
import com.eluda.hair.persistence.dto.CustomerProcedureHistoryInfo;
import com.eluda.hair.persistence.dto.RegisterProcedureBasicInfo;
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
    public @ResponseBody List<CustomerVo> getShopCustomerList(@PathVariable("shopId") String shopId, 
    															@RequestParam(value="customerName", required=false) String customerName,
    															@RequestParam(value="customerPhoneNumber", required=false) String customerPhoneNumber){
		logger.debug("shopId : {}", shopId);
		logger.debug("customerName : {}", customerName);
		logger.debug("customerPhoneNumber : ", customerPhoneNumber);
		
    	return customerService.getShopCustomerList(shopId, customerName, customerPhoneNumber);
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
			@RequestBody CustomerVo pCustomerInfo) {
		
		logger.debug("shopId : {}", shopId);
		logger.debug("customerName : {}", pCustomerInfo.getName());
		logger.debug("customerPhoneNumber : {}", pCustomerInfo.getPhoneNumber());
		
		boolean isNewCustomer = false;
		
		if((pCustomerInfo.getId() == null) || ("".equals(pCustomerInfo.getId()))) {
			isNewCustomer = true;
			pCustomerInfo.setRegisterShopId(shopId);
		}
		
		try {
			shopService.registerCustomer(shopId, pCustomerInfo, isNewCustomer);
			return Response.status(Response.Status.OK).build();
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
