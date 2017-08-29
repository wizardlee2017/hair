package com.eluda.hair.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eluda.hair.persistence.mapper.ShopMenuMapper;
import com.eluda.hair.persistence.vo.ShopMenuVo;
import com.eluda.hair.service.ShopMenuService;

@Service
public class ShopMenuServiceImpl implements ShopMenuService {

	@Autowired
	private ShopMenuMapper shopMenuMapper;
	
	@Override
	public List<ShopMenuVo> getShopMenuList(String shopId, String menuTypeId) {
		return shopMenuMapper.getShopMenuList(shopId, menuTypeId);
	}

}
