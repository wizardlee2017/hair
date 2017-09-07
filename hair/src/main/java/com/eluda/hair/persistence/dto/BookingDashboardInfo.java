package com.eluda.hair.persistence.dto;

import java.util.List;

import com.eluda.hair.persistence.vo.HairdresserVo;
import com.eluda.hair.persistence.vo.ShopVo;

public class BookingDashboardInfo {
	private String[] dateList;
	private ShopVo shopInfo;
	private List<HairdresserVo> hairdresserList;
	private List<BookingInfo> bookingList;
	
	public String[] getDateList() {
		return dateList;
	}
	public void setDateList(String[] dateList) {
		this.dateList = dateList;
	}
	public ShopVo getShopInfo() {
		return shopInfo;
	}
	public void setShopInfo(ShopVo shopInfo) {
		this.shopInfo = shopInfo;
	}
	public List<BookingInfo> getBookingList() {
		return bookingList;
	}
	public void setBookingList(List<BookingInfo> bookingList) {
		this.bookingList = bookingList;
	}
	public List<HairdresserVo> getHairdresserList() {
		return hairdresserList;
	}
	public void setHairdresserList(List<HairdresserVo> hairdresserList) {
		this.hairdresserList = hairdresserList;
	}
}
