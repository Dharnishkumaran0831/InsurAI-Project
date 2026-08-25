// Google Gemini AI Service
// Free API key from: https://aistudio.google.com/app/apikey

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

// Core function to call Gemini API
export async function callGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    return 'Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.';
  }

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || 'Gemini API error');
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';
}

// Multi-turn chat function
export async function callGeminiChat(messages: GeminiMessage[]): Promise<string> {
  if (!GEMINI_API_KEY) {
    return 'Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.';
  }

  const contents = messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || 'Gemini API error');
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';
}

// Specialized functions for InsurAI use cases

export async function analyzePolicy(policyText: string): Promise<string> {
  const prompt = `You are an expert insurance policy compliance analyst for InsurAI. 
Analyze the following corporate policy document and provide:
1. Key compliance risks (if any)
2. Main policy highlights
3. Recommendations for improvement
4. Overall compliance score (0-100)

Policy Document:
${policyText}

Provide a clear, structured analysis.`;
  return callGemini(prompt);
}

export async function recommendPolicies(employeeInfo: {
  type: string;
  department: string;
  coverageNeeds: string[];
}): Promise<string> {
  const prompt = `You are an InsurAI policy recommendation engine. 
Based on the following employee profile, recommend the most suitable corporate insurance policies:

Employee Type: ${employeeInfo.type}
Department: ${employeeInfo.department}
Coverage Needs: ${employeeInfo.coverageNeeds.join(', ')}

Provide 3 specific policy recommendations with:
- Policy name
- Why it's suitable for this employee
- Key benefits
- Estimated coverage range

Be specific and professional.`;
  return callGemini(prompt);
}

export async function answerPolicyQuery(query: string, context?: string): Promise<string> {
  const prompt = `You are an InsurAI HR policy assistant helping employees understand company policies.
${context ? `Context: ${context}\n` : ''}
Employee Question: ${query}

Provide a helpful, accurate, and professional answer. If you're unsure, recommend contacting the HR department.`;
  return callGemini(prompt);
}

export async function generateComplianceReport(data: {
  employeeName: string;
  department: string;
  policies: string[];
  issues: string[];
}): Promise<string> {
  const prompt = `You are an InsurAI compliance officer. Generate a professional compliance report for:

Employee: ${data.employeeName}
Department: ${data.department}
Assigned Policies: ${data.policies.join(', ')}
Compliance Issues: ${data.issues.length > 0 ? data.issues.join(', ') : 'None'}

Generate a concise compliance summary with:
1. Overall compliance status
2. Issues found (if any)
3. Recommended actions
4. Compliance score`;
  return callGemini(prompt);
}
