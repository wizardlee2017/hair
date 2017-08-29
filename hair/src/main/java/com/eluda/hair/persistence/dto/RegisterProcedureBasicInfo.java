package com.eluda.hair.persistence.dto;

import java.util.List;

import com.eluda.hair.persistence.vo.HairdresserVo;
import com.eluda.hair.persistence.vo.MenuTypeVo;
import com.eluda.hair.persistence.vo.ProcedureTypeVo;

public class RegisterProcedureBasicInfo {
	private List<HairdresserVo> hairdresserList;
	private List<MenuTypeVo> menuTypeList;
	private List<ProcedureTypeVo> procedureTypeList;
	
	public List<HairdresserVo> getHairdresserList() {
		return hairdresserList;
	}
	public void setHairdresserList(List<HairdresserVo> hairdresserList) {
		this.hairdresserList = hairdresserList;
	}
	public List<MenuTypeVo> getMenuTypeList() {
		return menuTypeList;
	}
	public void setMenuTypeList(List<MenuTypeVo> menuTypeList) {
		this.menuTypeList = menuTypeList;
	}
	public List<ProcedureTypeVo> getProcedureTypeList() {
		return procedureTypeList;
	}
	public void setProcedureTypeList(List<ProcedureTypeVo> procedureTypeList) {
		this.procedureTypeList = procedureTypeList;
	}
}
