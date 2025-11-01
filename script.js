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

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const msg = messageInput.value.trim();
  if (msg === '') return;

  // user message
  const userMsg = document.createElement('div');
  userMsg.classList.add('message', 'sent');
  userMsg.innerText = msg;
  chatBox.appendChild(userMsg);

  messageInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // auto-reply
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.classList.add('message', 'received');
    botMsg.innerText = "✅ Got it! (" + msg + ")";
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}
const firebaseConfig = {
apiKey: "AIzaSyBkqiOMP4TOblb1wisLUSZ4vS-1WTVoqxQ",
  authDomain: "chat-app-4cf9a.firebaseapp.com",
  projectId: "chat-app-4cf9a",
  storageBucket: "chat-app-4cf9a.firebasestorage.app",
  messagingSenderId: "245055908079",
  appId: "1:245055908079:web:8bba9dc811edbaddae531a",
  measurementId: "G-P70S5W3T86"
}



sendBtn.addEventListener("click", sendMessage);

// Send Message to Firebase
function sendMessage() {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;

  if (username === "" || message === "") return alert("Enter name and message");

  db.ref("messages").push({
    username: username,
    message: message,
    time: new Date().toLocaleTimeString()
  });

  document.getElementById("message").value = "";
}

// Listen for new messages
db.ref("messages").on("child_added", (snapshot) => {
  const data = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");

  const currentUser = document.getElementById("username").value;
  if (data.username === currentUser) msgDiv.classList.add("sent");
  else msgDiv.classList.add("received");

  msgDiv.textContent = `${data.username}: ${data.message} (${data.time})`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});
const themeToggle = document.getElementById('themeToggle');

// Load theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') document.body.classList.add('dark');
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
  themeToggle.textContent = mode === 'dark' ? '☀️' : '🌙';
});
function sendMessage() {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;
  if (username === "" || message === "") return alert("Enter name and message");

  const now = new Date();
  const time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0');

  db.ref("messages").push({
    username: username,
    message: message,
    time: time
  });

  document.getElementById("message").value = "";
}

db.ref("messages").on("child_added", (snapshot) => {
  const data = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");

  const currentUser = document.getElementById("username").value;
  msgDiv.classList.add(data.username === currentUser ? "sent" : "received");

  msgDiv.innerHTML = `
    <strong>${data.username}</strong><br>
    ${data.message}
    <div class="time">${data.time}</div>
  `;

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
const loginBtn = document.getElementById('loginBtn');
const userInfo = document.getElementById('userInfo');

// 🌙 Theme Load
document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') document.body.classList.add('dark');
});

// 🌙 Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
  themeToggle.textContent = mode === 'dark' ? '☀️' : '🌙';
});

// 🔐 Google Login
const provider = new firebase.auth.GoogleAuthProvider();
loginBtn.addEventListener('click', () => {
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      userInfo.textContent = "Logged in as: " + user.displayName;
      document.getElementById("username").value = user.displayName;
      loginBtn.style.display = "none";
    })
    .catch(error => console.error(error));
});

// 💬 Send Message
sendBtn.addEventListener("click", sendMessage);
function sendMessage() {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;
  if (username === "" || message === "") return alert("Enter name and message");

  const now = new Date();
  const time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0');

  db.ref("messages").push({
    username,
    message,
    time
  });

  document.getElementById("message").value = "";
}

// 📡 Listen to new messages
db.ref("messages").on("child_added", (snapshot) => {
  const data = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");

  const currentUser = document.getElementById("username").value;
  msgDiv.classList.add(data.username === currentUser ? "sent" : "received");

  msgDiv.innerHTML = `
    <strong>${data.username}</strong><br>
    ${data.message}
    <div class="time">${data.time}</div>
  `;

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});
let currentRoom = "general";
const roomSelect = document.getElementById("roomSelect");

// Room बदलल्यावर जुनं data clear करा
roomSelect.addEventListener("change", () => {
  currentRoom = roomSelect.value;
  chatBox.innerHTML = "";
  listenToRoom();
});

function listenToRoom() {
  db.ref("rooms/" + currentRoom + "/messages").on("child_added", (snapshot) => {
    const data = snapshot.val();
    showMessage(data);
  });
}

function sendMessage() {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;
  if (username === "" || message === "") return alert("Enter name & message");

  const now = new Date();
  const time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

  db.ref("rooms/" + currentRoom + "/messages").push({ username, message, time });
  document.getElementById("message").value = "";
}

function showMessage(data) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  const currentUser = document.getElementById("username").value;
  msgDiv.classList.add(data.username === currentUser ? "sent" : "received");
  msgDiv.innerHTML = `<strong>${data.username}</strong><br>${data.message}<div class="time">${data.time}</div>`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

listenToRoom();
db.ref("status").on("value", (snapshot) => {
  const users = snapshot.val();
  let onlineHTML = "🟢 Online: ";
  for (let uid in users) {
    if (users[uid].online) onlineHTML += users[uid].name + " ";
  }
  document.getElementById("onlineUsers").innerText = onlineHTML;
});
const typingRef = db.ref("typing/" + currentRoom);
const messageInput = document.getElementById("message");

// Typing send
messageInput.addEventListener("input", () => {
  const username = document.getElementById("username").value;
  typingRef.set({ user: username, typing: true });
  setTimeout(() => typingRef.set({ typing: false }), 2000);
});

// Listen typing
typingRef.on("value", (snap) => {
  const data = snap.val();
  const typingText = document.getElementById("typingStatus");
  if (data && data.typing) {
    typingText.textContent = `${data.user} is typing...`;
  } else {
    typingText.textContent = "";
  }
});
const sound = document.getElementById("msgSound");
if (data.username !== currentUser) sound.play();
