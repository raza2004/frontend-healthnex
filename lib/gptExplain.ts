import axios from "axios";

export async function explainDisease(diseaseName: string) {
  const prompt = `Explain the disease "${diseaseName}" in simple, non-medical terms.`;

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  return res.data.choices[0].message.content.trim();
}
