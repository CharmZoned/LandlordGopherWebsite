import { serviceGroups } from "@/content/site";
import { ServiceIcon } from "./ServiceIcon";

type ServicesProps = {
  id?: string;
};

export function Services({ id = "services" }: ServicesProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <h2
          id={`${id}-title`}
          className="title-rule text-center font-serif text-3xl font-bold tracking-tight text-navy-900 sm:text-[2.6rem]"
        >
          Support at every step of renting.
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {serviceGroups.map((group) => (
            <li
              key={group.title}
              className="md:border-l md:border-line md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0 lg:px-10"
            >
              <article>
                <ServiceIcon name={group.icon} />
                <h3 className="mt-5 font-serif text-2xl font-bold text-navy-900">{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[1.05rem] leading-relaxed text-ink-700">
                      <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full bg-gold-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
