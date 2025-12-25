document.addEventListener("DOMContentLoaded", () => {
    const showMenu = document.querySelector(".show-menu");
    const hiddenMenu = document.querySelector(".hidden-menu");
    const closeButton = document.querySelector(".hidden-menu .close"); 
    const overlay = document.querySelector(".overlay"); 

    function openMenu() {
        hiddenMenu.style.right = '0'; 
        hiddenMenu.style.opacity = '1'; 
        hiddenMenu.style.transform = 'scale(1)'; 
        overlay.style.opacity = '1'; 
        overlay.style.visibility = 'visible'; 
        showMenu.style.display = 'none'; 
    }

    function closeMenu() {
        hiddenMenu.style.right = '-300px'; 
        hiddenMenu.style.opacity = '0'; 
        hiddenMenu.style.transform = 'scale(0.9)'; 
        overlay.style.opacity = '0'; 
        overlay.style.visibility = 'hidden'; 
        showMenu.style.display = 'block'; 
    }

    showMenu.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
});


let slideIndex = 1;     //слайдер
showSlides(slideIndex);

function nextSlide() {
    showSlides(slideIndex += 1);
}

function previousSlide() {
    showSlides(slideIndex -= 1);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("item");

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let slide of slides) {
        slide.style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}


document.getElementById("feedback-form").addEventListener("submit", function (event)  // Зворотний зв`язок
{
    event.preventDefault();

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const comment = document.getElementById("comment");
    const errorList = document.getElementById("error-list");

    errorList.innerHTML = "";

    let errors = [];

    const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+380\d{9}|0\d{9})$/;

    [firstName, lastName, email, phone, comment].forEach(el => 
        {
        el.classList.remove("invalid", "valid");
    });

    if (firstName.value === "")  //ім'я
        {
        errors.push("Поле «Ім'я» є обовʼязковим.");
        firstName.classList.add("invalid");
    } else if (!nameRegex.test(firstName.value)) {
        errors.push("Імʼя повинно містити щонайменше 3 літери без пробілів.");
        firstName.classList.add("invalid");
    } else {
        firstName.classList.add("valid");
    }

    if (lastName.value === "")  //прізвище
        {
        errors.push("Поле «Прізвище» є обовʼязковим.");
        lastName.classList.add("invalid");
    } else if (!nameRegex.test(lastName.value)) {
        errors.push("Прізвище повинно містити щонайменше 3 літери без пробілів.");
        lastName.classList.add("invalid");
    } else {
        lastName.classList.add("valid");
    }

    if (email.value === "")  //еmail
        {
        errors.push("Поле «Email» є обовʼязковим.");
        email.classList.add("invalid");
    } else if (!emailRegex.test(email.value)) {
        errors.push("Введіть коректну електронну адресу (наприклад, name@mail.com).");
        email.classList.add("invalid");
    } else {
        email.classList.add("valid");
    }

    if (phone.value === "")   //телефон
        {
        errors.push("Поле «Телефон» є обовʼязковим.");
        phone.classList.add("invalid");
    } else if (!phoneRegex.test(phone.value)) {
        errors.push("Телефон має бути у форматі +380XXXXXXXXX або 0XXXXXXXXX.");
        phone.classList.add("invalid");
    } else {
        phone.classList.add("valid");
    }

    if (comment.value !== "")  //комент
        {
        comment.classList.add("valid");
    }

    if (errors.length > 0) //показ помилок
        {

        const title = document.createElement("li");
        title.textContent = "Будь ласка, виправте такі помилки:";
        title.style.fontWeight = "bold";
        errorList.appendChild(title);

        errors.forEach(err => {
            const li = document.createElement("li");
            li.textContent = err;
            errorList.appendChild(li);
        });

    } else {
        alert("Дякуємо! Форма успішно надіслана 🙂");
        document.getElementById("feedback-form").reset();
    }
});

const modal = document.getElementById("modal");                  //модал
const modalClose = document.querySelector(".modal-close");
const modalContact = document.getElementById("modal-contact");
const modalProduct = document.getElementById("modal-product");

modalClose.onclick = () => modal.classList.remove("show");  //закриття
modal.onclick = e => {
    if (e.target === modal) modal.classList.remove("show");
};

document.querySelector('a[href="#contacts"]').addEventListener("click", e => {  //кнопка "Контакти"
    e.preventDefault();
    modal.classList.add("show");
    modalContact.style.display = "block";
    modalProduct.style.display = "none";
});

document.querySelectorAll(".product-card").forEach(card => {  //відкриття через товар
    card.addEventListener("click", () => {
        modal.classList.add("show");
        modalContact.style.display = "none";
        modalProduct.style.display = "block";

        document.getElementById("modal-img").src = card.querySelector("img").src;
        document.getElementById("modal-title").textContent = card.querySelector("h3").textContent;
        document.getElementById("modal-desc").textContent = card.querySelector("p").textContent;
        document.getElementById("modal-price").textContent = card.querySelector(".price").textContent;
    });
});

document.querySelector('a[href="#contacts"]').addEventListener("click", () => {
    hiddenMenu.style.right = '-300px';
    hiddenMenu.style.opacity = '0';
    hiddenMenu.style.transform = 'scale(0.9)';
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    showMenu.style.display = 'block';
});

