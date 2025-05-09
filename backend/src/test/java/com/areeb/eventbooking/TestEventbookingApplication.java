package com.areeb.eventbooking;

import org.springframework.boot.SpringApplication;

public class TestEventbookingApplication {

	public static void main(String[] args) {
		SpringApplication.from(EventbookingApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
