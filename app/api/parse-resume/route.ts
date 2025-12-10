import { NextRequest, NextResponse } from 'next/server';

interface ResumeData {
  name?: string;
  email?: string;
  location?: string;
  summary?: string;
  experience?: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  skills?: string[];
  projects?: Array<{
    title: string;
    description: string;
    technologies?: string;
  }>;
}


async function parseResumeWithOpenRouter(imageData: string[]): Promise<ResumeData> {
  if (!process.env.OPENROUTER_KEY) {
    const err: any = new Error('OPENROUTER_KEY is not set in environment variables');
    err.status = 401;
    throw err;
  }

  const modelName =
    process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.2-11b-vision-instruct';

  const prompt = `You are an expert at extracting portfolio-relevant information from resumes. Extract ONLY the most important information suitable for a portfolio website:

1. NAME - Full name (from header)
2. EMAIL - Email address (from header)
3. LOCATION - City, State/Country (from header, optional)
4. SUMMARY - Professional summary or objective (2-3 sentences max, make it concise)
5. EXPERIENCE - Only the TOP 2-3 most recent/relevant positions with:
   - Job title
   - Company name
   - Duration (Start Date - End Date)
   - Brief description (2-3 key achievements or responsibilities, keep it concise)
6. EDUCATION - Only the highest/most relevant degree:
   - Degree name
   - Institution name
   - Year (optional)
7. SKILLS - Only the most important/relevant skills (top 8-12 skills, prioritize technical and relevant skills)
8. PROJECTS - Only the TOP 2-4 most relevant projects with:
   - Project title
   - Short description (1–3 sentences, concise)
   - Key technologies used (as a single string, e.g. "React, Node.js, PostgreSQL")

EXCLUDE: Phone numbers, certifications, and less relevant experience/education. Focus on what would be displayed on a professional portfolio website.

Return ONLY valid JSON without any markdown formatting, code blocks, or explanations. The JSON structure must be:
{
  "name": "Full Name",
  "email": "email@example.com",
  "location": "City, State/Country",
  "summary": "Concise professional summary (2-3 sentences)",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Start Date - End Date",
      "description": "Brief description with 2-3 key points"
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "year": "Year"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "projects": [
    {
      "title": "Project Title",
      "description": "Short description of the project.",
      "technologies": "React, Node.js, PostgreSQL"
    }
  ]
}

IMPORTANT: Keep all text concise and portfolio-focused. Limit experience to top 2-3 positions, education to highest degree, skills to 8-12 most relevant, and projects to the 2-4 strongest ones. If a field is not present, use null for strings or empty arrays []. Return ONLY the JSON object, nothing else.`;

  try {
    const imageParts = imageData.map((img) => {
      const base64Data = img.includes(',') ? img.split(',')[1] : img;
      if (!base64Data || base64Data.length === 0) {
        throw new Error('Invalid image data format');
      }
      return {
        type: 'image_url' as const,
        image_url: {
          url: `data:image/png;base64,${base64Data}`,
        },
      };
    });

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Resume Parser',
      },
      body: JSON.stringify({
        model: modelName,
        temperature: 0.2,
        max_tokens: 900,
        messages: [
          {
            role: 'system',
            content:
              'You are a resume parser that returns strict JSON matching the requested schema. Do not include any markdown fences or explanations.',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              ...imageParts,
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      const err: any = new Error(
        `OpenRouter request failed: ${response.status} ${response.statusText} - ${errText}`
      );
      err.status = response.status;
      throw err;
    }

    const data = await response.json();

    const content = data?.choices?.[0]?.message?.content;
    const text =
      Array.isArray(content) && content.length > 0
        ? content.map((part: any) => part?.text || '').join('').trim()
        : (content || '').trim();
    if (!text) {
      throw new Error('Empty response from AI model');
    }

    let jsonText = text.trim();

    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n?/i, '').replace(/\n?```$/i, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n?/i, '').replace(/\n?```$/i, '');
    }

    const extractJson = (input: string) => {
      // try simple { ... } match first
      const simple = input.match(/\{[\s\S]*\}/);
      if (simple) return simple[0];

      // fallback: stack-based brace matching to recover largest JSON-like block
      let start = -1;
      let depth = 0;
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === '{') {
          if (depth === 0) start = i;
          depth++;
        } else if (ch === '}') {
          depth--;
          if (depth === 0 && start !== -1) {
            return input.slice(start, i + 1);
          }
        }
      }
      return input;
    };

    jsonText = extractJson(jsonText);

    let parsedData;
    try {
      parsedData = JSON.parse(jsonText);
    } catch (parseError: any) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response (first 500 chars):', text.substring(0, 500));
      console.error('Extracted JSON candidate (first 500 chars):', jsonText.substring(0, 500));
      throw new Error('Failed to parse AI response. Please retry with a clearer PDF or try again in a moment.');
    }

    if (!parsedData || typeof parsedData !== 'object') {
      throw new Error('Invalid response format from AI');
    }

    return {
      name: parsedData.name || null,
      email: parsedData.email || null,
      location: parsedData.location || null,
      summary: parsedData.summary || null,
      experience: Array.isArray(parsedData.experience) ? parsedData.experience : [],
      education: Array.isArray(parsedData.education) ? parsedData.education : [],
      skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
      projects: Array.isArray(parsedData.projects) ? parsedData.projects : [],
    } as ResumeData;
  } catch (error: any) {
    console.error('Error parsing resume with OpenRouter:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      status: error.status,
      statusText: error.statusText,
    });

    const message = String(error?.message || '').toLowerCase();
    if (message.includes('api key') || message.includes('unauthorized') || message.includes('openrouter')) {
      const err: any = new Error('Invalid or missing OPENROUTER_KEY. Please check your .env.local file.');
      err.status = 401;
      throw err;
    }
    if (message.includes('rate limit') || message.includes('quota') || error.status === 429) {
      const err: any = new Error('OpenRouter API rate limit exceeded. Please try again later.');
      err.status = 429;
      throw err;
    }
    if (message.includes('json') || message.includes('parse')) {
      throw new Error('Failed to parse AI response. The resume format might be too complex. Please try with a clearer PDF.');
    }

    throw new Error(error.message || 'Failed to parse resume. Please ensure the PDF is clear and readable.');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { images } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      );
    }

    const resumeData = await parseResumeWithOpenRouter(images);

    return NextResponse.json({ success: true, data: resumeData });
  } catch (error: any) {
    console.error('Error processing resume:', error);
    const message = String(error?.message || '').toLowerCase();
    let status = (error as any)?.status || 500;
    if (message.includes('rate limit') || message.includes('quota')) {
      status = 429;
    } else if (message.includes('api key')) {
      status = status === 500 ? 401 : status;
    }
    return NextResponse.json(
      { error: error.message || 'Failed to process resume' },
      { status }
    );
  }
}

