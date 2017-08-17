/**
 * 
 */
package com.eluda.hair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eluda.hair.persistence.dto.CustomerInfo;
import com.eluda.hair.service.CustomerService;

/**
 * @author wizardlee
 *
 */
@Controller
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	
	@RequestMapping(path = {"/customer"}, method= RequestMethod.GET)
	public @ResponseBody CustomerInfo getCustomerInfo(@PathVariable ("shop_id") String shopId, @PathVariable ("customer_id") String customerId){
		return customerService.getCustomerInfo(shopId, customerId);
	}
}
