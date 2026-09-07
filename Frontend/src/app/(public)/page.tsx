export const dynamic = "force-dynamic";
import LandingPage from "@/components/LandingPage/LandingPage";
import { isAuthenticated } from "@/lib/server-auth";
import Hero from "@/components/LandPage/Hero/Hero";
import { HeroData, heroProps } from "@/components/LandPage/Hero/types";
import { getAllCourses } from "@/serverAction/allCourses";
import Courses from "@/components/LandPage/Courses/courses";
import {LiveClassCard} from "@/components/LandPage/Live-class/liveClass-variant2"
import LiveClasses from "@/components/LandPage/Live-class/liveClass-variant3"
import {Doubt} from "@/components/LandPage/Ask-doubt/doubt"
import {Footer} from "@/components/LandPage/Footer/footer"

export interface TenantTheme {
    primaryColor: string;
  }

const theme: TenantTheme = {
  primaryColor: "#00008B",
};

export default async function Page() {
   const authenticated = await isAuthenticated();

  //const data = await getAllCourses();

  const content =  [
    {
      id: 'cmsmi9c7o00018gurufks5bt0',
      title: 'Blender',
      description: 'simple blender course, simple courses does not look like simple, being simple is very difficult',
      thumbnail: 'https://ik.imagekit.io/s8amuuyxt/Blender_3BSS26BQt.webp',
      price: 3499,
      oldPrice: 4991,
      rating: null,
      students: null,
      lessons: null,
      category: 'Animation',
      teacher: { name: 'Adarsh ' },
      purchases: [],
      paid: false
    },
    {
        id: 'avcphtoshopimagei9c8guru5bttsx',
        title: 'Photoshop',
        description: 'simple blender course, simple courses does not look like simple, being simple is very difficult',
        thumbnail: 'https://ik.imagekit.io/s8amuuyxt/course_photoshop_vJZ00Yklv.jpg?updatedAt=1779967643225',
        price: 3499,
        oldPrice: 4991,
        rating: null,
        students: null,
        lessons: null,
        category: 'Design',
        teacher: { name: 'Adarsh ' },
        purchases: [],
        paid: true
      },
  ]

  const hero: heroProps = {
    type: "hero",
  
    variant: "hero-1",
  
    data: {
      badge: "Your Partner in Learning & Growth",
  
      title: "Learn From Industry Experts",
  
      highlightedText: "Industry Experts",
  
      description:
        "Build real-world skills through structured courses, live classes, and hands-on learning.",
  
      primaryButtonText: "Explore Courses",
      primaryButtonLink: "/courses",
  
      secondaryButtonText: "Join Now",
      secondaryButtonLink: "/register",
  
      imageUrl:
        "https://ik.imagekit.io/s8amuuyxt/Blender_3BSS26BQt.webp?updatedAt=1786322440200",
  
      imageAlt: "Students learning together",
  
      features: [
        {
          icon: "instructor",
          title: "Expert Instructors",
          description: "Learn from the best",
        },
        {
          icon: "live-class",
          title: "Live Interactive Classes",
          description: "Learn. Ask. Grow.",
        },
        {
          icon: "certificate",
          title: "Certification",
          description: "Boost your career",
        },
      ],
  
      floatingCards: [
        {
          type: "live-class",
          title: "Live Classes",
          description: "Join interactive sessions",
        },
        {
          type: "video-lessons",
          title: "Video Lessons",
          value: "20K+",
        },
        {
          type: "certificate",
          title: "Certified",
          description: "Complete & get certified",
        },
        {
          type: "rating",
          value: "4.8/5",
          description: "Loved by 20,000+ students",
        },
      ],
  
      stats: [
        {
          value: "25K+",
          label: "Happy Students",
          icon: "students",
        },
        {
          value: "350+",
          label: "Expert Instructors",
          icon: "instructors",
        },
        {
          value: "1200+",
          label: "Courses",
          icon: "courses",
        },
        {
          value: "98%",
          label: "Success Rate",
          icon: "success",
        },
      ],
    },
  };

  const liveClasses = {
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
  }



    return <LandingPage authenticated={authenticated} />;
  

  
  // return (
  // <>
  // <div style={
  //       {
  //         "--tenant-primary": theme.primaryColor,
  //       } as React.CSSProperties
  //     }>
  // <Hero section={hero}  />
  // <Courses content={content} />
  //  <LiveClassCard liveClasses={liveClasses} /> 
  //  <LiveClasses/>
  //  <Doubt />
  //  <Footer/>
  //  {/* <LiveInteractiveClasses data={liveClassesData}/> */}
  

  // </div>
  // </>
  // );
}
