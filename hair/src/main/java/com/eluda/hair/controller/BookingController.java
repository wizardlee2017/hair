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
import com.eluda.hair.persistence.dto.BookingRequestInfo;
import com.eluda.hair.persistence.vo.BookingVo;
import com.eluda.hair.persistence.vo.CustomerVo;
import com.eluda.hair.service.BookingService;
import com.eluda.hair.service.ShopService;

@RestController
@RequestMapping("booking")
public class BookingController {
	
	Logger logger = LoggerFactory.getLogger(BookingController.class);

	@Autowired
    private BookingService bookingService;
	
	@Autowired
    private ShopService shopService;
	
	@RequestMapping(value = { "", "/dashboard-monitor" }, method = RequestMethod.GET)
	public ModelAndView bookingDashboardMonitor(Model model) {
		return new ModelAndView("booking/booking_dashboard_monitor");
	}
	
	@RequestMapping(path = {""}, method= RequestMethod.POST)
	public Response insertBooking(@RequestBody BookingRequestInfo pBookingRequestInfo) {

		logger.debug("shopId : {}", pBookingRequestInfo.getShopId());
		logger.debug("customerId : {}", pBookingRequestInfo.getCustomerId());
		
		if( pBookingRequestInfo.getCustomerId() <= 0 ) {
			//신규 고객 등록.
			CustomerVo lv_cCustomerInfo = new CustomerVo(); 
			
			lv_cCustomerInfo.setName(pBookingRequestInfo.getCustomerName());
			lv_cCustomerInfo.setPhoneNumber(pBookingRequestInfo.getCustomerPhoneNumber());
			lv_cCustomerInfo.setRegisterShopId(pBookingRequestInfo.getShopId());
			
			shopService.registerCustomer(pBookingRequestInfo.getShopId(), lv_cCustomerInfo, true);
			
			pBookingRequestInfo.setCustomerId(lv_cCustomerInfo.getId());
		}
		
		try {
			BookingVo lv_cBookingInfo = new BookingVo( pBookingRequestInfo );
			
			bookingService.requestBooking(lv_cBookingInfo);
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@RequestMapping(value = { "/{shopId}/dashboard-info" }, method = RequestMethod.GET)
	public BookingDashboardInfo getDashboardInfo(@PathVariable("shopId") String shopId, 
			@RequestParam(value="begin-date", required=false) String beginDate,
			@RequestParam(value="customer-id", required=false) int customerId) {
		BookingDashboardInfo lv_oBookingDashboardInfo = new BookingDashboardInfo();
		try {
			lv_oBookingDashboardInfo = bookingService.getBookingDashboardInfo(shopId,  beginDate, customerId);
		} catch (ParseException e) {
			logger.debug("exception trace {}", e);
		}
		
		return lv_oBookingDashboardInfo;
	}
	

}
