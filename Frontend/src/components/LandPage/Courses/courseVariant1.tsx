
import { Play, Star, Users } from "lucide-react";
import { CardContent, CardFooter, CardHeader,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CardProps } from "./types";

export function CardVariant1({ course, isPurchased }: CardProps) {
  return (
    <div
      key={course.id}
      className="overflow-hidden w-full border border-slate-200 rounded-xl hover:shadow-md transition-shadow group flex flex-col gap-1 h-full p-0"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden shrink-0 bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3">
          {!isPurchased && (
            <Badge className="bg-white/90 text-slate-800 hover:bg-white border-none backdrop-blur-sm shadow-sm">
              {course.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Title */}
      <CardHeader className="px-5 py-0">
        <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
          {course.title}
        </h3>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-5 py-0 space-y-0 flex-grow">
        <p className="text-sm text-slate-600 line-clamp-2 min-h-[40px]">
          {course.description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-2 border-t border-slate-50">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-nowrap">
              <Users className="w-3.5 h-3.5" />
              {course.students || "2.4k+"}
            </div>

            <div className="flex items-center gap-1 text-nowrap">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
              {course.rating || "4.9"}
            </div>
          </div>

          {/* Price - only for courses not purchased */}
          {!isPurchased && (
            <div className="flex items-center gap-1.5">
              {course.oldPrice && (
                <span className="line-through text-slate-400">
                  ₹{course.oldPrice}
                </span>
              )}

              <span className="font-bold text-lg text-slate-800">
                ₹{course.price}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Action */}
      <CardFooter className="px-5 py-5">
        {isPurchased ? (
          <Link
            href={`/courses/${course.id}/learn`}
            className="w-full"
          >
            <Button className="w-full gap-2 bg-green-600 text-white hover:bg-green-700 font-bold transition-colors">
              <Play className="w-4 h-4 fill-current" />
              Continue
            </Button>
          </Link>
        ) : (
          <Link
            href={`/courses/${course.id}`}
            className="w-full"
          >
            <Button className="w-full gap-2 bg-[#0039a6] text-white hover:bg-[#002d84] font-bold transition-colors">
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </div>
  );
}