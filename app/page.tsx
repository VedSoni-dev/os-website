"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { useUIStore, type AppKey } from "@/lib/ui-store"
import Dock from "./components/Dock"
import DesktopWindow from "./components/Window"
import CommandPalette from "./components/CommandPalette"
import BuildingStatus from "./components/BuildingStatus"
import LoadingScreen from "./components/LoadingScreen"
import { BackgroundGlitch, ErrorPopups, GlitchStyles, GlitchText } from "./components/GlitchEffects"
import { AnimatePresence, motion } from "framer-motion"
import { useThemeStore } from "@/lib/theme-store"

type WindowSpec = {
  key: Exclude<AppKey, "palette" | null>
  title: string
  content: React.ReactNode
}

const projectsData = [
  {
    id: "fern",
    title: "Fern",
    image: "/fern-ai-tools.png",
    description:
      "Nonprofit AI that makes AI and robotics tools for children with autism and other disabilities. 6,500 active users.",
    tech: ["Python", "AI/ML", "React", "Accessibility", "Nonprofit"],
    links: [
      { type: "website", url: "https://fern.org", label: "Website" },
      { type: "github", url: "https://github.com/fern-ai", label: "GitHub" },
    ],
    details:
      "Fern is a nonprofit organization focused on developing AI and robotics tools specifically designed for children with autism and other disabilities. Our platform has reached 6,500 active users and provides accessible technology solutions that help children develop communication skills, social interaction abilities, and cognitive functions through innovative AI-powered tools and robotic companions.",
  },
  {
    id: "recreach",
    title: "RecReach",
    image: "/recreach-sports.png",
    description: "A pick up sports startup connecting athletes and sports enthusiasts for casual games and activities.",
    tech: ["React Native", "Node.js", "MongoDB", "Geolocation", "Social"],
    links: [
      { type: "website", url: "https://recreach.com", label: "Website" },
      { type: "github", url: "https://github.com/recreach", label: "GitHub" },
    ],
    details:
      "RecReach is a startup that revolutionizes how people connect for pickup sports and recreational activities. The platform uses location-based matching to help users find nearby games, create events, and build local sports communities. With features like skill-level matching, real-time chat, and event management, RecReach makes it easier than ever to stay active and meet like-minded athletes.",
  },
  {
    id: "hive",
    title: "Hive",
    image: "/hive-robotics.png",
    description:
      "A robotics startup where we make robotics and AI live in society with humans to unleash true human potential.",
    tech: ["Robotics", "AI/ML", "Computer Vision", "IoT", "Human-Robot Interaction"],
    links: [
      { type: "website", url: "https://hive-robotics.com", label: "Website" },
      { type: "github", url: "https://github.com/hive-robotics", label: "GitHub" },
    ],
    details:
      "Hive is a cutting-edge robotics startup focused on seamlessly integrating AI and robotics into human society. Our mission is to create intelligent robotic systems that work alongside humans to enhance productivity, creativity, and quality of life. We develop advanced human-robot interaction technologies, autonomous systems, and AI-powered solutions that unlock human potential in various domains including healthcare, education, and workplace automation.",
  },
  {
    id: "eden",
    title: "Eden",
    image: "/eden-ai-robots.png",
    description:
      "My turtle project where I lead development of AI intelligent robots with different behaviors and personalities.",
    tech: ["Python", "Robotics", "Behavioral AI", "Machine Learning", "Autonomous Systems"],
    links: [
      { type: "github", url: "https://github.com/VedSoni-dev/eden", label: "GitHub" },
      { type: "demo", url: "https://eden-demo.com", label: "Demo" },
    ],
    details:
      "Eden is my personal robotics project focused on developing AI-intelligent robots with distinct behaviors and personalities. As the project lead, I'm creating autonomous robotic systems that can adapt their behavior patterns, learn from interactions, and develop unique characteristics over time. The project explores advanced concepts in behavioral AI, personality modeling, and adaptive robotics to create more natural and engaging human-robot interactions.",
  },
]

