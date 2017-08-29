package com.eluda.hair.service;


import java.util.List;

import com.eluda.hair.persistence.vo.ShopMenuVo;

public interface ShopMenuService {
	
	public List<ShopMenuVo> getShopMenuList(String shopId, String menuTypeId);
	
}
