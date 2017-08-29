package com.eluda.hair.persistence.vo;

public class HairdresserVo {
	
	private int id;
	private String name;
	private String nickname;
	private boolean setLookFor;
	private String situation;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public boolean isSetLookFor() {
		return setLookFor;
	}
	public void setSetLookFor(boolean setLookFor) {
		this.setLookFor = setLookFor;
	}
	public String getSituation() {
		return situation;
	}
	public void setSituation(String situation) {
		this.situation = situation;
	}

}
