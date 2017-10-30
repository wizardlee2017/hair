package com.eluda.hair.service;

import java.text.ParseException;
import java.util.List;

import com.eluda.hair.persistence.dto.BookingDashboardInfo;
import com.eluda.hair.persistence.dto.BookingInfo;
import com.eluda.hair.persistence.dto.BookingListBasicInfo;
import com.eluda.hair.persistence.vo.BookingVo;

public interface BookingService {
	public void requestBooking(BookingVo bookingVo);
	
	public void updateBooking(BookingVo bookingVo);
	
	public BookingDashboardInfo getBookingDashboardInfo( String shopId, String procedureExpectBeginDate, int customerId) throws ParseException;
	
	public BookingListBasicInfo getBookingListBasicInfo( String shopId );
	
	public List<BookingInfo> getBookingList(String p_sShopId, int p_nProgress, String p_sFromDateTime, String p_sToDateTime);
}
