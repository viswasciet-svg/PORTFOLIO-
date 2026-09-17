/**
 * VISWA S - AI ASSISTANT CHATBOT (Local Knowledge Engine)
 * Provides instant, zero-hallucination answers to recruiters and visitors
 * based strictly on VISWA S's verified resume and portfolio data.
 */

document.addEventListener("DOMContentLoaded", () => {
  initChatbot();
});

function initChatbot() {
  const toggleBtn = document.getElementById("chatbotToggleBtn");
  const dialog = document.getElementById("chatbotDialog");
  const closeBtn = document.getElementById("chatCloseBtn");
  const form = document.getElementById("chatbotForm");
  const input = document.getElementById("chatbotInput");
  const messagesBody = document.getElementById("chatbotMessages");
  const chipsContainer = document.getElementById("chatChipsContainer");

  if (!toggleBtn || !dialog || !form || !input || !messagesBody) return;

  let isOpen = false;

  // Predefined FAQ Chips reflecting the resume
  const defaultQuestions = [
    "What is Viswa's education?",
    "What is his CGPA?",
    "What are his skills?",
    "What projects has he completed?",
    "What is his internship?",
    "What programming languages does he know?",
    "What embedded skills does he have?",
    "What IoT skills does he have?",
    "What certifications does he have?",
    "How can I contact Viswa?"
  ];

  // Render quick chips
  if (chipsContainer) {
    chipsContainer.innerHTML = "";
    defaultQuestions.forEach((q) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chat-chip";
      chip.textContent = q;
      chip.addEventListener("click", () => {
        handleUserMessage(q);
      });
      chipsContainer.appendChild(chip);
    });
  }

  // Toggle open/close
  function toggleChat(openState) {
    isOpen = typeof openState === "boolean" ? openState : !isOpen;
    if (isOpen) {
      dialog.classList.add("open");
      dialog.setAttribute("aria-hidden", "false");
      input.focus();
    } else {
      dialog.classList.remove("open");
      dialog.setAttribute("aria-hidden", "true");
    }
  }

  toggleBtn.addEventListener("click", () => toggleChat());
  if (closeBtn) closeBtn.addEventListener("click", () => toggleChat(false));

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      toggleChat(false);
    }
  });

  // Handle message submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    input.value = "";
    handleUserMessage(query);
  });

  function handleUserMessage(text) {
    appendMessage(text, "user");

    // Show temporary typing indicator
    const typingId = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingId);
      const answer = generateLocalResponse(text);
      appendMessage(answer, "bot");
    }, 400);
  }

  function appendMessage(text, sender) {
    const msgEl = document.createElement("div");
    msgEl.className = `chat-msg chat-msg-${sender}`;

    const bubbleEl = document.createElement("div");
    bubbleEl.className = "chat-msg-bubble";

    // Format newlines into line breaks
    bubbleEl.innerHTML = text.replace(/\n/g, "<br>");

    msgEl.appendChild(bubbleEl);
    messagesBody.appendChild(msgEl);
    messagesBody.scrollTop = messagesBody.scrollHeight;
  }

  function showTypingIndicator() {
    const id = "typing-" + Date.now();
    const msgEl = document.createElement("div");
    msgEl.id = id;
    msgEl.className = "chat-msg chat-msg-bot";

    const bubbleEl = document.createElement("div");
    bubbleEl.className = "chat-msg-bubble";
    bubbleEl.innerHTML = '<span style="opacity: 0.7; font-family: monospace;">● ● ●</span>';

    msgEl.appendChild(bubbleEl);
    messagesBody.appendChild(msgEl);
    messagesBody.scrollTop = messagesBody.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  /**
   * Local Knowledge Retrieval Engine
   * Matches intents accurately using strict verified resume data.
   */
  function generateLocalResponse(rawQuery) {
    const q = rawQuery.toLowerCase();
    const data = window.PORTFOLIO_DATA;

    if (!data) {
      return "I'm having trouble accessing my knowledge base right now. Please check the portfolio sections directly.";
    }

    const kb = data.chatbotKnowledge;

    // College Period / Year
    if (q.includes("period") || q.includes("year") || q.includes("batch") || q.includes("duration")) {
      return `Viswa's college period is 2024 – 2028 at COIMBATORE INSTITUTE OF ENGINEERING AND TECHNOLOGY.`;
    }

    // CGPA / Marks / Score
    if (q.includes("cgpa") || q.includes("gpa") || q.includes("score") || q.includes("percentage") || q.includes("grade")) {
      return kb.cgpa;
    }

    // Education / College / Degree / School / CIET
    if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("study") || q.includes("school") || q.includes("ciet")) {
      return kb.education;
    }

    // Who / About / Introduction
    if (q.includes("who is") || q.includes("tell me about") || q.includes("introduce") || q.includes("about viswa") || q.includes("bio") || q.includes("background")) {
      return kb.whoIsViswa;
    }

    // Programming Languages
    if (q.includes("programming language") || q.includes("languages does he know") || q.includes("which language") || (q.includes("programming") && !q.includes("embedded"))) {
      return kb.programmingLanguages;
    }

    // Embedded Skills / Embedded C
    if (q.includes("embedded") || q.includes("microcontroller") || q.includes("arduino")) {
      return kb.embeddedSkills;
    }

    // IoT Skills / Internet of Things
    if (q.includes("iot") || q.includes("internet of things") || q.includes("esp32") || q.includes("rfid") || q.includes("sensor")) {
      return kb.iotSkills;
    }

    // General Skills / Tech stack / Database / Tools
    if (q.includes("skill") || q.includes("technolog") || q.includes("tools") || q.includes("platform") || q.includes("database") || q.includes("stack") || q.includes("soft skill")) {
      return kb.skills;
    }

    // Projects
    if (q.includes("project") || q.includes("built") || q.includes("portfolio") || q.includes("work") || q.includes("smart home") || q.includes("attendance") || q.includes("street light")) {
      return kb.projects;
    }

    // Internship / Experience
    if (q.includes("intern") || q.includes("experience") || q.includes("work history") || q.includes("job")) {
      return kb.internship;
    }

    // Certifications
    if (q.includes("certif") || q.includes("course") || q.includes("credential")) {
      return kb.certifications;
    }

    // Area of Interest
    if (q.includes("interest") || q.includes("area of interest") || q.includes("domain")) {
      return `Viswa's areas of interest are: ${data.areaOfInterest.join(" and ")}.`;
    }

    // Resume / CV / Download / View
    if (q.includes("resume") || q.includes("cv") || q.includes("pdf") || q.includes("download")) {
      return kb.resume;
    }

    // Contact / Phone / Email / GitHub / LeetCode
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("call") || q.includes("github") || q.includes("leetcode")) {
      return kb.contact;
    }

    // Fallback based strictly on verified resume details
    return `VISWA S is an Internet of Things (IoT) Student at COIMBATORE INSTITUTE OF ENGINEERING AND TECHNOLOGY (2024 – 2028) with a CGPA of 8 (Till Semester IV). He specializes in Embedded C, IoT, C, Python, and web technologies. Feel free to click any of the prompt chips below to learn more!`;
  }
}
