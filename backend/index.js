const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const Razorpay = require("razorpay");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ strict: false })); // Allow loose JSON parsing


// Helper function to read data from a JSON file
// const readData = (filePath) => {
//     try {
//         const data = fs.readFileSync(filePath, "utf8").trim();
//         return data ? JSON.parse(data) : []; // If empty, return []
//     } catch (error) {
//         console.error(`Error reading ${filePath}:`, error.message);
//         return []; // Return empty array on error
//     }
// };
const safeReadData = (filePath) => {
    try {
        let data = fs.readFileSync(filePath, "utf8").trim();
        if (!data) {
            console.warn(`Warning: ${filePath} is empty. Returning default empty array.`);
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
        return [];
    }
};




// Helper function to write data to a JSON file
const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

// Routes

// ✅ Get all food items


// app.get("/api/orders/:userId", (req, res) => {
//     console.log("Received request for orders:", req.params.userId);

//     const orders = safeReadData("./data/orders.json");
//     console.log("Orders from file:", orders); // Log the orders.json content

//     // Check if orders exist for this user
//     const userOrders = orders.filter((order) => order.userId === req.params.userId);
    
//     console.log("Filtered user orders:", userOrders); // Log filtered orders

//     if (userOrders.length === 0) {
//         return res.status(404).json({ message: "No orders found for this user" });
//     }

//     res.json(userOrders);
// });
app.get("/api/orders/:userId", (req, res) => {
    const userId = req.params.userId;
    console.log(`Received request for user orders: ${userId}`);

    const orders = safeReadData("./data/orders.json");
    console.log("Orders from file:", orders); // Debug log

    // Check if orders exist for this user
    const userOrders = orders.filter((order) => order.userId === userId);
    console.log("Filtered user orders:", userOrders); // Debug log

    if (userOrders.length === 0) {
        console.log("No orders found for this user.");
        return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json(userOrders);
});




// ✅ Register user
app.post("/api/register", (req, res) => {
    const { username, email, password } = req.body;
    const users = readData("./data/users.json");

    if (users.find((user) => user.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { id: crypto.randomUUID(), username, email, password };
    users.push(newUser);
    writeData("./data/users.json", users);

    res.status(201).json({ message: "User registered successfully", user: newUser });
});

// ✅ Login user
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const users = readData("./data/users.json");

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
});

// ✅ Add to cart
app.post("/api/cart", (req, res) => {
    const { userId, foodId, quantity } = req.body;
    const orders = readData("./data/orders.json");

    const newOrder = { id: crypto.randomUUID(), userId, foodId, quantity, status: "pending" };
    orders.push(newOrder);
    writeData("./data/orders.json", orders);

    res.status(201).json({ message: "Item added to cart", order: newOrder });
});

// ✅ View user orders
app.get("/api/orders/:userId", (req, res) => {
    const userId = req.params.userId;
    const orders = readData("./data/orders.json");

    const userOrders = orders.filter((order) => order.userId === userId);
    res.json(userOrders);
});

// ✅ Cancel order
app.delete("/api/orders/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    let orders = readData("./data/orders.json");

    // Check if order exists
    const orderIndex = orders.findIndex((order) => order.id === orderId);
    if (orderIndex === -1) {
        return res.status(404).json({ message: "Order not found" });
    }

    // Remove the order
    orders.splice(orderIndex, 1);
    writeData("./data/orders.json", orders);

    res.json({ message: "Order cancelled successfully" });
});


// ✅ Razorpay Payment Integration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/api/payment", async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, // Convert amount to paise (smallest currency unit)
        currency,
        receipt: crypto.randomUUID(),
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ Confirm Payment
app.post("/api/payment/verify", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = "YOUR_RAZORPAY_SECRET";
    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generated_signature === razorpay_signature) {
        const payments = readData("./data/payments.json");
        payments.push({ razorpay_order_id, razorpay_payment_id, status: "success" });
        writeData("./data/payments.json", payments);

        res.json({ message: "Payment successful" });
    } else {
        res.status(400).json({ message: "Invalid signature" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

