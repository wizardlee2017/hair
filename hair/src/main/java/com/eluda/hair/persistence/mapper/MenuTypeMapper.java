package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.vo.MenuTypeVo;

@Mapper
public interface MenuTypeMapper {
	public List<MenuTypeVo> getMenuTypeList(@Param("languageId") String languageId);
	
}
