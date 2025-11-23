const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/order", async (req, res) => {
    const order = req.body;

    await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        {
            chat_id: process.env.ADMIN_ID,
            text: `🍔 Новый заказ:\n\n` +
                  order.items.map(i => `${i.name} x${i.qty}`).join("\n") +
                  `\n\nИтого: ${order.total} сум`
        }
    );

    res.send({ ok: true });
});

app.listen(3000, () => console.log("Server running"));
