# Quizo - Quiz Management System

Quizo is a web-based quiz management system where teachers can create, edit, delete, and manage quizzes.

## **Project Setup**

### **1. Clone the Repository**

```sh
git clone https://github.com/yourusername/quizo.git
cd quizo
```

### **2. Backend Setup**

#### **Navigate to Backend Folder**

```sh
cd backend
```

#### **Install Dependencies**

```sh
npm install
```

#### **Set Up Environment Variables**

Create a `.env` file in the `backend/` folder and add:

```env
USER = admin123
PASSWORD = admin123
PORT = 5000
CLIENT_URL = YOUR_CLIENT_URL
POSTGRES_USER = YOUR_DB_USER
POSTGRES_HOST = YOUR_DB_HOST
POSTGRES_PORT = YOUR_DB_PORT
POSTGRES_PASSWORD = YOUR_DB_PASSWORD
POSTGRES_DB = YOUR_DB_NAME
```

#### **Run Backend Server**

```sh
npm run dev
```

The server will start at `http://localhost:5000`

---

### **3. Frontend Setup**

#### **Navigate to Frontend Folder**

```sh
cd client
```

#### **Install Dependencies**

```sh
npm install
```

#### **Set Up Environment Variables**

Create a `.env` file in the `client/` folder and add:

```env
VITE_API_URL= YOUR_BACKEND_URL
```

#### **Run Frontend Server**

```sh
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## **API Documentation**

### **Base URL**

```
http://localhost:5000/api/quiz
```

### **1. Create a Quiz**

#### **Endpoint:** `POST /quizzes`

#### **Request Body:**

```json
{
  "title": "Math Quiz",
  "description": "Basic algebra and geometry",
  "teacher_id": 1
}
```

#### **Response:**

```json
{
  "message": "Quiz created successfully",
  "quiz": {
    "id": 1,
    "title": "Math Quiz",
    "description": "Basic algebra and geometry",
    "created_at": "2024-02-15T12:00:00.000Z"
  }
}
```

### **2. Get All Quizzes**

#### **Endpoint:** `GET /quizzes`

#### **Response:**

```json
[
  {
    "id": 1,
    "title": "Math Quiz",
    "description": "Basic algebra and geometry",
    "created_at": "2024-02-15T12:00:00.000Z"
  }
]
```

### **3. Get a Single Quiz**

#### **Endpoint:** `GET /quizzes/{id}`

#### **Response:**

```json
{
  "id": 1,
  "title": "Math Quiz",
  "description": "Basic algebra and geometry",
  "created_at": "2024-02-15T12:00:00.000Z"
}
```

### **4. Update a Quiz**

#### **Endpoint:** `PUT /quizzes/{id}`

#### **Request Body:**

```json
{
  "title": "Updated Math Quiz",
  "description": "Algebra and calculus"
}
```

#### **Response:**

```json
{
  "message": "Quiz updated successfully"
}
```

### **5. Delete a Quiz**

#### **Endpoint:** `DELETE /quizzes/{id}`

#### **Response:**

```json
{
  "message": "Quiz deleted successfully"
}
```

---

## **Technology Stack**

### **Frontend:**

- React.js (Vite)
- Tailwind CSS
- React Router

### **Backend:**

- Node.js
- Express.js
- PostgreSQL (Database)

### **Tools & Libraries:**

- Zod for input validation

---
