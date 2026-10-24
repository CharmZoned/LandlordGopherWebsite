import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { routes } from "@/content/site";

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" intro="The page you’re looking for has moved or no longer exists." />
      <div className="container-page py-12">
        <ButtonLink href={routes.home} arrow>
          Back to home
        </ButtonLink>
      </div>
    </>
  );
}
