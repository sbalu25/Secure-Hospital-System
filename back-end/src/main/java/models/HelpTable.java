package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;


@Entity
public class HelpTable {


    @Id
    private Integer id;
    private Integer patient_id;
    private String patient_name;
    private String patient_mail;
    private String request;
    private String addressed_by;
    private String addressed_name;
    private Timestamp created_time;
    private Timestamp updated_time;

    private String status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(Integer patient_id) {
        this.patient_id = patient_id;
    }

    public String getPatient_name() {
        return patient_name;
    }

    public void setPatient_name(String patient_name) {
        this.patient_name = patient_name;
    }

    public String getPatient_mail() {
        return patient_mail;
    }

    public void setPatient_mail(String patient_mail) {
        this.patient_mail = patient_mail;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getAddressed_by() {
        return addressed_by;
    }

    public void setAddressed_by(String addressed_by) {
        this.addressed_by = addressed_by;
    }

    public String getAddressed_name() {
        return addressed_name;
    }

    public void setAddressed_name(String addressed_name) {
        this.addressed_name = addressed_name;
    }

    public Timestamp getCreated_time() {
        return created_time;
    }

    public void setCreated_time(Timestamp created_time) {
        this.created_time = created_time;
    }

    public Timestamp getUpdated_time() {
        return updated_time;
    }

    public void setUpdated_time(Timestamp updated_time) {
        this.updated_time = updated_time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
