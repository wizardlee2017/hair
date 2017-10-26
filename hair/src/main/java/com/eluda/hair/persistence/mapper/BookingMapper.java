package com.eluda.hair.persistence.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.dto.BookingInfo;
import com.eluda.hair.persistence.vo.BookingProgressVo;
import com.eluda.hair.persistence.vo.BookingVo;

@Mapper
public interface BookingMapper {
	public void requestBooking(BookingVo bookingVo);
	
	public List<BookingInfo> getRequestBookingList(@Param("shopId") String shopId, @Param("fromDateTime") String fromDateTime, @Param("toDateTime") String toDateTime, @Param("customerId") int customerId);
	
	public List<BookingProgressVo> getBookingProgressList(@Param("languageId") String languageId);
}
