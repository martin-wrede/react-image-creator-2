// functions/airtable.js

export async function onRequest({ request, env }) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
  
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }
  
    try {
      const { prompt, imageUrl, user } = await request.json();
  
      const airtableUrl = `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${env.AIRTABLE_TABLE_NAME}`;
    
      console.log(JSON.stringify({
        fields: {
          Prompt: prompt,
          User: user || 'Anonymous',
          Image: [
            {
              url: imageUrl
            }
          ]
        }
      }));
      
      console.log("Prompt:", prompt);
      
    console.log("Type of Prompt:", typeof prompt);
    console.log("Image URL:", imageUrl);
    console.log("User:", user);

    /// mw

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "Missing imageUrl" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    /// mw
    
      const airtableRes = await fetch(airtableUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Prompt: prompt,
            User: user || 'Anonymous',
            Image: [
              {
                url: imageUrl
              }
            ]
          }
        })
      });
  
      const data = await airtableRes.json();
  
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }
  