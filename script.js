const tasks = [
    { question: "Mein Bruder war drei Jahre alt. - Ich wurde geboren.", answer: "Als mein Bruder drei Jahre alt war, wurde ich geboren." },
    { question: "Ich habe es eilig. - Ich nehme das Auto.", answer: "Wenn ich es eilig habe, nehme ich das Auto." },
    { question: "Wir hatten Urlaub. - Wir sind immer in die Berge gefahren.", answer: "Wenn wir Urlaub hatten, sind wir immer in die Berge gefahren." },
    { question: "Peppe war ein Kind. - Es gab noch keine Handys.", answer: "Als Peppe ein Kind war, gab es noch keine Handys." },
    { question: "Ich war krank. - Ich durfte immer viel fernsehen.", answer: "Wenn ich krank war, durfte ich immer viel fernsehen." },
    { question: "Wir waren letztes Jahr in Kyjiw. - Es war sehr heiß.", answer: "Als wir letztes Jahr in Kyjiw waren, war es sehr heiß." },
    { question: "Wir haben unsere Oma besucht. - Wir haben immer Süßigkeiten bekommen.", answer: "Wenn wir unsere Oma besucht haben, haben wir immer Süßigkeiten bekommen." },
    { question: "Ich war 22 Jahre alt. - Ich bin nach Deutschland gekommen.", answer: "Als ich 22 Jahre alt war, bin ich nach Deutschland gekommen." },
    { question: "Sie ist müde. - Sie trinkt immer Espresso.", answer: "Wenn sie müde ist, trinkt sie immer Espresso." },
    { question: "Ich bin heute aufgestanden. - Die Sonne hat geschienen.", answer: "Als ich heute aufgestanden bin, hat die Sonne geschienen." },
    { question: "Er war noch nicht verheiratet. - Er ist jeden Abend ausgegangen.", answer: "Als er noch nicht verheiratet war, ist er jeden Abend ausgegangen." },
    { question: "Ich war klein. - Wir lebten auf dem Land.", answer: "Als ich klein war, lebten wir auf dem Land." },
    { question: "Wir haben das zum ersten Mal gesehen. - Wir waren total überrascht.", answer: "Als wir das zum ersten Mal gesehen haben, waren wir total überrascht." },
    { question: "Sein Vater hat seinen Job verloren. - Er musste das Studium abbrechen.", answer: "Als sein Vater seinen Job verloren hat, musste er das Studium abbrechen." },
    { question: "Ich bin gestern nach Hause gekommen. - Es war schon dunkel.", answer: "Als ich gestern nach Hause gekommen bin, war es schon dunkel." },
    { question: "Sie haben geheiratet. - Hermine war schwanger.", answer: "Als sie geheiratet haben, war Hermine schwanger." },
    { question: "Sie hatte kein Geld mehr. - Sie hat immer ihre reiche Tante besucht.", answer: "Wenn sie kein Geld mehr hatte, hat sie immer ihre reiche Tante besucht." },
    { question: "Sie war das erste Mal im Deutschkurs. - Sie hat kein Wort verstanden.", answer: "Als sie das erste Mal im Deutschkurs war, hat sie kein Wort verstanden." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
