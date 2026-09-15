// /api/ask.js
// "Ask Sovran" — general chat assistant powered by xAI's Grok.
// Needs XAI_API_KEY set in your environment.

const XAI_BASE = 'https://api.x.ai/v1/chat/completions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'XAI_API_KEY is not set in your environment variables' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await fetch(XAI_BASE, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-3', // check docs.x.ai/developers/models for the latest name
        messages: [
          {
            role: 'system',
            content:
              'You are the Ask Sovran assistant on a travel booking website called Sovran. Help with travel questions (destinations, visas, packing, routes) but you can answer general questions too. Keep answers concise.',
          },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      const err = new Error(raw.slice(0, 200) || `xAI request failed (${response.status})`);
      err.status = response.status;
      throw err;
    }

    if (!response.ok) {
      const message = data?.error?.message || `xAI request failed (${response.status})`;
      const err = new Error(message);
      err.status = response.status;
      throw err;
    }

    const reply = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Ask API error:', err);
    return res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
  }
}
