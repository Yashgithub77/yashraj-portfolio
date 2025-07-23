
/// <reference types="react" />
"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const typingRef = useRef<HTMLSpanElement>(null)

  // Typing animation
  useEffect(() => {
    const text = "Hi, I'm Yashraj Thakur"
    let index = 0
    const element = typingRef.current

    const typeWriter = () => {
      if (element && index < text.length) {
        element.textContent = text.slice(0, index + 1)
        index++
        setTimeout(typeWriter, 100)
      } else {
        setTimeout(() => {
          index = 0
          if (element) element.textContent = ""
          typeWriter()
        }, 2000)
      }
    }

    typeWriter()
  }, [])

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "certifications", "achievements", "contact"]
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Skill bar animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === "skills") {
            const skillBars = document.querySelectorAll(".skill-progress")
            skillBars.forEach((bar: any) => {
              const width = bar.getAttribute("data-width")
              setTimeout(() => {
                bar.style.width = width + "%"
              }, 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const skillsSection = document.getElementById("skills")
    if (skillsSection) observer.observe(skillsSection)

    return () => observer.disconnect()
  }, [])

  const projectData = {
    "price-optimization": {
      title: "Price Optimization Website",
      description:
        "A comprehensive low-code solution designed to help businesses optimize their pricing strategies using advanced algorithms and real-time market analysis.",
      features: [
        "Dynamic pricing algorithms",
        "Real-time market data integration",
        "Competitor price tracking",
        "Profit margin optimization",
        "Interactive dashboard",
        "Automated reporting system",
      ],
      technologies: ["Low-Code Platform", "API Integration", "Data Analytics", "Machine Learning"],
      challenges:
        "The main challenge was creating a user-friendly interface that could handle complex pricing algorithms while maintaining real-time performance.",
      outcome:
        "Successfully implemented a solution that increased client pricing efficiency by 35% and reduced manual pricing decisions by 80%.",
    },
    "balance-buck": {
      title: "Balance Your Buck - Mobile Budgeting App",
      description:
        "A comprehensive mobile application designed to help users manage their finances, track expenses, and achieve their financial goals through intelligent budgeting features.",
      features: [
        "Expense tracking and categorization",
        "Budget planning and monitoring",
        "Financial goal setting",
        "Bill reminders and notifications",
        "Spending analytics and insights",
        "Multi-currency support",
      ],
      technologies: ["Flutter", "Firebase", "SQLite", "Chart.js", "Push Notifications"],
      challenges:
        "Implementing secure financial data handling while maintaining a smooth user experience across different mobile platforms.",
      outcome:
        "Developed a user-friendly app that helps users save an average of 20% on monthly expenses through better budget management.",
    },
  }

  const openModal = (projectKey: string) => {
    setSelectedProject(projectKey)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  // Floating particles animation
  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-40 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Yashraj Thakur
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "certifications", "achievements", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`capitalize font-medium transition-colors duration-300 ${
                    activeSection === item ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Resume Download Button */}
            <a
              href="https://docs.google.com/document/d/180tBDGlWI8x3qDAUTrqWxrBSEyQCH4SbX4wq0tcSC4A/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              View Resume
            </a>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden flex flex-col space-y-1">
              <span
                className={`w-6 h-0.5 bg-gray-300 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-300 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-300 transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {["home", "about", "skills", "projects", "certifications", "achievements", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block capitalize font-medium text-gray-300 hover:text-blue-400 py-2"
                >
                  {item}
                </a>
              ))}
              <a
                href="https://docs.google.com/document/d/180tBDGlWI8x3qDAUTrqWxrBSEyQCH4SbX4wq0tcSC4A/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-medium text-center mt-4"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden"
      >
        <FloatingParticles />

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-500 shadow-2xl hover:scale-105 transition-transform duration-300 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/images/yashraj-profile.jpg"
                  alt="Yashraj Thakur"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span
              ref={typingRef}
              className="border-r-2 border-blue-400 animate-pulse bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Hi, I'm Yashraj Thakur
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-400 mb-4 font-medium">
            AI/ML Enthusiast & Aspiring DevOps Engineer
          </p>

          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            B.Tech CSE student specializing in AI/ML, currently transitioning to DevOps Engineering with focus on AI and
            cloud technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              View Projects
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-0 border-r-0 transform rotate-45" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">About Me</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-4" />
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm a passionate B.Tech Computer Science student specializing in AI/ML at the Institute of Aeronautical
                Engineering. With a CGPA of 7.8, I've been actively involved in various technical roles and projects
                that showcase my dedication to innovation and technology.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Outside e-DAM, I've been a Senior Reporter at The Compendium IARE, Risk Analyst & Content Creator at
                Smartzy Edu, and a core team member at TEDx IARE. From hosting annual days and TEDx to capturing stories
                through photography, my versatility shines through.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Currently, I'm on the path to becoming a DevOps Engineer, focusing on AI and cloud technologies, all
                while honing my skills as a tech communicator and strategist. I'm not just here to lead—I'm here to
                learn, support, and help build something that truly lasts.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "7.8", label: "CGPA" },
                { number: "10+", label: "Technologies" },
                { number: "5+", label: "Projects" },
                { number: "3", label: "Certifications" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-600"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-4" />
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Programming Languages */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center text-blue-400">Programming Languages</h3>
              {[
                { name: "Java", level: 85 },
                { name: "Python", level: 90 },
                { name: "HTML/CSS", level: 80 },
              ].map((skill, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-300">{skill.name}</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="skill-progress bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      data-width={skill.level}
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI/ML Frameworks */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center text-blue-400">AI/ML Frameworks</h3>
              {[
                { name: "PyTorch", level: 85 },
                { name: "TensorFlow", level: 80 },
                { name: "Transformers", level: 75 },
              ].map((skill, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-300">{skill.name}</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="skill-progress bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      data-width={skill.level}
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tools & Platforms */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center text-blue-400">Tools & Platforms</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "DialogFlow", icon: "🤖" },
                  { name: "FlutterFlow", icon: "📱" },
                  { name: "Bubble", icon: "⚡" },
                  { name: "PEGA", icon: "⚙️" },
                  { name: "BoltGenAI", icon: "🔥" },
                  { name: "Matplotlib", icon: "📊" },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-600"
                  >
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <span className="text-sm font-medium text-center text-gray-300">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-4" />
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                key: "price-optimization",
                title: "Price Optimization Website",
                description:
                  "A low-code solution for dynamic pricing strategies using advanced algorithms and market analysis.",
                image: "/placeholder.svg?height=200&width=300&text=Price+Optimization",
                tags: ["Low-Code", "Optimization", "Analytics"],
              },
              {
                key: "balance-buck",
                title: "Balance Your Buck",
                description:
                  "A comprehensive mobile budgeting application with smart expense tracking and financial insights.",
                image: "/placeholder.svg?height=200&width=300&text=Balance+Your+Buck",
                tags: ["Mobile App", "Finance", "Flutter"],
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border border-gray-600"
                onClick={() => openModal(project.key)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Certifications
            </span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-4" />
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Microsoft Certified",
                description: "Azure AI Fundamentals",
                icon: "🔷",
                color: "from-blue-500 to-blue-600",
              },
              {
                name: "IBM Certified",
                description: "Data Science Professional",
                icon: "🔵",
                color: "from-blue-600 to-blue-800",
              },
              {
                name: "Databricks Certified",
                description: "Machine Learning Associate",
                icon: "🔴",
                color: "from-red-500 to-red-600",
              },
            ].map((cert, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-600"
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center text-3xl text-white shadow-lg`}
                >
                  {cert.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{cert.name}</h3>
                <p className="text-gray-300">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Achievements & Roles
            </span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-4" />
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Co-Lead at e-DAM",
                description:
                  "Leading digital asset management initiatives and coordinating team activities for enhanced productivity.",
                icon: "👥",
              },
              {
                title: "Senior Reporter at The Compendium IARE",
                description:
                  "Contributing technical articles and covering technology trends for the college publication.",
                icon: "📰",
              },
              {
                title: "Risk Analyst & Content Creator at Smartzy Edu",
                description: "Analyzing market risks and creating educational content for financial literacy programs.",
                icon: "📊",
              },
              {
                title: "Core Team Member at TEDx IARE",
                description: "Organizing TEDx events, hosting annual days, and capturing stories through photography.",
                icon: "🎤",
              },
            ].map((achievement, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-600"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl text-white shadow-lg">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{achievement.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 relative">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-4" />
          </h2>

          <p className="text-lg text-gray-300 mb-12 leading-relaxed">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
          </p>

          <div className="space-y-4">
            {[
              {
                href: "mailto:yashrajsingh2129@gmail.com",
                icon: "✉️",
                text: "yashrajsingh2129@gmail.com",
              },
              {
                href: "tel:+917093634108",
                icon: "📞",
                text: "+91 7093634108",
              },
              {
                href: "https://t.ly/f-TYO",
                icon: "💼",
                text: "LinkedIn Profile",
                external: true,
              },
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center gap-4 p-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg border border-gray-600"
              >
                <span className="text-2xl">{contact.icon}</span>
                <span className="font-medium">{contact.text}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 Yashraj Thakur. All rights reserved.</p>
        </div>
      </footer>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-600">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {projectData[selectedProject as keyof typeof projectData].title}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white text-2xl">
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  {projectData[selectedProject as keyof typeof projectData].description}
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {projectData[selectedProject as keyof typeof projectData].features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectData[selectedProject as keyof typeof projectData].technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Challenges</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {projectData[selectedProject as keyof typeof projectData].challenges}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Outcome</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {projectData[selectedProject as keyof typeof projectData].outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
