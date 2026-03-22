import { Link } from "react-router-dom";
import type { Course } from "../data/courses";

interface Props {
  course: Course;
  index: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-glow font-semibold text-sm">
      {rating.toFixed(1)} ★
    </span>
  );
}

export default function CourseCard({ course, index }: Props) {
  const isClickable = index === 0;

  const cardContent = (
    <div
      className="course-card h-full"
      data-testid={`course-card-${course.id}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-44 object-cover transition-transform duration-300 ease-in-out"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="course-card-overlay" />
        <span className="badge-amber absolute top-3 left-3">Bestseller</span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-slate-primary text-sm leading-snug line-clamp-2">
          {course.title}
        </h3>
        <p className="text-slate-muted text-xs">{course.instructor}</p>

        <div className="flex items-center gap-1.5">
          <StarRating rating={course.rating} />
          <span className="text-slate-secondary text-xs">
            ({course.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-muted">
          <span>{course.duration}</span>
          <span className="text-slate-muted/50">·</span>
          <span>{course.level}</span>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-slate-primary font-bold text-lg">
            ${course.price}
          </span>
          <span className="text-slate-muted line-through text-sm">
            ${course.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );

  if (isClickable) {
    return (
      <Link
        to={`/course/${course.id}`}
        className="block"
        data-testid={`course-link-${course.id}`}
      >
        {cardContent}
      </Link>
    );
  }

  return <div className="cursor-default">{cardContent}</div>;
}
