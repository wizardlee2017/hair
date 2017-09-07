package com.eluda.hair.controller;

import java.text.ParseException;

import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.eluda.hair.persistence.dto.BookingDashboardInfo;
import com.eluda.hair.persistence.vo.BookingVo;
import com.eluda.hair.service.BookingService;

@RestController
@RequestMapping("booking")
public class BookingController {
	
	Logger logger = LoggerFactory.getLogger(BookingController.class);

	@Autowired
    private BookingService bookingService;
	
	@RequestMapping(value = { "", "/dashboard-monitor" }, method = RequestMethod.GET)
	public ModelAndView bookingDashboardMonitor(Model model) {
		return new ModelAndView("booking/booking_dashboard_monitor");
	}
	
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
	
	@RequestMapping(value = { "/{shopId}/dashboard-info" }, method = RequestMethod.GET)
	public BookingDashboardInfo getDashboardInfo(@PathVariable("shopId") String shopId, @RequestParam(value="begin-date", required=false) String beginDate) {
		BookingDashboardInfo lv_oBookingDashboardInfo = new BookingDashboardInfo();
		try {
			lv_oBookingDashboardInfo = bookingService.getBookingDashboardInfo(shopId,  beginDate);
		} catch (ParseException e) {
			logger.debug("exception trace {}", e);
		}
		
		return lv_oBookingDashboardInfo;
	}
	

}