document.getElementById("modal-form").addEventListener("submit", function (e) {  //модал форма валідація
    e.preventDefault();

    const firstName = document.getElementById("modal-firstName");
    const lastName = document.getElementById("modal-lastName");
    const email = document.getElementById("modal-email");
    const phone = document.getElementById("modal-phone");
    const message = document.getElementById("modal-message");
    const errorList = document.getElementById("modal-error-list");

    errorList.innerHTML = "";
    let errors = [];

    const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+380\d{9}|0\d{9})$/;

    [firstName, lastName, email, phone, message].forEach(el => {
        el.classList.remove("invalid", "valid");
    });

    if (!nameRegex.test(firstName.value.trim())) {     //імʼя
        errors.push("Імʼя повинно містити мінімум 3 літери.");
        firstName.classList.add("invalid");
    } else {
        firstName.classList.add("valid");
    }

    if (!nameRegex.test(lastName.value.trim())) {    //прізвище
        errors.push("Прізвище повинно містити мінімум 3 літери.");
        lastName.classList.add("invalid");
    } else {
        lastName.classList.add("valid");
    }

    if (!emailRegex.test(email.value.trim())) {      //еmail
        errors.push("Введіть коректний Email.");
        email.classList.add("invalid");
    } else {
        email.classList.add("valid");
    }

    if (!phoneRegex.test(phone.value.trim())) {      //телефон
        errors.push("Телефон у форматі +380XXXXXXXXX або 0XXXXXXXXX.");
        phone.classList.add("invalid");
    } else {
        phone.classList.add("valid");
    }

    if (message.value.trim().length < 5) {            //повідомлення
        errors.push("Повідомлення повинно містити щонайменше 5 символів.");
        message.classList.add("invalid");
    } else {
        message.classList.add("valid");
    }

    if (errors.length > 0) {         //помилки
        errors.forEach(err => {
            const li = document.createElement("li");
            li.textContent = err;
            errorList.appendChild(li);
        });
    } else {
        alert("Дякуємо! Ми скоро з вами звʼяжемось ☕");
        e.target.reset();
        modal.classList.remove("show");
    }
});


class CoffeeCalculator {   //калькулятор
    constructor(prices) {
        this.prices = prices;

        this.totalInput = document.getElementById("totalItems");
        this.container = document.getElementById("itemInputs");
        this.result = document.getElementById("calcResult");
    }

    createInputFields() {      // створення полів
        const count = parseInt(this.totalInput.value);

        if (isNaN(count) || count < 1 || count > 6) {
            alert("Введіть число від 1 до 6");
            return;
        }

        this.container.innerHTML = "";

        for (let i = 1; i <= count; i++) {
            const div = document.createElement("div");
            div.className = "calc-item";

            const select = document.createElement("select");
            for (let item in this.prices) {
                const option = document.createElement("option");
                option.value = item;
                option.textContent = `${item} — ${this.prices[item]} грн`;
                select.appendChild(option);
            }

            const qty = document.createElement("input");
            qty.type = "number";
            qty.min = 1;
            qty.placeholder = "Кількість";

            div.appendChild(select);
            div.appendChild(qty);
            this.container.appendChild(div);
        }
    }

    calculateTotal() {          // обчислення
        let total = 0;
        const items = this.container.querySelectorAll(".calc-item");

        for (let item of items) {
            const select = item.querySelector("select");
            const qtyInput = item.querySelector("input");

            const qty = parseInt(qtyInput.value);
            if (isNaN(qty) || qty < 1) {
                alert("Кількість має бути ≥ 1");
                return;
            }

            total += qty * this.getValue(select.value);
        }

        this.result.textContent = `Загальна сума: ${total} грн`;
    }

    resetForm() {       // очищення
        this.totalInput.value = 1;
        this.container.innerHTML = "";
        this.result.textContent = "";
    }

    getValue(item) {       // отримати ціну
        return this.prices[item];
    }
}

const coffeePrices = {
    "Arabica Premium": 250,
    "Espresso Blend": 150,
    "Colombian Roast": 280,
    "Robusta Strong": 200,
    "Latte 057": 300,
    "Decaf Delight": 270
};

const coffeeCalc = new CoffeeCalculator(coffeePrices);

document.getElementById("showFormBtn").onclick = () => coffeeCalc.createInputFields();
document.getElementById("calcBtn").onclick = () => coffeeCalc.calculateTotal();
document.getElementById("resetBtn").onclick = () => coffeeCalc.resetForm();


const imgURLArr = [             //галерея
    'images/gallery1.jpg',
    'images/gallery2.jpg',
    'images/gallery3.jpg',
    'images/gallery4.jpg',
    'images/gallery5.jpg',
    'images/gallery6.jpg'
];

const gallery = document.getElementById("gallery-container");
const loader = document.getElementById("loader");

const promiseArr = [];

imgURLArr.forEach(url => {

    const promise = new Promise((resolve, reject) => {

        const img = document.createElement("img");
        img.src = url;
        img.classList.add("picture");

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Image load error"));

        gallery.appendChild(img);
    });

    promiseArr.push(promise);
});

Promise.all(promiseArr)
    .then(images => {

        loader.classList.add("hidden");

        images.forEach(img => {
            img.classList.add("show");
        });

    })
    .catch(() => {
        loader.classList.add("hidden");
        alert("Load error");
    });

//збільшення фото у галереї

const galleryContainer = document.getElementById("gallery-container");

const galleryModal = document.getElementById("gallery-modal");  // елементи модального вікна
const galleryLargeImg = document.getElementById("gallery-large-img");
const galleryClose = document.getElementById("gallery-close");

galleryContainer.addEventListener("click", function (event) {

    const img = event.target.closest("img");
    if (!img) return;

    galleryLargeImg.src = img.src;
    galleryModal.classList.add("show");

    event.preventDefault();
});

galleryClose.addEventListener("click", () => {   // закриття модального вікна
    galleryModal.classList.remove("show");
});

galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
        galleryModal.classList.remove("show");
    }
});
