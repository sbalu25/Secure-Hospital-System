package models;


import com.example.security.entity.InsuranceClaimDao;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class Transactions {



    @Id
    private Integer id;
    private String transaction_id;
    private Integer patient_id;
    private String patient_name;
    private String transaction_type;
    private Integer amount;
    private String status;
    private Timestamp time;
    private String notes;
    private String created_by;
    private String approved_by;
    private Integer approved_by_id;
    private List<InsuranceClaimDao> claim;

    public String getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(String transaction_id) {
        this.transaction_id = transaction_id;
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

    public String getTransaction_type() {
        return transaction_type;
    }

    public void setTransaction_type(String transaction_type) {
        this.transaction_type = transaction_type;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getCreated_by() {
        return created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public String getApproved_by() {
        return approved_by;
    }

    public void setApproved_by(String approved_by) {
        this.approved_by = approved_by;
    }

    public Integer getApproved_by_id() {
        return approved_by_id;
    }

    public void setApproved_by_id(Integer approved_by_id) {
        this.approved_by_id = approved_by_id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public List<InsuranceClaimDao> getClaim() {
        return claim;
    }

    public void setClaim(List<InsuranceClaimDao> claim) {
        this.claim = claim;
    }






}
