package com.eluda.hair.persistence.mapper;


import org.apache.ibatis.annotations.Mapper;
import com.eluda.hair.persistence.vo.BookingVo;

@Mapper
public interface BookingMapper {
	public void insertBooking(BookingVo bookingVo);
}
