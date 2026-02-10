import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { FooterLinkColumn } from "@/components/ui/FooterLinkColumn";
import { getIcon } from "@/lib/icons";
import { getSiteContent } from "@/lib/siteContent";
import { getServerLocale } from "@/lib/locale.server";

export async function Footer() {
  const locale = await getServerLocale();
  const content = getSiteContent(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <p className="text-gray-400 text-sm mb-6">
              {content.siteConfig.description}
            </p>
            <div className="flex gap-4">
              {content.socialLinks.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          <FooterLinkColumn title={content.copy.footer.productTitle} links={content.footerLinks.product} />
          <FooterLinkColumn title={content.copy.footer.companyTitle} links={content.footerLinks.company} />
          <FooterLinkColumn title={content.copy.footer.resourcesTitle} links={content.footerLinks.resources} />
          <FooterLinkColumn title={content.copy.footer.legalTitle} links={content.footerLinks.legal} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} {content.siteConfig.name}. {content.copy.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
