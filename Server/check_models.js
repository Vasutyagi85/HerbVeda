require('dotenv').config();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ No API key found in .env! Please check your file.");
    process.exit(1);
}

// We use the direct API URL to list models
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("🔍 Querying Google API for available models...");

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("\n❌ API Error Details:");
            console.error(`Code: ${data.error.code}`);
            console.error(`Message: ${data.error.message}`);
            console.error("\n👉 SOLUTION: Your API Key is likely invalid or the API is not enabled in your Google Cloud Console.");
        } else if (data.models) {
            console.log("\n✅ SUCCESS! These are the models your key can use:");
            console.log("------------------------------------------------");
            // Print just the names you can copy-paste
            data.models.forEach(m => {
                // We only care about models that support 'generateContent'
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`"${m.name.replace('models/', '')}"`);
                }
            });
            console.log("------------------------------------------------");
            console.log("👉 Copy one of the names above into your index.js file.");
        } else {
            console.log("\n⚠️ No models found. This is very unusual.");
        }
    })
    .catch(err => console.error("Network Error:", err));