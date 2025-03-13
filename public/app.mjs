if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log("✅ Service Worker registered!", reg))
        .catch(err => console.error("❌ Service Worker registration failed:", err));
} else {
    console.warn("⚠️ Service workers are not supported in this browser.");
}

