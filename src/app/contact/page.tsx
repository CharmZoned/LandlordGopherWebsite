import type { Metadata } from "next";
import { InquirySection } from "@/components/InquirySection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Tell Landlord Gopher about your property or portfolio and get help renting and managing it.",
};

export default function ContactPage() {
  return <InquirySection headingLevel="h1" />;
}
