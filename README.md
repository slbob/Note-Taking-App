# 📒 Note-Taking App

A simple full-stack note-taking application built with **Node.js**, **Express**, **MongoDB**, and a vanilla **HTML/CSS/JS frontend**. Includes **JWT authentication** so multiple users can register, log in, and manage their own notes securely.

---

## 🚀 Features

* User registration & authentication (JWT-based)
* Create, read, update, and delete personal notes
* Validation & error handling on server-side
* Clean, minimal front-end interface with HTML, CSS, and JS
* RESTful API endpoints for integration or external use

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/note-taking-app.git
cd note-taking-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root with the following variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/notetakingapp
JWT_SECRET=your_jwt_secret_here
```

### 4. Start the server

```bash
npm start
```

Server will run on **[http://localhost:3000](http://localhost:3000)**.

---

## 🖥️ Frontend Usage

Visit [http://localhost:3000](http://localhost:3000) to:

* Register/Login as a user
* Add, edit, and delete notes
* View your personal note collection

---

## 📡 API Documentation

### Authentication

All protected routes require an `Authorization` header:

```http
Authorization: Bearer <your_token>
```

#### POST `/api/auth/register`

Register a new user.

```json
// Request
{
  "email": "user@example.com",
  "password": "securepassword"
}

// Response
{
  "token": "<jwt_token>",
  "user": {
    "id": "1234567890",
    "email": "user@example.com"
  }
}
```

#### POST `/api/auth/login`

Log in an existing user.

```json
// Request
{
  "email": "user@example.com",
  "password": "securepassword"
}

// Response
{
  "token": "<jwt_token>",
  "user": {
    "id": "1234567890",
    "email": "user@example.com"
  }
}
```

---

### Notes

#### GET `/api/notes`

Fetch all notes for the logged-in user.

```json
// Response
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "note123",
      "title": "Shopping List",
      "content": "Milk, Bread, Eggs",
      "user": "1234567890"
    },
    {
      "_id": "note456",
      "title": "Todo",
      "content": "Finish project",
      "user": "1234567890"
    }
  ]
}
```

#### POST `/api/notes`

Create a new note.

```json
// Request
{
  "title": "New Note",
  "content": "This is a test note."
}

// Response
{
  "success": true,
  "data": {
    "_id": "note789",
    "title": "New Note",
    "content": "This is a test note.",
    "user": "1234567890"
  }
}
```

#### PUT `/api/notes/:id`

Update an existing note.

```json
// Request
{
  "title": "Updated Title",
  "content": "Updated content."
}

// Response
{
  "success": true,
  "data": {
    "_id": "note789",
    "title": "Updated Title",
    "content": "Updated content.",
    "user": "1234567890"
  }
}
```

#### DELETE `/api/notes/:id`

Delete a note.

```json
// Response
{
  "success": true,
  "data": {}
}
```

---

## ⚠️ Error Handling

The API returns structured error responses:

```json
{
  "success": false,
  "error": "Validation error: Title is required"
}
```

Common error cases:

* Missing fields (e.g., no `title` or `password`)
* Invalid credentials on login
* Unauthorized access to another user’s note

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.
