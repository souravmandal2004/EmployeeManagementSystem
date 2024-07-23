package com.employee.server.employeeServer.service;

import com.employee.server.employeeServer.entity.Employee;
import com.employee.server.employeeServer.repository.EmployeeRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepo employeeRepo;

    // post employee
    public Employee postEmployee (Employee employee) {
        return employeeRepo.save (employee);
    }

    // get all employee
    public List<Employee> getAllEmployees () {
        return employeeRepo.findAll ();
    }

    // delete employee
    public void deleteEmployee (Long id) {
        if (!employeeRepo.existsById(id)) {
            throw new EntityNotFoundException("Employee with ID " + id + " not found");
        }
        employeeRepo.deleteById(id);
    }

    // get employee by id
    public Employee getEmployeeById (Long id) {
        return employeeRepo.findById(id).orElse(null);
    }


    // update Employee
    public Employee updateEmployee (Long id, Employee employee) {
        Optional <Employee> optionalEmployee = employeeRepo.findById(id);

        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();

            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setName(employee.getName());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());

            return employeeRepo.save (existingEmployee);
        }
        return null;
    }
}
