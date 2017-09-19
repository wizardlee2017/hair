package com.eluda.hair;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.eluda.hair.persistence.dto.BookingDashboardInfo;
import com.eluda.hair.service.BookingService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HairApplicationTests {
	
	Logger logger = LoggerFactory.getLogger(HairApplicationTests.class);
	
	@Autowired
	private BookingService bookingService;

	@Test
	public void contextLoads() {
	}
	
	@Test
	public void temporaryTest() {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss", Locale.ENGLISH).format(new Date());
		
		logger.debug("date : {}", dateStr);
		
	}
	
	@Test
	public void temporaryTest2() throws ParseException {
		
		BookingDashboardInfo result = new BookingDashboardInfo();
		
		result = bookingService.getBookingDashboardInfo("kor20170701001", "20170906", 0);
		
		logger.debug("date : {}", result.getBookingList());
		
	}
	
	@Test
	public void temporaryTest3() {
		String tempStr2 = "commit";
		String tempStr = "commit ec6396d9156ee5cbe06186c060566471cf2c62d3";
		
		logger.debug("Str : {}", tempStr.substring(tempStr2.length()).trim());
		
	}

}
