export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Creator Pulse
          </h1>
          <p className="text-xl text-slate-600">
            AI-powered insights from filmmaker conversations
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            API Endpoint
          </h2>
          <div className="bg-slate-100 rounded p-4 mb-4 font-mono text-sm">
            POST /api/analyze
          </div>
          <p className="text-slate-700 mb-4">
            Send scraped social media posts to receive structured insights about
            filmmaker discussions, themes, and engagement opportunities.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-6">
            Request Body
          </h3>
          <pre className="bg-slate-900 text-green-400 rounded p-4 overflow-x-auto">
{`{
  "posts": "Your scraped social media posts text here"
}`}
          </pre>

          <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-6">
            Response
          </h3>
          <pre className="bg-slate-900 text-green-400 rounded p-4 overflow-x-auto text-xs">
{`{
  "executive_summary": {
    "key_topics": ["topic1", "topic2"],
    "weekly_angle": "Main insight",
    "top_engagement_opportunities": ["opportunity1"]
  },
  "themes": [
    {
      "theme": "Theme name",
      "whats_happening": "Description",
      "rising_keywords": ["keyword1"],
      "content_hooks": ["hook1"],
      "ctas": ["cta1"]
    }
  ],
  "engagement_targets": [
    {
      "creator_handle": "@username",
      "platform": "Platform name",
      "post_link": "URL",
      "summary": "Post summary",
      "recommended_engagement": "How to engage",
      "pain_point_match": "Pain point"
    }
  ]
}`}
          </pre>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Integration Guide
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-900">
            <li>Configure your scraping tools (Apify, Reddit API, YouTube API)</li>
            <li>Set up Make/Zapier to collect scraped text</li>
            <li>Send POST request to this endpoint with scraped content</li>
            <li>Receive structured insights for your filmmaker community</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
