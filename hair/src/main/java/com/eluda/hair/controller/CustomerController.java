/**
 * 
 */
package com.eluda.hair.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.eluda.hair.persistence.vo.CustomerVo;
import com.eluda.hair.service.CustomerService;

/**
 * @author wizardlee
 *
 */
@RestController
@RequestMapping("customers")
public class CustomerController {
	
	Logger logger = LoggerFactory.getLogger(CustomerController.class);
	
	@Autowired
	private CustomerService customerService;
	
	@RequestMapping(path = {"/"}, method= RequestMethod.POST)
	public @ResponseBody CustomerVo registerCustomer(@RequestBody CustomerVo pCustomerInfo){
		logger.debug("name : " + pCustomerInfo.getName());
		logger.debug("phone : " + pCustomerInfo.getPhoneNumber());
		
		customerService.insertCustomer(pCustomerInfo);
		return new CustomerVo();
		
		/*customerService.insertCustomer2(pCustomerInfo);
		return new CustomerInfo();*/
	}
	
	@RequestMapping(path = {"/customer-list/phone-number/{phoneNumber}"}, method= RequestMethod.GET)
	public @ResponseBody List<CustomerVo> getCustomerListByPhoneNumber(@PathVariable ("phoneNumber") String phoneNumber){
		return customerService.getCustomerListByPhoneNumber(phoneNumber);
	}
}
