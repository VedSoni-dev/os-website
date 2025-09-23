"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { useUIStore, type AppKey } from "@/lib/ui-store"
import Dock from "./components/Dock"
import DesktopWindow from "./components/Window"
import CommandPalette from "./components/CommandPalette"
import BuildingStatus from "./components/BuildingStatus"
import LoadingScreen from "./components/LoadingScreen"
import { AnimatePresence, motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import PixelBlast from "./components/PixelBlast"

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
    tech: ["Python", "AI/ML", "React", "Accessibility", "Nonprofit", "Computer Vision", "NLP", "Robotics"],
    links: [
      { type: "website", url: "https://fern.org", label: "Website" },
      { type: "github", url: "https://github.com/fern-ai", label: "GitHub" },
    ],
    details: `# Fern: AI-Powered Accessibility Tools for Children with Autism

## The Mission: Democratizing AI for Special Needs

Fern is a nonprofit organization I founded to bridge the gap between cutting-edge AI technology and children with autism and other disabilities. Our mission is to create accessible, effective AI tools that help these children develop communication skills, social interaction abilities, and cognitive functions through innovative technology solutions.

## The Challenge: Making AI Truly Accessible

### The Problem
Traditional AI tools are often designed for neurotypical users, creating barriers for children with autism who:
- Process information differently
- Have unique communication needs
- Require specialized interaction patterns
- Need consistent, predictable interfaces
- Benefit from multimodal learning approaches

### Our Solution
We developed a comprehensive platform that adapts AI technology to meet the specific needs of children with autism, focusing on:
- **Predictable Interfaces**: Consistent, clear design patterns
- **Multimodal Interaction**: Visual, auditory, and tactile feedback
- **Personalized Learning**: AI that adapts to individual learning styles
- **Family Integration**: Tools that support both children and caregivers

## Technical Architecture

### AI/ML Foundation
**Core AI Technologies:**
- **Computer Vision**: Emotion recognition, gesture detection, and visual learning aids
- **Natural Language Processing**: Simplified communication interfaces and language development tools
- **Machine Learning**: Personalized learning algorithms that adapt to each child's progress
- **Robotics Integration**: Physical companions that provide tactile interaction

**Technical Stack:**
\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    Fern Platform Architecture                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Frontend Layer                           │   │
│  │  React App • Accessibility-First UI • PWA Support      │   │
│  │  Voice Interface • Visual Learning Tools               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↕ API Layer                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Backend Services                         │   │
│  │  Python/Django • AI Model Serving • Real-time Sync     │   │
│  │  User Management • Progress Tracking • Analytics       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↕ AI/ML Layer                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                AI/ML Pipeline                           │   │
│  │  Computer Vision • NLP • Personalization • Robotics    │   │
│  │  Emotion Recognition • Gesture Detection • Learning    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↕ Hardware Layer                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Physical Devices                         │   │
│  │  Educational Robots • Tablets • Smart Toys             │   │
│  │  Sensory Tools • Communication Devices                 │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Key Features

**1. Visual Learning Tools**
- **Emotion Recognition Games**: Help children understand facial expressions
- **Interactive Storytelling**: AI-generated stories that adapt to learning level
- **Visual Schedules**: Predictable daily routine management
- **Social Skills Training**: Virtual scenarios for practicing interactions

**2. Communication Aids**
- **Augmentative Communication**: AI-powered speech generation
- **Gesture Recognition**: Convert physical movements to digital commands
- **Visual Communication Boards**: Customizable interface for non-verbal communication
- **Progress Tracking**: Monitor communication skill development

**3. Learning Personalization**
- **Adaptive Difficulty**: AI adjusts challenge level based on performance
- **Learning Style Detection**: Identifies optimal learning approaches
- **Progress Analytics**: Detailed insights for parents and therapists
- **Goal Setting**: Collaborative goal management with families

## Impact & Results

### User Statistics
- **6,500+ Active Users**: Children and families using our platform
- **95% User Satisfaction**: Based on family feedback surveys
- **40% Improvement**: Average increase in communication skills
- **60+ Partner Organizations**: Schools, therapy centers, and support groups

### Success Stories

**Case Study 1: Emma (Age 7)**
- **Challenge**: Non-verbal, struggled with emotional recognition
- **Solution**: Custom emotion recognition games + visual communication board
- **Result**: Developed 20+ word vocabulary and improved emotional understanding

**Case Study 2: Marcus (Age 10)**
- **Challenge**: Difficulty with social interactions and routine changes
- **Solution**: Social skills training app + visual schedule system
- **Result**: 80% reduction in anxiety during routine changes, improved peer interactions

### Research & Development

**Ongoing Research Areas:**
- **Multimodal Learning**: Combining visual, auditory, and tactile learning
- **Predictive Analytics**: Early identification of learning challenges
- **Robotics Integration**: Physical companions for social interaction
- **Family Support Tools**: Resources for parents and caregivers

## Technical Implementation

### Accessibility-First Design
**Design Principles:**
- **Consistency**: Predictable interface patterns
- **Clarity**: High contrast, clear typography, simple layouts
- **Flexibility**: Customizable interfaces for individual needs
- **Feedback**: Clear, immediate responses to user actions

**Technical Standards:**
- **WCAG 2.1 AA Compliance**: Full accessibility standard adherence
- **Multi-Platform Support**: iOS, Android, and web compatibility
- **Offline Functionality**: Works without internet connection
- **Voice Control**: Full voice navigation support

### AI Model Development
**Custom Model Training:**
- **Dataset Curation**: Specialized datasets for autism-related tasks
- **Ethical AI**: Bias detection and mitigation for neurodiverse users
- **Privacy Protection**: Federated learning to protect user data
- **Continuous Learning**: Models improve with user interaction

### Data & Privacy
**Privacy-First Approach:**
- **Local Processing**: Sensitive data processed on-device
- **Encrypted Storage**: All user data encrypted at rest and in transit
- **Parental Controls**: Comprehensive privacy settings for families
- **GDPR Compliance**: Full compliance with data protection regulations

## Future Vision

### Planned Enhancements
- **Advanced Robotics**: More sophisticated robotic companions
- **VR/AR Integration**: Immersive learning environments
- **Global Expansion**: Multilingual support and cultural adaptation
- **Research Partnerships**: Collaboration with universities and research institutions

### Long-term Goals
- **Scale to 100,000+ Users**: Expand reach globally
- **Open Source Platform**: Share tools with the broader community
- **Research Publication**: Contribute to academic understanding of AI and autism
- **Policy Advocacy**: Influence technology accessibility standards

## The Impact

Building Fern has taught me:

- **Accessibility Design**: How to create truly inclusive technology
- **User-Centered Development**: The importance of involving end users in design
- **Ethical AI**: Building AI systems that serve vulnerable populations
- **Nonprofit Management**: Running a mission-driven organization
- **Community Building**: Creating support networks for families

Fern represents more than just a technology project - it's a commitment to using AI for social good and ensuring that the benefits of technology reach everyone, regardless of their abilities or challenges.`,
  },
  {
    id: "recreach",
    title: "RecReach",
    image: "/recreach-sports.png",
    description: "A pick up sports startup connecting athletes and sports enthusiasts for casual games and activities.",
    tech: ["React Native", "Node.js", "MongoDB", "Geolocation", "Social", "Real-time", "Matching Algorithm", "Payment Integration"],
    links: [
      { type: "website", url: "https://recreach.com", label: "Website" },
      { type: "github", url: "https://github.com/recreach", label: "GitHub" },
    ],
    details: `# RecReach: Revolutionizing Pickup Sports Through Technology

## The Vision: Making Sports Accessible to Everyone

RecReach is a startup I founded to solve the fundamental problem of finding people to play sports with. Whether you're new to a city, looking to try a new sport, or just want to stay active, RecReach connects athletes and sports enthusiasts for casual games and recreational activities through intelligent matching and location-based discovery.

## The Problem: The Sports Connection Gap

### Current Challenges
Traditional ways of finding sports partners have significant limitations:
- **Geographic Barriers**: Hard to find players in your area
- **Skill Level Mismatches**: Difficulty matching with players of similar ability
- **Time Coordination**: Scheduling conflicts and last-minute cancellations
- **Sport Variety**: Limited options for less common sports
- **Safety Concerns**: Meeting strangers without proper verification
- **Cost Barriers**: Expensive equipment and facility rentals

### Our Solution
RecReach addresses these challenges through:
- **Smart Matching**: AI-powered skill and preference matching
- **Location Intelligence**: Find games within your preferred radius
- **Real-time Coordination**: Instant messaging and live updates
- **Safety First**: Verified profiles and community moderation
- **Flexible Participation**: Join games that fit your schedule

## Technical Architecture

### Mobile-First Platform
**Core Technologies:**
- **React Native**: Cross-platform mobile app for iOS and Android
- **Node.js/Express**: Scalable backend API with real-time capabilities
- **MongoDB**: Flexible document database for user profiles and game data
- **Socket.io**: Real-time communication for live updates
- **Google Maps API**: Location services and geospatial queries

**System Architecture:**
\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    RecReach Platform Architecture              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Mobile Apps (iOS/Android)                │   │
│  │  React Native • Geolocation • Push Notifications       │   │
│  │  Real-time Chat • Payment Integration • Social Features│   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↕ REST API + WebSocket              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Backend Services                         │   │
│  │  Node.js/Express • Authentication • Game Management    │   │
│  │  Real-time Updates • Payment Processing • Analytics    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↕ Database Layer                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Data Storage                             │   │
│  │  MongoDB • User Profiles • Game Data • Location Data   │   │
│  │  Redis Cache • File Storage • Analytics Database       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↕ External Services                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Third-Party Integrations                 │   │
│  │  Google Maps • Stripe • Twilio • AWS S3                │   │
│  │  Weather API • Sports Data • Social Login              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Key Features

**1. Smart Matching Algorithm**
- **Skill Assessment**: Multi-dimensional skill evaluation system
- **Preference Matching**: Sport preferences, playing style, and availability
- **Location Optimization**: Find games within optimal travel distance
- **Time Compatibility**: Match users with similar availability patterns
- **Learning Algorithm**: Improves matching accuracy over time

**2. Real-time Game Management**
- **Live Updates**: Real-time notifications for game changes
- **Instant Messaging**: Group chat for each game/event
- **RSVP System**: Easy join/leave functionality with capacity management
- **Weather Integration**: Automatic weather alerts and rescheduling
- **Last-minute Spots**: Quick fill for cancelled participants

**3. Community Features**
- **Player Profiles**: Comprehensive profiles with skill ratings and reviews
- **Social Integration**: Connect with friends and build sports networks
- **Achievement System**: Badges and milestones for engagement
- **Community Moderation**: User-reported content and safety measures
- **Event History**: Track your sports activity and improvement

## Technical Implementation

### Mobile App Development
**React Native Architecture:**
- **Cross-Platform Codebase**: 90% code sharing between iOS and Android
- **Native Performance**: Critical features implemented in native code
- **Offline Support**: Core functionality works without internet
- **Push Notifications**: Real-time alerts for game updates
- **Geolocation Services**: Background location tracking for nearby games

**Key Mobile Features:**
- **Map Integration**: Interactive map showing nearby games
- **Camera Integration**: Profile photos and game documentation
- **Payment Processing**: In-app payments for facility fees
- **Social Sharing**: Share games and achievements on social media

### Backend Infrastructure
**Scalable API Design:**
- **Microservices Architecture**: Modular services for different features
- **Real-time Communication**: WebSocket connections for live updates
- **Caching Strategy**: Redis for frequently accessed data
- **Load Balancing**: Handle traffic spikes during peak hours
- **Database Optimization**: Indexed queries for fast location searches

**Data Management:**
- **User Profiles**: Comprehensive user data with privacy controls
- **Game Data**: Event details, participants, and real-time updates
- **Location Data**: Geospatial indexing for efficient location queries
- **Analytics**: User behavior tracking and platform insights

### Matching Algorithm
**Intelligent Matching System:**
\`\`\`
User Input: Skill Level, Location, Sport, Time Preferences
    ↓
┌─────────────────────────────────────────────────────────┐
│                Matching Engine                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │   Skill     │ │  Location   │ │    Time     │       │
│  │  Matching   │ │  Filtering  │ │  Filtering  │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ Preference  │ │  Capacity   │ │   Safety    │       │
│  │  Matching   │ │  Checking   │ │  Scoring    │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
└─────────────────────────────────────────────────────────┘
    ↓
Ranked List of Matching Games
\`\`\`

**Algorithm Components:**
- **Skill Scoring**: Multi-factor skill assessment (1-10 scale)
- **Distance Weighting**: Closer games get higher priority
- **Time Compatibility**: Match availability patterns
- **Preference Learning**: Adapt to user behavior over time
- **Safety Scoring**: Verified users and community ratings

## Business Model & Growth

### Revenue Streams
**Primary Revenue:**
- **Facility Fees**: Commission on paid game bookings
- **Premium Memberships**: Advanced features and priority matching
- **Equipment Rentals**: Partner with sports equipment providers
- **Sponsored Content**: Brand partnerships and advertising

**Secondary Revenue:**
- **Tournament Organization**: Host and manage sports tournaments
- **Training Programs**: Partner with coaches for skill development
- **Merchandise**: Branded sports apparel and accessories

### User Growth Strategy
**Acquisition Channels:**
- **Social Media Marketing**: Instagram, TikTok, and Facebook campaigns
- **Campus Partnerships**: University sports programs and clubs
- **Influencer Partnerships**: Sports influencers and local athletes
- **Referral Program**: Incentivize user referrals
- **Community Events**: Host local sports meetups and tournaments

## Impact & Results

### Platform Growth
- **Multi-City Expansion**: Active community across multiple cities
- **Consistent Activity**: Regular game creation and participation
- **High User Satisfaction**: Strong user retention and positive feedback
- **Community Engagement**: Active user participation and platform growth

## Future Vision

### Planned Features
- **AI Coaching**: Personalized training recommendations
- **Virtual Reality**: VR sports training and simulation
- **Wearable Integration**: Fitness tracking and performance analytics
- **Tournament Platform**: Automated tournament management
- **Corporate Programs**: Team building and corporate wellness

### Expansion Strategy
- **Geographic Expansion**: Launch in 50+ cities nationwide
- **Sport Diversification**: Add more sports and activities
- **International Markets**: Expand to Canada and Europe
- **B2B Platform**: Enterprise solutions for sports organizations

## Technical Challenges & Solutions

### Challenge 1: Real-time Location Updates
**Problem**: Keeping game locations accurate in real-time
**Solution**: Background location tracking with battery optimization

### Challenge 2: Skill Assessment Accuracy
**Problem**: Accurately evaluating player skill levels
**Solution**: Multi-dimensional assessment with peer reviews

### Challenge 3: Scalability
**Problem**: Handling growing user base and data volume
**Solution**: Microservices architecture with auto-scaling

### Challenge 4: Safety & Trust
**Problem**: Ensuring user safety in meetups with strangers
**Solution**: Verification system, community moderation, and safety features

## The Impact

Building RecReach has taught me:

- **Mobile Development**: Cross-platform app development with React Native
- **Real-time Systems**: Building scalable real-time communication
- **Location Services**: Implementing geospatial features and mapping
- **Community Building**: Creating engaging social platforms
- **Startup Operations**: Running a technology startup from idea to scale

RecReach represents the power of technology to bring people together around shared interests, making sports more accessible and building stronger communities through physical activity and social connection.`,
  },
  {
    id: "hive",
    title: "Hive Mind",
    image: "/hive-robotics.png",
    description:
      "A personal AI assistant & smart environment controller - my own JARVIS that manages calendar, emails, contacts, and controls my entire room through natural language.",
    tech: ["Python", "React", "Node.js", "SQLite", "Ollama", "IoT", "Voice Recognition", "Multi-Agent AI"],
    links: [
      { type: "github", url: "https://github.com/VedSoni-dev/hive-mind", label: "GitHub" },
      { type: "demo", url: "https://hive-mind-demo.com", label: "Live Demo" },
    ],
    details: `# Building Hive Mind: A Personal AI Assistant & Smart Environment Controller

## The Vision: Creating My Own JARVIS

I've always been fascinated by the idea of having a personal AI assistant that could understand natural language and control my entire environment - like JARVIS from Iron Man, but for my room. I wanted something that could manage my calendar, emails, and contacts while also controlling my smart devices, 3D printer, custom robots, and room automation through simple voice commands.

## The Architecture: Dual-Brain AI System

### The Core Problem
Traditional AI assistants are either too rigid (requiring exact commands) or too unpredictable (hallucinating responses). I needed something that could reliably understand my intent while maintaining natural conversation flow. The solution was a dual-brain architecture inspired by how humans process information.

### The Dual-Brain Design
I implemented two specialized LLM brains working in tandem:

**Reasoning Brain (Llama3.1:8b)**
- Purpose: Parse user intent and extract structured parameters
- Temperature: 0.0 (completely deterministic)
- Output: Strict JSON with \`{intent, params}\` schema
- Handles: Intent classification, parameter extraction, context understanding

**Personality Brain (Mistral:7b-instruct)**
- Purpose: Convert execution results to friendly, natural responses
- Temperature: 0.3 (slightly creative but controlled)
- Output: Conversational responses
- Handles: User feedback, confirmation messages, error explanations

### The Orchestration Layer
The \`HiveOrchestrator\` sits at the center, coordinating everything:

\`\`\`
User Input → Reasoning Brain → Intent + Params → Agent Execution → Result → Personality Brain → Response
\`\`\`

**Architecture Diagram:**
\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                        Hive Mind Architecture                   │
├─────────────────────────────────────────────────────────────────┤
│  User Input (Voice/Text)                                       │
│           ↓                                                     │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │  Reasoning Brain │    │ Personality Brain│                   │
│  │  (Llama3.1:8b)  │    │ (Mistral:7b)    │                   │
│  │  Temp: 0.0       │    │ Temp: 0.3       │                   │
│  │  JSON Output     │    │ Natural Text    │                   │
│  └─────────────────┘    └─────────────────┘                   │
│           ↓                           ↑                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              HiveOrchestrator                           │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │   │
│  │  │   Calendar  │ │    Gmail    │ │     IoT     │  ...  │   │
│  │  │    Agent    │ │    Agent    │ │    Agent    │       │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘       │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │   │
│  │  │   3D Print  │ │    Task     │ │   Weather   │  ...  │   │
│  │  │    Agent    │ │    Agent    │ │    Agent    │       │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
│           ↓                           ↑                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Physical World                             │   │
│  │  Smart Lights • 3D Printer • Robots • Sensors          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

This creates a reliable pipeline where the reasoning brain ensures accuracy while the personality brain maintains natural conversation flow.

## Multi-Agent Collaboration System

### Agent-to-Agent Communication
One of the most powerful features I built into Hive Mind is the ability for agents to communicate and collaborate with each other. This creates a truly intelligent system where agents can work together to solve complex problems.

**Current Agent Ecosystem:**
- **Calendar Agent**: Manages all scheduling and time-based tasks
- **Gmail Agent**: Handles all email operations and communication
- **Contacts Agent**: Manages relationships and contact information
- **IoT Agent**: Controls all physical devices and sensors
- **3D Printer Agent**: Manages printing jobs and maintenance
- **Task Agent**: Handles project management and to-do lists
- **Weather Agent**: Provides environmental context for automation
- **Music Agent**: Controls audio systems and playlists
- **Security Agent**: Monitors room security and access control

### Smart Collaboration Examples

**Smart Meeting Preparation:**
1. Calendar Agent: Creates the meeting event
2. Calendar Agent → IoT Agent: "Prepare room for video call at 1:45pm"
3. IoT Agent: Adjusts lighting, ensures good camera angles, sets up microphones
4. Calendar Agent → Gmail Agent: "Send calendar invite to robotics team"
5. Gmail Agent: Sends invitations with meeting details
6. Gmail Agent → Task Agent: "Create follow-up task for meeting notes"

**Agent Collaboration Flow Diagram:**
\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    Multi-Agent Collaboration                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User: "Schedule video call with robotics team tomorrow 2pm"   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              HiveOrchestrator                           │   │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │   │
│  │  │   Calendar  │◄──►│    Gmail    │◄──►│     IoT     │ │   │
│  │  │    Agent    │    │    Agent    │    │    Agent    │ │   │
│  │  └─────────────┘    └─────────────┘    └─────────────┘ │   │
│  │         ▲                   ▲                   ▲       │   │
│  │         │                   │                   │       │   │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │   │
│  │  │    Task     │    │   Weather   │    │   Music     │ │   │
│  │  │    Agent    │    │    Agent    │    │    Agent    │ │   │
│  │  └─────────────┘    └─────────────┘    └─────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Physical World                             │   │
│  │  📅 Calendar Event  📧 Email Sent  💡 Lights Adjusted  │   │
│  │  🎵 Music Playing  📋 Task Created  🌡️ Room Ready     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

**3D Printing Workflow:**
\`\`\`
User: "Print the robot arm prototype"
    ↓
┌─────────────────────────────────────────────────────────────────┐
│  Task Agent → 3D Printer Agent → IoT Agent → Calendar Agent    │
│      ↓              ↓              ↓              ↓            │
│  Identifies    Starts Print    Adjusts Temp   Schedules        │
│  Project       Job & Monitor   for Optimal    Post-Processing  │
│  Files         Progress        Printing       Time Slot        │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## The Technical Implementation

### Backend Architecture (Python)
I built the core system using Python 3.8+ with a modular, agent-based architecture:

**Core Components:**
- \`hivemind/orchestrator.py\` - Central coordination system
- \`hivemind/llm/client.py\` - Dual-brain LLM client with Ollama integration
- \`hivemind/agents/\` - Specialized agents with collaboration protocols
- \`hivemind/storage/\` - Database layer with SQLite WAL mode
- \`hivemind/core/\` - Models and registry system

**Key Features:**
- **Local-First Design**: Everything runs locally using Ollama, no external API calls
- **Agent Registry**: Dynamic agent discovery and command routing
- **Correlation Tracking**: Every request gets a unique ID for debugging
- **Error Handling**: Graceful fallbacks and clarification requests
- **Structured Logging**: Comprehensive logging with loguru for debugging

**System Architecture Diagram:**
\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    Hive Mind System Stack                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Frontend Layer                           │   │
│  │  React App • Node.js/Express API • Real-time Sync      │   │
│  │  Glassmorphism UI • Voice Interface • Mobile PWA       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↕ HTTP/WebSocket                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Backend Layer                            │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │   │
│  │  │ HiveOrchestr│ │ LLM Client  │ │ Agent       │       │   │
│  │  │ ator        │ │ (Dual Brain)│ │ Registry    │       │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘       │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │   │
│  │  │ Message Bus │ │ Correlation │ │ Error       │       │   │
│  │  │ & Routing   │ │ Tracking    │ │ Handling    │       │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↕ Agent Communication               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Agent Layer                              │   │
│  │  Calendar • Gmail • IoT • 3D Print • Task • Weather    │   │
│  │  Music • Security • Contacts • Custom Agents           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↕ Device Protocols                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Physical Layer                           │   │
│  │  WiFi • Bluetooth • Serial • Custom Protocols          │   │
│  │  Smart Devices • Sensors • Actuators • Robots          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Frontend Development (React + Node.js)
I created a modern, responsive web interface:

**Backend (Node.js/Express):**
- RESTful API with comprehensive endpoints
- Real-time event synchronization
- Gmail API integration
- CORS configuration for local development

**Frontend (React):**
- Modern component architecture
- Day/Week/Month calendar views
- Drag-and-drop event editing
- Real-time updates and synchronization
- Responsive design for all screen sizes
- Glassmorphism UI with smooth animations

## The Smart Environment Integration

### IoT Device Control
I extended the agent system to control physical devices in my room:

**Device Integration:**
- **Smart Blinds**: Motorized window coverings with light sensor integration
- **LED Lighting**: Color-changing smart lights with mood-based automation
- **3D Printer**: Automated job management, progress monitoring, and failure detection
- **Custom Robots**: Room-cleaning bots, delivery systems, and monitoring devices
- **Environmental Sensors**: Temperature, humidity, light, and air quality monitoring

### Automation Logic
The system learns from my patterns and automates routine tasks:

- **Morning Routine**: Gradually increase lights, open blinds, start coffee maker
- **Work Mode**: Optimize lighting for productivity, adjust temperature
- **3D Printing**: Monitor print jobs, send notifications on completion/failure
- **Evening Wind-down**: Dim lights, close blinds, prepare room for sleep

## The Natural Language Interface

### Command Processing
I implemented sophisticated natural language understanding:

**Intent Recognition:**
- Calendar operations: "Schedule meeting tomorrow 2pm"
- Email management: "Send email to John about the project"
- Device control: "Turn on the lights and open the blinds"
- Complex tasks: "Start a 3D print of the robot arm and dim the lights"

### Voice Integration
I added voice recognition and synthesis:

- **Speech-to-Text**: Real-time voice command processing
- **Text-to-Speech**: Natural voice responses
- **Wake Word Detection**: "Hey Hive" activation
- **Conversation Context**: Maintains context across multiple exchanges

## Performance Metrics
- **Response Time**: <200ms for simple commands, <2s for complex tasks
- **Accuracy**: 95%+ intent recognition for common commands
- **Uptime**: 99.9% availability with local-first architecture
- **Device Control**: <100ms latency for IoT device commands

**Data Flow Diagram:**
\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    Hive Mind Data Flow                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User Input: "Turn on lights and start 3D print"              │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Voice/Text Processing                      │   │
│  │  Speech-to-Text → Text Preprocessing → Input Queue     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Reasoning Brain (Llama3.1:8b)             │   │
│  │  Intent: "device_control"                              │   │
│  │  Params: {lights: "on", printer: "start", file: null}  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              HiveOrchestrator                          │   │
│  │  Route to IoT Agent + 3D Printer Agent                │   │
│  │  Execute in parallel with correlation tracking        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Agent Execution                            │   │
│  │  IoT Agent: Control smart lights ✅                    │   │
│  │  3D Printer Agent: Start print job ✅                 │   │
│  │  Results: {lights: "on", print_job: "started"}        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Personality Brain (Mistral:7b)            │   │
│  │  "Great! I've turned on the lights and started your    │   │
│  │   print job. The room is now ready for work!"          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Response Delivery                          │   │
│  │  Text-to-Speech → Voice Response                       │   │
│  │  UI Update → Visual Confirmation                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## The Impact

Building Hive Mind has been an incredible journey that taught me:

- **AI Architecture**: How to design reliable, multi-agent AI systems
- **Full-Stack Development**: End-to-end application development
- **IoT Integration**: Connecting software with physical devices
- **Natural Language Processing**: Making AI understand human communication
- **System Design**: Building scalable, maintainable software architectures

Hive Mind represents more than just a personal project - it's a proof of concept for how AI can seamlessly integrate into our daily lives, making technology truly helpful and intuitive. It's my own JARVIS, and it's only getting smarter.`,
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
    <div className="h-full p-8 overflow-y-auto relative bg-transparent">
      {/* Floating background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-green-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-green-300/20 rounded-full blur-lg"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-400/10 rounded-full blur-md"></div>
      
      {/* Header Section */}
      <div className="mb-8 relative z-10">
        <div className="text-sm font-medium text-green-600 mb-2 tracking-wide">01. About Me</div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-green-300 mb-4"></div>
        <div className="text-sm text-green-500 mb-2">Hi, my name is</div>
        <h1 className="font-light leading-tight mb-4" style={{ fontSize: 52 }}>
          <span className="text-green-600">Vedant</span>{" "}
          <span className="text-gray-300">Soni.</span>
          <span className="text-green-500 ml-2 animate-pulse">|</span>
        </h1>
      </div>

      {/* Main Content - Clean Text Style */}
      <div className="space-y-6 text-gray-300 relative z-10">
        <div className="space-y-4">
          <p className="text-lg font-light leading-relaxed">
            I'm a <span className="font-semibold text-green-400">Computer Science and AI/BS student at Texas A&M University</span>, 
            passionate about <span className="font-semibold text-green-400">frontier AI research in multi-modal large language models</span> 
            and building intelligent systems that shape the future.
          </p>
          
          <p className="text-lg font-light leading-relaxed">
            I'm currently <span className="font-semibold text-green-400">founding Fern</span>, a nonprofit making AI tools for children with 
            autism and other disabilities, serving <span className="font-semibold text-green-400">6,500+ active users</span>. I'm also 
            <span className="font-semibold text-green-400"> building RecReach</span>, a pickup sports startup connecting athletes and sports 
            enthusiasts for casual games and activities.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-light leading-relaxed">
            I'm conducting research at <span className="font-semibold text-green-400">Texas A&M's Adaptive Robotics and Technology (ART) Lab</span> 
            on <span className="font-semibold text-green-400">AI algorithms for intelligent robotic swarm coordination</span>, 
            and at the <span className="font-semibold text-green-400">Design Innovation & Generative Intelligence (DIGIT) Lab</span> 
            on <span className="font-semibold text-green-400">fine-tuning LLMs for advanced data extraction</span>.
          </p>
          
          <p className="text-lg font-light leading-relaxed">
            I'm proud to be an <span className="font-semibold text-green-400">AI4ALL Ignite Fellow</span> for 2025, 
            <span className="font-semibold text-green-400"> Autodesk Ambassador</span>, and lead the 
            <span className="font-semibold text-green-400"> Texas A&M University Robotics Team</span> designing 
            <span className="font-semibold text-green-400"> AI intelligent humanoid robots</span>.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-light leading-relaxed">
            Previously, I led <span className="font-semibold text-green-400">Team Orion at TAMU ThinkTank</span> to write a comprehensive 
            100-page research paper on <span className="font-semibold text-green-400">future Mars exploration strategies</span>, 
            and worked as a <span className="font-semibold text-green-400">Machine Learning Engineer at tidalTAMU</span>, 
            teaching cars how to drive using <span className="font-semibold text-green-400">reinforcement learning algorithms</span>.
          </p>
        </div>
      </div>

      {/* Skills & Resume - Clean Layout */}
      <div className="mt-8 flex flex-col lg:flex-row gap-6 relative z-10">
        <div className="flex-1">
          <h3 className="text-xl font-light text-gray-300 mb-4">Core Focus Areas</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Multi-Modal AI", "Robotic Swarm Intelligence", "LLM Fine-Tuning",
              "Accessibility Technology", "Reinforcement Learning", "Computer Vision",
              "Natural Language Processing", "Humanoid Robotics", "Startup Development", "Research Leadership"
            ].map((skill, index) => (
              <span
                key={skill}
                className="text-sm font-light px-4 py-2 rounded-full border border-green-400/50 bg-green-400/10 backdrop-blur-sm text-green-300 hover:bg-green-400/20 transition-all duration-200 hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="lg:w-64">
          <h3 className="text-lg font-light text-gray-300 mb-4">Get in Touch</h3>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 border border-green-400/50 bg-green-400/10 hover:bg-green-400/20 shadow-md hover:shadow-lg transition-all duration-200 font-light text-sm group rounded-xl backdrop-blur-sm text-green-300"
          >
            <span className="text-lg">📄</span>
            <span>View Resume</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

function ProjectsContent({ onProjectClick }: { onProjectClick: (projectId: string) => void }) {
  return (
    <div className="p-6 md:p-8 relative">
      {/* Floating background elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-green-200/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-green-300/15 rounded-full blur-xl"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {projectsData.map((project, index) => (
          <div
            key={project.id}
            className="group bg-white/60 backdrop-blur-xl border border-green-200/40 hover:border-green-300/60 cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] relative"
            onClick={() => onProjectClick(project.id)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-green-100/20 pointer-events-none"></div>
            
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-48 object-cover relative z-10"
            />
            <div className="p-6 relative z-10">
              <h3 className="font-light text-2xl mb-3 text-green-700 group-hover:text-green-800 transition-colors duration-200">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4 font-light leading-relaxed">{project.description}</p>
              {project.links && project.links.length > 0 && (
                <div className="flex gap-2 mb-4" onClick={(e) => e.stopPropagation()}>
                  {project.links.map((link, idx) => (
                    <LinkIcon key={idx} type={link.type} url={link.url} label={link.label} />
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs font-light px-3 py-1.5 border border-green-200/60 bg-white/80 backdrop-blur-sm rounded-full text-green-700 hover:bg-green-50/80 transition-all duration-200">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs font-light px-3 py-1.5 border border-gray-200/60 bg-white/60 backdrop-blur-sm rounded-full text-gray-500">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectDetailContent({ projectId }: { projectId: string }) {
  const project = projectsData.find((p) => p.id === projectId)

  if (!project) {
    return <div className="p-6 text-gray-300">Project not found</div>
  }

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      <img
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        className="w-full h-64 object-cover rounded-lg shadow-sm mb-6"
      />
      <h1 className="font-light text-3xl mb-4 text-gray-300">{project.title}</h1>
      
      {/* Links Section */}
      {project.links && project.links.length > 0 && (
        <div className="mb-6">
          <div className="flex gap-3">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-green-400/50 bg-green-400/10 hover:bg-green-400/20 shadow-sm hover:shadow-md transition-all duration-200 font-light text-sm text-green-300"
              >
                <LinkIcon type={link.type} url={link.url} label={link.label} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Technologies Section */}
      <div className="mb-6">
        <h3 className="font-light text-lg mb-3 text-gray-300">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="text-sm font-light px-3 py-1 border border-green-400/50 bg-green-400/10 rounded-full text-green-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Details with Markdown Rendering */}
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            h1: ({children}) => <h1 className="font-light text-2xl mt-8 mb-4 text-gray-300 border-b border-green-400/30 pb-2">{children}</h1>,
            h2: ({children}) => <h2 className="font-light text-xl mt-6 mb-3 text-gray-300">{children}</h2>,
            h3: ({children}) => <h3 className="font-light text-lg mt-5 mb-2 text-gray-300">{children}</h3>,
            p: ({children}) => <p className="text-base mb-4 leading-relaxed text-gray-300 font-light">{children}</p>,
            ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-300 font-light">{children}</ul>,
            ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-300 font-light">{children}</ol>,
            li: ({children}) => <li className="text-base">{children}</li>,
            strong: ({children}) => <strong className="font-medium text-green-400">{children}</strong>,
            code: ({children, ...props}) => {
              const isInline = !props.className?.includes('language-')
              return isInline ? (
                <code className="px-2 py-1 bg-green-400/10 border border-green-400/30 rounded text-sm font-mono text-green-300">{children}</code>
              ) : (
                <pre className="bg-green-400/5 border border-green-400/20 p-4 rounded-lg overflow-x-auto mb-4">
                  <code className="text-sm font-mono text-green-300">{children}</code>
                </pre>
              )
            },
            blockquote: ({children}) => (
              <blockquote className="border-l-4 border-green-400/50 pl-4 my-4 italic text-gray-300 font-light">{children}</blockquote>
            ),
          }}
        >
          {project.details}
        </ReactMarkdown>
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
            <h1 className="font-light text-2xl mb-2 text-gray-300">{experience.title}</h1>
            <p className="font-medium text-xl text-gray-300">{experience.company}</p>
          </div>
          <span className={`px-4 py-2 text-lg font-medium border border-green-400/50 bg-green-400/10 text-green-300 rounded-lg`}>
            {experience.period}
          </span>
        </div>
        <p className="text-lg text-gray-300 mb-6">{experience.description}</p>
        {experience.links && experience.links.length > 0 && (
          <div className="mb-6">
            <h3 className="font-light text-lg mb-2 text-gray-300">Links</h3>
            <div className="flex gap-3">
              {experience.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-green-400/50 bg-green-400/10 hover:bg-green-400/20 shadow-sm hover:shadow-md transition-all duration-200 font-light text-green-300 rounded-lg"
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
      <div className="space-y-4">
        <h3 className="font-light text-xl mb-4 text-gray-300">Key Accomplishments</h3>
        <div className="space-y-3">
          {experience.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-base leading-relaxed text-gray-300">{detail}</p>
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
      color: "bg-blue-50 border-blue-200 text-blue-800",
    },
    {
      id: "recreach-founder",
      title: "Founder",
      company: "ReReach",
      period: "Mar 2025 — Present",
      description: "Pick up sports startup connecting athletes and sports enthusiasts for casual games.",
      color: "bg-green-50 border-green-200 text-green-800",
    },
    {
      id: "art-lab-researcher",
      title: "AI Robotics Researcher",
      company: "Adaptive Robotics and Technology (ART) Lab - Texas A&M",
      period: "Apr 2025 — Present",
      description: "Developing AI Algorithms for Intelligent Robotic Swarms",
      color: "bg-purple-50 border-purple-200 text-purple-800",
    },
    {
      id: "digit-lab-researcher",
      title: "AI Lab Researcher",
      company: "Design Innovation & Generative InTelligence (DIGIT) Lab - Texas A&M",
      period: "Feb 2025 — Aug 2025",
      description: "Fine Tuning LLMs for Advanced Data Extraction",
      color: "bg-teal-50 border-teal-200 text-teal-800",
    },
    {
      id: "autodesk-ambassador",
      title: "Ambassador",
      company: "Autodesk",
      period: "May 2025 — Present",
      description: "Representing Autodesk in academic and professional communities.",
      color: "bg-orange-50 border-orange-200 text-orange-800",
    },
  ]

  const leadershipActivities = [
    {
      id: "ai4all-fellow",
      title: "Ignite Fellow",
      company: "AI4ALL",
      period: "Aug 2025 — Present",
      description: "Participating in AI4ALL's leadership development program for underrepresented groups in AI.",
      color: "bg-red-50 border-red-200 text-red-800",
    },
    {
      id: "robotics-lead",
      title: "Project Lead & Workshop Director",
      company: "Texas A&M University Robotics Team & Leadership Experience",
      period: "May 2025 — Present",
      description: "Designing AI intelligent humanoid robots and organizing robotics workshops.",
      color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    },
    {
      id: "tidal-ml-engineer",
      title: "Machine Learning Engineer",
      company: "tidalTAMU",
      period: "Aug 2024 — Nov 2024",
      description: "Taught cars how to drive using reinforcement learning algorithms.",
      color: "bg-cyan-50 border-cyan-200 text-cyan-800",
    },
    {
      id: "thinktank-lead",
      title: "Research Project Lead",
      company: "TAMU ThinkTank",
      period: "Aug 2024 — May 2025",
      description: "Led Team Orion to write a 100 page paper for future Mars exploration.",
      color: "bg-pink-50 border-pink-200 text-pink-800",
    },
  ]

  return (
    <div className="p-6 md:p-8">
      {/* Work Experience Section */}
      <div className="mb-12">
        <h2 className="font-light text-2xl mb-6 text-gray-900 border-b border-gray-200 pb-2">Work Experience</h2>
        <div className="grid gap-6">
          {workExperiences.map((exp) => (
            <div
              key={exp.id}
              className="relative border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden rounded-lg"
              onMouseEnter={() => setHoveredCard(exp.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onExperienceClick(exp.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-light text-xl text-gray-900">{exp.title}</h3>
                    <p className="font-light text-gray-700">{exp.company}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-light border rounded-full ${exp.color}`}>
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-600 font-light leading-relaxed">{exp.description}</p>
              </div>
              <div
                className={`absolute inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === exp.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center text-white">
                  <div className="font-light text-xl mb-2">Click to learn more</div>
                  <div className="text-sm opacity-80 font-light">View detailed accomplishments</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Leadership & Activities Section */}
      <div>
        <h2 className="font-light text-2xl mb-6 text-gray-900 border-b border-gray-200 pb-2">Leadership & Activities</h2>
        <div className="grid gap-6">
          {leadershipActivities.map((activity) => (
            <div
              key={activity.id}
              className="relative border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden rounded-lg"
              onMouseEnter={() => setHoveredCard(activity.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onExperienceClick(activity.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-light text-xl text-gray-900">{activity.title}</h3>
                    <p className="font-light text-gray-700">{activity.company}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-light border rounded-full ${activity.color}`}>
                    {activity.period}
                  </span>
                </div>
                <p className="text-gray-600 font-light leading-relaxed">{activity.description}</p>
              </div>
              <div
                className={`absolute inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === activity.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center text-white">
                  <div className="font-light text-xl mb-2">Click to learn more</div>
                  <div className="text-sm opacity-80 font-light">View detailed accomplishments</div>
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
      <h2 className="font-light text-2xl mb-8 text-gray-300">Get in Touch</h2>
      {/* Email */}
      <div className="mb-8">
        <div className="space-y-4">
          <h3 className="font-light text-lg text-gray-300">Email</h3>
          <a href="mailto:ved.06.soni@gmail.com" className="text-green-400 hover:text-green-300 text-lg font-light transition-colors duration-200">
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
          className="border border-green-400/50 bg-green-400/10 hover:bg-green-400/20 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex items-center gap-4 rounded-lg group"
        >
          <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <div>
            <div className="font-light text-lg text-gray-300 group-hover:text-green-400 transition-colors duration-200">LinkedIn</div>
            <div className="text-sm text-gray-400 font-light">Professional Profile</div>
          </div>
        </a>
        <a
          href="https://github.com/VedSoni-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-green-400/50 bg-green-400/10 hover:bg-green-400/20 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex items-center gap-4 rounded-lg group"
        >
          <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.305 1.235 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <div>
            <div className="font-light text-lg text-gray-300 group-hover:text-green-400 transition-colors duration-200">GitHub</div>
            <div className="text-sm text-gray-400 font-light">Code & Projects</div>
          </div>
        </a>
        <a
          href="https://x.com/VedantRobot"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-green-400/50 bg-green-400/10 hover:bg-green-400/20 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex items-center gap-4 rounded-lg group"
        >
          <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <div>
            <div className="font-light text-lg text-gray-300 group-hover:text-green-400 transition-colors duration-200">X</div>
            <div className="text-sm text-gray-400 font-light">Updates & Thoughts</div>
          </div>
        </a>
        <a
          href="https://www.instagram.com/vedant.soni.vs/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-green-400/50 bg-green-400/10 hover:bg-green-400/20 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex items-center gap-4 rounded-lg group"
        >
          <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849a4.923 4.923 0 00-2.228-.616v.06a4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
          <div>
            <div className="font-light text-lg text-gray-300 group-hover:text-green-400 transition-colors duration-200">Instagram</div>
            <div className="text-sm text-gray-400 font-light">Behind the Scenes</div>
          </div>
        </a>
      </div>
    </div>
  )
}

function BlogContent({ onBlogClick }: { onBlogClick: (blogId: string) => void }) {
  const blogPosts = [
    {
      id: "ai-robotics-future",
      title: "The Future of AI and Robotics",
      excerpt: "Exploring how artificial intelligence and robotics will transform our daily lives and work environments.",
      date: "2025-01-15",
      category: "Technology",
      image: "/neural-network-visualization.png",
      readTime: "5 min read"
    },
    {
      id: "startup-journey",
      title: "Building Fern: From Idea to 6,500 Users",
      excerpt: "The story behind creating AI tools for children with disabilities and scaling to help thousands of families.",
      date: "2025-01-10",
      category: "Startup",
      image: "/fern-ai-tools.png",
      readTime: "8 min read"
    },
    {
      id: "robotics-research",
      title: "Advancements in Robotic Swarm Intelligence",
      excerpt: "My research on developing AI algorithms for intelligent robotic swarm coordination at Texas A&M.",
      date: "2025-01-05",
      category: "Research",
      image: "/autonomous-drone-landscape.png",
      readTime: "6 min read"
    },
    {
      id: "machine-learning",
      title: "Teaching Cars to Drive with Reinforcement Learning",
      excerpt: "How I implemented deep Q-learning networks for autonomous vehicle navigation at tidalTAMU.",
      date: "2024-12-20",
      category: "AI/ML",
      image: "/computer-vision-object-detection.png",
      readTime: "7 min read"
    }
  ]

  return (
    <div className="p-6">
      <h2 className="font-black text-3xl mb-6 border-b-[3px] border-black pb-3">Blog & Thoughts</h2>
      <p className="text-lg text-gray-600 mb-8">
        Sharing insights on AI, robotics, startups, and the future of technology.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all duration-200 cursor-pointer overflow-hidden"
            onClick={() => onBlogClick(post.id)}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover border-b-[3px] border-black"
            />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-bold border-[2px] border-black bg-yellow-300">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <h3 className="font-black text-xl mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-3">{post.excerpt}</p>
              <div className="text-sm text-gray-500">{post.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BlogDetailContent({ blogId }: { blogId: string }) {
  const blogPosts = {
    "ai-robotics-future": {
      title: "The Future of AI and Robotics",
      date: "January 15, 2025",
      category: "Technology",
      image: "/neural-network-visualization.png",
      content: `
        <p class="mb-4">As we stand on the cusp of a new technological revolution, the intersection of artificial intelligence and robotics is poised to fundamentally transform how we live, work, and interact with the world around us.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">The Current State</h3>
        <p class="mb-4">Today's AI systems can process vast amounts of data, recognize patterns, and make decisions with remarkable accuracy. Robotics, on the other hand, has evolved from simple mechanical arms to sophisticated autonomous systems capable of navigating complex environments.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Integration Challenges</h3>
        <p class="mb-4">The challenge lies in seamlessly integrating these two fields. While AI excels at decision-making and pattern recognition, robotics provides the physical embodiment and interaction capabilities. Bridging this gap requires innovative approaches to sensor fusion, real-time processing, and adaptive control systems.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Future Applications</h3>
        <p class="mb-4">From healthcare robots that can perform complex surgeries to autonomous vehicles that navigate our cities, the possibilities are endless. The key is developing systems that are not only intelligent but also safe, reliable, and beneficial to humanity.</p>
      `,
      attachments: [
        { name: "AI-Robotics-Research.pdf", type: "pdf", url: "#" }
      ]
    },
    "startup-journey": {
      title: "Building Fern: From Idea to 6,500 Users",
      date: "January 10, 2025",
      category: "Startup",
      image: "/fern-ai-tools.png",
      content: `
        <p class="mb-4">Building Fern has been one of the most rewarding experiences of my entrepreneurial journey. What started as a simple idea to help children with disabilities has grown into a platform serving thousands of families.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">The Genesis</h3>
        <p class="mb-4">The idea for Fern came from observing the challenges faced by families with children who have autism and other disabilities. Traditional tools were often expensive, difficult to use, or simply not effective enough.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Building the Solution</h3>
        <p class="mb-4">We focused on creating AI-powered tools that were not only effective but also accessible and user-friendly. The key was understanding that technology should adapt to the user, not the other way around.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Scaling Impact</h3>
        <p class="mb-4">Reaching 6,500 active users has been incredible, but what's more meaningful is the stories we hear from families about how Fern has helped their children develop new skills and confidence.</p>
      `,
      attachments: [
        { name: "Fern-Case-Study.pdf", type: "pdf", url: "#" },
        { name: "User-Feedback-Report.pdf", type: "pdf", url: "#" }
      ]
    },
    "robotics-research": {
      title: "Advancements in Robotic Swarm Intelligence",
      date: "January 5, 2025",
      category: "Research",
      image: "/autonomous-drone-landscape.png",
      content: `
        <p class="mb-4">At the Adaptive Robotics and Technology (ART) Lab at Texas A&M, I'm working on developing AI algorithms that enable robots to work together as intelligent swarms.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Swarm Intelligence Principles</h3>
        <p class="mb-4">Swarm robotics draws inspiration from nature, where simple individual behaviors lead to complex collective intelligence. Think of how ants coordinate to find food or how birds flock together.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Technical Challenges</h3>
        <p class="mb-4">The main challenges include distributed decision-making, communication protocols, and ensuring robustness when individual robots fail. Our algorithms need to handle dynamic environments and changing team compositions.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Applications</h3>
        <p class="mb-4">Potential applications range from search and rescue operations to environmental monitoring and agricultural automation. The key advantage is that swarms can cover large areas efficiently and adapt to changing conditions.</p>
      `,
      attachments: [
        { name: "Swarm-Robotics-Paper.pdf", type: "pdf", url: "#" },
        { name: "Algorithm-Performance-Analysis.pdf", type: "pdf", url: "#" }
      ]
    },
    "machine-learning": {
      title: "Teaching Cars to Drive with Reinforcement Learning",
      date: "December 20, 2024",
      category: "AI/ML",
      image: "/computer-vision-object-detection.png",
      content: `
        <p class="mb-4">During my time at tidalTAMU, I worked on implementing reinforcement learning algorithms for autonomous vehicle navigation, specifically focusing on deep Q-learning networks.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Reinforcement Learning Basics</h3>
        <p class="mb-4">Reinforcement learning is like teaching through trial and error. The agent (in this case, a car) learns by taking actions and receiving rewards or penalties based on the outcomes.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Deep Q-Learning Implementation</h3>
        <p class="mb-4">We implemented deep Q-learning networks that could process real-time sensor data and make driving decisions. The key innovation was in the reward system design and the training environment setup.</p>
        
        <h3 class="font-black text-xl mb-3 mt-6">Results and Learnings</h3>
        <p class="mb-4">The system showed significant improvements in autonomous driving performance, particularly in handling edge cases and adapting to different driving conditions. The experience taught me valuable lessons about the importance of proper reward engineering.</p>
      `,
      attachments: [
        { name: "RL-Driving-Research.pdf", type: "pdf", url: "#" },
        { name: "Performance-Metrics.pdf", type: "pdf", url: "#" }
      ]
    }
  }

  const post = blogPosts[blogId as keyof typeof blogPosts]

  if (!post) {
    return <div className="p-5">Blog post not found</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-sm font-bold border-[2px] border-black bg-yellow-300">
            {post.category}
          </span>
          <span className="text-gray-500">{post.date}</span>
        </div>
        <h1 className="font-black text-3xl mb-4">{post.title}</h1>
      </div>
      
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover border-[3px] border-black shadow-[6px_6px_0_0_#000] mb-6"
      />
      
      <div 
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {post.attachments && post.attachments.length > 0 && (
        <div className="border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] p-5">
          <h3 className="font-black text-xl mb-4">Attachments</h3>
          <div className="space-y-3">
            {post.attachments.map((attachment, idx) => (
              <a
                key={idx}
                href={attachment.url}
                className="flex items-center gap-3 p-3 border-[2px] border-black bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                <span className="font-semibold">{attachment.name}</span>
                <span className="text-sm text-gray-500">({attachment.type.toUpperCase()})</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function LinkIcon({ type, url, label }: { type: string; url: string; label: string }) {
  const getIcon = () => {
    switch (type) {
      case "github":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.305 1.235 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        )
      case "website":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        )
      case "demo":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )
      case "linkedin":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
      className="inline-flex items-center gap-2 px-4 py-2 border border-green-200/60 bg-white/80 backdrop-blur-sm hover:bg-green-50/80 transition-all duration-200 text-sm font-light rounded-full text-green-700 hover:scale-105 shadow-sm hover:shadow-md"
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
      { key: "about", title: "About Me", content: <AboutContent /> },
      {
        key: "projects",
        title: "Projects",
        content: <ProjectsContent onProjectClick={(projectId) => openApp(projectId as any)} />,
      },
      { key: "talk", title: "Contact", content: <TalkContent /> },
      {
        key: "experience",
        title: "Experience",
        content: <ExperienceContent onExperienceClick={(experienceId) => openApp(experienceId as any)} />,
      },
      { key: "blog", title: "Blog & Thoughts", content: <BlogContent onBlogClick={(blogId) => openApp(blogId as any)} /> },
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
      ...[
        "ai-robotics-future",
        "startup-journey",
        "robotics-research",
        "machine-learning",
      ].map((blogId) => ({
        key: blogId as any,
        title: blogId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        content: <BlogDetailContent blogId={blogId} />,
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
      
      {/* PixelBlast Interactive Background */}
      <div className="absolute inset-0">
        <PixelBlast
          variant="circle"
          pixelSize={4}
          color="#22c55e"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          speed={0.6}
          edgeFade={0.25}
          transparent
          className=""
          style={{}}
        />
      </div>
      
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
            <BuildingStatus onProjectClick={(projectId) => openApp(projectId as any)} />
            
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
                  onMinimize={() => closeApp(appKey)}
                  onMaximize={() => {}}
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
