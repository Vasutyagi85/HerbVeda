require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // This is the special "ListModels" call the error suggested
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); 
    
    // Actually, we use the API to fetch available models directly
    // Note: The SDK doesn't always have a direct 'listModels' helper exposed simply in v1,
    // so let's try the specific fallback model name that often works when others fail:
    console.log("Checking API Key...");
    
    // We will try to run a generic prompt on 'gemini-1.5-flash' again, 
    // but first let's try the older stable name which works for almost everyone:
    console.log("Trying model: gemini-1.0-pro");
    const stableModel = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    const result = await stableModel.generateContent("Hello");
    console.log("Success! 'gemini-1.0-pro' is working.");
    console.log("Response:", result.response.text());

  } catch (error) {
    console.error("\n❌ Error details:");
    console.error(error.message);
    
    if (error.message.includes("API_KEY_INVALID")) {
        console.log("\n>>> YOUR API KEY IS LIKELY WRONG OR DISABLED in Google AI Studio.");
    }
  }
}

listModels();