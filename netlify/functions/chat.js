// Netlify Function for Marc Dip FAYE Portfolio Conversational AI Agent with Tool Calling & Memory
const fs = require('fs');
const path = require('path');

// System Prompt with Agent Identity & Instructions
const SYSTEM_PROMPT = `Tu es l'agent IA conversationnel officiel du portfolio de Marc Dip FAYE (Développeur Fullstack & Creative Tech basé à Dakar, Sénégal).

RÔLE ET CAPACITÉS:
- Tu disposes d'outils officiels (tools / function calling) pour accéder en temps réel aux données réelles de Marc : projets, compétences, voyages et profil.
- Quand un utilisateur te pose une question sur les projets, les compétences, les voyages ou le parcours de Marc, utilise TOUJOURS tes outils pour consulter les données exactes avant de répondre.
- Conserve la mémoire de conversation grâce à l'historique fourni.
- Réponds de manière vivante, professionnelle, enthousiaste et concise (ton cyber/neon green).
- Ne fabrique jamais d'informations. Si une donnée n'est pas trouvée par les outils, indique-le poliment.`;

// Tools Schema for OpenAI Function Calling
const AGENT_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'get_projects',
      description: 'Consulte et filtre les projets du portfolio de Marc Dip FAYE à partir de data/projects.json',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Filtre par catégorie facultatif (ex: web, app, ecommerce, design, all)'
          },
          search: {
            type: 'string',
            description: 'Mot-clé de recherche facultatif'
          }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_skills',
      description: 'Récupère la liste des compétences et technologies maîtrisées par Marc à partir de data/skills.json',
      parameters: {
        type: 'object',
        properties: {}
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_voyages',
      description: 'Récupère les voyages et galeries photos de Marc à partir de data/voyages.json',
      parameters: {
        type: 'object',
        properties: {}
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_profile_info',
      description: 'Obtient les informations détaillées de profil de Marc (contact, bio, workflow, expérience, disponibilité)',
      parameters: {
        type: 'object',
        properties: {
          section: {
            type: 'string',
            description: 'Section spécifique facultative (ex: contact, experience, workflow, general)'
          }
        }
      }
    }
  }
];

// Local Tool Implementations reading real portfolio files
function executeToolCall(name, args) {
  try {
    if (name === 'get_projects') {
      const filePath = path.join(__dirname, '../../data/projects.json');
      let projects = [];
      if (fs.existsSync(filePath)) {
        projects = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } else {
        projects = [
          { id: 1, title: 'Dashboard Analytics', category: 'web', categoryLabel: 'Web App', description: 'Plateforme de visualisation de données temps réel.', technologies: ['React', 'Node.js', 'D3.js'] },
          { id: 2, title: 'Shop Premium', category: 'ecommerce', categoryLabel: 'E-commerce', description: 'Boutique en ligne moderne avec paiement Stripe.', technologies: ['Next.js', 'Stripe', 'MongoDB'] },
          { id: 3, title: 'Task Master Pro', category: 'app', categoryLabel: 'Mobile App', description: 'Application collaborative de gestion de tâches.', technologies: ['React Native', 'Firebase'] },
          { id: 4, title: 'Social Connect', category: 'web', categoryLabel: 'Web App', description: 'Réseau social professionnel axé sur le partage.', technologies: ['Vue.js', 'GraphQL', 'PostgreSQL'] }
        ];
      }

      if (args && args.category && args.category !== 'all') {
        projects = projects.filter(p => p.category === args.category || p.categoryLabel.toLowerCase().includes(args.category.toLowerCase()));
      }
      if (args && args.search) {
        const q = args.search.toLowerCase();
        projects = projects.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      return JSON.stringify(projects);
    }

    if (name === 'get_skills') {
      const filePath = path.join(__dirname, '../../data/skills.json');
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      }
      return JSON.stringify([
        { name: 'React / Next.js', active: true },
        { name: 'Node.js / Express', active: true },
        { name: 'PHP / Laravel', active: true },
        { name: 'TypeScript', active: true },
        { name: 'Tailwind CSS', active: true },
        { name: 'MongoDB / PostgreSQL', active: true },
        { name: 'Docker / Vercel', active: true }
      ]);
    }

    if (name === 'get_voyages') {
      const filePath = path.join(__dirname, '../../data/voyages.json');
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      }
      return JSON.stringify([
        { location: 'Dakar, Sénégal', title: 'Silicon Dakar Tech Summit', date: '2025' },
        { location: 'Paris, France', title: 'Exploration UI/UX & Web3', date: '2024' }
      ]);
    }

    if (name === 'get_profile_info') {
      const profile = {
        name: 'Marc Dip FAYE',
        role: 'Fullstack Developer & Creative Tech',
        location: 'Dakar, Sénégal 🇸🇳 (Disponible local & remote)',
        email: 'marcfaye457@gmail.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        availability: 'Disponible pour missions freelance, projets sur mesure & CDI.',
        experience: [
          { period: '2024 — PRÉSENT', role: 'Fullstack Developer Freelance', desc: 'Conception d\'applications web/mobile sur mesure & consulting tech.' },
          { period: '2023 — 2024', role: 'Développeur Web & Mobile @ Orange Digital Center', desc: 'Projets à fort impact, API & architectures modernes.' }
        ],
        workflow: [
          '01. Découverte & Strategy',
          '02. UI/UX Design Tech',
          '03. Développement Agile Clean Code',
          '04. Lancement, CI/CD & Performance 100%'
        ]
      };
      if (args && args.section && profile[args.section]) {
        return JSON.stringify(profile[args.section]);
      }
      return JSON.stringify(profile);
    }

    return JSON.stringify({ error: `Tool ${name} non reconnu.` });
  } catch (err) {
    return JSON.stringify({ error: `Erreur lors de l'exécution de ${name}: ${err.message}` });
  }
}

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({ message: 'CORS preflight ok' }) };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const userMessage = body.message;
    const history = body.history || [];

    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message requis' }) };
    }

    const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

    // Build initial message list for OpenAI Chat Completion with tools
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Reconstruct valid OpenAI chat history format
    history.forEach(item => {
      if (item.sender === 'user') {
        messages.push({ role: 'user', content: item.text });
      } else if (item.sender === 'bot') {
        messages.push({ role: 'assistant', content: item.text });
      }
    });

    messages.push({ role: 'user', content: userMessage });

    // Fallback if no API key is configured
    if (!apiKey) {
      console.warn('API Key missing. Running simulated AI Agent Tool Calling loop locally.');
      const simulatedAgentResponse = runSimulatedAgentLoop(userMessage, messages);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(simulatedAgentResponse)
      };
    }

    // Call OpenAI API with Tool Calling Loop
    let currentTurn = 0;
    const maxTurns = 5;
    let toolCallsExecuted = [];

    while (currentTurn < maxTurns) {
      currentTurn++;

      const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          tools: AGENT_TOOLS,
          tool_choice: 'auto',
          max_tokens: 450,
          temperature: 0.6
        })
      });

      if (!apiRes.ok) {
        const errText = await apiRes.text();
        console.error('OpenAI API Error:', errText);
        const fallback = runSimulatedAgentLoop(userMessage, messages);
        return { statusCode: 200, headers, body: JSON.stringify(fallback) };
      }

      const resData = await apiRes.json();
      const choice = resData.choices && resData.choices[0];

      if (!choice) break;

      const responseMessage = choice.message;
      messages.push(responseMessage);

      // Check if model requested tool execution
      if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
        for (const toolCall of responseMessage.tool_calls) {
          const fnName = toolCall.function.name;
          let fnArgs = {};
          try {
            fnArgs = JSON.parse(toolCall.function.arguments || '{}');
          } catch (e) {}

          const toolResult = executeToolCall(fnName, fnArgs);
          toolCallsExecuted.push({ name: fnName, args: fnArgs });

          // Append tool message to conversation thread
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            name: fnName,
            content: toolResult
          });
        }
        // Continue loop to send tool results back to OpenAI
      } else {
        // Model provided final answer
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            reply: responseMessage.content,
            toolsUsed: toolCallsExecuted
          })
        };
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: messages[messages.length - 1].content || "Je reste à votre disposition !",
        toolsUsed: toolCallsExecuted
      })
    };

  } catch (error) {
    console.error('Agent handler error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur lors du traitement par l\'agent IA' })
    };
  }
};

