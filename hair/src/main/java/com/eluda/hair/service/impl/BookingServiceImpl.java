package com.eluda.hair.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eluda.hair.persistence.dto.BookingDashboardInfo;
import com.eluda.hair.persistence.mapper.BookingMapper;
import com.eluda.hair.persistence.mapper.ShopMapper;
import com.eluda.hair.persistence.vo.BookingVo;
import com.eluda.hair.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {
	
	@Autowired
	private BookingMapper bookingMapper;
	@Autowired
	private ShopMapper shopMapper;

	@Override
	public void insertBooking(BookingVo bookingVo) {
		bookingMapper.insertBooking(bookingVo);

	}

	@Override
	public BookingDashboardInfo getBookingDashboardInfo(String shopId, int customerId, String procedureExpectBeginDate) throws ParseException {
		BookingDashboardInfo result = new BookingDashboardInfo(); 
		
		//set date list
		String dateList[] = new String[7];
		
		SimpleDateFormat transFormat = new SimpleDateFormat("yyyyMMdd",Locale.getDefault());
		Date beginDate =  transFormat.parse(procedureExpectBeginDate);
		
		Calendar calendar = Calendar.getInstance(); 
		calendar.setTime(beginDate);
		
		for (int tv_nIdx = 0; tv_nIdx < 7; tv_nIdx++) {
			dateList[tv_nIdx] = new SimpleDateFormat("yyyyMMdd", Locale.getDefault()).format(calendar.getTime());
			calendar.add(Calendar.DATE, 1);
		}
		
		result.setDateList(dateList);
		
		return result;
	}

}
