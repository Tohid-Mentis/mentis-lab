const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const { prompt } = JSON.parse(event.body);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ result: response.text() }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
