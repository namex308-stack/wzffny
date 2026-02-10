interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
        {title}
      </h2>
      <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
    </div>
  );
}
