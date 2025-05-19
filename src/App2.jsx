
import React, { useState } from 'react';



export default function App() {

  const generateImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          user: 'User123',
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const imageUrl = data.data?.[0]?.url;
      setResult(imageUrl);
  
      if (!imageUrl) throw new Error("Image URL missing in OpenAI response");
  
      // Save to Airtable
      await saveToAirtable(prompt, imageUrl, 'User123');
  
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
}
