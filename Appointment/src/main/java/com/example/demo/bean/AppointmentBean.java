package com.example.demo.bean;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;

@Entity
@Table(name="appointment")
public class AppointmentBean {
public static final String status_confirmed="Confirmed";
public static final String status_Pending="Pending";
public static final String statis_Cancelled="Cancelled";
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long appointmentId;
@Column(nullable=false)
private Long doctorID;
@Column(nullable=false)
private Long patientId;
@Column
private String patientName;
@Column(nullable=false)
private LocalDate appointmentDate;
@Column(nullable=false)
private LocalTime appointmentTime;
@Column
private String ailmentType;
@Column
private String ailmentReason;
@Column(nullable=false)
private String status;
public Long getAppointmentId() {
	return appointmentId;
}
public void setAppointmentId(Long appointmentId) {
	this.appointmentId = appointmentId;
}
public Long getDoctorID() {
	return doctorID;
}
public void setDoctorID(Long doctorID) {
	this.doctorID = doctorID;
}
public Long getPatientId() {
	return patientId;
}
public void setPatientId(Long patientId) {
	this.patientId = patientId;
}
public String getPatientName() {
	return patientName;
}
public void setPatientName(String patientName) {
	this.patientName = patientName;
}
public LocalDate getAppointmentDate() {
	return appointmentDate;
}
public void setAppointmentDate(LocalDate appointmentDate) {
	this.appointmentDate = appointmentDate;
}
public LocalTime getAppointmentTime() {
	return appointmentTime;
}
public void setAppointmentTime(LocalTime appointmentTime) {
	this.appointmentTime = appointmentTime;
}
public String getAilmentType() {
	return ailmentType;
}
public void setAilmentType(String ailmentType) {
	this.ailmentType = ailmentType;
}
public String getAilmentReason() {
	return ailmentReason;
}
public void setAilmentReason(String ailmentReason) {
	this.ailmentReason = ailmentReason;
}
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}
public static String getStatusConfirmed() {
	return status_confirmed;
}
public static String getStatusPending() {
	return status_Pending;
}
public static String getStatisCancelled() {
	return statis_Cancelled;
}
@Override
public String toString() {
	return "AppointmentBean [appointmentId=" + appointmentId + ", doctorID=" + doctorID + ", patientId=" + patientId
			+ ", patientName=" + patientName + ", appointmentDate=" + appointmentDate + ", appointmentTime="
			+ appointmentTime + ", ailmentType=" + ailmentType + ", ailmentReason=" + ailmentReason + ", status="
			+ status + "]";
}


}
