# 🏠 HomeNest - Real Estate Property Management App

HomeNest is a full-stack real estate web application that allows users to browse, add, update, and manage properties securely. It uses **React** for the frontend, **Firebase Authentication** for user management, and **Express + MongoDB** for the backend API. It lets property owners post rentals and sales, while users browse, search and filter properties by property name. 

Live Website Link1 : https://homenest-6904d.web.app/
Live Website Link2 : https://homenest-6904d.firebaseapp.com/

---

## 🚀 Features


### 🔐 Authentication
- Secure sign up and login using **Firebase Authentication**.
- Private routes (only logged-in users can add or update properties).

### 🏡 Property Management
- Add new properties with details (title, price, type, description, image, location, etc.).
- View all properties in the **All Properties** page.
- Update or delete your own properties.
- View detailed property information on a **Property Details** page.

### 🌟 UI/UX
- Fully responsive layout.
- Built with **Tailwind CSS** for modern, clean styling.
- Components are modular and reusable.


---

## 🧩 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Firebase Authentication
- SweetAlert2

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Firebase Admin SDK (for server-side auth verification)
- Dotenv for environment variables

---

## 🧠 Key API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/properties` | Get all properties |
| `GET` | `/properties/:id` | Get property by ID |
| `POST` | `/properties` | Add a new property |
| `PUT` | `/properties/:id` | Update a property |
| `DELETE` | `/properties/:id` | Delete a property |

---

## 💬 Author

- 👩‍💻 Faria Alam
- 🎓 CSE, Jagannath University, Dhaka
