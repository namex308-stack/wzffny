import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { getServerLocale } from "@/lib/locale.server";
import { getMarketingPage } from "@/lib/marketingPages";
import { defaultOpenGraphImage, defaultTwitterImage } from "@/lib/seo";

type MarketingPageShellProps = {
  slug: string;
};

export async function getMarketingMetadata(slug: string): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = getMarketingPage(slug, locale);
  if (!page) {
    return { title: "Page not found" };
  }
  const title = `${page.title} | wzzfny`;
  return {
    title,
    description: page.subtitle,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title,
      description: page.subtitle,
      type: "website",
      url: `/${slug}`,
      images: [
        {
          url: defaultOpenGraphImage,
          width: 1200,
          height: 630,
          alt: "wzzfny",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.subtitle,
      images: [defaultTwitterImage],
    },
  };
}

export async function MarketingPageShell({ slug }: MarketingPageShellProps) {
  const locale = await getServerLocale();
  const page = getMarketingPage(slug, locale);

  if (!page) {
    notFound();
  }

  const isArabic = locale === "ar";
  const isPolicyPage = ["privacy-policy", "terms-of-service", "cookie-policy"].includes(
    slug,
  );
  const formCopy = isArabic
    ? {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        topic: "الموضوع",
        message: "الرسالة",
        submit: "إرسال الرسالة",
        support: "الدعم",
        partnerships: "الشراكات",
        press: "الإعلام",
      }
    : {
        name: "Full name",
        email: "Email address",
        topic: "Topic",
        message: "Message",
        submit: "Send message",
        support: "Support",
        partnerships: "Partnerships",
        press: "Press",
      };

  return (
    <>
      <Header />
      <main className="pt-24 pb-24 bg-white">
        <section className="pt-12 pb-12 bg-gradient-to-b from-slate-50 via-white to-white">
          <Container>
            <div className="max-w-3xl">
              {page.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {page.eyebrow}
                </p>
              ) : null}
              <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
                {page.title}
              </h1>
              <p className="mt-4 text-lg text-slate-600">{page.subtitle}</p>
              {page.lastUpdated ? (
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-400">
                  {isArabic ? "آخر تحديث" : "Last updated"}: {page.lastUpdated}
                </p>
              ) : null}
              {page.cta ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={page.cta.primary.href}
                    className="rounded-full bg-[color:var(--brand-600)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-700)]"
                  >
                    {page.cta.primary.label}
                  </Link>
                  {page.cta.secondary ? (
                    <Link
                      href={page.cta.secondary.href}
                      className="rounded-full border border-[color:var(--brand-200)] px-5 py-2 text-sm font-semibold text-[color:var(--brand-700)] shadow-sm transition hover:border-[color:var(--brand-600)]"
                    >
                      {page.cta.secondary.label}
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Container>
        </section>

        {page.highlights?.length ? (
          <section className="py-14 bg-white">
            <Container>
              <div className="grid gap-6 md:grid-cols-3">
                {page.highlights.map((item) => (
                  <Card key={item.title} className="border-gray-100">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        {page.sections?.length ? (
          <section className="py-14 bg-slate-50">
            <Container>
              {isPolicyPage ? (
                <div className="mx-auto max-w-3xl space-y-6">
                  {page.sections.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                    >
                      <h2 className="text-lg font-semibold text-slate-900">
                        {section.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600">
                        {section.body}
                      </p>
                      {section.bullets?.length ? (
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2">
                              <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--brand-600)]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                  {page.sections.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                    >
                      <h2 className="text-lg font-semibold text-slate-900">
                        {section.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600">
                        {section.body}
                      </p>
                      {section.bullets?.length ? (
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2">
                              <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--brand-600)]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </Container>
          </section>
        ) : null}

        {page.links?.length ? (
          <section className="py-14 bg-white">
            <Container>
              <div className="grid gap-6 md:grid-cols-2">
                {page.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--brand-200)] hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">
                      {link.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        {page.contactForm ? (
          <section className="py-14 bg-slate-50">
            <Container>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)]">
                <form className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        {formCopy.name}
                      </label>
                      <input
                        type="text"
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-[color:var(--brand-600)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-100)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        {formCopy.email}
                      </label>
                      <input
                        type="email"
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-[color:var(--brand-600)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-100)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        {formCopy.topic}
                      </label>
                      <select
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-[color:var(--brand-600)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-100)]"
                      >
                        <option value="support">{formCopy.support}</option>
                        <option value="partnerships">{formCopy.partnerships}</option>
                        <option value="press">{formCopy.press}</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        {formCopy.message}
                      </label>
                      <textarea
                        rows={5}
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-[color:var(--brand-600)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-100)]"
                      />
                    </div>
                    <button
                      type="button"
                      className="rounded-lg bg-[color:var(--brand-600)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-700)]"
                    >
                      {formCopy.submit}
                    </button>
                  </div>
                </form>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {isArabic ? "بيانات التواصل" : "Contact details"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {isArabic
                      ? "راسلنا على support@wzzfny.ai أو استخدم النموذج وسيتم الرد خلال يومي عمل."
                      : "Email support@wzzfny.ai or use the form and we’ll reply within two business days."}
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                      support@wzzfny.ai
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                      partnerships@wzzfny.ai
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                      press@wzzfny.ai
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

