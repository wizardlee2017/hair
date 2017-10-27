package com.eluda.hair.controller;

import java.text.ParseException;
import java.util.List;

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
import com.eluda.hair.persistence.dto.BookingInfo;
import com.eluda.hair.persistence.dto.BookingListBasicInfo;
import com.eluda.hair.persistence.dto.BookingRequestInfo;
import com.eluda.hair.persistence.dto.ShopCustomerInfo;
import com.eluda.hair.persistence.vo.BookingProgressVo;
import com.eluda.hair.persistence.vo.BookingVo;
import com.eluda.hair.persistence.vo.CustomerVo;
import com.eluda.hair.persistence.vo.ShopCustomerVo;
import com.eluda.hair.service.BookingService;
import com.eluda.hair.service.CustomerService;
import com.eluda.hair.service.ShopService;

@RestController
@RequestMapping("booking")
public class BookingController {
	
	Logger logger = LoggerFactory.getLogger(BookingController.class);

	@Autowired
    private BookingService bookingService;
	
	@Autowired
    private ShopService shopService;
	
	@Autowired
    private CustomerService customerService;
	
	@RequestMapping(value = { "", "/dashboard-monitor" }, method = RequestMethod.GET)
	public ModelAndView bookingDashboardMonitor(Model model) {
		return new ModelAndView("booking/booking_dashboard_monitor");
	}
	
	@RequestMapping(path = {""}, method= RequestMethod.POST)
	public Response insertBooking(@RequestBody BookingRequestInfo pBookingRequestInfo) {

		logger.debug("shopId : {}", pBookingRequestInfo.getShopId());
		logger.debug("customerId : {}", pBookingRequestInfo.getCustomerId());
		
		ShopCustomerInfo lv_cShopCustomerInfo = new ShopCustomerInfo();
		
		lv_cShopCustomerInfo.setCustomerName(pBookingRequestInfo.getCustomerName());
		lv_cShopCustomerInfo.setCustomerPhoneNumber(pBookingRequestInfo.getCustomerPhoneNumber());
		lv_cShopCustomerInfo.setRegisterShopId(pBookingRequestInfo.getShopId());		
		lv_cShopCustomerInfo.setShopId(pBookingRequestInfo.getShopId());
		
		if( pBookingRequestInfo.getCustomerId() <= 0 ) {
			//신규 고객 등록.
			shopService.registerCustomer(lv_cShopCustomerInfo, true);
			
			pBookingRequestInfo.setCustomerId(lv_cShopCustomerInfo.getCustomerId());
		} else {
			//매장 고객인지 확인
			CustomerVo lv_cShopCustomer = customerService.getCustomerInfo(pBookingRequestInfo.getShopId(), pBookingRequestInfo.getCustomerId());
			
			if( lv_cShopCustomer == null ) {
				lv_cShopCustomerInfo.setCustomerId(pBookingRequestInfo.getCustomerId());
				//매장 고객이 아니면 매장 고객에 추가.
				shopService.registerCustomer(lv_cShopCustomerInfo, false);
			}
			
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
	
	@RequestMapping(value = { "/list/view" }, method = RequestMethod.GET)
	public ModelAndView viewBookingList() {
		return new ModelAndView("booking/booking_list");
	}
	
	@RequestMapping(path = { "/booking-list-basic-info" }, method = RequestMethod.GET)
	public BookingListBasicInfo bookingListBasicInfo() {
		BookingListBasicInfo lv_oResult = new BookingListBasicInfo();
		String lv_sShopId = "kor20170701001";
		lv_oResult = bookingService.getBookingListBasicInfo(lv_sShopId);
		
		return lv_oResult;
	}
	
	@RequestMapping(path = { "/{shopId}/list" }, method = RequestMethod.GET)
	public List<BookingInfo> bookingList(@PathVariable("shopId") String p_sShopId, 
			@RequestParam(value="progress") int p_nProgress,
			@RequestParam(value="fromDate") String p_sFromDate,
			@RequestParam(value="toDate") String p_sToDate) {
		String lv_sFromDateTime = p_sFromDate + "0000";
		String lv_sToDateTime = p_sToDate + "2359";
		return bookingService.getBookingList(p_sShopId, p_nProgress, lv_sFromDateTime, lv_sToDateTime);
	}
	

}
