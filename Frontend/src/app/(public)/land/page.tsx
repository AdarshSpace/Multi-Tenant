'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Play,
  Calendar,
  Clock,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Video,
  Award,
  Zap,
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Globe,
  Layers,
  Laptop,
  Check,
  Lock,
  Search,
  Activity,
  BarChart3,
  ThumbsUp,
  Send,
  Code2,
  Sliders,
  CheckCircle,
  BarChart2,
} from 'lucide-react';

/* ==========================================================================
   1. MULTI-TENANT LANDING PAGE CONFIGURATION (Single Source of Truth)
   In production, this object is fetched from the Backend Landing Page API.
   ========================================================================== */

export interface TenantData {
  tenant: {
    id: string;
    name: string;
    tagline: string;
    logo: {
      text: string;
      subtext?: string;
    };
    contactEmail: string;
    contactPhone: string;
  };
  theme: {
    primary: string; // e.g. Indigo/Violet dominant
    primaryHover: string;
    secondary: string; // Teal/Cyan secondary
    accent: string; // Amber warm accent
    gradientFrom: string;
    gradientTo: string;
    lightBg: string;
  };
  navbar: {
    links: Array<{ id: string; label: string; href: string }>;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  hero: {
    badgeText: string;
    trustTagline: string;
    titleStart: string;
    titleGradient: string;
    titleEnd: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    searchPlaceholder: string;
    quickTags: string[];
    trustBullets: string[];
    socialProof: {
      rating: number;
      reviewsText: string;
      avatars: string[];
    };
    liveClassPreview: {
      badge: string;
      title: string;
      instructor: string;
      instructorRole: string;
      instructorAvatar: string;
      viewerCount: string;
      thumbnailUrl: string;
    };
    trustLogos: Array<{ name: string; label: string }>;
  };
  statistics: Array<{
    id: string;
    value: string;
    label: string;
    description: string;
    icon: string;
  }>;
  features: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      highlight: string;
    }>;
  };
  courses: {
    badge: string;
    title: string;
    subtitle: string;
    categories: string[];
    items: Array<{
      id: string;
      title: string;
      category: string;
      level: string;
      rating: number;
      reviewsCount: number;
      studentsCount: number;
      duration: string;
      modulesCount: number;
      price: string;
      originalPrice?: string;
      instructorName: string;
      instructorAvatar: string;
      thumbnailUrl: string;
      badge?: string;
    }>;
  };
  liveClasses: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      subject: string;
      instructorName: string;
      instructorAvatar: string;
      instructorRole: string;
      scheduledTime: string;
      status: 'live_now' | 'upcoming';
      attendees: number;
      maxCapacity: number;
      tags: string[];
    }>;
  };
  instructors: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      avatar: string;
      bio: string;
      coursesCount: number;
      studentsCount: number;
      rating: number;
      tags: string[];
    }>;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      organization: string;
      avatar: string;
      content: string;
      rating: number;
      courseName: string;
    }>;
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    bullets: string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  footer: {
    about: string;
    columns: Array<{
      title: string;
      links: Array<{ label: string; href: string }>;
    }>;
    socials: Array<{ platform: string; href: string; icon: string }>;
    copyright: string;
  };
}

