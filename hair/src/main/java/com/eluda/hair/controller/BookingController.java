package com.eluda.hair.controller;

import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.eluda.hair.persistence.vo.BookingVo;
import com.eluda.hair.service.BookingService;

@RestController
@RequestMapping("booking")
public class BookingController {
	
	Logger logger = LoggerFactory.getLogger(BookingController.class);

	@Autowired
    private BookingService bookingService;
	
	@RequestMapping(path = {""}, method= RequestMethod.POST)
	public Response insertBooking(@RequestBody BookingVo pBookingInfo) {

		logger.debug("shopId : {}", pBookingInfo.getShopId());
		logger.debug("customerId : {}", pBookingInfo.getCustomerId());
		
		try {
			bookingService.insertBooking(pBookingInfo);
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
