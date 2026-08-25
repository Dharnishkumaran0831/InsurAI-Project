package com.insurai.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "compliance_audits")
public class ComplianceAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private Integer complianceScore;

    private Integer missingClausesCount;

    private Integer highRiskConditionsCount;

    private LocalDateTime auditDate;

    private String employeeEmail;

    @Column(columnDefinition = "LONGTEXT")
    private String resultJson;

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Integer getComplianceScore() {
        return complianceScore;
    }

    public void setComplianceScore(Integer complianceScore) {
        this.complianceScore = complianceScore;
    }

    public Integer getMissingClausesCount() {
        return missingClausesCount;
    }

    public void setMissingClausesCount(Integer missingClausesCount) {
        this.missingClausesCount = missingClausesCount;
    }

    public Integer getHighRiskConditionsCount() {
        return highRiskConditionsCount;
    }

    public void setHighRiskConditionsCount(Integer highRiskConditionsCount) {
        this.highRiskConditionsCount = highRiskConditionsCount;
    }

    public LocalDateTime getAuditDate() {
        return auditDate;
    }

    public void setAuditDate(LocalDateTime auditDate) {
        this.auditDate = auditDate;
    }

    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    public String getResultJson() {
        return resultJson;
    }

    public void setResultJson(String resultJson) {
        this.resultJson = resultJson;
    }
}
