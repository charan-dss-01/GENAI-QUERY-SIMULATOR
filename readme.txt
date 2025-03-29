# GenAI Query Simulator

Hello! 👋 I'm excited to present my project, the **GenAI Query Simulator**. This application is designed to bridge the gap between human language and SQL queries, making database interactions more intuitive and AI-powered.

---

## 🚀 Why I Built This

As a developer passionate about AI and backend systems, I wanted to create an application that could **translate natural language into SQL queries**. This not only simplifies database operations but also helps users understand query structures better.

---

## 📌 Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Postman](https://www.postman.com/) (for API testing)
- A **Gemini API Key** (for AI-powered query explanations)
- [Render](https://render.com/) account (for deployment, if needed)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/genai-query-simulator.git
cd genai-query-simulator
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ▶️ Running the Application

### **For Local Development**
```sh
node index.js
```
(Default port: **5000**, unless changed in `.env` file)

### **For Deployment on Render**
1. Push your project to **GitHub**.
2. Go to [Render](https://render.com/) and create a new web service.
3. Connect it to your GitHub repository.
4. Set the root directory as `.`
5. Add the **environment variables** in the Render dashboard.
6. Set the start command:
   ```sh
   node index.js
   ```
7. Deploy and get your live API URL!

Your app will now be accessible at `https://genai-query-simulator.onrender.com` 🎉

---

## 📡 API Endpoints

### **Base URL:**
👉 `https://genai-query-simulator.onrender.com`

### **1️⃣ User Authentication**

#### **🔹 Register a User**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/auth/register`
- **Body (JSON):**
  ```json
  {
      "username": "ram9999",
      "password": "ram@1233456"
  }
  ```
- **Response:** User ID or error message.

#### **🔹 User Login**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/auth/login`
- **Body (JSON):**
  ```json
  {
      "username": "ram9999",
      "password": "ram@1233456"
  }
  ```
- **Response:** Authentication token or error message.

---

### **2️⃣ Query Processing**

#### **🔹 Simulate Query Execution**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/query/query`
- **Body (JSON):**
  ```json
  {
      "question": "select all employees whose salary is greater than 80000"
  }
  ```
- **Response:** Simulated SQL query result.

#### **🔹 Explain Query Structure**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/query/explain`
- **Body (JSON):**
  ```json
  {
      "question": "select all employees whose salary is greater than 80000"
  }
  ```
- **Response:** Breakdown of query components.

#### **🔹 Validate Query Feasibility**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/query/validate`
- **Body (JSON):**
  ```json
  {
      "question": "select * from employee where name='John Doe'"
  }
  ```
- **Response:** AI-assisted validation of query feasibility.

---

## 🔍 Postman Testing Guide

To help with testing, I’ve documented all the API calls. You can use **Postman** to test them easily:

1. Open **Postman**.
2. Set the **Base URL** as `https://genai-query-simulator.onrender.com`
3. Use the above endpoints.
4. Send requests and verify responses.

---

## 🎉 What This Means to Me

 I’m really proud of the work I’ve put into it. It’s given me hands-on experience in **Node.js, Express.js, API development, authentication, and cloud deployment**. 

I’d love to discuss this further in the interview and get your feedback on how I can improve it! 😊

---

## 🚀 Future Improvements

- **Enhancing AI accuracy**: Improve query translation logic.
- **User roles & permissions**: Restrict access based on user types.
- **Performance optimization**: Optimize API response time.
- **Database integration**: Connect to an actual database for real query execution.

Looking forward to sharing more about this project and learning from your insights! 🔥

# GenAI Query Simulator

Hello! 👋 I'm excited to present my project, the **GenAI Query Simulator**. This application is designed to bridge the gap between human language and SQL queries, making database interactions more intuitive and AI-powered.

---

## 🚀 Why I Built This

As a developer passionate about AI and backend systems, I wanted to create an application that could **translate natural language into SQL queries**. This not only simplifies database operations but also helps users understand query structures better.

---

## 📌 Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Postman](https://www.postman.com/) (for API testing)
- A **Gemini API Key** (for AI-powered query explanations)
- [Render](https://render.com/) account (for deployment, if needed)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/genai-query-simulator.git
cd genai-query-simulator
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ▶️ Running the Application

### **For Local Development**
```sh
node index.js
```
(Default port: **5000**, unless changed in `.env` file)

### **For Deployment on Render**
1. Push your project to **GitHub**.
2. Go to [Render](https://render.com/) and create a new web service.
3. Connect it to your GitHub repository.
4. Set the root directory as `.`
5. Add the **environment variables** in the Render dashboard.
6. Set the start command:
   ```sh
   node index.js
   ```
7. Deploy and get your live API URL!

Your app will now be accessible at `https://genai-query-simulator.onrender.com` 🎉

---

## 📡 API Endpoints

### **Base URL:**
👉 `https://genai-query-simulator.onrender.com`

### **1️⃣ User Authentication**

#### **🔹 Register a User**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/auth/register`
- **Body (JSON):**
  ```json
  {
      "username": "ram9999",
      "password": "ram@1233456"
  }
  ```
- **Response:** User ID or error message.

#### **🔹 User Login**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/auth/login`
- **Body (JSON):**
  ```json
  {
      "username": "ram9999",
      "password": "ram@1233456"
  }
  ```
- **Response:** Authentication token or error message.

---

### **2️⃣ Query Processing**

#### **🔹 Simulate Query Execution**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/query/query`
- **Body (JSON):**
  ```json
  {
      "question": "select all employees whose salary is greater than 80000"
  }
  ```
- **Response:** Simulated SQL query result.

#### **🔹 Explain Query Structure**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/query/explain`
- **Body (JSON):**
  ```json
  {
      "question": "select all employees whose salary is greater than 80000"
  }
  ```
- **Response:** Breakdown of query components.

#### **🔹 Validate Query Feasibility**
- **URL:** `POST https://genai-query-simulator.onrender.com/api/query/validate`
- **Body (JSON):**
  ```json
  {
      "question": "select * from employee where name='John Doe'"
  }
  ```
- **Response:** AI-assisted validation of query feasibility.

---

## 🔍 Postman Testing Guide

To help with testing, I’ve documented all the API calls. You can use **Postman** to test them easily:

1. Open **Postman**.
2. Set the **Base URL** as `https://genai-query-simulator.onrender.com`
3. Use the above endpoints.
4. Send requests and verify responses.

---

## 🎉 What This Means to Me

 I’m really proud of the work I’ve put into it. It’s given me hands-on experience in **Node.js, Express.js, API development, authentication, and cloud deployment**. 

I’d love to discuss this further in the interview and get your feedback on how I can improve it! 😊

---

## 🚀 Future Improvements

- **Enhancing AI accuracy**: Improve query translation logic.
- **User roles & permissions**: Restrict access based on user types.
- **Performance optimization**: Optimize API response time.
- **Database integration**: Connect to an actual database for real query execution.

Looking forward to sharing more about this project and learning from your insights! 🔥

