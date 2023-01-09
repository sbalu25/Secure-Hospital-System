package models;


import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class Diagnosis {

    @Id
    private Integer diagnosis_id;
    private Integer doctor_id;
    private Integer patient_id;
    private String symptoms;
    private String previous_medications;
    private String drug_history;
    private String notes;
    private String patient_name;
    private String doctor_name;
    private Timestamp time;

    public Integer getDiagnosis_id() {
        return diagnosis_id;
    }

    public void setDiagnosis_id(Integer diagnosis_id) {
        this.diagnosis_id = diagnosis_id;
    }

    public Integer getDoctor_id() {
        return doctor_id;
    }

    public void setDoctor_id(Integer doctor_id) {
        this.doctor_id = doctor_id;
    }

    public Integer getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(Integer patient_id) {
        this.patient_id = patient_id;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getPrevious_medications() {
        return previous_medications;
    }

    public void setPrevious_medications(String previous_medications) {
        this.previous_medications = previous_medications;
    }

    public String getDrug_history() {
        return drug_history;
    }

    public void setDrug_history(String drug_history) {
        this.drug_history = drug_history;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }


    public String getPatient_name() {
        return patient_name;
    }

    public void setPatient_name(String patient_name) {
        this.patient_name = patient_name;
    }

    public String getDoctor_name() {
        return doctor_name;
    }

    public void setDoctor_name(String doctor_name) {
        this.doctor_name = doctor_name;
    }




}
