import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const contextData = await request.json();
    
    const systemPrompt = `You are a B2B Lead Generation and RevOps expert.
The user is filling out an Ideal Customer Profile (ICP) for Apollo.io lead generation, but their current query is returning 0 or very few leads because it is too restrictive or has conflicting constraints.

### IMPORTANT APOLLO SEARCH LOGIC:
- Apollo uses **AND logic across different filters** (e.g., Job Titles AND Industry AND Geography). If you fill multiple fields, they intersect. To fix 0 results, you must simplify, shorten, or completely REMOVE constraints in some of the fields to reduce the strict AND intersections.
- Apollo uses **OR logic within a single filter** (e.g., Job Titles: CEO, Founder, Director). If you want to safely expand the total lead pool, add more synonyms to a single field (separated by commas).

Your task is to logically optimize, refine, or simplify their search parameters based on their case studies and current customers. If they have too many conflicting, ultra-specific constraints (e.g., a highly restrictive tech stack + narrow job titles + specific dream logos), REMOVE or simplify the conflicting constraints so they can find their ideal lead. Do not just blindly add more keywords; utilize the OR logic smartly within single fields, and loosen the AND logic across different fields to hit true ICP targets. NEVER stray too far from their actual core value proposition.

You are ONLY allowed to recommend changes to the following fields:
1. jobTitles (Comma separated list)
2. targetIndustries (Comma separated list)
3. techStack (Comma separated list)
4. dreamLogos (Domains separated by newlines or comma)
5. headcount (List of ranges e.g. ["201-500", "501-1000", "1001-2000", "2001-5000", "5001-10000", "10001+"])
6. revenue (Object with min and max, e.g. { min: 10000000, max: 500000000 }. Min/max can be null)
7. seniority (Array of valid options from: ["C-Suite", "VP / Director", "Manager", "Individual Contributor", "Any"])

You MUST respond strictly with valid JSON outpus matching the following schema EXACTLY:
{
  "explanation": "A short, 2-sentence explanation of why improving these parameters will yield better target lists.",
  "suggestions": {
    "jobTitles": "string",
    "targetIndustries": "string",
    "techStack": "string",
    "dreamLogos": "string",
    "headcount": ["string", "string"],
    "revenue": { "min": 0, "max": 0 },
    "seniority": ["string"]
  }
}

Do NOT wrap the response in markdown blocks (e.g. \`\`\`json). Just the raw JSON object. Use logical expansions.`;

    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Raw user ICP data to analyze: ${JSON.stringify(contextData)}` }
        ],
        temperature: 0.3
      })
    });

    const data = await openAiRes.json();
    
    if (data.error) throw new Error(data.error.message);
    
    // Parse the GPT JSON output safely
    console.log(data.choices[0].message.content);
    let gptOutput = data.choices[0].message.content.trim();
    if (gptOutput.startsWith('```json')) gptOutput = gptOutput.replace(/^```json/, '').replace(/```$/, '').trim();
    
    const parsedData = JSON.parse(gptOutput);

    return NextResponse.json(parsedData);

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
