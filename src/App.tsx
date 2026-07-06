import { type ReactNode, useSyncExternalStore } from "react";
import { PreferencesDemo } from "./demos/preferences/Demo";
import { ServiceFormDemo } from "./demos/service-form/Demo";

type RouteKey = "home" | "service-form" | "preferences";

interface NavItem {
  key: RouteKey;
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { key: "home", href: "#/", label: "Overview" },
  { key: "service-form", href: "#/service-form", label: "Unified Form" },
  { key: "preferences", href: "#/preferences", label: "Preferences" }
];

const storyBlocks = [
  {
    title: "Situation",
    body:
      "Users of a Bus Control product needed to record service disruptions. While exploring how to make the capability more customizable, I found friction in the existing workflow that added up to 30+ hours of lost time each month across the user base."
  },
  {
    title: "Task",
    body:
      "I determined what needed to change to remove that friction and turn a messy set of interactions into a clearer workflow."
  },
  {
    title: "Action",
    body:
      "I used ChatGPT to capture requirements and Figma Make to generate pure frontend prototypes. One covers the user side across the three disruption entry points; the other covers the admin side for disruption types, causes, and valid type-cause links. I used both to align design and engineering."
  }
];

const prototypeCards = [
  {
    title: "Unified Service Disruption Form",
    href: "#/service-form",
    eyebrow: "Controller workflow",
    description:
      "A single interaction model spanning single-trip, multi-trip, and trip-card entry points so the team could compare behavior rather than argue from abstract requirements."
  },
  {
    title: "Disruption Preferences",
    href: "#/preferences",
    eyebrow: "Admin tooling",
    description:
      "A companion preferences flow for disruption types, causes, and valid pairings that keeps configuration explicit and implementation-friendly."
  }
];

const sourceLinks = [
  {
    label: "Prototype source: disruption-preferences",
    href: "https://github.com/jamesfconway/disruption-preferences"
  },
  {
    label: "Prototype source: unified-service-disruption-form",
    href: "https://github.com/jamesfconway/unified-service-disruption-form"
  },
  {
    label: "Showcase repo: disruptions-example",
    href: "https://github.com/jamesfconway/disruptions-example"
  }
];

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function normalizeHash(hash: string): RouteKey {
  switch (hash) {
    case "#/service-form":
      return "service-form";
    case "#/preferences":
      return "preferences";
    default:
      return "home";
  }
}

function getRouteSnapshot() {
  return normalizeHash(window.location.hash);
}

function useHashRoute() {
  return useSyncExternalStore(subscribe, getRouteSnapshot, () => "home");
}

function App() {
  const route = useHashRoute();

  return (
    <div className="showcase-app">
      <SiteHeader route={route} />
      {route === "home" ? <HomePage /> : null}
      {route === "service-form" ? (
        <PrototypePage
          eyebrow="Bus Control workflow prototype"
          title="Unified Service Disruption Form"
          summary="A white-label prototype for testing a single disruption flow across trip-page and trip-card contexts."
        >
          <ServiceFormDemo />
        </PrototypePage>
      ) : null}
      {route === "preferences" ? (
        <PrototypePage
          eyebrow="Bus Control admin prototype"
          title="Disruption Preferences"
          summary="A companion configuration flow for causes, disruption types, and explicit rule pairings."
        >
          <PreferencesDemo />
        </PrototypePage>
      ) : null}
    </div>
  );
}

function SiteHeader({ route }: { route: RouteKey }) {
  return (
    <header className="showcase-header">
      <div className="showcase-header__inner">
        <a className="showcase-brand" href="#/">
          <span className="showcase-brand__kicker">James Conway</span>
          <span className="showcase-brand__title">Disruptions Example</span>
        </a>
        <nav className="showcase-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={
                item.key === route
                  ? "showcase-nav__link showcase-nav__link--active"
                  : "showcase-nav__link"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <main>
      <section className="showcase-hero">
        <div className="showcase-hero__backdrop" />
        <div className="showcase-shell showcase-hero__grid">
          <div className="showcase-hero__copy">
            <p className="showcase-eyebrow">Bus Control disruption workflow prototype</p>
            <h1 className="showcase-title">From workflow friction to two prototypes that aligned design and engineering</h1>
            <p className="showcase-lede">
              A small product case study about quantifying friction, deciding what needed to
              change, and using AI-assisted frontend prototypes to make the solution concrete.
            </p>
            <div className="showcase-hero__actions">
              <a className="showcase-button" href="#/service-form">
                View user-side prototype
              </a>
              <a className="showcase-button showcase-button--ghost" href="#/preferences">
                View admin prototype
              </a>
            </div>
          </div>
          <aside className="showcase-hero__panel">
            <p className="showcase-panel__title">Prototype approach</p>
            <p className="showcase-panel__body">
              These were generated in Figma Make from requirement docs drafted in ChatGPT. I
              kept them pure frontend, atomic, and white-label so the discussion stayed on the
              workflow changes themselves.
            </p>
          </aside>
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-shell">
          <p className="showcase-eyebrow">Case study</p>
          <h2 className="showcase-section__title">Situation, task, action</h2>
          <div className="showcase-card-grid">
            {storyBlocks.map((block) => (
              <article className="showcase-card" key={block.title}>
                <h3 className="showcase-card__title">{block.title}</h3>
                <p className="showcase-card__body">{block.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-section showcase-section--dark">
        <div className="showcase-shell">
          <p className="showcase-eyebrow">Prototypes</p>
          <h2 className="showcase-section__title">Two front-end artifacts used for alignment</h2>
          <div className="showcase-card-grid showcase-card-grid--two">
            {prototypeCards.map((card) => (
              <article className="showcase-card showcase-card--link" key={card.title}>
                <p className="showcase-card__eyebrow">{card.eyebrow}</p>
                <h3 className="showcase-card__title">{card.title}</h3>
                <p className="showcase-card__body">{card.description}</p>
                <a className="showcase-card__cta" href={card.href}>
                  Explore prototype
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function PrototypePage({
  eyebrow,
  title,
  summary,
  children
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <main className="showcase-prototype">
      <div className="showcase-shell">
        <div className="showcase-prototype__header">
          <div>
            <p className="showcase-eyebrow">{eyebrow}</p>
            <h1 className="showcase-section__title">{title}</h1>
            <p className="showcase-section__body">{summary}</p>
          </div>
          <a className="showcase-button showcase-button--ghost" href="#/">
            Back to overview
          </a>
        </div>
      </div>
      <div className="showcase-prototype__canvas">{children}</div>
    </main>
  );
}

export default App;
