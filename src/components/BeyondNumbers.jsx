import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Photo from "./Photo";
import { latestEdition } from "../data/editions";
import Section from "./Section";
import Lockup, { Meta } from "./Lockup";

export default function BeyondNumbers() {
  return (
    <Section id="about-recaps">
      {/* Ink, not another mint panel. The featured edition card above is a
          tinted box with the photo on the left and the words on the right, and
          this was the same shape in the same colour a screen later — two
          different things reading as one component. Dark makes the sign-off a
          sign-off, and the photo moves to the right so the two don't rhyme
          even in silhouette. */}
      <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-ink p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-12">
        <div className="order-2 overflow-hidden rounded-3xl">
          <div className="aspect-[4/3] lg:aspect-[4/5]">
            <Photo item={{ tone: "cream", icon: "HeartHandshake", label: "[Members, mid-drive]" }} />
          </div>
        </div>

        <div className="order-1">
          <Meta className="block text-green-bright">About the recaps</Meta>
          <Lockup
            caps="COME AND DO SOMETHING"
            accent="real"
            accentClassName="text-green-bright"
            spotlight
            className="mt-3 text-4xl text-cream-soft sm:text-5xl"
          />
          <p className="mt-5 max-w-md text-pretty text-lg text-cream-soft/85">
            Free forever. No donations, no fees. Pick a team, show up, and get to work.
          </p>
          <p className="mt-4 max-w-md text-pretty text-cream-soft/70">
            AquaTerra is student-led and self-funded — 1,300+ members across eight
            teams. this magazine is where the month gets written down
            (the drives, the events, the student businesses, the frames somebody
            actually shot) by the members who were there.
          </p>
          <Link
            to={`/${latestEdition.year}/${latestEdition.slug}`}
            className="u-press u-press--light mt-8 inline-flex items-center gap-2 rounded-full bg-cream-soft px-6 py-3 text-sm font-semibold text-ink"
          >
            Read edition {String(latestEdition.editionNumber).padStart(2, "0")}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </Section>
  );
}
