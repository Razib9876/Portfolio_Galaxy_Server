const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save to DB
    const newContact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent",
      data: newContact,
    });
  } catch (error) {
    console.error("Contact route error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET all contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first
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

module.exports = router;
