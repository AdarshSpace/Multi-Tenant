import { CardProps } from "./types";
import {CardVariant1} from "./courseVariant1";






export default function Courses({ content }: { content: any[] }) {
    return(
       <section className="relative mx-auto w-full max-w-7xl py-12 sm:px-8 lg:px-10">
         <div className="mb-8">
           <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
             Explore Courses
           </h2>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {[...content]
            .sort((a, b) => Number(b.paid) - Number(a.paid))
            .map((course) => (
              <CardVariant1 key={course.id} course={course} isPurchased={course.paid} />
            ))}
         </div>
       </section>
    ) 
  }