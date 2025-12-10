package com.example.demo.bean;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="documents")
public class Document {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;
private Long userid;
private Long policyId;
private String documentType;
private String fileName;
private String fileUrl;
private String fileFormat;
private Long fileSize;
private LocalDateTime uploadedAt=LocalDateTime.now();
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public Long getUserid() {
	return userid;
}
public void setUserid(Long userid) {
	this.userid = userid;
}
public Long getPolicyId() {
	return policyId;
}
public void setPolicyId(Long policyId) {
	this.policyId = policyId;
}
public String getDocumentType() {
	return documentType;
}
public void setDocumentType(String documentType) {
	this.documentType = documentType;
}
public String getFileName() {
	return fileName;
}
public void setFileName(String fileName) {
	this.fileName = fileName;
}
public String getFileUrl() {
	return fileUrl;
}
public void setFileUrl(String fileUrl) {
	this.fileUrl = fileUrl;
}
public String getFileFormat() {
	return fileFormat;
}
public void setFileFormat(String fileFormat) {
	this.fileFormat = fileFormat;
}
public Long getFileSize() {
	return fileSize;
}
public void setFileSize(Long fileSize) {
	this.fileSize = fileSize;
}
public LocalDateTime getUploadedAt() {
	return uploadedAt;
}
public void setUploadedAt(LocalDateTime uploadedAt) {
	this.uploadedAt = uploadedAt;
}

}
