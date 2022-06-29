package models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Drugs {
    @Id
    private Integer drugs_id;
    private Integer prescription_id;
    private String drug_name;
    private String dosage;
    private String frequency;
    private Integer units;

    public Integer getDrugs_id() {
        return drugs_id;
    }

    public void setDrugs_id(Integer drugs_id) {
        this.drugs_id = drugs_id;
    }

    public Integer getPrescription_id() {
        return prescription_id;
    }

    public void setPrescription_id(Integer prescription_id) {
        this.prescription_id = prescription_id;
    }

    public String getDrug_name() {
        return drug_name;
    }

    public void setDrug_name(String drug_name) {
        this.drug_name = drug_name;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public Integer getUnits() {
        return units;
    }

    public void setUnits(Integer units) {
        this.units = units;
    }


}
