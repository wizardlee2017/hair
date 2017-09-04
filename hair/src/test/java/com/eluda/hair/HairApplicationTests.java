package com.eluda.hair;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HairApplicationTests {
	
	Logger logger = LoggerFactory.getLogger(HairApplicationTests.class);

	@Test
	public void contextLoads() {
	}
	
	@Test
	public void temporaryTest() {
		String dateStr = new SimpleDateFormat("yyyyMMddHHmmss", Locale.ENGLISH).format(new Date());
		
		logger.debug("date : {}", dateStr);
		
	}

}
