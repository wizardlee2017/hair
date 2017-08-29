package com.eluda.hair.persistence.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eluda.hair.persistence.vo.ProcedureTypeVo;

@Mapper
public interface ProcedureTypeMapper {
	public List<ProcedureTypeVo> getProcedureTypeList(@Param("languageId") String languageId);
	
}
