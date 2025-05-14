import React, { useState } from 'react';

// Airtable Config
const TABLE_NAME = 'tblZn0kJvbvG92ksR/viw88UeEs8qIV0hu1';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/airtable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageUrl,
          user: 'User123'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const imageUrl = data.data?.[0]?.url;
      setResult(imageUrl);

      // Save to Airtable
      await saveToAirtable(prompt, imageUrl, 'User123');

    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToAirtable = async (prompt, imageUrl, user = 'Anonymous') => {
    try {
      const response = await fetch('/airtable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, imageUrl, user }),
      });
  
      const result = await response.json();
      console.log("✅ Saved to Airtable:", result);
    } catch (error) {
      console.error("❌ Error saving to Airtable:", error);
    }
  };
  

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Generate an Image with AI</h1>
      <input
        type="text"
        placeholder="Enter your prompt"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button
        onClick={generateImage}
        disabled={isLoading}
        style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <img src={result} alt="Generated" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}

export default App;
