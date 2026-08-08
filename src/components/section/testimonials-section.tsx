import { DATA } from "@/data/resume"

export default function TestimonialsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {DATA.testimonials.map((testimonial) => (
        <figure
          key={testimonial.name}
          className="flex flex-col gap-3 border border-border rounded-xl p-5"
        >
          <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
            {testimonial.content}
          </blockquote>
          <figcaption className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">
              {testimonial.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {testimonial.role}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
