package com.vinayak.assignment.acodemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vinayak.assignment.acodemo.entities.Customer;
import com.vinayak.assignment.acodemo.entities.SearchResult;
import com.vinayak.assignment.acodemo.repository.CustomerRepository;

@RestController
public class ApplicationController {

	@Autowired
	private CustomerRepository customerRepository;

	@CrossOrigin(origins = { "http://localhost:3000" })
	@RequestMapping("/findCustomer")
	public SearchResult findByLastNameLikeAsc(@RequestParam int pageNo, @RequestParam String lastName) {
		
		Pageable resultElements = PageRequest.of(pageNo-1, 10, Sort.by("lastName"));
		
		Page<Customer> resultpage =  customerRepository.findByLastNameLike("%"+lastName+"%", resultElements);
		
		resultpage.getTotalElements();
		resultpage.getContent();
		resultpage.getSort();
		
		SearchResult searchResult = new SearchResult();
		searchResult.setHits(resultpage.getContent());
		searchResult.setTotal(String.valueOf(resultpage.getTotalElements()));
		searchResult.setTotalHits(String.valueOf(resultpage.getContent().size()));
		
		return searchResult;
	}

}
