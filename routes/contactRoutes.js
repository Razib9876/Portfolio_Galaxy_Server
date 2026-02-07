// const express = require("express");
// const router = express.Router();
// const Contact = require("../models/contact");

// // POST /api/contact
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     // Validation
//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Save to DB
//     const newContact = await Contact.create({ name, email, message });

//     res.status(201).json({
//       success: true,
//       message: "Message sent",
//       data: newContact,
//     });
//   } catch (error) {
//     console.error("Contact route error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // GET all contact messages
// router.get("/", async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       count: contacts.length,
//       data: contacts,
//     });
//   } catch (error) {
//     console.error("Error fetching contacts:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, email, message } = req.body;

    // Validation (same quality as GET API)
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    console.log("Saved contact:", newContact);

    res.status(201).json({
      success: true,
      data: newContact,
    });
  } catch (error) {
    console.error("Contact route error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// GET all contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Optional GET ping route for testing
router.get("/ping", (req, res) => {
  res.json({ message: "Contact API is live" });
});

module.exports = router;
