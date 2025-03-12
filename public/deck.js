let deck_id = "";

async function createDeck() {
    const response = await fetch("https://demo25-magnus.onrender.com/temp/deck", { method: "POST" });
    const data = await response.json();
    deck_id = data.deck_id;
    document.getElementById("output").innerText = "Ny kortstokk opprettet: " + deck_id;
}

async function shuffleDeck() {
    if (!deck_id) {
        alert("Du må opprette en kortstokk først!");
        return;
    }
    await fetch(`/temp/deck/shuffle/${deck_id}`, { method: "PATCH" });
    document.getElementById("output").innerText = "Kortstokken er stokket!";
}

async function drawCard() {
    if (!deck_id) {
        alert("Du må opprette en kortstokk først!");
        return;
    }
    
    const response = await fetch(`/temp/deck/${deck_id}/card`);
    const data = await response.json();

    if (data.error) {
        document.getElementById("output").innerText = `Feil: ${data.error}`;
        return;
    }

    document.getElementById("output").innerText = `Du trakk: ${data.card.rank} of ${data.card.suit}`;
}

