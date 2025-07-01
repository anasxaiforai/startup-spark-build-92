
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
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { idea } = await req.json();
    
    if (!idea) {
      console.error('No idea provided');
      return new Response(JSON.stringify({ error: 'No idea provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Processing idea:', idea);

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
            content: 'You are a product development expert. Analyze the given idea and provide a detailed blueprint. You MUST respond with ONLY a valid JSON object in this exact structure: {"pmf":{"score":85,"strengths":["strength1","strength2"],"concerns":["concern1","concern2"]},"problemFit":{"score":90,"problem":"problem description","solution":"solution description","targetUsers":"target users"},"mvpBreakdown":{"coreFeatures":["feature1","feature2","feature3"],"timeline":"6-8 weeks","complexity":"Medium"}}'
          },
          { role: 'user', content: `Analyze this product idea: ${idea}` }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      return new Response(JSON.stringify({ error: 'Failed to analyze idea' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure');
      return new Response(JSON.stringify({ error: 'Invalid response from AI' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let blueprint;
    try {
      blueprint = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback with default structure
      blueprint = {
        pmf: {
          score: 75,
          strengths: ["Clear value proposition", "Addresses real user need"],
          concerns: ["Market competition", "User acquisition"]
        },
        problemFit: {
          score: 80,
          problem: "Users need an efficient solution for their challenges",
          solution: idea,
          targetUsers: "General users seeking this solution"
        },
        mvpBreakdown: {
          coreFeatures: ["Core functionality", "User interface", "Basic features"],
          timeline: "6-8 weeks",
          complexity: "Medium"
        }
      };
    }

    console.log('Returning blueprint:', blueprint);

    return new Response(JSON.stringify(blueprint), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-blueprint function:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
