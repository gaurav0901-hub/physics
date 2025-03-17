const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Comment Schema
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

// API Endpoint to Submit Comments
app.post('/api/comments', async (req, res) => {
  const { name, email, comment } = req.body;

  const newComment = new Comment({ name, email, comment });
  await newComment.save();

  // Send Email Notification
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'your-email@gmail.com',
    subject: 'New Comment on Your Website',
    text: `Name: ${name}\nEmail: ${email}\nComment: ${comment}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(201).json({ message: 'Comment submitted successfully!' });
});

// API Endpoint to Fetch Comments
app.get('/api/comments', async (req, res) => {
  const comments = await Comment.find().sort({ timestamp: -1 });
  res.json(comments);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
