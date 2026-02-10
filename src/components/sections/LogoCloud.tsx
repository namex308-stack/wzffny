import { Container } from "@/components/ui/Container";
import { getSiteContent } from "@/lib/siteContent";
import { getServerLocale } from "@/lib/locale.server";

export async function LogoCloud() {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <Container>
        <p className="text-center text-sm font-medium text-gray-500 mb-8">
          {content.copy.logoCloudTitle}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {content.logoCloud.map((company) => (
            <div
              key={company}
              className="flex items-center justify-center h-12 px-6 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
            >
              {/* Logo placeholder - replace with actual logos */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 font-bold text-xs">
                    {company.charAt(0)}
                  </span>
                </div>
                <span className="text-gray-700 font-semibold text-sm hidden sm:block">
                  {company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
