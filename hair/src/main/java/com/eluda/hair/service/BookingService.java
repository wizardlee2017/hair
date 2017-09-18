package com.eluda.hair.service;

import java.text.ParseException;

import com.eluda.hair.persistence.dto.BookingDashboardInfo;
import com.eluda.hair.persistence.vo.BookingVo;

public interface BookingService {
	public void requestBooking(BookingVo bookingVo);
	
	public BookingDashboardInfo getBookingDashboardInfo( String shopId, String procedureExpectBeginDate, int customerId) throws ParseException;
}
