package com.employee.server.employeeServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class EmployeeServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeServerApplication.class, args);
	}

	@RequestMapping(value = "/")
	public String hello() {
		return "Welcome to Mandal's Backend Universe";
	}

}
