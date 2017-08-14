package com.eluda.hair.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {
	@RequestMapping("/test")
    public String test(Model model){
	//public void index(Model model){
		
		model.addAttribute("name", "aaatesttttttt");
		
    	return "test";
    }
}
