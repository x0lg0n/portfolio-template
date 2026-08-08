import FooterViews from "@/components/footer-views";
import LatestCommit from "@/components/latest-commit";
import TimeOnSite from "@/components/time-on-site";
import { DATA } from "@/data/resume";

const year = new Date().getFullYear();

const socials = [
  DATA.contact.social.GitHub,
  DATA.contact.social.LinkedIn,
  DATA.contact.social.X,
  DATA.contact.social.Youtube,
];

export default function Footer() {
  return (
    <div className="relative mx-auto mb-6 mt-12">
      <div className="absolute -top-6 right-4 z-10 rounded-t-lg border-x border-t border-dashed border-border bg-background px-4 py-1.5 shadow-sm md:right-8">
        <div className="flex items-center gap-x-1 text-xs whitespace-nowrap">
          <span className="text-muted-foreground">Webrings:</span>
          <a
            href="https://ctp-webr.ing/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            title="CTP Webring"
          >
            <span className="text-[#f5e0dc]">c</span>
            <span className="text-[#a6e3a1]">p</span>
            <span className="text-[#89b4fa]">t</span>
          </a>
          <span className="leading-none opacity-75">
            <span className="opacity-40">{"{"}</span>
            <a
              href="https://ctp-webr.ing/json/previous"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link px-0.5 align-top transition-opacity hover:opacity-70"
              title="Previous site in webring"
            >
              {"<"}
            </a>
            <span className="text-link opacity-40">|</span>
            <a
              href="https://ctp-webr.ing/json/next"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link px-0.5 align-top transition-opacity hover:opacity-70"
              title="Next site in webring"
            >
              {">"}
            </a>
            <span className="opacity-40">{"}"}</span>
          </span>
        </div>
      </div>

      <footer className="flex h-auto flex-col items-center justify-center gap-y-3 rounded-xl border border-dashed border-border p-5 text-sm md:flex-row md:justify-between md:gap-y-0">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start">
          <span className="text-muted-foreground whitespace-nowrap">
            © {year} {DATA.name}
          </span>

          <span className="text-border hidden md:inline">-</span>

          <div className="flex items-center gap-1.5 whitespace-nowrap" title="Service status">
            <span className="relative flex h-3 w-3">
              <span className="bg-[var(--link)] absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"></span>
              <span className="bg-[var(--link)] relative inline-flex h-3 w-3 rounded-full"></span>
            </span>
            <span className="text-foreground text-sm font-medium">All Services Nominal</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-end">
          <TimeOnSite />

          <span className="text-border hidden sm:inline">-</span>

          <FooterViews />

          <span className="text-border hidden sm:inline">-</span>

          <LatestCommit />

          <span className="text-border hidden sm:inline">-</span>

          <div className="flex items-center gap-x-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground transition-colors hover:text-link"
                >
                  <Icon className="size-[18px]" />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
