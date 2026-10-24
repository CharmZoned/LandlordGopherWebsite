import { Eyebrow } from "./Eyebrow";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
};

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-white via-brand-50 to-brand-100/70 py-14 sm:py-20">
      <div className="container-page max-w-3xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-3 font-serif text-[2rem] leading-tight font-bold tracking-tight text-navy-900 sm:text-[2.5rem]">
          {title}
        </h1>
        {intro && <p className="mt-5 text-lg leading-relaxed text-ink-700">{intro}</p>}
      </div>
    </section>
  );
}
