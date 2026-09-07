import {  Calendar,  } from "lucide-react";

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

const defaultLiveClasses = liveClasses;

type LiveClassCardProps = {
  liveClasses?: typeof defaultLiveClasses;
};

export function LiveClassCard({ liveClasses = defaultLiveClasses }: LiveClassCardProps) {
    return (
        <section id="live" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <span> Reserved Seats </span>
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
                      : 'bg-[var(--tenant-primary)] text-white hover:opacity-95'
                  }`}
                >
                  {session.status === 'live_now' ? 'Join Live Class Now' : 'Reserve My Seat'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}