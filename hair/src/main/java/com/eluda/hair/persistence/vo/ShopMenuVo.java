package com.eluda.hair.persistence.vo;

public class ShopMenuVo {
	
	private String id;
	private String shopId;
	private String typeId;
	private String name;
	private String commonMenuId;
	private double price;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getShopId() {
		return shopId;
	}
	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
	public String getTypeId() {
		return typeId;
	}
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCommonMenuId() {
		return commonMenuId;
	}
	public void setCommonMenuId(String commonMenuId) {
		this.commonMenuId = commonMenuId;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	
	/*`id` VARCHAR(50) NOT NULL COMMENT '미용실별 메뉴 id',
	`shop_id` VARCHAR(50) NOT NULL COMMENT '미용실 id',
	`type_id` VARCHAR(50) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`common_menu_id` VARCHAR(50) NULL DEFAULT NULL,
	`price` DECIMAL(10,0) NULL DEFAULT NULL,
	`delete_yn` BIT(1) NULL DEFAULT b'0' COMMENT '삭제 여부. 0:미삭제, 1:삭제',*/
}
