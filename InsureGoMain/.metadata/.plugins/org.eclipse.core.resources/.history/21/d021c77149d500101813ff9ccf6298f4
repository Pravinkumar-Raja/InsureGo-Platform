package com.example.demo.bean;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="policies")
public class Policy {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;
private Long userId;
private Long providerId;
private String policyNumber;
private String coverageType;
private Double coverageAmount;
private Double remainingBalance;
private LocalDate issueDate;
private LocalDate expiryDate;
private Boolean autoRenewalEnabled=false;
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public Long getUserId() {
	return userId;
}
public void setUserId(Long userId) {
	this.userId = userId;
}
public Long getProviderId() {
	return providerId;
}
public void setProviderId(Long providerId) {
	this.providerId = providerId;
}
public String getPolicyNumber() {
	return policyNumber;
}
public void setPolicyNumber(String policyNumber) {
	this.policyNumber = policyNumber;
}
public String getCoverageType() {
	return coverageType;
}
public void setCoverageType(String coverageType) {
	this.coverageType = coverageType;
}
public Double getCoverageAmount() {
	return coverageAmount;
}
public void setCoverageAmount(Double coverageAmount) {
	this.coverageAmount = coverageAmount;
}
public Double getRemainingBalance() {
	return remainingBalance;
}
public void setRemainingBalance(Double remainingBalance) {
	this.remainingBalance = remainingBalance;
}
public LocalDate getIssueDate() {
	return issueDate;
}
public void setIssueDate(LocalDate issueDate) {
	this.issueDate = issueDate;
}
public LocalDate getExpiryDate() {
	return expiryDate;
}
public void setExpiryDate(LocalDate expiryDate) {
	this.expiryDate = expiryDate;
}
public Boolean getAutoRenewalEnabled() {
	return autoRenewalEnabled;
}
public void setAutoRenewalEnabled(Boolean autoRenewalEnabled) {
	this.autoRenewalEnabled = autoRenewalEnabled;
}
@Override
public String toString() {
	return "Policy [id=" + id + ", userId=" + userId + ", providerId=" + providerId + ", policyNumber=" + policyNumber
			+ ", coverageType=" + coverageType + ", coverageAmount=" + coverageAmount + ", remainingBalance="
			+ remainingBalance + ", issueDate=" + issueDate + ", expiryDate=" + expiryDate + ", autoRenewalEnabled="
			+ autoRenewalEnabled + "]";
}

}
