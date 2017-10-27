package com.eluda.hair.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eluda.hair.persistence.dto.BookingDashboardInfo;
import com.eluda.hair.persistence.dto.BookingInfo;
import com.eluda.hair.persistence.dto.BookingListBasicInfo;
import com.eluda.hair.persistence.mapper.BookingMapper;
import com.eluda.hair.persistence.mapper.HairdresserMapper;
import com.eluda.hair.persistence.mapper.ShopMapper;
import com.eluda.hair.persistence.vo.BookingProgressVo;
import com.eluda.hair.persistence.vo.BookingVo;
import com.eluda.hair.persistence.vo.HairdresserVo;
import com.eluda.hair.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {
	
	@Autowired
	private BookingMapper bookingMapper;
	
	@Autowired
	private ShopMapper shopMapper;
	
	@Autowired
	private HairdresserMapper hairdresserMapper;

	@Override
	@Transactional
	public void requestBooking(BookingVo bookingVo) {
		//진행상태를 예약 신청(0)으로 설정.
		bookingVo.setProgress(0);
		bookingMapper.requestBooking(bookingVo);

	}

	@Override
	public BookingDashboardInfo getBookingDashboardInfo(String shopId, String procedureExpectBeginDate, int customerId) throws ParseException {
		BookingDashboardInfo result = new BookingDashboardInfo();
		
		String lv_sFromDateTime = "";
		String lv_sToDateTime = "";
		
		//set date list
		String dateList[] = new String[7];
		
		SimpleDateFormat transFormat = new SimpleDateFormat("yyyyMMdd",Locale.getDefault());
		Date beginDate =  transFormat.parse(procedureExpectBeginDate);
		
		Calendar calendar = Calendar.getInstance(); 
		calendar.setTime(beginDate);
		
		for (int tv_nIdx = 0; tv_nIdx < 7; tv_nIdx++) {
			//dateList[tv_nIdx] = new SimpleDateFormat("yyyyMMdd-u", Locale.getDefault()).format(calendar.getTime());
			dateList[tv_nIdx] = new SimpleDateFormat("yyyyMMdd", Locale.getDefault()).format(calendar.getTime());
			calendar.add(Calendar.DATE, 1);
		}
		
		result.setDateList(dateList);
		
		//set shop info
		result.setShopInfo(shopMapper.getShopInfo(shopId));
		
		//set hairdresser list
		result.setHairdresserList(hairdresserMapper.getShopHairDresserList(shopId));
		
		//set booking list
		calendar.setTime(beginDate);
		lv_sFromDateTime = new SimpleDateFormat("yyyyMMdd0000", Locale.getDefault()).format(calendar.getTime());
		calendar.add(Calendar.DATE, 6);
		lv_sToDateTime = new SimpleDateFormat("yyyyMMdd2359", Locale.getDefault()).format(calendar.getTime());
		result.setBookingList(bookingMapper.getRequestBookingList(shopId, lv_sFromDateTime, lv_sToDateTime, customerId));
		
		return result;
	}
	
	@Override
	public BookingListBasicInfo getBookingListBasicInfo( String shopId ) {
		BookingListBasicInfo lv_oResult = new BookingListBasicInfo();
		List<BookingProgressVo> lv_aBookingProgressList = bookingMapper.getBookingProgressList("kor");
		List<HairdresserVo> lv_aHairDresserList = hairdresserMapper.getShopHairDresserList(shopId);
				
		lv_oResult.setBookingProgressList(lv_aBookingProgressList);
		lv_oResult.setHairdresserList(lv_aHairDresserList);
		
		return lv_oResult;
	}

	@Override
	public List<BookingInfo> getBookingList(String p_sShopId, int p_nProgress, String p_sFromDateTime, String p_sToDateTime) {
		return bookingMapper.getBookingList(p_sShopId, p_nProgress, p_sFromDateTime, p_sToDateTime);
	}

}
