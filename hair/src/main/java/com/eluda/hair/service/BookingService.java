package com.eluda.hair.service;

import java.text.ParseException;

import com.eluda.hair.persistence.dto.BookingDashboardInfo;
import com.eluda.hair.persistence.vo.BookingVo;

public interface BookingService {
	public void insertBooking(BookingVo bookingVo);
	
	public BookingDashboardInfo getBookingDashboardInfo( String shopId, String procedureExpectBeginDate) throws ParseException;
}
