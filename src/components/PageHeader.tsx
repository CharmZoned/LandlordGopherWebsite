type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
};

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-white via-brand-50 to-brand-100/70 py-14 sm:py-20">
      <div className="container-page max-w-3xl">
        {eyebrow && (
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-700">
            {eyebrow}
            <span aria-hidden="true" className="h-0.5 w-12 bg-gold-500" />
          </p>
        )}
        <h1 className="mt-3 font-serif text-4xl leading-tight font-bold tracking-tight text-navy-900 sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 text-xl leading-relaxed text-ink-700">{intro}</p>}
      </div>
    </section>
  );
}
