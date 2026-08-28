/* ==========================================================================
   AI ASSISTANT KNOWLEDGE ENGINE - REGEX ROUTINES FOR NATURAL LANGUAGE DIALOGUE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const aiRoot = document.getElementById('ai-chat-assistant-root-container');
    const toggleBtn = document.getElementById('ai-assistant-trigger-toggle-element');
    const clearHistoryBtn = document.getElementById('ai-clear-history-trigger');
    const messagesFeed = document.getElementById('ai-chat-messages-viewport-feed');
    const executionForm = document.getElementById('ai-assistant-message-input-form-engine');
    const queryInputField = document.getElementById('ai-assistant-text-input-field');
    const suggestedPills = document.querySelectorAll('.suggested-prompt-pill-btn');

    // Local explicit knowledge verification dataset
    const systemicKnowledgeGraph = [
        { keys: [/identity/, /who is/, /prabin/, /kandel/], answer: "Prabin Kandel is a +2 Computer Science student, Frontend Developer, and National Level Science Expo Winner born on June 25, 2009 (2066-03-11 BS). He currently resides in Pokhara, Nepal." },
        { keys: [/expo/, /vector/, /winner/, /achievement/, /championship/, /competition/], answer: "Prabin is the National Level Science Expo Winner at VECTOR 2082, an Open Project Demonstration (+2 Category) festival organized by the Vector Committee at the Institute of Engineering (IOE) Pashchimanchal Campus, Pokhara. He won top honors over Magh 26-28, 2082 BS." },
        { keys: [/education/, /school/, /gpa/, /see/, /ble/, /study/, /shitaladevi/, /baraha/], answer: "Prabin studies +2 Computer Science at Shree Shitaladevi Community Secondary School. Previously, he earned a 3.79 GPA in his SEE at Shree Siddha Baraha Secondary School, and a 3.48 GPA in his BLE at Shree Janakalyan English Boarding School." },
        { keys: [/skill/, /code/, /html/, /css/, /javascript/, /frontend/, /language/], answer: "Prabin is skilled in core frontend engineering frameworks: semantic HTML5 markup, modern layout architecture configurations via CSS3 (Flexbox/Grid), and client-side system logic execution using JavaScript (ES6+)." },
        { keys: [/contact/, /email/, /phone/, /whatsapp/, /facebook/, /reach/], answer: "You can reach Prabin Kandel directly via Email at kandelprabin09@gmail.com, or through Mobile/WhatsApp at +977 9845513093. His profile repository is tracking live on GitHub at username: Prabin369." }
    ];

    const fallbackResponseText = "I have recorded that query statement inside my analysis buffer. For specialized insights on this topic, please use the direct communication node on the Contact form or email kandelprabin09@gmail.com.";

    if (toggleBtn && aiRoot) {
        toggleBtn.addEventListener('click', () => {
            aiRoot.classList.toggle('minimized');
        });
    }

    if (clearHistoryBtn && messagesFeed) {
        clearHistoryBtn.addEventListener('click', () => {
            messagesFeed.innerHTML = `
                <div class="chat-speech-bubble-row assistant-agent animate-fade-in-up">
                    <div class="speech-bubble-text-content">
                        Dialogue transaction log stack successfully flushed. Local engine re-initialized. Ask me anything regarding Prabin's credentials!
                    </div>
                </div>`;
        });
    }

    function processAgentDialogueTransaction(inputPromptString) {
        if (!inputPromptString.trim() || !messagesFeed) return;

        // Append user speech layout node onto workspace view
        const userNode = document.createElement('div');
        userNode.className = "chat-speech-bubble-row user-sender animate-fade-in-up";
        userNode.innerHTML = `<div class="speech-bubble-text-content">${escapeHTMLString(inputPromptString)}</div>`;
        messagesFeed.appendChild(userNode);
        messagesFeed.scrollTop = messagesFeed.scrollHeight;

        // Display animated computation simulation tick placeholder elements
        const computingTickerNode = document.createElement('div');
        computingTickerNode.className = "chat-speech-bubble-row assistant-agent analytical-wait-state";
        computingTickerNode.innerHTML = `<div class="speech-bubble-text-content"><i class="fa-solid fa-circle-nodes fa-spin"></i> Analyzing local knowledge graph nodes...</div>`;
        messagesFeed.appendChild(computingTickerNode);
        messagesFeed.scrollTop = messagesFeed.scrollHeight;

        const normalizedPromptQueryValue = inputPromptString.toLowerCase();
        let targetMatchAnswerString = "";

        for (let rule of systemicKnowledgeGraph) {
            const hasMatch = rule.keys.some(regexExpression => regexExpression.test(normalizedPromptQueryValue));
            if (hasMatch) {
                targetMatchAnswerString = rule.answer;
                break;
            }
        }

        if (!targetMatchAnswerString) targetMatchAnswerString = fallbackResponseText;

        setTimeout(() => {
            computingTickerNode.remove();
            const responseNode = document.createElement('div');
            responseNode.className = "chat-speech-bubble-row assistant-agent animate-fade-in-up";
            responseNode.innerHTML = `<div class="speech-bubble-text-content">${targetMatchAnswerString}</div>`;
            messagesFeed.appendChild(responseNode);
            messagesFeed.scrollTop = messagesFeed.scrollHeight;
        }, 800);
    }

    if (executionForm) {
        executionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentStringValue = queryInputField.value;
            processAgentDialogueTransaction(currentStringValue);
            queryInputField.value = "";
        });
    }

    suggestedPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const commandTextPrompt = pill.getAttribute('data-query');
            if (commandTextPrompt) processAgentDialogueTransaction(commandTextPrompt);
        });
    });

    function escapeHTMLString(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});