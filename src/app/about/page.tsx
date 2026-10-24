import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import {
  AwardsSection,
  CommitmentsSection,
  ExperienceStrip,
  InvestSection,
  PhilosophySection,
  StorySection,
} from "@/components/about/AboutSections";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Landlord Gopher is property management with a personal touch: built by investors managing residential property in Baltimore and the DMV since 2001, with flat-rate pricing instead of a 10% fee.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ExperienceStrip />
      <StorySection />
      <PhilosophySection />
      <CommitmentsSection />
      <AwardsSection />
      <InvestSection />
      <CtaBand title="Your property. Our priority." text="Let’s talk about your property and how we can help." />
    </>
  );
}
