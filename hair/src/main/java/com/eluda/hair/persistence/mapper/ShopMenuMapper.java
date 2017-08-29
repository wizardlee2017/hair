package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.vo.ShopMenuVo;

@Mapper
public interface ShopMenuMapper {
	public List<ShopMenuVo> getShopMenuList(@Param("shopId") String shopId, @Param("typeId") String typeId);
	
}
