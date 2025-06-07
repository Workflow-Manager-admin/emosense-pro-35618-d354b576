import fetch from "node-fetch";

// PUBLIC_INTERFACE
export const analyzeJournalEntry = async (req, res) => {
  const { content } = req.body;
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "OpenAI API key not set" });
  try {
    const prompt = `Analyze the following journal entry and return key moods (happy, sad, anxious, calm, angry) as JSON with percentage scores:\n"${content}"`;
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 80,
        temperature: 0.8
      })
    });
    const data = await response.json();
    const text = data.choices ? data.choices[0].text.trim() : "{}";
    let scores, aiSentiment = "neutral";
    try {
      scores = JSON.parse(text);
      // Heuristic: pick highest value as main mood
      aiSentiment = Object.entries(scores).sort(([,a],[,b])=>b-a)[0][0] || "neutral";
    } catch {
      scores = null;
    }
    res.json({ aiSentiment, aiScores: scores });
  } catch (error) {
    res.status(500).json({ error: "AI analysis failed" });
  }
};
