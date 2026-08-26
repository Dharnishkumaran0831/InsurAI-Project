// Google Gemini AI Service - Integrated via Spring Boot Backend
// API keys are stored securely on backend (environment variable or application.properties)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

export interface PolicyRecommendationItem {
  id: number;
  name: string;
  provider: string;
  coverage: string;
  premium: string;
  matchScore: number;
  features: string[];
}

// Core function to query Gemini AI via backend
export async function callGemini(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: prompt }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.answer || data.rawText || 'No response from AI.';
  } catch (error: any) {
    console.error('AI Service error:', error);
    throw error;
  }
}

// Multi-turn chat function
export async function callGeminiChat(messages: GeminiMessage[]): Promise<string> {
  const latestMessage = messages[messages.length - 1]?.content || '';
  const conversationContext = messages
    .slice(0, -1)
    .map((m) => `${m.role}: ${m.content}`)
    .join('\n');

  return answerPolicyQuery(latestMessage, conversationContext);
}

// Specialized function to analyze policy compliance
export async function analyzePolicy(policyText: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/compliance-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        policyText,
        fileName: 'Pasted Document',
        employeeEmail: 'user@company.com',
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (typeof data === 'string') return data;
    
    // Format JSON object response cleanly if structured
    if (data.score !== undefined) {
      let summary = `📊 Compliance Score: ${data.score}/100\n\n`;
      if (data.missingClauses?.length) {
        summary += `⚠️ Missing Clauses (${data.missingClauses.length}):\n`;
        data.missingClauses.forEach((mc: any, i: number) => {
          summary += `${i + 1}. ${mc.clause} (${mc.severity}): ${mc.description}\n`;
        });
        summary += '\n';
      }
      if (data.highRiskConditions?.length) {
        summary += `🚨 High Risk Conditions (${data.highRiskConditions.length}):\n`;
        data.highRiskConditions.forEach((hr: any, i: number) => {
          summary += `${i + 1}. ${hr.condition} (${hr.severity}): ${hr.description}\n`;
        });
        summary += '\n';
      }
      if (data.recommendations?.length) {
        summary += `💡 Recommendations:\n`;
        data.recommendations.forEach((rec: any, i: number) => {
          summary += `${i + 1}. ${rec.title}: ${rec.description}\n`;
        });
      }
      return summary;
    }

    return data.rawResponse || JSON.stringify(data, null, 2);
  } catch (error: any) {
    console.error('Compliance analysis error:', error);
    throw error;
  }
}

// Specialized function for Policy Recommendations
export async function recommendPolicies(employeeInfo: {
  type: string;
  department: string;
  coverageNeeds: string[];
}): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/policy-recommendation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profile: employeeInfo }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data)) {
      let formattedText = `### Top Recommended Corporate Policies for ${employeeInfo.type} in ${employeeInfo.department}:\n\n`;
      data.forEach((item: PolicyRecommendationItem, idx: number) => {
        formattedText += `**${idx + 1}. ${item.name}** (Match: ${item.matchScore}%)\n`;
        formattedText += `- **Provider:** ${item.provider}\n`;
        formattedText += `- **Coverage:** ${item.coverage}\n`;
        formattedText += `- **Premium:** ${item.premium}\n`;
        if (item.features?.length) {
          formattedText += `- **Key Features:** ${item.features.join(', ')}\n`;
        }
        formattedText += '\n';
      });
      return formattedText;
    }

    if (data.rawText) return data.rawText;
    return typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  } catch (error: any) {
    console.error('Policy recommendation error:', error);
    throw error;
  }
}

// Specialized function to answer HR / Employee policy queries
export async function answerPolicyQuery(query: string, context?: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, context: context || '' }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.answer || 'No answer generated.';
  } catch (error: any) {
    console.error('Policy query error:', error);
    throw error;
  }
}

// Helper to generate full compliance report string
export async function generateComplianceReport(data: {
  employeeName: string;
  department: string;
  policies: string[];
  issues: string[];
}): Promise<string> {
  const prompt = `Generate a professional compliance report summary for employee ${data.employeeName} (${data.department}) with policies: ${data.policies.join(', ')}. Key issues: ${data.issues.join(', ') || 'None'}.`;
  return callGemini(prompt);
}
