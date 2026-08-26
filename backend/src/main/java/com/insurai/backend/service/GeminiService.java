package com.insurai.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GeminiService {

    @Value("${GEMINI_API_KEY:}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateContent(String prompt) {
        String key = apiKey;
        if (key == null || key.isEmpty() || key.contains("your_gemini_api_key")) {
            key = System.getenv("GEMINI_API_KEY");
        }

        if (key == null || key.isEmpty() || key.contains("your_gemini_api_key")) {
            System.out.println("WARNING: GEMINI_API_KEY is not set. Returning mock fallback response.");
            return getMockResponseForPrompt(prompt);
        }

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + key;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        List<Map<String, Object>> contents = new ArrayList<>();
        Map<String, Object> contentMap = new HashMap<>();
        List<Map<String, Object>> parts = new ArrayList<>();
        Map<String, Object> partMap = new HashMap<>();
        
        partMap.put("text", prompt);
        parts.add(partMap);
        contentMap.put("parts", parts);
        contents.add(contentMap);
        requestBody.put("contents", contents);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return extractTextFromResponse(response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Gemini API request failed: " + e.getMessage());
        }

        return getMockResponseForPrompt(prompt);
    }

    private String extractTextFromResponse(Map responseBody) {
        try {
            List candidates = (List) responseBody.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map candidate = (Map) candidates.get(0);
                Map content = (Map) candidate.get("content");
                if (content != null) {
                    List parts = (List) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        Map part = (Map) parts.get(0);
                        return (String) part.get("text");
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to parse Gemini response: " + e.getMessage());
        }
        return "";
    }

    private String getMockResponseForPrompt(String prompt) {
        if (prompt.contains("compliance") || prompt.contains("Compliance")) {
            return "{\n" +
                   "  \"score\": 85,\n" +
                   "  \"missingClauses\": [\n" +
                   "    {\n" +
                   "      \"clause\": \"Data Protection & Privacy Terms\",\n" +
                   "      \"severity\": \"high\",\n" +
                   "      \"description\": \"The policy document does not specify employee data privacy rights (e.g. GDPR/CCPA compliance).\"\n" +
                   "    },\n" +
                   "    {\n" +
                   "      \"clause\": \"Force Majeure Clause\",\n" +
                   "      \"severity\": \"medium\",\n" +
                   "      \"description\": \"Missing protection terms for unforeseen severe events that prevent policy fulfillment.\"\n" +
                   "    }\n" +
                   "  ],\n" +
                   "  \"highRiskConditions\": [\n" +
                   "    {\n" +
                   "      \"condition\": \"Unlimited Liability on Claims\",\n" +
                   "      \"severity\": \"critical\",\n" +
                   "      \"description\": \"No upper monetary boundary set on claims can result in unbounded expense exposure.\",\n" +
                   "      \"location\": \"Section 3.1\"\n" +
                   "    }\n" +
                   "  ],\n" +
                   "  \"recommendations\": [\n" +
                   "    {\n" +
                   "      \"title\": \"Define Maximum Liability Limits\",\n" +
                   "      \"description\": \"Explicitly cap the maximum corporate payout per claim to mitigate budget overruns.\"\n" +
                   "    },\n" +
                   "    {\n" +
                   "      \"title\": \"Incorporate Data Privacy Section\",\n" +
                   "      \"description\": \"Add a section detailing the processing of employee health information in compliance with local regulations.\"\n" +
                   "    }\n" +
                   "  ]\n" +
                   "}";
        } else if (prompt.contains("recommend") || prompt.contains("profile")) {
            return "[\n" +
                   "  {\n" +
                   "    \"id\": 1,\n" +
                   "    \"name\": \"Gold Health Care Plan\",\n" +
                   "    \"provider\": \"InsurShield\",\n" +
                   "    \"coverage\": \"Medical, Dental, Vision, Specialist consultation\",\n" +
                   "    \"premium\": \"$150/month\",\n" +
                   "    \"matchScore\": 98,\n" +
                   "    \"features\": [\n" +
                   "      \"Zero deductible for medical treatments\",\n" +
                   "      \"Includes coverage for spouse and up to 3 children\",\n" +
                   "      \"Worldwide emergency medical evacuation protection\"\n" +
                   "    ]\n" +
                   "  },\n" +
                   "  {\n" +
                   "    \"id\": 2,\n" +
                   "    \"name\": \"Standard Preventive Health Plan\",\n" +
                   "    \"provider\": \"CareFirst\",\n" +
                   "    \"coverage\": \"Basic Medical, Annual wellness checkups\",\n" +
                   "    \"premium\": \"$80/month\",\n" +
                   "    \"matchScore\": 82,\n" +
                   "    \"features\": [\n" +
                   "      \"100% covered annual checkups and basic diagnostics\",\n" +
                   "      \"Flexible HSA card with $500 employer contribution\"\n" +
                   "    ]\n" +
                   "  }\n" +
                   "]";
        }
        return "As an InsurAI Assistant, I am here to help you understand company policies, employee benefits, health insurance coverage, and compliance guidelines. Please let me know if you need specific policy details or assistance!";
    }
}
