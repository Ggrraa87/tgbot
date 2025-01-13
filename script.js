const cards = [
    "семерка жезлов",
    "отшельник",
    "восьмерка мечей",
    // Добавьте остальные карты
];

const cardImages = {
    "семерка жезлов": "semjez.jpg",
    "отшельник": "otsh.jpg",
    "восьмерка мечей": "voshm.jpeg",
    // Добавьте остальные сопоставления карт и изображений
};

let selectedCards = [];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cards-container");
    const submitBtn = document.getElementById("continue-button"); // Изменено на 'continue-button'
    submitBtn.disabled = true; // Изначально кнопка отключена

    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.cardName = card;

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const front = document.createElement("img");
        front.src = `images/front.jpg`; // Убедитесь, что файл front.png загружен
        front.alt = "Карта";
        front.classList.add("card-front");

        const back = document.createElement("img");
        back.src = `images/${cardImages[card]}`; // Используем сопоставление карт и изображений
        back.alt = card;
        back.classList.add("card-back");

        cardInner.appendChild(front);
        cardInner.appendChild(back);
        cardElement.appendChild(cardInner);

        cardElement.addEventListener("click", () => {
            if (!cardElement.classList.contains("flipped")) {
                if (selectedCards.length >= 3) {
                    alert(`Вы можете выбрать только 3 карты.`);
                    return;
                }
                cardElement.classList.add("flipped");
                selectedCards.push(card);
                if (selectedCards.length === 3) {
                    submitBtn.disabled = false;
                }
                updateSelectedCards();
            } else {
                cardElement.classList.remove("flipped");
                selectedCards = selectedCards.filter(name => name !== card);
                submitBtn.disabled = true;
                updateSelectedCards();
            }
        });

        container.appendChild(cardElement);
    });

    submitBtn.addEventListener("click", () => {
        if (selectedCards.length === 3) {
            // Отправка данных в бот
            window.Telegram.WebApp.sendData(selectedCards.join(", "));
            // Закрытие веб-приложения
            window.Telegram.WebApp.close();
        }
    });

    // Автоматическое закрытие через 15 секунд
    setTimeout(() => {
        window.Telegram.WebApp.close();
    }, 15000);
});

function updateSelectedCards() {
    const list = document.getElementById("cards-list");
    list.innerHTML = '';
    selectedCards.forEach(card => {
        const li = document.createElement("li");
        li.textContent = card;
        list.appendChild(li);
    });
}
