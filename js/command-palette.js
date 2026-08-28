/**
 * Global Command Palette (Ctrl + K)
 * High-performance vanilla JS search index.
 */
document.addEventListener("DOMContentLoaded", () => {
    const commands = [
        { title: "Go to Home", action: () => window.scrollTo(0,0), icon: "🏠" },
        { title: "Go to About", action: () => document.getElementById("about").scrollIntoView(), icon: "👤" },
        { title: "Go to Vault (Certificates)", action: () => document.getElementById("vault").scrollIntoView(), icon: "📜" },
        { title: "Toggle Theme", action: () => document.getElementById("theme-toggle").click(), icon: "🌓" },
        { title: "Download Resume", action: () => document.getElementById("resume-download-btn").click(), icon: "📄" },
        { title: "Open GitHub Profile", action: () => window.open('https://github.com/Prabin369', '_blank'), icon: "💻" }
    ];

    let modalHtml = `
        <div id="cmd-palette-backdrop" class="fixed inset-0 z-50 hidden bg-gray-900/40 backdrop-blur-sm transition-opacity flex items-start justify-center pt-[15vh]">
            <div id="cmd-palette" class="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800 overflow-hidden transform scale-95 opacity-0 transition-all duration-200">
                <div class="p-4 border-b border-gray-100 dark:border-gray-800">
                    <input type="text" id="cmd-input" placeholder="Type a command or search..." class="w-full bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 outline-none border-none focus:ring-0" autocomplete="off">
                </div>
                <div id="cmd-results" class="max-h-80 overflow-y-auto p-2"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const backdrop = document.getElementById("cmd-palette-backdrop");
    const modal = document.getElementById("cmd-palette");
    const input = document.getElementById("cmd-input");
    const resultsContainer = document.getElementById("cmd-results");
    
    let activeIndex = 0;
    let filteredCommands = [...commands];

    const togglePalette = (show = true) => {
        if (show) {
            backdrop.classList.remove("hidden");
            // Micro-task delay for CSS transition
            setTimeout(() => {
                modal.classList.remove("scale-95", "opacity-0");
                input.focus();
                renderResults();
            }, 10);
        } else {
            modal.classList.add("scale-95", "opacity-0");
            setTimeout(() => backdrop.classList.add("hidden"), 200);
            input.value = "";
        }
    };

    const renderResults = () => {
        resultsContainer.innerHTML = filteredCommands.length ? filteredCommands.map((cmd, i) => `
            <div class="cmd-item p-3 flex items-center gap-3 rounded-xl cursor-pointer transition-colors ${i === activeIndex ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'}" data-index="${i}">
                <span class="text-xl">${cmd.icon}</span>
                <span class="font-medium text-sm">${cmd.title}</span>
            </div>
        `).join("") : `<div class="p-4 text-center text-sm text-gray-500">No matching commands found.</div>`;
    };

    // Keyboard Listeners
    window.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            togglePalette(!backdrop.classList.contains("hidden") ? false : true);
        }
        if (e.key === "Escape") togglePalette(false);
    });

    input.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        filteredCommands = commands.filter(cmd => cmd.title.toLowerCase().includes(term));
        activeIndex = 0;
        renderResults();
    });

    input.addEventListener("keydown", (e) => {
        if (!filteredCommands.length) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % filteredCommands.length;
            renderResults();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderResults();
        } else if (e.key === "Enter") {
            e.preventDefault();
            filteredCommands[activeIndex].action();
            togglePalette(false);
        }
    });

    resultsContainer.addEventListener("click", (e) => {
        const item = e.target.closest(".cmd-item");
        if (item) {
            filteredCommands[parseInt(item.dataset.index)].action();
            togglePalette(false);
        }
    });

    backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) togglePalette(false);
    });
});