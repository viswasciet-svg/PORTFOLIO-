# VISWA S — Engineering Portfolio Website
**Internet of Things (IoT) Student | ECE (2024 – 2028), CIET**

A production-ready, recruiter-friendly personal portfolio website crafted specifically for an Electronics and Communication Engineering (ECE) profile specializing in Internet of Things (IoT), Embedded Systems, and Embedded C programming.

---

## 🌟 Key Highlights & Design Identity

- **ECE & IoT Hardware Visual Identity**: Combines deep obsidian dark aesthetics, subtle animated PCB copper traces, IC pin accents, and emerald/cyan circuit glow.
- **Centralized Data Store (`js/data.js`)**: Single source of truth for all personal details, skills, projects, certifications, education, and achievements matching the uploaded resume.
- **Local AI Chatbot ("Viswa AI Assistant")**: Zero-hallucination engine answering recruiter questions (education, CGPA, embedded skills, projects, certifications, internship, contact).
- **Dynamic Project Architecture Modal**: Clickable detail modals for deep architectural reviews, hardware specifications, and feature sets.
- **Dual Resume Action**: Both "View Resume" (`target="_blank"`) and "Download Resume" (`download="Viswa_Resume.pdf"`).
- **Dark / Light Mode**: Seamless theme switching with persistence in `localStorage`.
- **Mobile Responsive & Accessible**: Fluid typography, touch-friendly layouts (320px to 1920px), keyboard navigation, and screen-reader support.

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # Main portfolio single-page application
├── 404.html                    # Custom circuit-themed 404 error page
├── favicon.svg                 # Custom minimal SV monogram circuit vector favicon
├── README.md                   # Project documentation & guide
├── css/
│   └── style.css               # Design system, CSS variables, PCB cards, responsive rules
├── js/
│   ├── data.js                 # Central configuration & data store (Single Source of Truth)
│   ├── script.js               # Theme toggle, navbar spy, modal viewer, contact validation
│   ├── animations.js           # Canvas PCB trace routing, typing carousel, scroll reveals
│   └── chatbot.js              # "Viswa AI Assistant" local NLP chat engine & quick prompt chips
└── assets/
    ├── images/
    │   ├── profile.jpg         # Professional recruiter-ready portrait photo
    │   └── projects/           # High-resolution project previews & dashboards
    │       ├── smart-home-automation.jpg
    │       ├── smart-attendance.jpg
    │       └── street-light-controller.jpg
    └── resume/
        └── Viswa_Resume.pdf    # Active verified resume (uploaded PDF)
```

---

## 🛠️ How to Update Your Content

To update your skills, add new projects, or update your resume:
1. **Update Content**: Open `js/data.js` and modify the relevant section:
   - `PORTFOLIO_DATA.personal`: Email, phone, location, bio.
   - `PORTFOLIO_DATA.projects`: Add or update projects, features, or GitHub/Live URLs.
   - `PORTFOLIO_DATA.skillsCategories`: Add new tools, microcontrollers, or protocols.
   - `PORTFOLIO_DATA.certifications`: Update certificate links or completion statuses.
2. **Update Resume**: Replace `assets/resume/Viswa_Resume.pdf` with your updated PDF file.
3. **Update Profile Photo**: Replace `assets/images/profile.jpg` with your headshot.

---

## 🚀 How to Run & Deploy

### Run Locally
Simply open `index.html` in any modern web browser or serve it via a local HTTP server:
```bash
# Using Python
python -m http.server 3000

# Or using Node.js npx serve
npx serve .
```

### Deploy to GitHub Pages
1. Push this repository to GitHub under `viswasciet-svg/portfolio` (or your chosen repository name).
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live within seconds at `https://viswasciet-svg.github.io/portfolio/`.

---

© 2026 S. Viswa. All rights reserved.
