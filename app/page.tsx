"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Download, Github, Linkedin, Mail, Phone, ExternalLink, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { ParticleCanvas } from "@/components/particle-canvas"
import { GlowingButton } from "@/components/glowing-button"
import { HexagonGrid } from "@/components/hexagon-grid"
import { FloatingNav } from "@/components/floating-nav"
import { SkillOrb } from "@/components/skill-orb"
import { GlassCard } from "@/components/glass-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const isMobile = useMobile()
  const [activeSection, setActiveSection] = useState("hero")
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const competitionsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = [
        { id: "hero", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "experience", ref: experienceRef },
        { id: "projects", ref: projectsRef },
        { id: "competitions", ref: competitionsRef },
        { id: "contact", ref: contactRef },
      ]

      for (const section of sections) {
        if (!section.ref.current) continue

        const offsetTop = section.ref.current.offsetTop
        const offsetHeight = section.ref.current.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-black to-black"></div>
        <ParticleCanvas />
      </div>

      {/* Floating Navigation */}
      <FloatingNav activeSection={activeSection} />

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <HexagonGrid />
        </motion.div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-1/2"
            >
              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    Jeet Upadhyay
                  </span>
                </h1>
                <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg -z-10"></div>
              </div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl font-medium text-gray-300 mb-6"
              >
                <span className="text-cyan-400">Computer Engineering</span> Student
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gray-300 mb-8 text-lg max-w-xl"
              >
                Motivated and detail-oriented with practical experience in Python, web development, and networking.
                Seeking a role in software development, IoT, or cybersecurity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <GlowingButton href="#contact" color="cyan">
                  Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                </GlowingButton>
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-500 hover:text-white transition"
                  download
                >
                  Download Resume <Download className="ml-2 h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 animate-pulse"></div>
                  <img
                    src="/jeet.jpeg?height=320&width=320"
                    alt="Jeet Upadhyay"
                    className="w-full h-full object-cover relative z-10"
                  />
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full blur-xl -z-10"></div>

                {/* Orbiting skill orbs */}
                <SkillOrb icon="python" position="top" delay={0} />
                <SkillOrb icon="java" position="right" delay={1} />
                <SkillOrb icon="html" position="bottom" delay={2} />
                <SkillOrb icon="javascript" position="left" delay={3} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-gray-400 mb-2 text-sm">Scroll to explore</p>
          <ChevronRight className="h-6 w-6 text-cyan-400 rotate-90" />
        </motion.div>

        {/* Social Links */}
        <div className="absolute left-6 bottom-20 z-20 hidden md:flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link
              href="mailto:upadhyayjeet55@gmail.com"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Link href="tel:+919429989159" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Phone className="h-5 w-5" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Link
              href="https://www.linkedin.com/in/jeet-upadhyay-a0385523a"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <Link href="https://github.com/jeet200" 
            className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Github className="h-5 w-5" />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}>
            <div className="h-20 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                About Me
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </h2>
            <p className="text-lg text-gray-300 mt-8">
              I'm a Computer Engineering student with a passion for solving complex problems and creating innovative
              solutions. My experience spans full-stack development, hardware interfacing, and cybersecurity. I'm adept
              at coordinating projects and quickly adapting to new technologies, always looking to apply my technical
              and analytical skills to real-world challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section ref={experienceRef} id="experience" className="relative py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Experience & Education
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Experience */}
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
              >
                Work Experience
              </motion.h3>
              <div className="space-y-12 relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-purple-500/50"></div>

                <FuturisticTimelineCard
                  title="Software Developer Intern"
                  company="Access Comp Tech"
                  date="22 July - 7 Aug 2024"
                  description={[
                    "Worked on Python programming and database management",
                    "Assisted in building backend logic and optimizing DB queries",
                  ]}
                  delay={0}
                />

                <FuturisticTimelineCard
                  title="Summer Intern"
                  company="TATA Chemical Ltd"
                  date="16 Aug - 30 Aug 2023"
                  description={[
                    "Contributed to computer networking and hardware maintenance tasks",
                    "Assisted the IT team in troubleshooting and system upgrades",
                  ]}
                  delay={0.2}
                />
              </div>
            </div>

            {/* Education */}
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
              >
                Education
              </motion.h3>
              <div className="space-y-12 relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-cyan-500/50"></div>

                <FuturisticTimelineCard
                  title="B.Tech in Computer Engineering"
                  company="Gujarat Technological University"
                  date="CGPA: 8.74"
                  description={[
                    "Specialized in software development and computer networking",
                    "Participated in multiple hackathons and technical competitions",
                  ]}
                  delay={0.1}
                />

                <FuturisticTimelineCard
                  title="Higher Secondary School"
                  company="OAJ Institution of Science"
                  date="11th & 12th Science A Group"
                  description={[
                    "Focused on Physics, Chemistry, and Mathematics",
                    "Developed strong analytical and problem-solving skills",
                  ]}
                  delay={0.3}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="relative py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Projects
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <FuturisticProjectCard
              title="Care Care Hub"
              category="Software"
              description="Developed a web platform for car service bookings, scheduling, and maintenance tracking."
              tools={["PHP", "HTML", "CSS", "MySQL"]}
              details="Created user-friendly forms, managed backend logic, and implemented secure database access."
              image="/placeholder.svg?height=300&width=500"
              delay={0}
            />

            <FuturisticProjectCard
              title="Maze Solving Robot"
              category="Hardware"
              description="Designed and built an autonomous robot using line-following logic."
              tools={["Arduino Uno", "IR Sensors", "L298N Motor Driver", "DC Motors"]}
              details="Implemented logic for detecting intersections and path optimization."
              image="/placeholder.svg?height=300&width=500"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Competitions & Certifications Section */}
      <section ref={competitionsRef} id="competitions" className="relative py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Competitions & Certifications
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Competitions */}
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
              >
                Competitions
              </motion.h3>
              <div className="space-y-6">
                <FuturisticAchievementCard
                  title="SSIP Hackathon 2023"
                  description="Health Web Portal Problem"
                  delay={0}
                  glowColor="purple"
                />
                <FuturisticAchievementCard
                  title="SIH Hackathon 2024"
                  description="Queue Management System for Hospital"
                  delay={0.1}
                  glowColor="cyan"
                />
                <FuturisticAchievementCard
                  title="SSIP Hackathon 2024"
                  description="Digital Transformation of Laboratory Results & its Management"
                  delay={0.2}
                  glowColor="purple"
                />
              </div>
            </div>

            {/* Certifications & Workshops */}
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
              >
                Certifications & Workshops
              </motion.h3>
              <div className="space-y-6">
                <FuturisticAchievementCard
                  title="LD College, Ahmedabad"
                  description="Cyber Security"
                  badge="Workshop"
                  delay={0}
                  glowColor="cyan"
                />
                <FuturisticAchievementCard
                  title="MSU College, Vadodara"
                  description="Cyber Security"
                  badge="Workshop"
                  delay={0.1}
                  glowColor="purple"
                />
                <FuturisticAchievementCard
                  title="IIT Kanpur"
                  description="The Story of Photoelectric Effect"
                  badge="Workshop"
                  delay={0.2}
                  glowColor="cyan"
                />
                <FuturisticAchievementCard
                  title="Ganpat University"
                  description="Astrophysics and Space Science"
                  badge="Workshop"
                  delay={0.3}
                  glowColor="purple"
                />
                <FuturisticAchievementCard
                  title="Google Pvt Ltd"
                  description="Connect and Secure Network Security"
                  badge="Certification"
                  delay={0.4}
                  glowColor="cyan"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="relative py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Get In Touch
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </h2>
            <p className="text-lg text-gray-300 mt-8">
              Feel free to reach out to me for any opportunities or collaborations.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <GlassCard>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white resize-none"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <GlowingButton color="cyan" className="w-full">
                  Send Message
                </GlowingButton>
              </form>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Jeet Upadhyay. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-4">
            <Link
              href="mailto:upadhyayjeet55@gmail.com"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
            <Link href="tel:+919429989159" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Phone className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/jeet-upadhyay-a0385523a"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component for glowing badge
function GlowBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
      <Badge className="relative px-4 py-2 text-base bg-gray-900 border-gray-700 text-white">{children}</Badge>
    </div>
  )
}

// Component for skill category
function SkillCategory({
  title,
  skills,
  delay = 0,
}: {
  title: string
  skills: { name: string; level: number }[]
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl blur-xl -z-10"></div>
      <Card className="bg-gray-900/60 border-gray-800 backdrop-blur-sm overflow-hidden">
        <div className="p-6">
          <h4 className="text-xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            {title}
          </h4>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-300">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// Component for futuristic timeline card
function FuturisticTimelineCard({
  title,
  company,
  date,
  description,
  delay = 0,
}: {
  title: string
  company: string
  date: string
  description: string[]
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-16"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-16 flex items-center justify-center">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-sm opacity-75"></div>
          <div className="w-4 h-4 bg-gray-900 border-2 border-cyan-500 rounded-full relative z-10"></div>
        </div>
      </div>

      {/* Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl blur-xl -z-10 opacity-75 group-hover:opacity-100 transition duration-300"></div>
        <Card className="bg-gray-900/60 border-gray-800 backdrop-blur-sm overflow-hidden">
          <div className="p-6">
            <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-300">{company}</p>
              <Badge variant="outline" className="bg-gray-800 text-cyan-400 border-cyan-800">
                {date}
              </Badge>
            </div>
            <ul className="space-y-2">
              {description.map((item, index) => (
                <li key={index} className="text-gray-400 flex items-start">
                  <div className="mr-2 mt-1 text-cyan-500">•</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

// Component for futuristic project card
function FuturisticProjectCard({
  title,
  category,
  description,
  tools,
  details,
  image,
  delay = 0,
}: {
  title: string
  category: string
  description: string
  tools: string[]
  details: string
  image: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl blur-xl -z-10 opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <Card className="bg-gray-900/60 border-gray-800 backdrop-blur-sm overflow-hidden h-full">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 z-20">
            <Badge className="bg-cyan-500/80 text-white border-none backdrop-blur-sm">{category}</Badge>
          </div>
          <div className="absolute bottom-4 left-4 z-20">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-300 mb-4">{description}</p>
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-white">Tools Used:</h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="bg-gray-800 text-cyan-400 border-cyan-800">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-gray-400">{details}</p>
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 group">
              View Project <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// Component for futuristic achievement card
function FuturisticAchievementCard({
  title,
  description,
  badge,
  delay = 0,
  glowColor = "cyan",
}: {
  title: string
  description: string
  badge?: string
  delay?: number
  glowColor?: "cyan" | "purple"
}) {
  const gradientClass = glowColor === "cyan" ? "from-cyan-600/20 to-purple-600/20" : "from-purple-600/20 to-cyan-600/20"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative group"
    >
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${gradientClass} rounded-xl blur-xl -z-10 opacity-75 group-hover:opacity-100 transition duration-300`}
      ></div>
      <Card className="bg-gray-900/60 border-gray-800 backdrop-blur-sm overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-bold text-white">{title}</h4>
            {badge && (
              <Badge
                variant="outline"
                className={cn(
                  "bg-gray-800 border-gray-700",
                  glowColor === "cyan" ? "text-cyan-400" : "text-purple-400",
                )}
              >
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-gray-400">{description}</p>
        </div>
      </Card>
    </motion.div>
  )
}
