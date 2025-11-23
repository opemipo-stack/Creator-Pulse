// import { NextRequest, NextResponse } from 'next/server';
// import OpenAI from 'openai';

// function getOpenAIClient() {
//   return new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
// }

// const SYSTEM_PROMPT = `You are Creator Pulse, an AI that analyzes conversations from filmmakers discussing their projects. You take raw scraped social media posts and return structured, actionable insights.

// Return ONLY valid JSON using the following structure:

// {
//   "executive_summary": {
//     "key_topics": [],
//     "weekly_angle": "",
//     "top_engagement_opportunities": []
//   },
//   "themes": [
//     {
//       "theme": "",
//       "whats_happening": "",
//       "rising_keywords": [],
//       "content_hooks": [],
//       "ctas": []
//     }
//   ],
//   "engagement_targets": [
//     {
//       "creator_handle": "",
//       "platform": "",
//       "post_link": "",
//       "summary": "",
//       "recommended_engagement": "",
//       "pain_point_match": ""
//     }
//   ]
// }

// Rules:
// - Be concise but highly actionable.
// - Use a confident marketing tone.
// - Only extract high-value insights.
// - Infer pain points even when not explicitly stated.
// - Ignore spam or unrelated content.`;

// interface AnalyzeRequest {
//   posts: string;
// }

// interface Theme {
//   theme: string;
//   whats_happening: string;
//   rising_keywords: string[];
//   content_hooks: string[];
//   ctas: string[];
// }

// interface EngagementTarget {
//   creator_handle: string;
//   platform: string;
//   post_link: string;
//   summary: string;
//   recommended_engagement: string;
//   pain_point_match: string;
// }

// interface AnalyzeResponse {
//   executive_summary: {
//     key_topics: string[];
//     weekly_angle: string;
//     top_engagement_opportunities: string[];
//   };
//   themes: Theme[];
//   engagement_targets: EngagementTarget[];
// }

// export async function POST(request: NextRequest) {
//   try {
//     if (!process.env.OPENAI_API_KEY) {
//       return NextResponse.json(
//         { error: 'OpenAI API key not configured' },
//         { status: 500 }
//       );
//     }

//     const body: AnalyzeRequest = await request.json();

//     if (!body.posts || typeof body.posts !== 'string') {
//       return NextResponse.json(
//         { error: 'Invalid request: "posts" field must be a non-empty string' },
//         { status: 400 }
//       );
//     }

//     if (body.posts.trim().length === 0) {
//       return NextResponse.json(
//         { error: 'Invalid request: "posts" field cannot be empty' },
//         { status: 400 }
//       );
//     }

//     const openai = getOpenAIClient();

//     const completion = await openai.chat.completions.create({
//       model: 'gpt-4o',
//       messages: [
//         {
//           role: 'system',
//           content: SYSTEM_PROMPT,
//         },
//         {
//           role: 'user',
//           content: body.posts,
//         },
//       ],
//       response_format: { type: 'json_object' },
//       temperature: 0.7,
//     });

//     const content = completion.choices[0]?.message?.content;

//     if (!content) {
//       return NextResponse.json(
//         { error: 'No response from OpenAI' },
//         { status: 500 }
//       );
//     }

//     const insights: AnalyzeResponse = JSON.parse(content);

//     return NextResponse.json(insights, { status: 200 });
//   } catch (error) {
//     console.error('Error analyzing posts:', error);

//     if (error instanceof SyntaxError) {
//       return NextResponse.json(
//         { error: 'Invalid JSON in request body' },
//         { status: 400 }
//       );
//     }

//     if (error instanceof Error && 'status' in error) {
//       const openAIError = error as any;
//       return NextResponse.json(
//         { error: `OpenAI API error: ${openAIError.message}` },
//         { status: openAIError.status || 500 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const allowedOrigin = "*"; // or replace with your frontend domain

// --- CORS HANDLER ---
export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    }
  );
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

// --- OPENAI SETUP ---
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const SYSTEM_PROMPT = `You are Creator Pulse, an AI that analyzes conversations from filmmakers discussing their projects. You take raw scraped social media posts and return structured, actionable insights.

Return ONLY valid JSON using the following structure:

{
  "executive_summary": {
    "key_topics": [],
    "weekly_angle": "",
    "top_engagement_opportunities": []
  },
  "themes": [
    {
      "theme": "",
      "whats_happening": "",
      "rising_keywords": [],
      "content_hooks": [],
      "ctas": []
    }
  ],
  "engagement_targets": [
    {
      "creator_handle": "",
      "platform": "",
      "post_link": "",
      "summary": "",
      "recommended_engagement": "",
      "pain_point_match": ""
    }
  ]
}

Rules:
- Be concise but highly actionable.
- Use a confident marketing tone.
- Only extract high-value insights.
- Infer pain points even when not explicitly stated.
- Ignore spam or unrelated content.`;

// --- TYPES ---
interface AnalyzeRequest {
  posts: string;
}

interface AnalyzeResponse {
  executive_summary: {
    key_topics: string[];
    weekly_angle: string;
    top_engagement_opportunities: string[];
  };
  themes: {
    theme: string;
    whats_happening: string;
    rising_keywords: string[];
    content_hooks: string[];
    ctas: string[];
  }[];
  engagement_targets: {
    creator_handle: string;
    platform: string;
    post_link: string;
    summary: string;
    recommended_engagement: string;
    pain_point_match: string;
  }[];
}

// --- POST HANDLER ---
export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: corsHeaders() }
      );
    }

    const body: AnalyzeRequest = await request.json();

    if (!body.posts || typeof body.posts !== "string") {
      return new NextResponse(
        JSON.stringify({
          error: 'Invalid request: "posts" must be a non-empty string',
        }),
        { status: 400, headers: corsHeaders() }
      );
    }

    const openai = getOpenAIClient();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: body.posts },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return new NextResponse(
        JSON.stringify({ error: "No response from OpenAI" }),
        { status: 500, headers: corsHeaders() }
      );
    }

    const insights: AnalyzeResponse = JSON.parse(content);

    return new NextResponse(JSON.stringify(insights), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("Error analyzing posts:", error);

    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: corsHeaders() }
    );
  }
}
