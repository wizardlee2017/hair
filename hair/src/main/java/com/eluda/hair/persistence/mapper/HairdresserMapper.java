package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.vo.HairdresserVo;

@Mapper
public interface HairdresserMapper {
	public List<HairdresserVo> getShopHairDresserList(@Param("shopId") String shopId);
	
}
