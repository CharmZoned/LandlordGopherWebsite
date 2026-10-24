import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { routes } from "@/content/site";

export default function ListingNotFound() {
  return (
    <>
      <PageHeader
        eyebrow="Current listings"
        title="Listing not found"
        intro="This home isn’t listed anymore, or the link may be incorrect."
      />
      <div className="container-page py-12">
        <ButtonLink href={routes.listings} arrow>
          Browse Current Listings
        </ButtonLink>
      </div>
    </>
  );
}