const landingPageData: TenantData = {
  tenant: {
    id: 'motionkart-lms-01',
    name: 'Nexus Academy',
    tagline: 'Empowering Next-Gen Professionals with Interactive Learning',
    logo: {
      text: 'Nexus',
      subtext: 'Academy',
    },
    contactEmail: 'support@nexusacademy.edu',
    contactPhone: '+1 (800) 456-7890',
  },
  theme: {
    primary: '#4F46E5', // Indigo 600
    primaryHover: '#4338CA', // Indigo 700
    secondary: '#0EA5E9', // Sky 500
    accent: '#F59E0B', // Amber 500
    gradientFrom: '#4F46E5',
    gradientTo: '#06B6D4',
    lightBg: '#F8FAFC',
  },
  navbar: {
    links: [
      { id: 'features', label: 'Features', href: '#features' },
      { id: 'courses', label: 'Courses', href: '#courses' },
      { id: 'live', label: 'Live Classes', href: '#live' },
      { id: 'instructors', label: 'Instructors', href: '#instructors' },
      { id: 'testimonials', label: 'Reviews', href: '#testimonials' },
    ],
    secondaryCta: { label: 'Log In', href: '/login' },
    primaryCta: { label: 'Start Free Trial', href: '/register' },
  },
  hero: {
    badgeText: 'MULTI-TENANT LMS OPERATING SYSTEM',
    trustTagline: 'POWERING INDUSTRY-LEADING ACADEMIES & COHORTS WORLDWIDE',
    titleStart: 'Empower Your Academy With A',
    titleGradient: 'Next-Gen Interactive LMS',
    titleEnd: 'That Elevates Skill Mastery',
    description:
      'Deliver zero-latency live streaming, real-time interactive code sandboxes, automated micro-assessments, and verifiable career certificates on one unified platform.',
    primaryCta: { label: 'Start 14-Day Free Trial', href: '/register' },
    secondaryCta: { label: 'Watch 2-Min Product Tour', href: '#demo' },
    searchPlaceholder: 'Search 150+ live workshops, micro-credentials, or top mentors...',
    quickTags: ['System Architecture', 'Generative AI', 'Micro-Frontends', 'Cloud DevOps'],
    trustBullets: [
      'No Credit Card Needed',
      'Instant 5-Minute Tenant Launch',
      '99.99% Live Streaming SLA',
    ],
    socialProof: {
      rating: 4.98,
      reviewsText: 'from 12,500+ verified student reviews',
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      ],
    },
    liveClassPreview: {
      badge: 'STREAMING LIVE IN 4K',
      title: 'Full-Stack Architecture & Microservices Masterclass',
      instructor: 'Dr. Aris Thorne',
      instructorRole: 'Principal Cloud Architect',
      instructorAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      viewerCount: '1,420 active learners',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    },
    trustLogos: [
      { name: 'TechScale', label: 'TechScale' },
      { name: 'EduGlobal', label: 'EduGlobal' },
      { name: 'CloudAcademy', label: 'CloudAcademy' },
      { name: 'CodeLab', label: 'CodeLab' },
      { name: 'InnovateX', label: 'InnovateX' },
    ],
  },
  statistics: [
    {
      id: '1',
      value: '45,000+',
      label: 'Active Students',
      description: 'Enrolled in career-focused programs',
      icon: 'Users',
    },
    {
      id: '2',
      value: '98.4%',
      label: 'Completion Rate',
      description: 'Driven by interactive cohort models',
      icon: 'TrendingUp',
    },
    {
      id: '3',
      value: '350+',
      label: 'Live Monthly Seminars',
      description: 'Hosted by industry executives',
      icon: 'Video',
    },
    {
      id: '4',
      value: '4.9/5',
      label: 'Overall Satisfaction',
      description: 'Voted by verified alumni',
      icon: 'Star',
    },
  ],
  features: {
    badge: 'WHY CHOOSE US',
    title: 'Designed for High-Impact Learning',
    subtitle:
      'We combine live interactive sessions with self-paced mastery, actionable feedback, and dynamic progress tracking.',
    items: [
      {
        id: 'f1',
        title: 'HD Interactive Live Rooms',
        description:
          'Engage with dual-screen HD video stream, live polls, real-time code execution, and break-out rooms.',
        icon: 'Video',
        highlight: 'Zero latency streaming',
      },
      {
        id: 'f2',
        title: 'Structured Skill Paths',
        description:
          'Step-by-step modular curricula mapped to modern job role requirements and validated certifications.',
        icon: 'BookOpen',
        highlight: 'Industry certified',
      },
      {
        id: 'f3',
        title: 'Automated Micro-Assessments',
        description:
          'Get instant feedback on quizzes, coding assignments, and project submissions with detailed breakdowns.',
        icon: 'Zap',
        highlight: 'Instant feedback',
      },
      {
        id: 'f4',
        title: '1-on-1 Instructor Mentorship',
        description:
          'Schedule direct office hours with senior mentors to debug code, review resumes, and prep for interviews.',
        icon: 'Users',
        highlight: 'Personal guidance',
      },
      {
        id: 'f5',
        title: 'Verifiable Digital Credentials',
        description:
          'Share tamper-proof cryptographic certificates on LinkedIn and resume portals in one click.',
        icon: 'Award',
        highlight: 'LinkedIn integrated',
      },
      {
        id: 'f6',
        title: 'Learn Anywhere, Any Device',
        description:
          'Seamless offline download support, mobile progress sync, and dark mode for night owls.',
        icon: 'Laptop',
        highlight: 'Cross-platform sync',
      },
    ],
  },
  courses: {
    badge: 'EXPLORE CATALOG',
    title: 'Top Rated Industry Courses',
    subtitle:
      'Choose from curated specialization tracks crafted by leading technology and business pioneers.',
    categories: ['All', 'Development', 'AI & Data Science', 'Design & UX', 'Business'],
    items: [
      {
        id: 'c1',
        title: 'Full-Stack Next.js 15 & System Architecture',
        category: 'Development',
        level: 'Advanced',
        rating: 4.9,
        reviewsCount: 1240,
        studentsCount: 8520,
        duration: '42 Hours',
        modulesCount: 16,
        price: '$89',
        originalPrice: '$149',
        instructorName: 'Sarah Jenkins',
        instructorAvatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        badge: 'Bestseller',
      },
      {
        id: 'c2',
        title: 'Generative AI Engineering & LLM Orchestration',
        category: 'AI & Data Science',
        level: 'Intermediate',
        rating: 4.95,
        reviewsCount: 890,
        studentsCount: 6410,
        duration: '36 Hours',
        modulesCount: 14,
        price: '$99',
        originalPrice: '$199',
        instructorName: 'Alex Rivera',
        instructorAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
        badge: 'Hot & New',
      },
      {
        id: 'c3',
        title: 'UI/UX Design Systems & Product Strategy',
        category: 'Design & UX',
        level: 'Beginner to Pro',
        rating: 4.88,
        reviewsCount: 950,
        studentsCount: 5120,
        duration: '28 Hours',
        modulesCount: 12,
        price: '$79',
        originalPrice: '$129',
        instructorName: 'Elena Rostova',
        instructorAvatar:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
        badge: 'Popular',
      },
      {
        id: 'c4',
        title: 'Cloud DevOps, Kubernetes & AWS Infrastructure',
        category: 'Development',
        level: 'Advanced',
        rating: 4.92,
        reviewsCount: 610,
        studentsCount: 4200,
        duration: '50 Hours',
        modulesCount: 20,
        price: '$109',
        originalPrice: '$179',
        instructorName: 'Marcus Vance',
        instructorAvatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  liveClasses: {
    badge: 'REAL-TIME INTERACTION',
    title: 'Join Today’s Live Interactive Sessions',
    subtitle:
      'Participate in hands-on workshops, ask questions directly to experts, and build projects together in real-time.',
    items: [
      {
        id: 'l1',
        title: 'Building Scalable Micro-Frontends in 2026',
        subject: 'Frontend Architecture',
        instructorName: 'David K. Vance',
        instructorAvatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
        instructorRole: 'Staff Frontend Engineer at Stripe',
        scheduledTime: 'Today at 6:00 PM EST',
        status: 'live_now',
        attendees: 384,
        maxCapacity: 500,
        tags: ['React', 'Micro-Frontends', 'Performance'],
      },
      {
        id: 'l2',
        title: 'Finetuning Llama-3 Models for Enterprise APIs',
        subject: 'Artificial Intelligence',
        instructorName: 'Dr. Priya Sharma',
        instructorAvatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
        instructorRole: 'Lead AI Researcher',
        scheduledTime: 'Tomorrow at 2:00 PM EST',
        status: 'upcoming',
        attendees: 210,
        maxCapacity: 300,
        tags: ['PyTorch', 'LLMs', 'Model Tuning'],
      },
      {
        id: 'l3',
        title: 'High-Converting SaaS Product Onboarding UX',
        subject: 'Product Strategy',
        instructorName: 'Lucas Croft',
        instructorAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        instructorRole: 'VP of Design',
        scheduledTime: 'Aug 30 at 5:00 PM EST',
        status: 'upcoming',
        attendees: 175,
        maxCapacity: 250,
        tags: ['UX Design', 'Onboarding', 'Conversion'],
      },
    ],
  },
  instructors: {
    badge: 'WORLD-CLASS FACULTY',
    title: 'Learn From Industry Leaders',
    subtitle:
      'Our mentors are active practitioner leaders from tech giants, high-growth startups, and prestigious research labs.',
    items: [
      {
        id: 'i1',
        name: 'Sarah Jenkins',
        role: 'Ex-Senior Staff Engineer @ Google',
        avatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&h=250&q=80',
        bio: 'Over 12 years building distributed systems and high-throughput web applications. Author of React Scale & Performance.',
        coursesCount: 8,
        studentsCount: 24500,
        rating: 4.96,
        tags: ['System Design', 'React', 'Node.js'],
      },
      {
        id: 'i2',
        name: 'Alex Rivera',
        role: 'AI Engineer & ML Lead',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&h=250&q=80',
        bio: 'Pioneered custom transformer models for autonomous pipelines. Passionate about making deep learning intuitive.',
        coursesCount: 5,
        studentsCount: 18200,
        rating: 4.92,
        tags: ['Python', 'LLMs', 'PyTorch'],
      },
      {
        id: 'i3',
        name: 'Elena Rostova',
        role: 'Head of Product Design @ Figma Design Partner',
        avatar:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&h=250&q=80',
        bio: 'Spearheaded user experience redesigns for fortune 500 mobile apps. Focused on accessible, beautiful interfaces.',
        coursesCount: 6,
        studentsCount: 14800,
        rating: 4.94,
        tags: ['UI Systems', 'Figma', 'UX Research'],
      },
    ],
  },
  testimonials: {
    badge: 'STUDENT SUCCESS STORIES',
    title: 'Loved By Over 45,000+ Learners',
    subtitle:
      'Discover how our tenant platform helped students switch careers, gain promotions, and build dream products.',
    items: [
      {
        id: 't1',
        name: 'Michael Chen',
        role: 'Software Engineer',
        organization: 'Promoted at Meta',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
        content:
          'The live microservice architecture workshops completely transformed my technical confidence. The interactive code reviews and instructor feedback landed me a Senior role within 3 months!',
        rating: 5,
        courseName: 'Full-Stack Next.js 15 & System Architecture',
      },
      {
        id: 't2',
        name: 'Jessica Taylor',
        role: 'Product Designer',
        organization: 'Joined Stripe UX Team',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
        content:
          'Unlike pre-recorded video courses, the real-time feedback during live classes made learning stick. The portfolio projects I built here directly led to my new position.',
        rating: 5,
        courseName: 'UI/UX Design Systems & Product Strategy',
      },
      {
        id: 't3',
        name: 'David O’Connor',
        role: 'Machine Learning Specialist',
        organization: 'Founder at DataFlow AI',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
        content:
          'The depth of curriculum and quality of peer discussions in cohort channels is unmatched. Best investment I have made in my technical education.',
        rating: 5,
        courseName: 'Generative AI Engineering',
      },
    ],
  },
  cta: {
    badge: 'GET STARTED TODAY',
    title: 'Ready to Accelerate Your Career Path?',
    subtitle:
      'Enroll today and gain instant access to interactive live classes, 100+ high-definition modules, and a global peer community.',
    bullets: [
      '14-day risk-free money-back guarantee',
      'Instant access to all current & future course updates',
      'Official verified completion certificate',
      'Direct access to mentor office hours & Slack community',
    ],
    primaryCta: { label: 'Start 14-Day Free Trial', href: '/register' },
    secondaryCta: { label: 'Explore Enterprise Plans', href: '/enterprise' },
  },
  footer: {
    about:
      'Nexus Academy is a premier multi-tenant educational platform empowering individuals and organizations with industry-grade skills and live interactive learning.',
    columns: [
      {
        title: 'Platform',
        links: [
          { label: 'All Courses', href: '#courses' },
          { label: 'Live Classes Schedule', href: '#live' },
          { label: 'Instructors Directory', href: '#instructors' },
          { label: 'Student Pricing', href: '#pricing' },
          { label: 'Certifications', href: '#certifications' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Learning Blog', href: '/blog' },
          { label: 'Community Forum', href: '/community' },
          { label: 'Student Help Center', href: '/help' },
          { label: 'System Status', href: '/status' },
        ],
      },
      {
        title: 'Company & Legal',
        links: [
          { label: 'About Tenant', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    ],
    socials: [
      { platform: 'Twitter', href: 'https://twitter.com', icon: 'Globe' },
      { platform: 'LinkedIn', href: 'https://linkedin.com', icon: 'Globe' },
      { platform: 'YouTube', href: 'https://youtube.com', icon: 'Video' },
    ],
    copyright: `© ${new Date().getFullYear()} Nexus Academy LMS. All rights reserved.`,
  },
};

/* ==========================================================================
   2. MAIN DYNAMIC LANDING PAGE COMPONENT
   Consumes `landingPageData` dynamically (Light Theme Only)
   ========================================================================== */

export default function TenantLandingPage() {
  const data = landingPageData;
  const { tenant, theme, navbar, hero, statistics, features, courses, liveClasses, instructors, testimonials, cta, footer } = data;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCourseCategory, setActiveCourseCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'classroom' | 'sandbox' | 'analytics'>('classroom');

  // Dynamic CSS variables setup to map dynamic tenant theme colors
  const dynamicStyle = {
    '--primary-brand': theme.primary,
    '--primary-hover': theme.primaryHover,
    '--secondary-brand': theme.secondary,
    '--accent-brand': theme.accent,
  } as React.CSSProperties;

  const filteredCourses =
    activeCourseCategory === 'All'
      ? courses.items
      : courses.items.filter((item) => item.category === activeCourseCategory);

  return (
    <div
      style={dynamicStyle}
      className="min-h-screen bg-[#FAFAF8] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white"
    >
      {/* ----------------------------------------------------------------------
         HEADER & NAVBAR
      ---------------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/90 border-b border-slate-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Tenant Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--primary-brand)] to-[var(--secondary-brand)] flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                {tenant.logo.text}
                <span className="text-[var(--primary-brand)]">{tenant.logo.subtext}</span>
              </span>
              <span className="text-xs text-slate-500 block -mt-1 font-medium">{tenant.tagline.slice(0, 32)}...</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navbar.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-[var(--primary-brand)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={navbar.secondaryCta.href}
              className="text-sm font-semibold text-slate-700 hover:text-[var(--primary-brand)] px-4 py-2 rounded-lg transition-colors"
            >
              {navbar.secondaryCta.label}
            </a>
            <a
              href={navbar.primaryCta.href}
              className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
              style={{ backgroundColor: theme.primary }}
            >
              {navbar.primaryCta.label}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navbar.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-[var(--primary-brand)] py-2 border-b border-slate-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={navbar.secondaryCta.href}
                className="w-full text-center text-sm font-semibold text-slate-700 border border-slate-200 py-2.5 rounded-xl"
              >
                {navbar.secondaryCta.label}
              </a>
              <a
                href={navbar.primaryCta.href}
                className="w-full text-center text-sm font-semibold text-white py-2.5 rounded-xl shadow-md"
                style={{ backgroundColor: theme.primary }}
              >
                {navbar.primaryCta.label}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ----------------------------------------------------------------------
         FRESH NEW CENTERED HERO SECTION (Glass Arc Stage & Floating Micro-Cards)
      ---------------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-36 bg-gradient-to-b from-white via-indigo-50/20 to-[#FAFAF8]">
        {/* Subtle Background Radial Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:2rem_2rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_10%,#000_60%,transparent_100%)] pointer-events-none -z-10" />

        {/* Ambient Floating Glowing Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-indigo-300/25 via-sky-200/30 to-amber-200/20 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">

          {/* 1. CENTERED HERO TYPOGRAPHY HEADER */}
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Top Glass Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-indigo-100/90 shadow-md text-slate-800 text-xs sm:text-sm font-semibold backdrop-blur-md hover:scale-105 transition-transform cursor-pointer">
              <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="tracking-wide text-slate-700">{hero.badgeText}</span>
              <span className="ml-1 text-[11px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
                PRO 2026
              </span>
            </div>

            {/* Giant Centered Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]">
              {hero.titleStart}{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 bg-clip-text text-transparent">
                {hero.titleGradient}
              </span>{' '}
              {hero.titleEnd}
            </h1>

            {/* Subheadline Description */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              {hero.description}
            </p>

            {/* Integrated Hero Course Search Input */}
            <div className="max-w-2xl mx-auto pt-2">
              <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-xl shadow-slate-200/80 border border-slate-200/90 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
                <div className="pl-4 pr-2 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder={hero.searchPlaceholder}
                  className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                />
                <button
                  className="shrink-0 px-6 py-3 bg-[var(--primary-brand)] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Category Quick Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-500 font-semibold">
                <span className="text-slate-400">Popular:</span>
                {hero.quickTags.map((tag) => (
                  <a
                    key={tag}
                    href="#courses"
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 hover:border-indigo-300 hover:text-indigo-600 transition-colors shadow-2xs"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Trust Bullets & Social Proof Strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-600 pt-2">
              {hero.trustBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-slate-100/70 px-3 py-1.5 rounded-full border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

          </div>

          {/* 2. THE STAGE SHOWCASE (Central Interactive App Canvas with Floating Glass Micro-Cards) */}
          <div className="relative max-w-5xl mx-auto pt-6">

            {/* Glowing Backdrop Canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-sky-400/20 to-amber-300/20 rounded-[3rem] blur-3xl opacity-70 transform -rotate-1 scale-105" />

            {/* Main Interactive App Container */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-300/80 overflow-hidden space-y-0 text-left">
              
              {/* App OS Header Bar */}
              <div className="px-6 py-4 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 border-l border-slate-200 pl-3">
                    nexus-os://live-cohort-v2
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab('classroom')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'classroom'
                        ? 'bg-white text-indigo-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Live Room
                  </button>
                  <button
                    onClick={() => setActiveTab('sandbox')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'sandbox'
                        ? 'bg-white text-indigo-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Code Sandbox
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'analytics'
                        ? 'bg-white text-indigo-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Analytics
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{hero.liveClassPreview.badge}</span>
                </div>
              </div>

              {/* Workspace Content Display */}
              {activeTab === 'classroom' && (
                <div className="grid lg:grid-cols-12 gap-0">
                  {/* Video Player Main View */}
                  <div className="lg:col-span-8 relative aspect-[16/10] bg-slate-950 overflow-hidden group">
                    <img
                      src={hero.liveClassPreview.thumbnailUrl}
                      alt={hero.liveClassPreview.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-18 h-18 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-indigo-600 shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                        <Play className="w-8 h-8 fill-indigo-600 ml-1" />
                      </div>
                    </div>

                    {/* Video Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-semibold text-sky-400">Interactive Cohort Stream</p>
                      <h3 className="text-base sm:text-lg font-bold line-clamp-1">
                        {hero.liveClassPreview.title}
                      </h3>
                    </div>
                  </div>

                  {/* Live Chat & Real-Time Poll Panel */}
                  <div className="lg:col-span-4 bg-slate-50 p-5 border-t lg:border-t-0 lg:border-l border-slate-200/80 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                          Live Audience Chat
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {hero.liveClassPreview.viewerCount}
                        </span>
                      </div>

                      {/* Mock Chat Feed */}
                      <div className="space-y-2.5 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-indigo-600">David M.:</span>
                          <span className="text-slate-700 ml-1">Could you clarify the Redis cache layer setup?</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-emerald-600">Mentor Aris:</span>
                          <span className="text-slate-700 ml-1">Great question! We use write-through cache mode here.</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                          <span className="font-bold text-amber-600">Sophia K.:</span>
                          <span className="text-slate-700 ml-1">🔥 This architecture setup is super clean!</span>
                        </div>
                      </div>
                    </div>

                    {/* Real-time Poll Box */}
                    <div className="bg-indigo-600 text-white p-3.5 rounded-2xl space-y-2 shadow-md">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold">LIVE POLL</span>
                        <span className="text-indigo-200">84% Voted</span>
                      </div>
                      <p className="text-xs font-medium">Which microservice gateway do you prefer?</p>
                      <div className="space-y-1 text-[11px]">
                        <div className="w-full bg-indigo-800 rounded-lg p-1.5 flex justify-between font-bold">
                          <span>Envoy / NGINX</span>
                          <span>74%</span>
                        </div>
                        <div className="w-full bg-indigo-700/80 rounded-lg p-1.5 flex justify-between">
                          <span>Kong Gateway</span>
                          <span>26%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sandbox' && (
                <div className="p-6 bg-slate-900 text-slate-200 font-mono text-xs space-y-3 min-h-[320px]">
                  <div className="flex justify-between text-slate-500 border-b border-slate-800 pb-2">
                    <span>// main-architecture.ts</span>
                    <span>TypeScript 5.8</span>
                  </div>
                  <pre className="text-emerald-400">
{`import { MultiTenantService } from '@nexus/lms-core';

export async function initializeTenant(tenantId: string) {
  const tenant = await MultiTenantService.getTenantById(tenantId);
  console.log('⚡ Launching Tenant Classroom:', tenant.name);
  return tenant.configureLiveStream({ HD: true, Latency: '0ms' });
}`}
                  </pre>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="p-6 bg-slate-50 space-y-4 min-h-[320px]">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-900">Cohort Completion Analytics</h4>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-md">+24% vs Last Month</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200">
                      <p className="text-xs text-slate-500 font-medium">Attendance Rate</p>
                      <p className="text-2xl font-black text-slate-900 mt-1">98.4%</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200">
                      <p className="text-xs text-slate-500 font-medium">Assignment Mastery</p>
                      <p className="text-2xl font-black text-slate-900 mt-1">94.2%</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200">
                      <p className="text-xs text-slate-500 font-medium">Verified Credentials</p>
                      <p className="text-2xl font-black text-slate-900 mt-1">12,450</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* ----------------------------------------------------------------
               FLOATING GLASS MICRO-CARDS (3D Stage Layout Surrounding Card)
            ---------------------------------------------------------------- */}

            {/* Card 1: Top Left - Top Rated Mentor */}
            <div className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-slate-200/90 text-left hover:scale-105 transition-transform duration-300">
              <img
                src={hero.liveClassPreview.instructorAvatar}
                alt={hero.liveClassPreview.instructor}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div>
                <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                  {hero.liveClassPreview.instructor}
                  <CheckCircle className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Principal Cloud Architect · ★ 4.98</p>
              </div>
            </div>

            {/* Card 2: Top Right - Live Skill Mastery Gauge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-slate-200/90 text-left hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">
                98%
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Verified Skill Mastery</p>
                <p className="text-[11px] text-emerald-600 font-semibold">LinkedIn Certified Track</p>
              </div>
            </div>

            {/* Card 3: Bottom Left - Career Success Banner */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-slate-900/95 text-white backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl border border-white/20 text-left">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                🚀
              </div>
              <div>
                <p className="text-xs font-bold">🎉 Michael got hired at Meta</p>
                <p className="text-[11px] text-slate-400 font-medium">After System Design Masterclass</p>
              </div>
            </div>

            {/* Card 4: Bottom Right - Live Audience Pulse */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-slate-200/90 text-left">
              <div className="flex -space-x-2">
                {hero.socialProof.avatars.slice(0, 3).map((av, i) => (
                  <img key={i} src={av} alt="Student" className="w-7 h-7 rounded-full object-cover ring-2 ring-white" />
                ))}
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">+1,420 Live</p>
                <p className="text-[11px] text-slate-500 font-medium">Attending Session</p>
              </div>
            </div>

          </div>

          {/* 3. LOGOS TRUST BAR */}
          <div className="pt-10 border-t border-slate-200/80 space-y-4">
            <p className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">
              {hero.trustTagline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
              {hero.trustLogos.map((logo, idx) => (
                <div key={idx} className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-slate-200 group-hover:bg-indigo-600 transition-colors flex items-center justify-center text-white text-xs font-black">
                    {logo.name[0]}
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {logo.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------------
         STATISTICS COUNTER SECTION
      ---------------------------------------------------------------------- */}
      <section className="py-12 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat) => (
              <div
                key={stat.id}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  {stat.icon === 'Users' && <Users className="w-6 h-6" />}
                  {stat.icon === 'TrendingUp' && <TrendingUp className="w-6 h-6" />}
                  {stat.icon === 'Video' && <Video className="w-6 h-6" />}
                  {stat.icon === 'Star' && <Star className="w-6 h-6" />}
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-bold text-slate-700">{stat.label}</p>
                  <p className="text-xs text-slate-500 font-normal">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
         FEATURES & BENEFITS SECTION
      ---------------------------------------------------------------------- */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest text-[var(--primary-brand)] uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
              {features.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {features.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">{features.subtitle}</p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.items.map((feat) => (
              <div
                key={feat.id}
                className="group relative bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-50 to-sky-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {feat.icon === 'Video' && <Video className="w-7 h-7" />}
                      {feat.icon === 'BookOpen' && <BookOpen className="w-7 h-7" />}
                      {feat.icon === 'Zap' && <Zap className="w-7 h-7" />}
                      {feat.icon === 'Users' && <Users className="w-7 h-7" />}
                      {feat.icon === 'Award' && <Award className="w-7 h-7" />}
                      {feat.icon === 'Laptop' && <Laptop className="w-7 h-7" />}
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                      {feat.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[var(--primary-brand)] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">{feat.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-bold text-[var(--primary-brand)] gap-1 group-hover:gap-2 transition-all">
                  <span>Learn how it works</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
         COURSES CATALOG SECTION
      ---------------------------------------------------------------------- */}
      <section id="courses" className="py-20 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header & Category Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold tracking-widest text-[var(--primary-brand)] uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
                {courses.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {courses.title}
              </h2>
              <p className="text-base text-slate-600">{courses.subtitle}</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {courses.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCourseCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeCourseCategory === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {course.badge && (
                        <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm">
                          {course.badge}
                        </span>
                      )}
                      <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium rounded-lg">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>{course.category}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400">({course.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-[var(--primary-brand)] transition-colors">
                      {course.title}
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{course.modulesCount} Modules</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / Instructor & Pricing */}
                <div className="px-5 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-700 line-clamp-1">
                      {course.instructorName}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Button */}
          <div className="text-center pt-4">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 font-bold text-sm text-[var(--primary-brand)] hover:text-indigo-700 bg-indigo-50 px-6 py-3 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors"
            >
              <span>View All 150+ Courses</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
         LIVE CLASSES & SCHEDULE SECTION
      ---------------------------------------------------------------------- */}
      <section id="live" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest text-[var(--primary-brand)] uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
              {liveClasses.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {liveClasses.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">{liveClasses.subtitle}</p>
          </div>

          {/* Live Classes Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {liveClasses.items.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Status pill & Time */}
                  <div className="flex items-center justify-between">
                    {session.status === 'live_now' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        UPCOMING
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-500">
                      {session.scheduledTime}
                    </span>
                  </div>

                  {/* Title & Subject */}
                  <div>
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      {session.subject}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{session.title}</h3>
                  </div>

                  {/* Instructor Info */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <img
                      src={session.instructorAvatar}
                      alt={session.instructorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{session.instructorName}</h4>
                      <p className="text-xs text-slate-500">{session.instructorRole}</p>
                    </div>
                  </div>

                  {/* Seat Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span>Reserved Seats</span>
                      <span>
                        {session.attendees} / {session.maxCapacity}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full"
                        style={{
                          width: `${(session.attendees / session.maxCapacity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {session.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Join CTA */}
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
                    session.status === 'live_now'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                      : 'bg-[var(--primary-brand)] text-white hover:opacity-95'
                  }`}
                >
                  {session.status === 'live_now' ? 'Join Live Room Now' : 'Reserve My Seat'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
         INSTRUCTORS SECTION
      ---------------------------------------------------------------------- */}
      <section id="instructors" className="py-20 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest text-[var(--primary-brand)] uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
              {instructors.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {instructors.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">{instructors.subtitle}</p>
          </div>

          {/* Instructors Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {instructors.items.map((inst) => (
              <div
                key={inst.id}
                className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/80 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4 text-center">
                  <div className="relative inline-block">
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-28 h-28 rounded-full object-cover mx-auto ring-4 ring-white shadow-md"
                    />
                    <div className="absolute bottom-0 right-1 bg-amber-400 text-slate-900 p-1.5 rounded-full shadow-md">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{inst.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600 mt-0.5">{inst.role}</p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{inst.bio}</p>

                  <div className="flex justify-center gap-2 flex-wrap pt-2">
                    {inst.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/60 grid grid-cols-2 gap-4 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <p className="font-bold text-slate-900 text-sm">{inst.studentsCount.toLocaleString()}+</p>
                    <p className="text-slate-500 font-medium">Students</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <p className="font-bold text-slate-900 text-sm">★ {inst.rating}</p>
                    <p className="text-slate-500 font-medium">Rating</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
         TESTIMONIALS SECTION
      ---------------------------------------------------------------------- */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest text-[var(--primary-brand)] uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
              {testimonials.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {testimonials.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">{testimonials.subtitle}</p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-indigo-600 font-semibold">{item.organization}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{item.courseName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
         CONVERTING BANNER CTA SECTION
      ---------------------------------------------------------------------- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-sky-700 text-white p-8 sm:p-12 lg:p-16 shadow-2xl shadow-indigo-600/30">
            {/* Background Accent Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase">
                  {cta.badge}
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  {cta.title}
                </h2>

                <p className="text-indigo-100 text-base sm:text-lg max-w-2xl">{cta.subtitle}</p>

                {/* Bullets List */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {cta.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-medium text-white/95">
                      <Check className="w-5 h-5 text-emerald-300 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Column */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <a
                  href={cta.primaryCta.href}
                  className="w-full text-center bg-white text-indigo-700 font-extrabold text-base py-4 px-8 rounded-xl shadow-xl hover:bg-slate-50 transition-all hover:scale-105"
                >
                  {cta.primaryCta.label}
                </a>

                <a
                  href={cta.secondaryCta.href}
                  className="w-full text-center bg-indigo-800/60 backdrop-blur-md text-white font-bold text-base py-3.5 px-8 rounded-xl border border-white/20 hover:bg-indigo-800/90 transition-all"
                >
                  {cta.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
         FOOTER SECTION
      ---------------------------------------------------------------------- */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* About Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  {tenant.name}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-400 max-w-sm">{footer.about}</p>

              <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>{tenant.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span>{tenant.contactPhone}</span>
                </div>
              </div>
            </div>

            {/* Link Columns */}
            {footer.columns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>{footer.copyright}</p>
            <div className="flex items-center gap-6">
              {footer.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition-colors"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
