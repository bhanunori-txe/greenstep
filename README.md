# 🌱 GreenStep – Carbon Footprint Tracker

GreenStep is a web application that helps users estimate, track, and reduce their monthly carbon footprint based on their lifestyle choices. It promotes eco-conscious decisions through CO₂ impact calculations, submission history tracking, and optional green living tips.

---

## ✨ Features

- ✅ **Carbon Footprint Calculator**
  - Estimates monthly CO₂ emissions from transport, diet, and electricity usage.
  
- 📊 **Submission History**
  - Automatically stores and displays past submissions with timestamps.

- 💡 **Green Tip Opt-in**
  - Option to receive sustainability tips via email.

- 🔐 **User Authentication**
  - Token-based authentication (JWT) to secure user data.

- 🌙 **Dark Mode Interface**
  - Clean, accessible dark-themed UI.

- 📱 **Responsive Design**
  - Optimized for mobile, tablet, and desktop use.

---

## 🛠 Tech Stack

| Layer         | Technology              |
|--------------|--------------------------|
| Frontend     | React.js, JSX, CSS       |
| Backend      | Node.js, Express.js      |
| Database     | MongoDB + Mongoose       |
| Auth         | JWT (JSON Web Tokens)    |
| Deployment   | Localhost (dev)          |
| Tools        | Git, Postman, MongoDB Atlas (optional) |

---

## 📦 Installation & Setup

### ✅ Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas cluster)
- npm or yarn

---

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/your-username/greenstep.git
cd greenstep

### 📁 2. Backend Setup
cd greenstep-server
npm install

Create a .env file in greenstep-server/:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/greenstep
JWT_SECRET=your-secret-key

Then run the backend server:
npm start

🌐 3. Frontend Setup
cd ../greenstep-client
npm install
npm start
The app should now be running at http://localhost:3000

🧪 Example Usage
Select your transport mode, diet type, and enter monthly electricity usage (kWh).

Click "Calculate CO₂ Score" to see your footprint.

Submission gets stored and displayed in Submission History.

Check the box to receive email tips (feature WIP).

📝 License
This project is open-source under the MIT License.


