import { Hero } from "@/components/Hero";
import { InquirySection } from "@/components/InquirySection";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <InquirySection />
    </>
  );
}
