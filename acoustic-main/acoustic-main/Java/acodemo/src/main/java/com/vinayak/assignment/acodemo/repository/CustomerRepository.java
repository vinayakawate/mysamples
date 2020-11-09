package com.vinayak.assignment.acodemo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.vinayak.assignment.acodemo.entities.Customer;

@Repository
public interface CustomerRepository extends PagingAndSortingRepository<Customer, Integer> {
	Customer findById(long id);
    List<Customer> findByLastName (String lastName);
    Page<Customer> findByLastNameLike (String lastName, Pageable pageable);
    
}
