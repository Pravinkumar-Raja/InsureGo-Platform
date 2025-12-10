package com.example.demo.bean;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="claims")
public class Claim {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;
private Long policyId;
private Long userId;
private Long doctorId;
private Long visitId;
private String claimStatus;
private String rejectionReason;
private String claimAmount;
private String approvedAmount;
private LocalDateTime submittedDate=LocalDateTime.now();
private LocalDateTime updatedDate=LocalDateTime.now();

public LocalDateTime getUpdatedDate() {
	return updatedDate;
}
public void setUpdatedDate(LocalDateTime updatedDate) {
	this.updatedDate = updatedDate;
}
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public Long getPolicyId() {
	return policyId;
}
public void setPolicyId(Long policyId) {
	this.policyId = policyId;
}
public Long getUserId() {
	return userId;
}
public void setUserId(Long userId) {
	this.userId = userId;
}
public Long getDoctorId() {
	return doctorId;
}
public void setDoctorId(Long doctorId) {
	this.doctorId = doctorId;
}
public Long getVisitId() {
	return visitId;
}
public void setVisitId(Long visitId) {
	this.visitId = visitId;
}
public String getClaimStatus() {
	return claimStatus;
}
public void setClaimStatus(String claimStatus) {
	this.claimStatus = claimStatus;
}
public String getRejectionReason() {
	return rejectionReason;
}
public void setRejectionReason(String rejectionReason) {
	this.rejectionReason = rejectionReason;
}
public String getClaimAmount() {
	return claimAmount;
}
public void setClaimAmount(String claimAmount) {
	this.claimAmount = claimAmount;
}
public String getApprovedAmount() {
	return approvedAmount;
}
public void setApprovedAmount(String approvedAmount) {
	this.approvedAmount = approvedAmount;
}
public LocalDateTime getSubmittedDate() {
	return submittedDate;
}
public void setSubmittedDate(LocalDateTime submittedDate) {
	this.submittedDate = submittedDate;
}

}

