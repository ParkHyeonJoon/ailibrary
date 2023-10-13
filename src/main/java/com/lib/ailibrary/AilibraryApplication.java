package com.lib.ailibrary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AilibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(AilibraryApplication.class, args);
	}

}
