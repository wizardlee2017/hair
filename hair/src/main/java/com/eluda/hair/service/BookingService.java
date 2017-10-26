package com.eluda.hair.service;

import java.text.ParseException;
import java.util.List;

import com.eluda.hair.persistence.dto.BookingDashboardInfo;
import com.eluda.hair.persistence.vo.BookingProgressVo;
import com.eluda.hair.persistence.vo.BookingVo;

public interface BookingService {
	public void requestBooking(BookingVo bookingVo);
	
	public BookingDashboardInfo getBookingDashboardInfo( String shopId, String procedureExpectBeginDate, int customerId) throws ParseException;
	
	public List<BookingProgressVo> getBookingProgressList();
}
