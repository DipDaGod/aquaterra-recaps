import { ArrowUpRight, MapPin, Users } from "lucide-react";
import Photo from "./Photo";

export default function ProjectCard({ project, wide = false }) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border border-line bg-cream-soft transition-shadow hover:shadow-lg ${
        wide ? "sm:flex-row" : ""
      }`}
    >
      <div className={`overflow-hidden ${wide ? "sm:w-1/2" : "aspect-[4/3]"}`}>
        <div className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${wide ? "min-h-[220px]" : ""}`}>
          <Photo item={project.image} />
        </div>
      </div>
      <div className={`flex flex-1 flex-col gap-3 p-6 ${wide ? "sm:w-1/2" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-pastel-green px-3 py-1 text-xs font-medium text-green-deep">
            {project.category}
          </span>
          <span className="text-xs text-ink-soft">{project.date}</span>
        </div>
        <h3 className="text-xl font-semibold leading-snug tracking-tight">{project.title}</h3>
        <p className="text-sm text-ink-soft">{project.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />{project.location}</span>
          <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" strokeWidth={1.75} />{project.people}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-soft transition-colors group-hover:text-green" strokeWidth={1.75} />
        </div>
      </div>
    </article>
  );
}
