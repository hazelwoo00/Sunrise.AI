import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS 헤더 추가 (중요!)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  
  // 환경변수에서 API 키 가져오기
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    console.error('API key not configured');
    return res.status(500).json({ 
      error: 'API key not configured. Please add ANTHROPIC_API_KEY to environment variables.' 
    });
  }

  if (!image) {
    return res.status(400).json({ error: 'Image data is required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: image.startsWith('data:image/png') ? 'image/png' : 'image/jpeg',
                  data: image.split(',')[1]
                }
              },
              {
                type: 'text',
                text: `Analyze this GUI screenshot with extreme precision.

TASK 1: COMPONENT DETECTION
Identify ALL UI elements and provide EXACT bounding box coordinates.

For each component, return:
{
  "type": "Button" | "Card" | "Input" | "Text" | "Icon" | "Image",
  "name": "Descriptive name based on text or function",
  "bbox": {
    "x": exact pixel X coordinate (top-left, as percentage),
    "y": exact pixel Y coordinate (top-left, as percentage),
    "width": exact pixel width (as percentage),
    "height": exact pixel height (as percentage)
  },
  "text": "Actual text content if any",
  "style": {
    "backgroundColor": "exact hex color",
    "textColor": "exact hex color if text exists",
    "borderRadius": estimated radius in px,
    "fontSize": estimated size in px if text exists
  }
}

TASK 2: DESIGN TOKENS EXTRACTION
Extract ALL unique colors used in the image.

Return:
{
  "colors": [
    {
      "hex": "exact 6-digit hex code",
      "usage": "background" | "text" | "accent" | "border"
    }
  ],
  "spacing": ["8px", "16px", "24px"],
  "typography": [
    {
      "size": "32px",
      "weight": "bold",
      "family": "font family name"
    }
  ]
}

Output format: Pure JSON only in this structure:
{
  "components": [...],
  "designTokens": {
    "colors": [...],
    "spacing": [...],
    "typography": [...]
  }
}

No markdown, no backticks, just raw JSON.`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return res.status(response.status).json({ 
        error: errorData.error?.message || 'Failed to analyze image' 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error: any) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}