// Netlify Function for Marc Dip FAYE Portfolio AI Assistant
const fs = require('fs');
const path = require('path');

const SYSTEM_PROMPT = `Tu es l'assistante IA officielle du portfolio de Marc Dip FAYE, Développeur Fullstack & Creative Tech basé à Dakar, Sénégal.
Ton rôle est de répondre de manière courtoise, professionnelle, enthousiaste et synthétique aux visiteurs (recruteurs, clients potentiels, collaborateurs) au sujet de Marc, de ses compétences, de ses projets et de ses coordonnées.

INFORMATIONS COMPLÈTES SUR MARC DIP FAYE:
- Nom: Marc Dip FAYE
- Titre: Développeur Fullstack & Designer / Creative Tech
- Localisation: Dakar, Sénégal 🇸🇳 (Disponible en local & remote)
- Disponibilité: Ouvert aux opportunités en freelance, CDI, et projets innovants.
- Email: marcfaye457@gmail.com
- LinkedIn: https://linkedin.com
- GitHub: https://github.com

COMPÉTENCES & TECH STACK:
- Frontend: React, Next.js, Vue.js, TypeScript, Tailwind CSS, HTML5/CSS3.
- Backend: Node.js, Express, PHP, Laravel, REST APIs, GraphQL.
- Bases de données: MongoDB, PostgreSQL, Firebase.
- Mobile & DevOps: React Native, Docker, Vercel, Git, CI/CD.
- Spécialités: Performance web (Lighthouse 100%), Design Systems modern cyber-futuristes, UI/UX réactif.

PARCOURS ET EXPÉRIENCE:
- 2024 — PRÉSENT: Fullstack Developer Freelance (Conception d'applications web sur mesure & consulting tech).
- 2023 — 2024: Développeur Web & Mobile @ Orange Digital Center (ODC DEV - Projets à fort impact, API & architectures modernes).

WORKFLOW EN 4 ÉTAPES:
1. Découverte & Strategy (Analyse des besoins & choix d'architecture)
2. UI/UX Design Tech (Wireframes & prototypes interactifs Figma/code)
3. Développement Agile (Clean code, typé, tests & API REST/GraphQL)
4. Lancement & Suivi (Déploiement Cloud Vercel/AWS/Docker, SEO & Lighthouse 100%)

PROJETS RÉALISÉS:
1. Dashboard Analytics (Web App): Plateforme de visualisation de données en temps réel (React, Node.js, D3.js).
2. Shop Premium (E-commerce): Boutique en ligne moderne avec paiement sécurisé Stripe & gestion des stocks (Next.js, Stripe, MongoDB).
3. Task Master Pro (Mobile App): Application mobile collaborative avec notifications instantanées (React Native, Firebase, Redux).
4. Social Connect (Web App): Réseau social professionnel axé sur le partage d'expériences (Vue.js, GraphQL, PostgreSQL).

CONSIGNES DE RÉPONSE:
- Sois fluide, claire, professionnelle et amicale.
- Utilise un ton moderne et passionné par la tech (thématique cyber/neon green).
- Ne fabrique JAMAIS de fausses informations qui ne figurent pas ci-dessus.
- Si une question sort complètement du contexte professionnel de Marc, ramène gentiment l'utilisateur aux sujets du portfolio (projets, compétences, contact).
- Reste concise (2 à 4 phrases généralement, sauf si l'utilisateur demande une explication détaillée).`;

exports.handler = async function(event, context) {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Méthode non autorisée' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const userMessage = body.message;
    const history = body.history || [];

    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message requis' })
      };
    }

    const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

    // Fallback response generator if API Key is not set in environment
    if (!apiKey) {
      console.warn('API Key not set in environment variables. Using smart fallback.');
      const fallbackReply = generateFallbackResponse(userMessage.trim().toLowerCase());
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: fallbackReply, fallback: true })
      };
    }

    // Call OpenAI Chat Completions API
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: userMessage }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 350,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error('OpenAI API Error:', errData);
      const fallbackReply = generateFallbackResponse(userMessage.trim().toLowerCase());
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: fallbackReply, fallback: true })
      };
    }

    const data = await response.json();
    const reply = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : generateFallbackResponse(userMessage.trim().toLowerCase());

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    console.error('Error in chat handler:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur interne de traitement' })
    };
  }
};

// Smart local fallback generator for query handling when live API key is pending
function generateFallbackResponse(q) {
  if (q.includes('projet') || q.includes('réalisation') || q.includes('création')) {
    return "Marc a réalisé plusieurs projets majeurs : \n1. **Dashboard Analytics** (React, Node.js, D3.js)\n2. **Shop Premium** (Next.js, Stripe, MongoDB)\n3. **Task Master Pro** (React Native, Firebase)\n4. **Social Connect** (Vue.js, GraphQL, PostgreSQL).\nVous pouvez consulter la section 'Projets' du site pour plus de détails !";
  }
  if (q.includes('compétence') || q.includes('stack') || q.includes('techno') || q.includes('langage')) {
    return "Marc maîtrise les technologies Fullstack modernes : React, Next.js, Vue.js, Node.js, PHP / Laravel, TypeScript, Tailwind CSS, MongoDB, PostgreSQL, Docker et React Native. Il se concentre sur des applications rapides et esthétiques !";
  }
  if (q.includes('contact') || q.includes('mail') || q.includes('joindre') || q.includes('email') || q.includes('hiring') || q.includes('recruter')) {
    return "Vous pouvez contacter Marc directement par email à **marcfaye457@gmail.com** ou via ses réseaux LinkedIn & GitHub en bas de page. Il est actuellement disponible pour des missions freelance ou opportunités en CDI à Dakar ou à distance !";
  }
  if (q.includes('parcours') || q.includes('expérience') || q.includes('qui') || q.includes('présent')) {
    return "Marc Dip FAYE est Développeur Fullstack & Creative Tech basé à Dakar, Sénégal. Ancien Développeur Web & Mobile chez Orange Digital Center (2023-2024), il travaille actuellement en tant que Développeur Freelance sur des projets web et mobiles à fort impact.";
  }
  if (q.includes('workflow') || q.includes('méthode') || q.includes('process')) {
    return "Le workflow de Marc comporte 4 étapes claires : 1. Découverte & Strategy, 2. UI/UX Design Tech, 3. Développement Agile Clean Code, et 4. Lancement, CI/CD & suivi SEO/Lighthouse 100%.";
  }
  return "Bonjour ! Je suis l'assistante virtuelle de Marc Dip FAYE. Marc est Développeur Fullstack à Dakar (React, Next.js, Node.js, PHP). N'hésitez pas à me poser des questions sur ses projets, ses compétences ou la façon de le contacter !";
}
