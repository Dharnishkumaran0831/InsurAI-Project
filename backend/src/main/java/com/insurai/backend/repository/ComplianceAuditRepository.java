package com.insurai.backend.repository;

import com.insurai.backend.entity.ComplianceAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplianceAuditRepository extends JpaRepository<ComplianceAudit, Long> {
    List<ComplianceAudit> findByEmployeeEmail(String employeeEmail);
}
