
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, projectName } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating code for:', projectName);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a senior full-stack developer. Generate a complete, production-ready React application based on the user's prompt. 

IMPORTANT: Return ONLY a valid JSON object with this exact structure:
{
  "files": {
    "App.tsx": "// React app code here",
    "components/Header.tsx": "// Header component code",
    "pages/Home.tsx": "// Home page code",
    "package.json": "// Package.json content"
  },
  "instructions": "Brief setup instructions",
  "techStack": ["React", "TypeScript", "Tailwind CSS"],
  "deployUrl": "https://example-app.vercel.app"
}

Generate clean, modern code using React 18, TypeScript, and Tailwind CSS. Include all necessary files for a working application.`
          },
          { 
            role: 'user', 
            content: `Generate a complete React application for: ${prompt}`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let generatedCode;

    try {
      generatedCode = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback response
      generatedCode = {
        files: {
          "App.tsx": `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ${projectName}
        </h1>
        <p className="text-gray-600">Your application is ready!</p>
      </div>
    </div>
  );
}

export default App;`,
          "package.json": `{
  "name": "${projectName.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  }
}`
        },
        instructions: "Run 'npm install' then 'npm run dev' to start the development server.",
        techStack: ["React", "TypeScript", "Tailwind CSS"],
        deployUrl: `https://${projectName.toLowerCase().replace(/\s+/g, '-')}.vercel.app`
      };
    }

    return new Response(JSON.stringify(generatedCode), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-code function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
