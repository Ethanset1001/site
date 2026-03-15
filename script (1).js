// Simple pattern-based response system
const patterns = [
  // Greetings
  { patterns: ['hi', 'hello', 'hey', 'sup'], responses: ['hey there', 'hi', 'hello', 'yo'] },
  
  // How are you
  { patterns: ['how are you', 'how r u', 'hows it going', 'whats up'], responses: ['doing fine thanks', 'pretty good', 'not bad', 'all good'] },
  
  // Name questions
  { patterns: ['your name', 'who are you', 'what are you'], responses: ['just a bot', 'nobody really', 'doesnt matter'] },
  
  // Time
  { patterns: ['what time', 'time is'], responses: ['check your phone', 'no idea honestly', 'time to stop'] },
  
  // Weather
  { patterns: ['weather', 'rain', 'sunny'], responses: ['look outside maybe', 'its weather', 'probably fine'] },
  
  // Yes/No
  { patterns: ['yes', 'yeah', 'yep', 'sure'], responses: ['cool', 'nice', 'alright then'] },
  { patterns: ['no', 'nope', 'nah'], responses: ['fair enough', 'ok', 'whatever'] },
  
  // Thanks
  { patterns: ['thank', 'thanks', 'thx'], responses: ['no problem', 'sure thing', 'yep'] },
  
  // Bye
  { patterns: ['bye', 'goodbye', 'see ya', 'later'], responses: ['later', 'bye', 'see ya'] },
  
  // Questions about abilities
  { patterns: ['what can you', 'what do you'], responses: ['not much really', 'basic stuff', 'just chat'] },
  
  // Age
  { patterns: ['how old', 'your age'], responses: ['pretty new', 'not old', 'does it matter'] },
  
  // Feelings
  { patterns: ['sad', 'happy', 'angry', 'feel'], responses: ['thats life', 'happens', 'makes sense'] },
  
  // Help
  { patterns: ['help', 'what', 'how'], responses: ['just type stuff', 'i dunno', 'beats me'] },
];

const fallbacks = [
  'interesting',
  'ok',
  'sure',
  'whatever',
  'cool story',
  'noted',
  'fair',
  'makes sense',
  'huh',
  'right',
];

function findResponse(input) {
  const normalized = input.toLowerCase().trim();
  
  for (const pattern of patterns) {
    for (const p of pattern.patterns) {
      if (normalized.includes(p)) {
        return pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
      }
    }
  }
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function addMessage(text, isUser) {
  const messagesDiv = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
  messageDiv.textContent = text;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleSend() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  
  if (!text) return;
  
  addMessage(text, true);
  input.value = '';
  
  setTimeout(() => {
    const response = findResponse(text);
    addMessage(response, false);
  }, 300 + Math.random() * 400);
}

document.getElementById('send-btn').addEventListener('click', handleSend);
document.getElementById('user-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSend();
  }
});

// Initial message
setTimeout(() => {
  addMessage('hey', false);
}, 500);