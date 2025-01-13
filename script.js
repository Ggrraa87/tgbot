const cards = [
    "семерка жезлов",
    "отшельник",
    "восьмерка мечей",
    // Добавьте остальные карты
];

let selectedCards = [];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cards-container");
    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.cardName = card;

        const front = document.createElement("img");
        front.src = `images/front.png`; // Замените на путь к лицевой стороне карты
        front.alt = "Карта";

        const back = document.createElement("img");
        back.src = `images/${card}.png`; // Замените на путь к изображению карты
        back.alt = card;
        back.classList.add("back");

        cardElement.appendChild(front);
        cardElement.appendChild(back);

        cardElement.addEventListener("click", () => {
            if (!cardElement.classList.contains("flipped")) {
                cardElement.classList.add("flipped");
                selectedCards.push(card);
                if (selectedCards.length === 3) {
                    document.getElementById("submit-btn").disabled = false;
                }
            }
        });

        container.appendChild(cardElement);
    });

    document.getElementById("submit-btn").addEventListener("click", () => {
        if (selectedCards.length === 3) {
            // Отправка данных в бот
            window.Telegram.WebApp.sendData(selectedCards.join(","));
        }
    });

    // Автоматическое закрытие через 15 секунд
    setTimeout(() => {
        window.Telegram.WebApp.close();
    }, 15000);
});