// Placeholder content builders
function AboutContent() {
  return (
    <div className="p-5 md:p-6">
      <h1 className="font-black leading-none" style={{ fontSize: 52 }}>
        <GlitchText>Hello, I&apos;m Vedant.</GlitchText>
      </h1>
      <p className="mt-4 text-lg">
        CS and AI/BS student at Texas A&M University, building the future through intelligent systems and robotics
        innovation.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          "Computer Science",
          "Artificial Intelligence",
          "Machine Learning",
          "Robotics",
          "Texas A&M",
          "Student Researcher",
        ].map((chip) => (
          <span
            key={chip}
            className="text-sm font-semibold px-3 py-1 rounded-md border-[3px] border-black"
            style={{ backgroundColor: "#FF2E63", color: "#000" }}
          >
            {chip}
          </span>
        ))}
      </div>
      
      {/* Resume Button */}
      <div className="mt-6">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border-[3px] border-black bg-white shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-y-[-2px] transition-all duration-200 font-bold text-lg cursor-pointer"
        >
          📄 Resume
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}

function ProjectsContent({ onProjectClick }: { onProjectClick: (projectId: string) => void }) {
  return (
    <div className="p-4 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] cursor-pointer hover:shadow-[8px_8px_0_0_#000] transition-all duration-200"
            onClick={() => onProjectClick(project.id)}
          >
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-48 object-cover border-b-[3px] border-black"
            />
            <div className="p-4">
              <h3 className="font-black text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-gray-700 mb-3">{project.description}</p>
              {project.links && project.links.length > 0 && (
                <div className="flex gap-2 mb-3" onClick={(e) => e.stopPropagation()}>
                  {project.links.map((link, idx) => (
                    <LinkIcon key={idx} type={link.type} url={link.url} label={link.label} />
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs font-semibold px-2 py-1 border-[2px] border-black bg-yellow-300">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs font-semibold px-2 py-1 border-[2px] border-black bg-gray-200">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectDetailContent({ projectId }: { projectId: string }) {
  const project = projectsData.find((p) => p.id === projectId)

  if (!project) {
    return <div className="p-5">Project not found</div>
  }

  return (
    <div className="p-5">
      <img
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        className="w-full h-64 object-cover border-[3px] border-black shadow-[6px_6px_0_0_#000] mb-5"
      />
      <h1 className="font-black text-2xl mb-3">{project.title}</h1>
      <p className="text-lg mb-4">{project.details}</p>
      {project.links && project.links.length > 0 && (
        <div className="mb-4">
          <h3 className="font-black text-lg mb-2">Links</h3>
          <div className="flex gap-3">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-[3px] border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all duration-200 font-semibold"
              >
                <span className="flex items-center gap-1">
                  <LinkIcon type={link.type} url={link.url} label={link.label} />
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="mb-4">
        <h3 className="font-black text-lg mb-2">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="text-sm font-semibold px-3 py-1 border-[3px] border-black bg-blue-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExperienceDetailContent({ experienceId }: { experienceId: string }) {
  const allExperiences = [
    {
      id: "fern-founder",
      title: "Founder",
      company: "Fern",
      period: "Apr 2025 — Present",
      description: "Making AI tools for children with disabilities. 6,500 users as of June 2025.",
      details: [
        "Developed AI and robotics tools specifically for children with autism and other disabilities",
        "Achieved 6,500 active users as of June 2025",
        "Led product development and user experience design for accessibility-focused solutions",
        "Established partnerships with special education institutions and therapy centers",
      ],
      links: [
        { type: "website", url: "https://fern.org", label: "Website" },
        { type: "linkedin", url: "https://www.linkedin.com/company/fern-ai", label: "Company LinkedIn" },
      ],
      color: "bg-blue-400",
      type: "work",
    },
    {
      id: "recreach-founder",
      title: "Founder",
      company: "ReReach",
      period: "Mar 2025 — Present",
      description: "Pick up sports startup connecting athletes and sports enthusiasts for casual games.",
      details: [
        "Founded and developed a platform connecting athletes for pickup sports activities",
        "Built location-based matching system for sports enthusiasts",
        "Designed user experience for seamless event creation and participation",
        "Established community-driven approach to recreational sports organization",
      ],
      links: [
        { type: "website", url: "https://recreach.com", label: "Website" },
        { type: "linkedin", url: "https://www.linkedin.com/company/recreach", label: "Company LinkedIn" },
      ],
      color: "bg-green-400",
      type: "work",
    },
    {
      id: "art-lab-researcher",
      title: "AI Robotics Researcher",
      company: "Adaptive Robotics and Technology (ART) Lab - Texas A&M",
      period: "Apr 2025 — Present",
      description: "Developing AI Algorithms for Intelligent Robotic Swarms",
      details: [
        "Developing advanced AI algorithms for intelligent robotic swarm coordination",
        "Research focus on multi-agent systems and distributed robotics",
        "Implementing machine learning models for autonomous swarm behavior",
        "Contributing to cutting-edge research in adaptive robotics technology",
      ],
      links: [
        { type: "website", url: "https://engineering.tamu.edu/mechanical/research/art-lab", label: "Lab Website" },
      ],
      color: "bg-purple-400",
      type: "work",
    },
    {
      id: "digit-lab-researcher",
      title: "AI Lab Researcher",
      company: "Design Innovation & Generative InTelligence (DIGIT) Lab - Texas A&M",
      period: "Feb 2025 — Aug 2025",
      description: "Fine Tuning LLMs for Advanced Data Extraction",
      details: [
        "Fine-tuned Large Language Models for advanced data extraction applications",
        "Implemented Retrieval-Augmented Generation (RAG) systems",
        "Developed data extraction pipelines using state-of-the-art AI techniques",
        "Contributed to research in generative intelligence and design innovation",
      ],
      color: "bg-teal-400",
      type: "work",
    },
    {
      id: "autodesk-ambassador",
      title: "Ambassador",
      company: "Autodesk",
      period: "May 2025 — Present",
      description: "Representing Autodesk in academic and professional communities.",
      details: [
        "Promoting Autodesk tools and technologies in academic settings",
        "Facilitating workshops and training sessions for students and faculty",
        "Building relationships between Autodesk and educational institutions",
        "Contributing to product feedback and development from academic perspective",
      ],
      color: "bg-orange-400",
      type: "work",
    },
    {
      id: "ai4all-fellow",
      title: "Ignite Fellow",
      company: "AI4ALL",
      period: "Aug 2025 — Present",
      description: "Participating in AI4ALL's leadership development program for underrepresented groups in AI.",
      details: [
        "Selected for prestigious AI4ALL Ignite Fellowship program",
        "Developing leadership skills in AI and technology sectors",
        "Contributing to diversity and inclusion initiatives in artificial intelligence",
        "Building network with other underrepresented leaders in AI field",
      ],
      color: "bg-red-400",
      type: "leadership",
    },
    {
      id: "robotics-lead",
      title: "Project Lead & Workshop Director",
      company: "Texas A&M University Robotics Team & Leadership Experience",
      period: "May 2025 — Present",
      description: "Designing AI intelligent humanoid robots and organizing robotics workshops.",
      details: [
        "Leading development of AI intelligent humanoid robots with advanced capabilities",
        "Organizing and conducting robotics workshops for students and community members",
        "Managing cross-functional teams in robotics research and development projects",
        "Establishing partnerships with industry leaders for robotics innovation initiatives",
      ],
      color: "bg-yellow-400",
      type: "leadership",
    },
    {
      id: "tidal-ml-engineer",
      title: "Machine Learning Engineer",
      company: "tidalTAMU",
      period: "Aug 2024 — Nov 2024",
      description: "Taught cars how to drive using reinforcement learning algorithms.",
      details: [
        "Developed reinforcement learning algorithms for autonomous vehicle navigation",
        "Implemented deep Q-learning networks for real-time driving decision making",
        "Optimized training environments and reward systems for vehicle behavior",
        "Achieved significant improvements in autonomous driving performance metrics",
      ],
      color: "bg-cyan-400",
      type: "leadership",
    },
    {
      id: "thinktank-lead",
      title: "Research Project Lead",
      company: "TAMU ThinkTank",
      period: "Aug 2024 — May 2025",
      description: "Led Team Orion to write a 100 page paper for future Mars exploration.",
      details: [
        "Led interdisciplinary team of 8 researchers in Mars exploration project",
        "Authored comprehensive 100-page research paper on future Mars colonization strategies",
        "Coordinated research across multiple domains including robotics, life support, and habitat design",
        "Presented findings at university research symposium and received recognition for innovation",
      ],
      color: "bg-pink-400",
      type: "leadership",
    },
  ]

  const experience = allExperiences.find((exp) => exp.id === experienceId)

  if (!experience) {
    return <div className="p-5">Experience not found</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="font-black text-2xl mb-2">{experience.title}</h1>
            <p className="font-semibold text-xl text-gray-700">{experience.company}</p>
          </div>
          <span className={`px-4 py-2 text-lg font-black border-[3px] border-black ${experience.color}`}>
            {experience.period}
          </span>
        </div>
        <p className="text-lg text-gray-600 mb-6">{experience.description}</p>
        {experience.links && experience.links.length > 0 && (
          <div className="mb-6">
            <h3 className="font-black text-lg mb-2">Links</h3>
            <div className="flex gap-3">
              {experience.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-[3px] border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all duration-200 font-semibold"
                >
                  <span className="flex items-center gap-1">
                    <LinkIcon type={link.type} url={link.url} label={link.label} />
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] p-5">
        <h3 className="font-black text-xl mb-4">Key Accomplishments</h3>
        <div className="space-y-3">
          {experience.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-base leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExperienceContent({ onExperienceClick }: { onExperienceClick: (experienceId: string) => void }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const workExperiences = [
    {
      id: "fern-founder",
      title: "Founder",
      company: "Fern",
      period: "Apr 2025 — Present",
      description: "Making AI tools for children with disabilities. 6,500 users as of June 2025.",
      color: "bg-blue-400",
    },
    {
      id: "recreach-founder",
      title: "Founder",
      company: "ReReach",
      period: "Mar 2025 — Present",
      description: "Pick up sports startup connecting athletes and sports enthusiasts for casual games.",
      color: "bg-green-400",
    },
    {
      id: "art-lab-researcher",
      title: "AI Robotics Researcher",
      company: "Adaptive Robotics and Technology (ART) Lab - Texas A&M",
      period: "Apr 2025 — Present",
      description: "Developing AI Algorithms for Intelligent Robotic Swarms",
      color: "bg-purple-400",
    },
    {
      id: "digit-lab-researcher",
      title: "AI Lab Researcher",
      company: "Design Innovation & Generative InTelligence (DIGIT) Lab - Texas A&M",
      period: "Feb 2025 — Aug 2025",
      description: "Fine Tuning LLMs for Advanced Data Extraction",
      color: "bg-teal-400",
    },
    {
      id: "autodesk-ambassador",
      title: "Ambassador",
      company: "Autodesk",
      period: "May 2025 — Present",
      description: "Representing Autodesk in academic and professional communities.",
      color: "bg-orange-400",
    },
  ]

  const leadershipActivities = [
    {
      id: "ai4all-fellow",
      title: "Ignite Fellow",
      company: "AI4ALL",
      period: "Aug 2025 — Present",
      description: "Participating in AI4ALL's leadership development program for underrepresented groups in AI.",
      color: "bg-red-400",
    },
    {
      id: "robotics-lead",
      title: "Project Lead & Workshop Director",
      company: "Texas A&M University Robotics Team & Leadership Experience",
      period: "May 2025 — Present",
      description: "Designing AI intelligent humanoid robots and organizing robotics workshops.",
      color: "bg-yellow-400",
    },
    {
      id: "tidal-ml-engineer",
      title: "Machine Learning Engineer",
      company: "tidalTAMU",
      period: "Aug 2024 — Nov 2024",
      description: "Taught cars how to drive using reinforcement learning algorithms.",
      color: "bg-cyan-400",
    },
    {
      id: "thinktank-lead",
      title: "Research Project Lead",
      company: "TAMU ThinkTank",
      period: "Aug 2024 — May 2025",
      description: "Led Team Orion to write a 100 page paper for future Mars exploration.",
      color: "bg-pink-400",
    },
  ]

  return (
    <div className="p-6">
      {/* Work Experience Section */}
      <div className="mb-8">
        <h2 className="font-black text-2xl mb-4 border-b-[3px] border-black pb-2">Work Experience</h2>
        <div className="grid gap-4">
          {workExperiences.map((exp) => (
            <div
              key={exp.id}
              className="relative border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all duration-300 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredCard(exp.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onExperienceClick(exp.id)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-black text-lg">{exp.title}</h3>
                    <p className="font-semibold text-gray-700">{exp.company}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-black border-[2px] border-black ${exp.color}`}>
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-600">{exp.description}</p>
              </div>
              <div
                className={`absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === exp.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center text-white">
                  <div className="font-black text-xl mb-2">Click to learn more</div>
                  <div className="text-sm opacity-80">View detailed accomplishments</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Leadership & Activities Section */}
      <div>
        <h2 className="font-black text-2xl mb-4 border-b-[3px] border-black pb-2">Leadership & Activities</h2>
        <div className="grid gap-4">
          {leadershipActivities.map((activity) => (
            <div
              key={activity.id}
              className="relative border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all duration-300 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredCard(activity.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onExperienceClick(activity.id)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-black text-lg">{activity.title}</h3>
                    <p className="font-semibold text-gray-700">{activity.company}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-black border-[2px] border-black ${activity.color}`}>
                    {activity.period}
                  </span>
                </div>
                <p className="text-gray-600">{activity.description}</p>
              </div>
              <div
                className={`absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === activity.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center text-white">
                  <div className="font-black text-xl mb-2">Click to learn more</div>
                  <div className="text-sm opacity-80">View detailed accomplishments</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TalkContent() {
  return (
    <div className="p-6 md:p-8">
      <h2 className="font-black text-2xl mb-6">Get in Touch</h2>
      {/* Email */}
      <div className="mb-8">
        <div className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] p-4">
          <h3 className="font-black text-lg mb-2">Email</h3>
          <a href="mailto:ved.06.soni@gmail.com" className="text-blue-600 underline hover:text-blue-800 text-lg">
            ved.06.soni@gmail.com
          </a>
        </div>
      </div>
      {/* Social Media Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="https://www.linkedin.com/in/vedantsonimech"
          target="_blank"
          rel="noopener noreferrer"
          className="border-[3px] border-black bg-blue-500 text-white shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all duration-200 p-4 flex items-center gap-3"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <div>
            <div className="font-black">LinkedIn</div>
            <div className="text-sm opacity-90">Professional Profile</div>
          </div>
        </a>
        <a
          href="https://github.com/VedSoni-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="border-[3px] border-black bg-gray-800 text-white shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all duration-200 p-4 flex items-center gap-3"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.305 1.235 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <div>
            <div className="font-black">GitHub</div>
            <div className="text-sm opacity-90">Code & Projects</div>
          </div>
        </a>
        <a
          href="https://x.com/VedantRobot"
          target="_blank"
          rel="noopener noreferrer"
          className="border-[3px] border-black bg-black text-white shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all duration-200 p-4 flex items-center gap-3"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <div>
            <div className="font-black">X</div>
            <div className="text-sm opacity-90">Updates & Thoughts</div>
          </div>
        </a>
        <a
          href="https://www.instagram.com/vedant.soni.vs/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-[3px] border-black bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all duration-200 p-4 flex items-center gap-3"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849a4.923 4.923 0 00-2.228-.616v.06a4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
          <div>
            <div className="font-black">Instagram</div>
            <div className="text-sm opacity-90">Behind the Scenes</div>
          </div>
        </a>
      </div>
    </div>
  )
}

function LinkIcon({ type, url, label }: { type: string; url: string; label: string }) {
  const getIcon = () => {
    switch (type) {
      case "github":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.305 1.235 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        )
      case "website":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        )
      case "demo":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7z" />
          </svg>
        )
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2 py-1 border-[2px] border-black bg-white hover:bg-gray-100 transition-colors duration-200 text-sm font-semibold"
      title={label}
    >
      {getIcon()}
      <span className="sr-only">{label}</span>
    </a>
  )
}

export default function Page() {
  const [showLoading, setShowLoading] = useState(true)
  const { activeApp, setActiveApp, openApp, closeApp, focusApp, openPalette, closePalette, openApps, setOpenApps } = useUIStore()
  const { theme } = useThemeStore()

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  // Initialize active app (About by default)
  useEffect(() => {
    setActiveApp("about")
  }, [setActiveApp])

  // Global key handling: Esc closes palette or topmost window
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeApp === "palette") {
          closePalette()
          return
        }
        if (openApps.length > 0) {
          const top = openApps[openApps.length - 1]
          closeApp(top)
          return
        }
      }
      // Enter on focused dock item is native click; no interception necessary.
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeApp, openApps, closePalette, closeApp])

  const windows: WindowSpec[] = useMemo(
    () => [
      { key: "about", title: "About", content: <AboutContent /> },
      {
        key: "projects",
        title: "Projects/Startups",
        content: <ProjectsContent onProjectClick={(projectId) => openApp(projectId as any)} />,
      },
      { key: "talk", title: "Talk to Me", content: <TalkContent /> },
      {
        key: "experience",
        title: "Experience",
        content: <ExperienceContent onExperienceClick={(experienceId) => openApp(experienceId as any)} />,
      },
      ...projectsData.map((project) => ({
        key: project.id as any,
        title: project.title,
        content: <ProjectDetailContent projectId={project.id} />,
      })),
      ...[
        "fern-founder",
        "recreach-founder",
        "art-lab-researcher",
        "digit-lab-researcher",
        "autodesk-ambassador",
        "ai4all-fellow",
        "robotics-lead",
        "tidal-ml-engineer",
        "thinktank-lead",
      ].map((expId) => ({
        key: expId as any,
        title:
          expId === "fern-founder"
            ? "Founder - Fern"
                          : expId === "recreach-founder"
                ? "Founder - RecReach"
              : expId === "art-lab-researcher"
                ? "AI Robotics Researcher"
                : expId === "digit-lab-researcher"
                  ? "AI Lab Researcher"
                  : expId === "autodesk-ambassador"
                    ? "Autodesk Ambassador"
                    : expId === "ai4all-fellow"
                      ? "AI4ALL Ignite Fellow"
                      : expId === "robotics-lead"
                        ? "Robotics Project Lead"
                        : expId === "tidal-ml-engineer"
                          ? "ML Engineer - tidalTAMU"
                          : "Research Project Lead",
        content: <ExperienceDetailContent experienceId={expId} />,
      })),
    ],
    [openApp],
  )

  function resetAll() {
    setOpenApps(["about"])
    setActiveApp("about")
  }

  function getWindowTitle(appKey: Exclude<AppKey, "palette" | null>) {
    const window = windows.find((w) => w.key === appKey)
    return window ? window.title : "Unknown App"
  }

  function getWindowContent(appKey: Exclude<AppKey, "palette" | null>) {
    const window = windows.find((w) => w.key === appKey)
    return window ? window.content : null
  }

  function getWindowZIndex(appKey: Exclude<AppKey, "palette" | null>) {
    const index = openApps.indexOf(appKey)
    return 100 + index
  }

  function resetDesktop() {
    resetAll()
  }

  return (
    <main className="fixed inset-0 overflow-hidden">
      {/* Glitch Effects */}
      <GlitchStyles />
      <BackgroundGlitch />
      <ErrorPopups />
      
      {/* Background: off-white, 8px grid + subtle grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#FAFAF0",
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 8px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 8px)
          `,
          backgroundSize: "8px 8px, 8px 8px",
        }}
      />
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "2px 2px",
        }}
      />
      
      {/* LoadingScreen */}
      <LoadingScreen onComplete={handleLoadingComplete} />
      
      {/* Main Content */}
      <AnimatePresence>
        {!showLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {/* BuildingStatus component */}
            <BuildingStatus />
            
            {/* Windows */}
            <div className="absolute inset-0 z-10">
              {openApps.map((appKey) => (
                <DesktopWindow
                  key={appKey}
                  appKey={appKey}
                  title={getWindowTitle(appKey)}
                  zIndex={getWindowZIndex(appKey)}
                  onClose={() => closeApp(appKey)}
                  onFocus={() => focusApp(appKey)}
                >
                  {getWindowContent(appKey)}
                </DesktopWindow>
              ))}
            </div>

            {/* Dock */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              <Dock activeApp={activeApp} onOpen={openApp} onOpenPalette={openPalette} />
            </div>

            {/* Command Palette */}
            <CommandPalette
              open={activeApp === "palette"}
              onOpenChange={openPalette}
              onAction={openApp}
              onReset={resetDesktop}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
