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
  "posts": "..."
}`}
          </pre>

          <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-6">
            Response
          </h3>
          <pre className="bg-slate-900 text-green-400 rounded p-4 overflow-x-auto text-xs">
{`{
  
  this format - Abdullahi
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