// Simulated Local AI Agent when live API Key is not set
function runSimulatedAgentLoop(userMsg, messageThread) {
  const q = userMsg.toLowerCase();
  let toolsUsed = [];
  let reply = '';

  if (q.includes('projet') || q.includes('créat') || q.includes('réalis') || q.includes('app') || q.includes('web')) {
    const data = executeToolCall('get_projects', {});
    toolsUsed.push({ name: 'get_projects', args: {} });
    const projects = JSON.parse(data);
    const listStr = projects.map(p => `• **${p.title}** (${p.categoryLabel || p.category}) : ${p.description}`).join('\n');
    reply = `J'ai consulté la base de données des projets de Marc via mon outil \`get_projects\` !\nVoici ses réalisations phares :\n\n${listStr}\n\nLequel souhaitez-vous explorer davantage ?`;
  } else if (q.includes('compétence') || q.includes('tech') || q.includes('stack') || q.includes('langage') || q.includes('sait faire')) {
    const data = executeToolCall('get_skills', {});
    toolsUsed.push({ name: 'get_skills', args: {} });
    const skills = JSON.parse(data);
    const skillsList = skills.map(s => s.name).join(', ');
    reply = `En consultant l'outil \`get_skills\`, voici les technologies principales maîtrisées par Marc :\n⚡ **${skillsList}**.\n\nIl conçoit des architectures modernes, typées et ultra-performantes (Lighthouse 100%).`;
  } else if (q.includes('voyage') || q.includes('photo') || q.includes('pays') || q.includes('déplacement')) {
    const data = executeToolCall('get_voyages', {});
    toolsUsed.push({ name: 'get_voyages', args: {} });
    reply = `J'ai exécuté l'outil \`get_voyages\` ! Marc aime explorer le monde pour nourrir sa créativité. Vous pouvez consulter les clichés de ses voyages dans la section dedicated du site !`;
  } else if (q.includes('contact') || q.includes('mail') || q.includes('recruter') || q.includes('joindre') || q.includes('qui')) {
    const data = executeToolCall('get_profile_info', {});
    toolsUsed.push({ name: 'get_profile_info', args: {} });
    const p = JSON.parse(data);
    reply = `D'après l'outil \`get_profile_info\`, Marc Dip FAYE est **${p.role}** basé à ${p.location}.\n📧 Email : **${p.email}**\n💼 ${p.availability}\n\nSouhaitez-vous échanger directement avec lui ?`;
  } else {
    reply = `Bonjour ! Je suis l'agent IA conversationnel du portfolio de Marc Dip FAYE. Je possède des outils intégrés (\`get_projects\`, \`get_skills\`, \`get_profile_info\`, \`get_voyages\`) pour répondre avec précision à vos questions sur ses projets, son stack ou ses coordonnées !`;
  }

  return { reply, toolsUsed, fallback: true };
}
