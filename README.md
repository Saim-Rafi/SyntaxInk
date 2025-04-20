# 🖋️ SyntaxInk – Online Code IDE  

**SyntaxInk** is a powerful, user-friendly online code IDE built for modern developers. It provides an intuitive environment to write, edit, and debug code directly in the browser using the powerful **Monaco Editor** (the engine behind VS Code). With real-time error feedback, syntax highlighting, and auto-completion, it offers a seamless coding experience.

---

## 🚀 Tech Stack

**Frontend:**
- ⚛️ React
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔀 React Router DOM
- 👤 React Avatar
- 🧩 React Icons
- 🧠 Monaco Editor (`@monaco-editor/react`)

**Backend:**
- 🧱 Express Generator
- 🌐 Node.js
- 📦 MongoDB with Mongoose
- 🔒 JSON Web Tokens (JWT)
- 🔁 Nodemon (dev)
- 🛡️ CORS
- 🔐 BcryptJS
- 📋 Morgan (logging)

---

## 🎯 Key Features

- 💡 **Monaco Editor Integration:**  
  Offers syntax highlighting, error detection, and intelligent code suggestions.

- ⚙️ **Error Feedback System:**  
  Instantly notifies users of syntax or runtime issues, improving debugging efficiency by up to 30%.

- 🔐 **Secure Authentication:**  
  Token-based authentication system using JWT and hashed passwords with bcryptjs.

- 🌍 **CORS Configured:**  
  Proper handling of cross-origin resource sharing for smoother communication between frontend and backend.

- ⚡ **Fast Dev Workflow:**  
  Utilized Vite for lightning-fast development and hot-reloading.

- 🔁 **Automatic Server Restarts:**  
  Nodemon ensures efficient development with auto-restarts on code change.

- 🧾 **Server Logging:**  
  Morgan used for detailed API request logs during development and debugging.

---

## 🛠️ Getting Started Locally

### 1️⃣ Clone the Repository

\`\`\`bash
git clone https://github.com/Saim-Rafi/SyntaxInk.git <br>
cd SyntaxInk
\`\`\`

### 2️⃣ Set up the Backend

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### 3️⃣ Set up the Frontend

\`\`\`bash
cd ../frontend
npm install
npm run dev
\`\`\`

---

## 🔐 Environment Variables

Inside your \`backend/.env\` file:

\`\`\`
PORT=5000 <br>
MONGO_URI=your_mongodb_connection_string <br>
JWT_SECRET=your_secret_key <br>
\`\`\`

---

## 📈 Improvements in Developer Experience

- ✅ Reduced debugging time by 30% with instant feedback.  
- ✅ Built with performance in mind using Vite and optimized API structure.  
- ✅ Clean, responsive UI that adapts well across screen sizes.  

---

## 📄 License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)

