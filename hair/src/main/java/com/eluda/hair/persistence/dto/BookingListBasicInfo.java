package com.eluda.hair.persistence.dto;

import java.util.List;

import com.eluda.hair.persistence.vo.BookingProgressVo;
import com.eluda.hair.persistence.vo.HairdresserVo;


public class BookingListBasicInfo {
	private List<HairdresserVo> hairdresserList;
	private List<BookingProgressVo> bookingProgressList;
	
	public List<HairdresserVo> getHairdresserList() {
		return hairdresserList;
	}
	public void setHairdresserList(List<HairdresserVo> hairdresserList) {
		this.hairdresserList = hairdresserList;
	}
	public List<BookingProgressVo> getBookingProgressList() {
		return bookingProgressList;
	}
	public void setBookingProgressList(List<BookingProgressVo> bookingProgressList) {
		this.bookingProgressList = bookingProgressList;
	}
	
}
