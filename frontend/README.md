🪑 Anti-Cheat College Exam Seat Management System 🎓

A modern web application built to automate and manage seat allocation during college exams — ensuring transparency, fairness, and eliminating manual errors and cheating possibilities.

## 🚀 Features

- 🎯 Smart Seat Allocation based on department and roll numbers
- 🧠 Auto-detection of student branch via roll number parsing
- 📋 Real-time grid generation for exam seating
- 🔎 Clean tabular display of allocated seats
- 📥 Export the seat matrix as a downloadable **PDF**
- 🔽 Dropdown input for selecting Exam Type (e.g., Mid-Term, Final Exam)
- 🖥️ Responsive UI with customized styling
- 💾 No database required – 100% client-side rendering

## 📸 Demo Preview

![Seat Allocation Preview](link-to-screenshot-if-any)

## 🧩 Tech Stack

- 🧑‍💻 **React.js** — Frontend
- 🎨 **CSS** / `Tailwind CSS` (converted later to custom CSS)
- 📦 **html2canvas & jsPDF** — For PDF rendering
- 📑 **react-select** — For enhanced dropdown UX



## 🛠️ How to Use

1. Clone the repo  
   ```bash
   git clone https://github.com/ahmadjaved79/alietExamSeating.git
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Run the development server  
   ```bash
   npm run dev
   ```

4. Open in browser  
   ```
   http://localhost:5173
   ```

## 📌 Usage Instructions

- 🧾 **Paste student roll numbers** in the input area (each on a new line)
- 🧠 App automatically detects branch using roll number pattern
- 🔽 Select **Exam Type** from dropdown (e.g., Mid-Term)
- 🔧 Click **Add Students** to render seat matrix
- 📥 Click **Download PDF** to save printable version

## ✅ Future Enhancements

- 🔐 Admin login & authentication
- ☁️ Database integration for persistent data
- 🧾 Print-ready PDF templates
- 🧠 AI-based smart shuffling algorithm for anti-cheating

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

[MIT](LICENSE)


Made with ❤️ by [Ahmad Javed]
Smart Seats. Safer Exams. Zero Cheating
