// Load saved quotes or default
let savedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

let defaultQuotes = [
    {text: "Believe in yourself!", author:"Anonymous", type:"motivational"},
    {text: "Every day is a new opportunity.", author:"Anonymous", type:"motivational"},
    {text: "Do what you love, love what you do.", author:"Anonymous", type:"inspirational"},
    {text: "Mistakes are proof that you are trying.", author:"Anonymous", type:"motivational"},
    {text: "Success is not final, failure is not fatal.", author:"Anonymous", type:"inspirational"},
    {text: "Music is the medicine of the mind.", author:"Anonymous", type:"fun"}
];

let quotes = savedQuotes.length ? savedQuotes : defaultQuotes;

// DOM elements
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const shareBtn = document.getElementById('shareBtn');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const filterSelect = document.getElementById('filterSelect');

const newQuoteInput = document.getElementById('newQuoteInput');
const newAuthorInput = document.getElementById('newAuthorInput');
const newTypeInput = document.getElementById('newTypeInput');

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function getFilteredQuotes() {
    const filter = filterSelect.value;
    if(filter === "all") return quotes;
    return quotes.filter(q => q.type === filter);
}

function randomQuote() {
    const filteredQuotes = getFilteredQuotes();
    if(filteredQuotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const q = filteredQuotes[randomIndex];

    // Fade-out then fade-in
    quoteEl.style.opacity = 0;
    authorEl.style.opacity = 0;

    setTimeout(() => {
        quoteEl.textContent = `"${q.text}"`;
        authorEl.textContent = q.author ? `- ${q.author}` : "";

        // Dynamic background gradient
        switch(q.type) {
            case "motivational": document.body.style.background = "linear-gradient(135deg, #1e1e1e, #1e3c2a)"; break;
            case "inspirational": document.body.style.background = "linear-gradient(135deg, #2a1e3c, #3c2a5a)"; break;
            case "fun": document.body.style.background = "linear-gradient(135deg, #1e3c2a, #3c5a2a)"; break;
            case "user": document.body.style.background = "linear-gradient(135deg, #222222, #444444)"; break;
            default: document.body.style.background = "linear-gradient(135deg, #1e1e1e, #2a2a2a)";
        }

        quoteEl.style.opacity = 1;
        authorEl.style.opacity = 1;
    }, 200);
}

// Add new quote
addQuoteBtn.addEventListener('click', () => {
    const text = newQuoteInput.value.trim();
    const author = newAuthorInput.value.trim();
    const type = newTypeInput.value;
    if(text === "") return;
    quotes.push({text:text, author:author, type:type});
    newQuoteInput.value = "";
    newAuthorInput.value = "";
    saveQuotes();
    randomQuote();
});

// Share quote
shareBtn.addEventListener('click', () => {
    const text = quoteEl.textContent + (authorEl.textContent ? " " + authorEl.textContent : "");
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
});

newQuoteBtn.addEventListener('click', randomQuote);
filterSelect.addEventListener('change', randomQuote);

// Initialize
randomQuote();
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js');
}