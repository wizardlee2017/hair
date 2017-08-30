package com.eluda.hair.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eluda.hair.persistence.mapper.BookingMapper;
import com.eluda.hair.persistence.vo.BookingVo;
import com.eluda.hair.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {
	
	@Autowired
	private BookingMapper bookingMapper;

	@Override
	public void insertBooking(BookingVo bookingVo) {
		bookingMapper.insertBooking(bookingVo);

	}

}
