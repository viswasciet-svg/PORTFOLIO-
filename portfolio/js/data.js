/**
 * VISWA S - PORTFOLIO CENTRAL DATA STORE
 * Single Source of Truth for all personal, academic, technical, and project information.
 * Derived directly from the verified uploaded resume.
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "VISWA S",
    title: "Internet of Things (IoT) Student",
    roleSubtitle: "ECE Student | IoT & Embedded Systems",
    bio: "Aspiring Electronics and Communication Engineering student with a strong foundation in Internet of Things (IoT), embedded systems, programming, and sensor-based technologies. Skilled in developing IoT applications using microcontrollers, sensors, and communication protocols to solve real-world problems through smart and connected systems.",
    about: "Aspiring Electronics and Communication Engineering student with a strong foundation in Internet of Things (IoT), embedded systems, programming, and sensor-based technologies. Skilled in developing IoT applications using microcontrollers, sensors, and communication protocols to solve real-world problems through smart and connected systems.",
    location: "Coimbatore, India",
    email: "viswa.s.ciet@gamil.com",
    phone: "+91 8524807757",
    phoneRaw: "+918524807757",
    resumeUrl: "assets/resume/Viswa_Resume.pdf",
    avatarUrl: "assets/images/profile.jpg",
    status: "Open for Embedded & IoT Opportunities",
    openToWork: true
  },

  areaOfInterest: [
    {
      title: "Embedded C Programming",
      domain: "Microcontroller Firmware & Hardware Control",
      description: "Developing robust microcontroller firmware in Embedded C for real-time sensor reading, actuator control, and system automation.",
      progressStatus: "Core Interest",
      icon: "fas fa-microchip"
    },
    {
      title: "IoT Things",
      domain: "Smart Connected Systems & Telemetry",
      description: "Building smart connected IoT systems with sensor networks, RFID verification, and cloud database dashboards.",
      progressStatus: "Core Interest",
      icon: "fas fa-wifi"
    }
  ],

  careerGoal: {
    statement: "To develop practical IoT and embedded solutions using microcontrollers, sensors, and communication protocols to solve real-world problems through smart and connected systems.",
    focusAreas: [
      "Embedded C Programming",
      "Basics of Internet of Things (IoT)",
      "Sensor Interfacing & Microcontrollers",
      "Smart & Connected Systems"
    ]
  },

  socials: [
    {
      name: "GitHub",
      url: "https://github.com/viswasciet-svg",
      icon: "fab fa-github",
      aria: "Visit Viswa's GitHub profile"
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/problemset",
      icon: "fas fa-code",
      aria: "Visit Viswa's LeetCode profile"
    }
  ],

  education: [
    {
      degree: "B.E Electronics and Communication Engineering",
      department: "Electronics and Communication Engineering (ECE)",
      college: "COIMBATORE INSTITUTE OF ENGINEERING AND TECHNOLOGY",
      period: "2024 – 2028",
      cgpa: "8 (Till Semester IV)",
      location: "Coimbatore, Tamil Nadu",
      highlights: [
        "Degree: B.E Electronics and Communication Engineering (2024 – 2028)",
        "Academic Standing: CGPA: 8 (Till Semester IV)",
        "Focus on Internet of Things (IoT), embedded systems, and microcontroller applications"
      ]
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      department: "Higher Secondary School",
      college: "Sri Venkateshwara Matric Higher Secondary School",
      period: "Completed",
      cgpa: "90%",
      location: "Tamil Nadu",
      highlights: [
        "Scored 90% in HSC board examinations",
        "Strong foundation in Physics, Chemistry, and Mathematics"
      ]
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      department: "Secondary School",
      college: "Sri Venkateshwara Matric Higher Secondary School",
      period: "Completed",
      cgpa: "90%",
      location: "Tamil Nadu",
      highlights: [
        "Scored 90% in SSLC board examinations"
      ]
    }
  ],

  skillsCategories: [
    {
      id: "iot-embedded",
      name: "IoT & Embedded Technologies",
      icon: "fas fa-microchip",
      description: "Core embedded programming and hardware interfacing for smart connected devices.",
      skills: [
        { name: "Basics of Internet of Things (IoT)", tag: "Concepts & Telemetry" },
        { name: "Embedded C", tag: "Firmware Development" }
      ]
    },
    {
      id: "programming",
      name: "Programming Languages",
      icon: "fas fa-terminal",
      description: "Structured coding and computational problem solving.",
      skills: [
        { name: "C", tag: "System Programming" },
        { name: "Python", tag: "Scripting & Logic" }
      ]
    },
    {
      id: "webdev",
      name: "Web Technologies",
      icon: "fas fa-globe",
      description: "Markup and interface design for web-based monitoring dashboards.",
      skills: [
        { name: "HTML", tag: "Web Structure" },
        { name: "CSS", tag: "Interface Styling" }
      ]
    },
    {
      id: "database",
      name: "Databases",
      icon: "fas fa-database",
      description: "Data storage and records management.",
      skills: [
        { name: "MongoDB", tag: "NoSQL Database" }
      ]
    },
    {
      id: "tools",
      name: "Tools & Platforms",
      icon: "fas fa-wrench",
      description: "Development environments, version control, and AI development tooling.",
      skills: [
        { name: "Arduino IDE", tag: "Prototyping IDE" },
        { name: "Git", tag: "Version Control" },
        { name: "GitHub", tag: "Collaboration" },
        { name: "VS Code", tag: "Code Editor" },
        { name: "Claude", tag: "AI Assistant" },
        { name: "Cursor AI", tag: "AI Editor" }
      ]
    },
    {
      id: "softskills",
      name: "Soft Skills",
      icon: "fas fa-users",
      description: "Professional teamwork, analytical thinking, and personal efficacy.",
      skills: [
        { name: "Problem Solving", tag: "Analytical" },
        { name: "Teamwork", tag: "Collaboration" },
        { name: "Communication", tag: "Interpersonal" },
        { name: "Time Management", tag: "Efficiency" }
      ]
    }
  ],

  projects: [
    {
      id: "smart-home-automation",
      name: "Smart Home Automation System",
      category: "IoT & Embedded Systems",
      image: "assets/images/projects/smart-home-automation.jpg",
      shortDescription: "Developed a home automation system to control lights and fans using a mobile application. Programmed the microcontroller in Embedded C for real-time device control.",
      technologies: [
        "Embedded C",
        "Arduino",
        "Relay Module",
        "Bluetooth (HC-05)"
      ],
      keyFeatures: [
        "Developed a home automation system to control lights and fans using a mobile application",
        "Programmed the microcontroller in Embedded C for real-time device control",
        "Interfaced HC-05 Bluetooth module for reliable wireless control commands",
        "Implemented multi-channel relay switching for AC appliances"
      ],
      githubUrl: null,
      liveUrl: null,
      status: "Hardware Interfaced & Tested",
      highlight: "Featured Project"
    },
    {
      id: "smart-attendance",
      name: "Smart Attendance Management System",
      category: "IoT & Cloud Dashboard",
      image: "assets/images/projects/smart-attendance.jpg",
      shortDescription: "Developed a cloud-based attendance system using RFID and ESP32. Stored attendance records in a cloud database and displayed reports through a web dashboard.",
      technologies: [
        "IoT",
        "ESP32",
        "RFID",
        "Firebase",
        "HTML",
        "CSS",
        "JavaScript"
      ],
      keyFeatures: [
        "Developed a cloud-based attendance system using RFID and ESP32",
        "Stored attendance records in a cloud database",
        "Displayed real-time attendance reports through a web dashboard",
        "Instant contact-free student identity verification"
      ],
      githubUrl: null,
      liveUrl: null,
      status: "Cloud Integrated",
      highlight: "IoT Cloud System"
    },
    {
      id: "street-light-controller",
      name: "Automatic Street Light Controller",
      category: "Embedded Systems",
      image: "assets/images/projects/street-light-controller.jpg",
      shortDescription: "Built an automatic street lighting system using an LDR sensor to reduce power consumption. Implemented day/night detection using Embedded C.",
      technologies: [
        "Embedded C",
        "Arduino",
        "LDR Sensor"
      ],
      keyFeatures: [
        "Built an automatic street lighting system using an LDR sensor to reduce power consumption",
        "Implemented day/night detection using Embedded C",
        "Automated ambient light intensity threshold switching",
        "Energy-saving automated power management"
      ],
      githubUrl: null,
      liveUrl: null,
      status: "Hardware Prototype",
      highlight: "Energy Efficient"
    }
  ],

  certifications: [
    {
      name: "Embedded C",
      organization: "Verified Technical Certification",
      domain: "Microcontroller Firmware & Embedded Systems",
      status: "Certified",
      date: "Verified",
      linkText: "Resume Verified",
      url: null,
      badge: "Verified Certification"
    }
  ],

  experience: {
    title: "EMBEDDED SYSTEMS & IoT (Internship)",
    role: "Embedded Systems & IoT Intern",
    description: "Hands-on professional internship experience focused on Embedded Systems and Internet of Things (IoT) technologies.",
    status: "Internship Completed",
    areas: [
      "Embedded Systems",
      "Internet of Things (IoT)",
      "Microcontroller Firmware & Sensor Interfacing"
    ]
  },

  achievements: [
    {
      title: "Academic Standing",
      metric: "CGPA: 8",
      icon: "fas fa-graduation-cap",
      detail: "Maintained a solid 8 CGPA (Till Semester IV) in B.E Electronics and Communication Engineering at CIET (2024 – 2028)."
    },
    {
      title: "Higher Secondary (HSC)",
      metric: "90%",
      icon: "fas fa-award",
      detail: "Achieved 90% in HSC examinations at Sri Venkateshwara Matric Higher Secondary School."
    },
    {
      title: "Secondary School (SSLC)",
      metric: "90%",
      icon: "fas fa-medal",
      detail: "Achieved 90% in SSLC examinations at Sri Venkateshwara Matric Higher Secondary School."
    },
    {
      title: "IoT & Embedded Engineering",
      metric: "3 Projects",
      icon: "fas fa-microchip",
      detail: "Engineered Smart Home Automation, Smart Attendance with RFID & ESP32, and Automatic Street Light Controller."
    }
  ],

  // Knowledge base strictly for the local AI Chatbot (Zero hallucinations, exactly matching resume)
  chatbotKnowledge: {
    identity: "I am the Viswa AI Assistant, a verified knowledge engine answering questions based strictly on VISWA S's uploaded resume.",
    whoIsViswa: "VISWA S is an Internet of Things (IoT) Student pursuing a Bachelor of Engineering (B.E) in Electronics and Communication Engineering at COIMBATORE INSTITUTE OF ENGINEERING AND TECHNOLOGY (2024 – 2028) with a CGPA of 8 (Till Semester IV).",
    education: "VISWA S is pursuing B.E Electronics and Communication Engineering at COIMBATORE INSTITUTE OF ENGINEERING AND TECHNOLOGY (CIET) for the period 2024 – 2028. His CGPA is 8 (Till Semester IV). In school, he achieved 90% in both HSC and SSLC at Sri Venkateshwara Matric Higher Secondary School.",
    cgpa: "VISWA S has a CGPA of 8 (Till Semester IV) in B.E Electronics and Communication Engineering at CIET (2024 – 2028).",
    collegePeriod: "VISWA S's college period is 2024 – 2028 at COIMBATORE INSTITUTE OF ENGINEERING AND TECHNOLOGY.",
    skills: "VISWA S's skills include:\n• Programming Languages: C, Python\n• Web Technologies: HTML, CSS\n• Tools & Platforms: Arduino IDE, Git, GitHub, VS Code, Claude, Cursor AI\n• IoT & Embedded: Basics of Internet of Things (IoT), Embedded C\n• Database: MongoDB\n• Soft Skills: Problem Solving, Teamwork, Communication, Time Management",
    programmingLanguages: "VISWA S knows C and Python.",
    embeddedSkills: "VISWA S specializes in Embedded C programming, Arduino, and Basics of Internet of Things (IoT).",
    iotSkills: "VISWA S has a strong foundation in the Basics of Internet of Things (IoT), ESP32, RFID, cloud integration with Firebase, and Bluetooth (HC-05) communications.",
    projects: "VISWA S has completed 3 verified projects:\n1. Smart Home Automation System (Embedded C, Arduino, Relay Module, Bluetooth HC-05)\n2. Smart Attendance Management System (IoT, ESP32, RFID, Firebase, HTML, CSS, JavaScript)\n3. Automatic Street Light Controller (Embedded C, Arduino, LDR Sensor).",
    internship: "VISWA S has completed an internship in EMBEDDED SYSTEMS & IoT.",
    certifications: "VISWA S has completed certification in EMBEDDED C.",
    areaOfInterest: "VISWA S's areas of interest are Embedded C Programming and IoT Things.",
    contact: "You can contact VISWA S at viswa.s.ciet@gamil.com, by phone at +91 8524807757, via GitHub at github.com/viswasciet-svg, or on LeetCode at leetcode.com/problemset.",
    resume: "You can view Viswa's uploaded resume in a new tab by clicking 'View Resume', or download it directly using the 'Download Resume' button."
  }
};

// Freeze data to prevent external mutation
if (typeof Object.freeze === "function") {
  Object.freeze(PORTFOLIO_DATA);
}
