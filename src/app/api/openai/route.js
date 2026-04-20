import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { fieldName, currentValue, geographyContext } = await request.json();
    
    // Strict instructions for the AI on how to process different Apollo fields
    const systemPrompt = `You are an expert sales operations assistant specializing in Apollo.io data filtering.
The user is filling out a B2B Lead Generation form. 
They have provided a raw input for the field "${fieldName}".

Your exact task is to rewrite, expand, or restructure their raw input to perfectly match Apollo.io's strict keyword and location matching syntax.

RULES:
1. If the field is "Geography", Apollo requires a strict comma-separated list of valid cities/countries WITHOUT parentheses. For example, "India (Pune, Chennai)" must become "India, Pune, Chennai".
2. If the field is "Job titles", expand the abbreviations, provide 2-3 logical synonymous titles in the same string, and format consistently in a comma-separated list. Remember that Apollo treats comma-separated lists in a single field as an 'OR' logic filter, so adding commas safely expands the search pool.
3. Keep your response RAW. ONLY return the final comma-separated/newline-separated string, do NOT include quotes around your answer, do not say "Here is your suggestion". Just output the exact text string to populate the input box.
4. If it's tech stack or industries, just clean up the spelling and format cleanly separated by commas.
5. If the field is "Dream Logos", convert the company names to their exact website domains (e.g. apple.com). Use the context geography ("${geographyContext}") to narrow down regional variations (e.g., if geography is UAE, "Khalifa University" becomes khalifauniversity.ac.ae). If you cannot confidently find or verify the domain, simply REMOVE it. Return the domains separated by commas.
`;

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
          { role: "user", content: `Raw input: ${currentValue}` }
        ],
        temperature: 0.2
      })
    });

    const data = await openAiRes.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    const suggestedText = data.choices[0].message.content.trim();
    return NextResponse.json({ suggestion: suggestedText });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
