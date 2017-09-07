package com.eluda.hair.persistence.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.dto.BookingInfo;
import com.eluda.hair.persistence.vo.BookingVo;

@Mapper
public interface BookingMapper {
	public void insertBooking(BookingVo bookingVo);
	
	public List<BookingInfo> getBookingList(@Param("shopId") String shopId, @Param("progress") int progress, @Param("fromDateTime") String fromDateTime, @Param("toDateTime") String toDateTime);
}
