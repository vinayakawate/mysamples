package com.vinayak.assignment.acodemo.entities;

import java.util.List;

public class SearchResult {
	
	String total;
	String totalHits;
	List<Customer> hits;
	
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public String getTotalHits() {
		return totalHits;
	}
	public void setTotalHits(String totalHits) {
		this.totalHits = totalHits;
	}
	public List<Customer> getHits() {
		return hits;
	}
	public void setHits(List<Customer> hits) {
		this.hits = hits;
	}
	
	@Override
	public String toString() {
		return "Result [total=" + total + ", totalHits=" + totalHits + ", hits=" + hits + "]";
	}
	
	
	

}
