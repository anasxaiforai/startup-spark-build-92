
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

    console.log('Generating application for:', projectName);
    console.log('Using prompt:', prompt);

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured',
        files: {},
        instructions: 'API key missing',
        techStack: [],
        deployUrl: ''
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert React developer. Create a complete, functional React application based on the user's requirements.

IMPORTANT: Return ONLY valid JSON in this EXACT format:
{
  "files": {
    "App.tsx": "import React from 'react';\n\nfunction App() {\n  return (\n    <div className=\"min-h-screen bg-gray-50\">\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;",
    "package.json": "{\n  \"name\": \"react-app\",\n  \"version\": \"1.0.0\",\n  \"dependencies\": {\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\"\n  }\n}"
  },
  "instructions": "Run npm install and npm start",
  "techStack": ["React", "JavaScript"],
  "deployUrl": "example.com"
}

Requirements:
- Use React 18 with functional components
- Use Tailwind CSS for styling
- Include React Router for navigation if needed
- Create multiple pages and components
- Make it responsive and professional
- Generate complete, working code
- DO NOT include any explanations outside the JSON`
          },
          { 
            role: 'user', 
            content: `Create a complete React application: ${prompt}\n\nProject Name: ${projectName}\n\nMake it fully functional with real features.`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    let generatedCode;

    try {
      const content = data.choices[0].message.content.trim();
      console.log('Raw response length:', content.length);
      
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        generatedCode = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed AI response');
      } else {
        console.log('No JSON found, using fallback');
        throw new Error('No JSON found in AI response');
      }

      // Validate the response structure
      if (!generatedCode.files || typeof generatedCode.files !== 'object') {
        console.log('Invalid response structure, using fallback');
        throw new Error('Invalid response structure from AI');
      }

    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      
      // Comprehensive fallback with a working React app
      const safeName = projectName?.replace(/[^a-zA-Z0-9\s]/g, '').trim() || 'React App';
      const safeSlug = safeName.toLowerCase().replace(/\s+/g, '-');
      
      generatedCode = {
        files: {
          "App.tsx": `import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">${safeName}</h1>
              </div>
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">Home</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">About</Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 ${safeName}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to ${safeName}</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        ${prompt}
      </p>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Fast</h3>
          <p className="text-gray-600">Lightning fast performance and optimized user experience</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Reliable</h3>
          <p className="text-gray-600">Built with modern technologies for maximum reliability</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">User Friendly</h3>
          <p className="text-gray-600">Intuitive design that puts user experience first</p>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About ${safeName}</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <p className="text-lg text-gray-700 mb-6">
          Welcome to ${safeName}, where innovation meets functionality. Our platform is designed to provide 
          exceptional user experiences through cutting-edge technology and thoughtful design.
        </p>
        <p className="text-gray-600 mb-6">
          ${prompt}
        </p>
        <p className="text-gray-600">
          We believe in creating solutions that are not only powerful but also accessible and easy to use. 
          Our team is committed to delivering excellence in every aspect of our service.
        </p>
      </div>
    </div>
  );
}

function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We\\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;`,

          "package.json": `{
  "name": "${safeSlug}",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  }
}`,

          "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

          "src/main.tsx": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,

          "src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,

          "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,

          "vite.config.ts": `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,

          "README.md": `# ${safeName}

${prompt}

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open your browser and visit \`http://localhost:5173\`

## Features

- Modern React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Responsive design
- Contact form functionality

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS  
- Vite
- React Router
`
        },
        instructions: `Setup Instructions for ${safeName}:

1. Extract all files to your project directory
2. Run: npm install
3. Run: npm run dev
4. Open: http://localhost:5173

Your application includes:
- Modern React 18 with TypeScript
- Multi-page navigation with React Router
- Responsive design with Tailwind CSS
- Professional UI components
- Contact form with validation

Ready to deploy and customize!`,
        techStack: ["React", "TypeScript", "Tailwind CSS", "React Router", "Vite"],
        deployUrl: `https://${safeSlug}.vercel.app`
      };
    }

    console.log('Generated code structure:', Object.keys(generatedCode.files));
    
    return new Response(JSON.stringify(generatedCode), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-code function:', error);
    
    // Return a proper error response with valid structure
    const errorResponse = {
      error: error.message || 'Unknown error occurred',
      files: {},
      instructions: 'Error occurred during generation',
      techStack: [],
      deployUrl: ''
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
