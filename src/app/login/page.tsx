import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Login",
  description: "The Landlord Gopher owner and tenant portal is coming soon.",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portal"
        title="Owner & tenant portal coming soon"
        intro="Sign-in for owners and tenants isn’t available yet. Contact us and we’ll help with your account in the meantime."
      />
      <div className="container-page py-12">
        <ButtonLink href={routes.contact} arrow>
          Contact Us
        </ButtonLink>
      </div>
    </>
  );
}
