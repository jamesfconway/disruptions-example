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

const proofPoints = [
  {
    value: "30+ hrs",
    label: "Monthly operational time loss quantified from workflow friction"
  },
  {
    value: "2",
    label: "Atomic white-label prototypes generated to focus discussion on behavior"
  },
  {
    value: "3 layers",
    label: "Operational workflow, admin configuration, and downstream mapping"
  }
];

const systemLayers = [
  {
    title: "Operational workflow",
    body:
      "I mapped the live controller experience around a simple mental model: what happened, why it happened, and what context should be recorded."
  },
  {
    title: "Admin configuration",
    body:
      "I separated the controller flow from the supporting dictionaries and rules so the system could stay simple for operators without losing control."
  },
  {
    title: "Downstream mapping",
    body:
      "I treated reporting, GTFS-RT, and other external classifications as a linked layer rather than letting those concerns leak directly into the controller UI."
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
            <p className="showcase-eyebrow">Landing page for a hiring-manager step, built as the seed of a broader portfolio</p>
            <h1 className="showcase-title">From workflow friction to a clearer Bus Control product model</h1>
            <p className="showcase-lede">
              I used behavioral evidence to quantify 30+ hours of operational time lost each
              month in a disruption workflow, mapped the underlying product model, and turned
              that into atomic white-label prototypes that made the change concrete for design
              and engineering.
            </p>
            <div className="showcase-hero__actions">
              <a className="showcase-button" href="#/service-form">
                Open unified form prototype
              </a>
              <a className="showcase-button showcase-button--ghost" href="#/preferences">
                Open admin preferences prototype
              </a>
            </div>
          </div>
          <aside className="showcase-hero__panel">
            <p className="showcase-panel__title">How the prototypes were made</p>
            <p className="showcase-panel__body">
              These demos were generated in Figma Make from requirement documents drafted in
              ChatGPT. I kept them intentionally atomic and white-label so conversations stayed
              centered on workflow changes, system implications, and product decisions rather than
              visual polish.
            </p>
            <ul className="showcase-panel__list">
              <li>Prompted from requirement docs, not from vague visual inspiration</li>
              <li>White-label on purpose to lower attachment to surface details</li>
              <li>Split into two artifacts so each decision space stayed legible</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="showcase-proof">
        <div className="showcase-shell showcase-proof__grid">
          {proofPoints.map((item) => (
            <article className="showcase-metric" key={item.label}>
              <div className="showcase-metric__value">{item.value}</div>
              <p className="showcase-metric__label">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-shell showcase-two-column">
          <div>
            <p className="showcase-eyebrow">The problem</p>
            <h2 className="showcase-section__title">I pitched this as more than a form cleanup</h2>
            <p className="showcase-section__body">
              The disruption experience was fragmented across overlapping actions, inconsistent
              language, and different entry points. I treated that as a product-system problem:
              not just too many clicks, but a weak shared model of what operators were recording,
              why they were recording it, and how that information flowed into configuration and
              downstream outputs.
            </p>
          </div>
          <div className="showcase-callout">
            <p className="showcase-callout__label">Broader story</p>
            <p className="showcase-callout__body">
              The useful thread here is all three at once: evidence to prototype, systems
              thinking, and alignment. The analytics gave the case for change, the model gave the
              work structure, and the prototypes gave the team something tangible to challenge.
            </p>
          </div>
        </div>
      </section>

      <section className="showcase-section showcase-section--warm">
        <div className="showcase-shell">
          <p className="showcase-eyebrow">What I mapped out</p>
          <h2 className="showcase-section__title">A three-layer model that could hold the whole workflow together</h2>
          <div className="showcase-card-grid">
            {systemLayers.map((layer) => (
              <article className="showcase-card" key={layer.title}>
                <h3 className="showcase-card__title">{layer.title}</h3>
                <p className="showcase-card__body">{layer.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-shell">
          <p className="showcase-eyebrow">How prototyping fit in</p>
          <h2 className="showcase-section__title">The prototypes were deliberate thinking tools, not fake-finished product</h2>
          <div className="showcase-process">
            <div className="showcase-process__step">
              <span className="showcase-process__index">01</span>
              <p>I translated the workflow and system constraints into requirement docs in ChatGPT.</p>
            </div>
            <div className="showcase-process__step">
              <span className="showcase-process__index">02</span>
              <p>I used Figma Make to generate clickable prototypes quickly enough to keep the conversation live.</p>
            </div>
            <div className="showcase-process__step">
              <span className="showcase-process__index">03</span>
              <p>I kept the output atomic and white-label so design and engineering attention stayed on required changes, tradeoffs, and missing details.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-section showcase-section--dark">
        <div className="showcase-shell">
          <p className="showcase-eyebrow">Interactive artifacts</p>
          <h2 className="showcase-section__title">Two linked prototypes, each carrying a distinct part of the story</h2>
          <div className="showcase-card-grid">
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

      <section className="showcase-section">
        <div className="showcase-shell showcase-footer-links">
          <div>
            <p className="showcase-eyebrow">Source material</p>
            <h2 className="showcase-section__title">Atomic prototypes, tied together in one GitHub Pages showcase</h2>
          </div>
          <div className="showcase-links">
            {sourceLinks.map((link) => (
              <a
                key={link.href}
                className="showcase-links__item"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
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
