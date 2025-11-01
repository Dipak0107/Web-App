const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = input.value.trim();
  if (msg === "") return;

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  msgDiv.textContent = msg;

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";
}

// Load saved chat + theme
document.addEventListener('DOMContentLoaded', () => {
  loadChat();
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') document.body.classList.add('dark');
});

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
  themeToggle.textContent = mode === 'dark' ? '☀️' : '🌙';
});

function sendMessage() {
  const msg = messageInput.value.trim();
  if (msg === '') return;

  addMessage('sent', msg);
  messageInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // Auto-reply
  setTimeout(() => {
    addMessage('received', 'Got it: ' + msg);
    saveChat();
  }, 800);
  saveChat();
}

function addMessage(type, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', type);
  msgDiv.textContent = text;

  const time = document.createElement('span');
  time.classList.add('time');
  const now = new Date();
  time.textContent = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  msgDiv.appendChild(time);

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveChat() {
  const messages = [];
  document.querySelectorAll('.message').forEach(msg => {
    messages.push({
      type: msg.classList.contains('sent') ? 'sent' : 'received',
      text: msg.childNodes[0].textContent,
      time: msg.querySelector('.time').textContent
    });
  });
  localStorage.setItem('chatHistory', JSON.stringify(messages));
}

function loadChat() {
  const saved = JSON.parse(localStorage.getItem('chatHistory') || '[]');
  saved.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', msg.type);
    msgDiv.textContent = msg.text;

    const time = document.createElement('span');
    time.classList.add('time');
    time.textContent = msg.time;
    msgDiv.appendChild(time);

    chatBox.appendChild(msgDiv);
  });
}
