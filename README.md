# Chat-App (MERN Stack + WebSocket)
A real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO for instant messaging and online status updates.

![image alt](https://github.com/KetanPatil-dev/Chat-App/blob/2cb2a3cdfd9de794c9ae335ba57c32780918febf/Images/Screenshot%202025-05-28%20at%209.45.28%E2%80%AFPM.png)

![image alt](https://github.com/KetanPatil-dev/Chat-App/blob/2882a10371cddbb286d0700b36e3b967f7da41dc/Images/Screenshot%202025-05-28%20at%209.46.06%E2%80%AFPM.png)

🚀 Features
-User Authentication (Sign Up, Login, Logout)

-Real-time Messaging (one-to-one messaging)

-Online User Status (see who is online)

-Profile Management (update profile, avatar, etc.)

-Responsive UI (mobile & desktop)

-Global State Management (Zustand)

-Secure Passwords (bcryptjs)

-Error Handling (server and client side)

🛠️ Tech Stack
Frontend- React.js, Zustand, TailwindCSS/Daisy UI
Backend-Node.js, Express.js, Socket.IO
Database-MongoDB, Mongoose
Auth-JWT (JSON Web Token)
Real Time-Socket.IO

📦 Installation
1. Clone the Repository
   git clone https://github.com/your-username/Chat-App.git
   cd chat-app
   
2. Backend Setup
   cd server
   npm install
  # Create a .env file with your MongoDB URI and JWT secret
  npm run dev
  
3. Frontend Setup
   cd client
   npm install
   npm run dev

   
🔗 Key Concepts
Socket.IO enables real-time, bidirectional communication between client and server, powering instant messaging and online user status.

Zustand is used for global state management (auth, online users, socket instance, etc.).

MongoDB stores user profiles, messages, and chat history.

JWT secures authentication and user sessions.

# .env Setup
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development



  


