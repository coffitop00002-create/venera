const tg = window.Telegram.WebApp;

const menu = [
    { id: 1, name: "Классический бургер", price: 28000 },
    { id: 2, name: "Чизбургер", price: 30000 },
    { id: 3, name: "Двойной бургер", price: 35000 }
];

let cart = [];

const menuElem = document.getElementById("menu");

menu.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
        <b>${item.name}</b><br>
        ${item.price} сум<br>
        <button onclick="addToCart(${item.id})">Добавить</button>
    `;
    menuElem.appendChild(div);
});

function addToCart(id) {
    const found = cart.find(i => i.id === id);
    if (found) found.qty++;
    else cart.push({ ...menu.find(i => i.id === id), qty: 1 });
    tg.showPopup({ message: "Добавлено!" });
}

document.getElementById("orderBtn").onclick = async () => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    await fetch(process.env.SERVER_URL + "/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, total })
    });

    tg.close();
};
