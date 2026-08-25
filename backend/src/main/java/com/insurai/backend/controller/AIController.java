package com.insurai.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.insurai.backend.entity.ComplianceAudit;
import com.insurai.backend.repository.ComplianceAuditRepository;
import com.insurai.backend.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final GeminiService geminiService;
    private final ComplianceAuditRepository complianceAuditRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AIController(GeminiService geminiService, ComplianceAuditRepository complianceAuditRepository) {
        this.geminiService = geminiService;
        this.complianceAuditRepository = complianceAuditRepository;
    }

    @PostMapping("/compliance-check")
    public ResponseEntity<?> checkCompliance(@RequestBody Map<String, String> request) {
        String policyText = request.getOrDefault("policyText", "");
        String fileName = request.getOrDefault("fileName", "Pasted Text");
        String employeeEmail = request.getOrDefault("employeeEmail", "anonymous@company.com");

        if (policyText.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Policy text cannot be empty");
        }

        String prompt = "You are an expert corporate policy auditor. Analyze the following policy document for compliance. "
                + "Return a raw JSON object containing exactly these fields: "
                + "score (integer 0-100), "
                + "missingClauses (array of objects, each with 'clause', 'severity', and 'description'), "
                + "highRiskConditions (array of objects, each with 'condition', 'severity', 'description', and 'location'), "
                + "and recommendations (array of objects, each with 'title' and 'description'). "
                + "Provide realistic analysis based on compliance best practices. "
                + "IMPORTANT: Return ONLY the raw JSON string. Do not wrap it in ```json ... ``` or add any markdown formatting. "
                + "Here is the policy:\n\n" + policyText;

        String geminiResponse = geminiService.generateContent(prompt).trim();
        
        // Clean markdown code blocks if Gemini ignores instruction
        if (geminiResponse.startsWith("```")) {
            geminiResponse = geminiResponse.replaceAll("^```json\\s*", "")
                                           .replaceAll("^```\\s*", "")
                                           .replaceAll("\\s*```$", "");
        }

        try {
            // Parse response to extract metrics and validate JSON
            Map parsed = objectMapper.readValue(geminiResponse, Map.class);
            Integer score = (Integer) parsed.getOrDefault("score", 70);
            List missingClauses = (List) parsed.get("missingClauses");
            List highRiskConditions = (List) parsed.get("highRiskConditions");

            // Persist the audit details to the database!
            ComplianceAudit audit = new ComplianceAudit();
            audit.setFileName(fileName);
            audit.setComplianceScore(score);
            audit.setMissingClausesCount(missingClauses != null ? missingClauses.size() : 0);
            audit.setHighRiskConditionsCount(highRiskConditions != null ? highRiskConditions.size() : 0);
            audit.setEmployeeEmail(employeeEmail);
            audit.setAuditDate(LocalDateTime.now());
            audit.setResultJson(geminiResponse);

            complianceAuditRepository.save(audit);

            return ResponseEntity.ok(parsed);
        } catch (Exception e) {
            System.err.println("JSON parsing failed, returning raw response: " + e.getMessage());
            // Return raw string if JSON parsing failed
            Map<String, String> errMap = new HashMap<>();
            errMap.put("error", "Failed to parse AI response");
            errMap.put("rawResponse", geminiResponse);
            return ResponseEntity.ok(errMap);
        }
    }

    @PostMapping("/policy-recommendation")
    public ResponseEntity<?> getRecommendation(@RequestBody Map<String, Object> request) {
        Map profile = (Map) request.get("profile");
        if (profile == null) {
            return ResponseEntity.badRequest().body("Profile details are required");
        }

        String prompt = "Recommend the best corporate insurance policies for an employee with the following profile: "
                + profile.toString() + ". "
                + "Suggest exactly two realistic corporate policies. Return a raw JSON array of recommended policies, "
                + "where each policy object has exactly these fields: "
                + "id (integer), name (string), provider (string), coverage (string), premium (string), matchScore (integer 0-100), "
                + "and features (array of strings). "
                + "IMPORTANT: Return ONLY the raw JSON array string. Do not wrap it in ```json ... ``` or add any markdown formatting.";

        String geminiResponse = geminiService.generateContent(prompt).trim();

        // Clean markdown code blocks if Gemini ignores instruction
        if (geminiResponse.startsWith("```")) {
            geminiResponse = geminiResponse.replaceAll("^```json\\s*", "")
                                           .replaceAll("^```\\s*", "")
                                           .replaceAll("\\s*```$", "");
        }

        try {
            List parsed = objectMapper.readValue(geminiResponse, List.class);
            return ResponseEntity.ok(parsed);
        } catch (Exception e) {
            System.err.println("JSON parsing failed, returning raw response: " + e.getMessage());
            return ResponseEntity.ok(geminiResponse);
        }
    }

    @GetMapping("/audit-history")
    public ResponseEntity<?> getAuditHistory(@RequestParam String email) {
        List<ComplianceAudit> audits = complianceAuditRepository.findByEmployeeEmail(email);
        return ResponseEntity.ok(audits);
    }
}
