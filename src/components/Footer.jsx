import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import facebook from "../assets/images/footer/facebook.svg";
import twitter from "../assets/images/footer/twitter.svg";
import linkedIn from "../assets/images/footer/linkedin.svg";

const c = {
  footer:
    "flex flex-col items-center justify-center bg-[#37496d] py-5 md:py-6 lg:py-8 dark:bg-slate-950",
  /** Same horizontal width and padding as SiteHeader / MainLayout main. */
  innerShell: "mx-auto w-full max-w-[1800px] px-5 lg:px-10 xl:px-15 2xl:px-20",
  mainRow:
    "flex w-full flex-col items-center gap-5 py-4 text-white md:flex-row md:items-start md:justify-between md:gap-6 md:py-5 lg:gap-8 lg:py-6 xl:gap-10",
  col: "flex flex-col items-center gap-3 md:items-start md:gap-4",
  title:
    "text-center text-xs leading-snug font-semibold md:text-left md:text-sm",
  contactStack:
    "mt-1.5 flex flex-col items-center gap-3 text-center md:mt-2 md:items-start md:gap-4 md:text-left",
  body: "text-[10px] leading-relaxed md:text-[11px] lg:text-xs",
  bodyPhones:
    "text-[10px] leading-relaxed whitespace-nowrap md:text-[11px] lg:text-xs",
  socialBlock: "mt-3 text-center md:mt-2 md:text-left",
  socialLabel: "hidden text-[11px] md:block md:text-xs lg:text-sm",
  socialRow:
    "flex items-center justify-center gap-3 pt-4 md:justify-start md:gap-4 md:pt-5 lg:gap-6 lg:pt-6",
  socialImg: "cursor-pointer transition-transform duration-300 hover:scale-130",
  menuList:
    "mt-1.5 flex list-none flex-col items-center gap-2.5 text-center md:mt-2 md:items-start md:gap-3 md:text-left",
  navLi:
    "text-[10px] transition-transform duration-300 hover:scale-110 md:text-[11px] lg:text-xs",
  termsLink: "text-white transition-transform duration-300 hover:scale-110",
  divider: "my-5 w-full border-b border-white md:my-6 xl:my-8",
  bottom:
    "flex w-full flex-col items-center gap-1.5 text-center text-white",
  finePrint: "text-[10px] md:text-[11px] lg:text-xs",
};

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/geostat.ge",
    src: facebook,
    alt: "facebook",
  },
  { href: "https://www.x.com/Geostat100", src: twitter, alt: "twitter" },
  {
    href: "https://ge.linkedin.com/company/national-statistics-office-of-georgia",
    src: linkedIn,
    alt: "linkedIn",
  },
];

const FOOTER_NAV = [
  { path: "#main-statistics", i18nKey: "mainStatistics" },
  { path: "#legislation", i18nKey: "legislation" },
  { path: "#links", i18nKey: "footerUsefulLinks" },
  { path: "/glossary", i18nKey: "glossary" },
  { path: "/infographic", i18nKey: "infographic" },
];

export default function Footer() {
  const { language = "ka" } = useParams();
  const { t } = useTranslation();
  const georgianTextStyle =
    language === "ka" ? { fontFamily: "myFont, var(--app-font)" } : undefined;

  return (
    <footer className={c.footer}>
      <div className={c.innerShell}>
        <div className={c.mainRow}>
          <div className={c.col}>
            <p className={c.title}>{t("footerContactTitle")}</p>
            <div className={c.contactStack} style={georgianTextStyle}>
              <p className={c.body}>{t("footerOrganization")}</p>
              <p className={c.bodyPhones}>{t("footerPhones")}</p>
              <p className={c.body}>{t("footerEmail")}</p>
              <p className={c.body}>{t("footerAddress")}</p>
            </div>
            <div className={c.socialBlock}>
              <p className={c.socialLabel}>{t("footerSocialNetworks")}</p>
              <div className={c.socialRow}>
                {SOCIAL_LINKS.map(({ href, src, alt }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer">
                    <img src={src} alt={alt} className={c.socialImg} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={c.col}>
            <p className={c.title}>{t("footerMenu")}</p>
            <ul className={c.menuList} style={georgianTextStyle}>
              {FOOTER_NAV.map(({ path, i18nKey }) => (
                <li key={path} className={c.navLi}>
                  <Link to={`/${language}${path}`}>{t(i18nKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={c.col}>
            <p className={c.title}>
              <a
                href="https://www.geostat.ge/ka/page/monacemta-gamoyenebis-pirobebi"
                target="_blank"
                rel="noreferrer"
                className={c.termsLink}
              >
                {t("footerTerms")}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className={c.divider} />
      <div className={c.innerShell}>
        <div className={c.bottom}>
          <p className={c.finePrint} style={georgianTextStyle}>
            {t("footerRights")}
          </p>
          <p className={c.finePrint}>{t("footerSupport")}</p>
        </div>
      </div>
    </footer>
  );
}
