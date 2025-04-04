async function askChatGPT(question) {
  const response = await fetch("https://my-crypto-hub.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question })
  });
  const data = await response.json();
  return data.response || "Sorry, I didn't get that.";
}

function toggleChat() {
  const box = document.getElementById('chatbox');
  const replyBox = document.getElementById('chatReply');

  if (box.style.display === 'none' || !box.style.display) {
    box.style.display = 'block';

    // Näytetään tervehdys vain jos kenttä on tyhjä
    if (!replyBox.innerHTML.trim()) {
      replyBox.innerHTML = '<div class="fade-in">Hi! Ask me about Bitcoin or wallets.</div>';
    }
  } else {
    box.style.display = 'none';
    replyBox.innerHTML = '';
  }
}

function copyToClipboard(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied: " + text);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chatInput");
  const replyBox = document.getElementById("chatReply");

  input.addEventListener("keypress", async function(e) {
    if (e.key === "Enter") {
      await handleQuestion(input, replyBox);
    }
  });

  document.querySelectorAll(".chat-question").forEach(button => {
    button.addEventListener("click", async () => {
      input.value = button.innerText;
      await handleQuestion(input, replyBox);
    });
  });
});

async function handleQuestion(input, replyBox) {
  const question = input.value.trim();
  if (!question) return;
  input.disabled = true;
  replyBox.innerHTML = '<div class="fade-in">Thinking...</div>';
  const answer = await askChatGPT(question);
  replyBox.innerHTML = `<div class="fade-in">${answer}</div>`;
  input.disabled = false;
  input.value = "";
}

function toggleChatbox() {
  const chatbox = document.getElementById('chatbox');
  chatbox.style.display = (chatbox.style.display === 'none' || !chatbox.style.display) ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.createElement("button");
  toggleButton.id = "chat-toggle";
  toggleButton.innerText = "💬";
  toggleButton.title = "Chat";
  toggleButton.onclick = toggleChatbox;
  document.body.appendChild(toggleButton);
});