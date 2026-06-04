import { useEffect, useRef, useState, type FormEvent } from "react";
import "./landing.css";

/**
 * Flowly — Landing page SaaS
 * --------------------------------------------------------
 * Construida desde cero, sin usar el design system del proyecto.
 * Estilos en `landing.css` (tokens + BEM). La validación del
 * formulario se maneja con clases CSS (.is-invalid, .is-valid)
 * para mantener la apariencia fuera del JS.
 */

type FieldName = "name" | "email" | "message";
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const validators: Record<FieldName, (value: string) => string> = {
  name: (value) => {
    if (!value.trim()) return "Por favor, introduce tu nombre.";
    if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
    return "";
  },
  email: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Por favor, introduce tu email.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!re.test(trimmed)) return "Introduce un email válido (ej. nombre@empresa.com).";
    return "";
  },
  message: (value) => {
    if (!value.trim()) return "El mensaje no puede estar vacío.";
    if (value.trim().length < 10) return "Cuéntanos un poco más (mínimo 10 caracteres).";
    return "";
  },
};

export default function App() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; text: string }>({
    kind: "idle",
    text: "",
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function setField(name: FieldName, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  }

  function blurField(name: FieldName) {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](values[name]) }));
  }

  function fieldClass(name: FieldName) {
    const err = errors[name];
    const base = "form__field";
    if (err) return `${base} is-invalid`;
    if (touched[name] && !err && values[name]) return `${base} is-valid`;
    return base;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors: FormErrors = {
      name: validators.name(values.name),
      email: validators.email(values.email),
      message: validators.message(values.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = (["name", "email", "message"] as FieldName[]).find((f) => newErrors[f]);
    if (firstInvalid) {
      setStatus({ kind: "error", text: "Revisa los campos marcados antes de enviar." });
      const refMap = { name: nameRef, email: emailRef, message: messageRef };
      refMap[firstInvalid].current?.focus();
      return;
    }

    // Simulación de envío. En producción aquí iría un fetch() a la API.
    setSubmitting(true);
    setStatus({ kind: "idle", text: "" });
    window.setTimeout(() => {
      setValues({ name: "", email: "", message: "" });
      setErrors({});
      setTouched({});
      setSubmitting(false);
      setStatus({
        kind: "success",
        text: "¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.",
      });
    }, 700);
  }

  const year = useYear();

  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido principal
      </a>

      <header className="site-header" role="banner">
        <div className="container header__inner">
          <a href="#" className="brand" aria-label="Flowly, ir al inicio">
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
                <path
                  d="M4 6c4 0 4 12 8 12s4-12 8-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="brand__name">Flowly</span>
          </a>

          <nav className="site-nav" aria-label="Navegación principal">
            <ul className="site-nav__list">
              <li><a href="#features">Funcionalidades</a></li>
              <li><a href="#about">Sobre nosotros</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </nav>

          <a href="#contact" className="btn btn--primary btn--sm header__cta">
            Empezar gratis
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero__inner">
            <div className="hero__content">
              <span className="eyebrow">Nuevo · Integración con Google Calendar</span>
              <h1 id="hero-title" className="hero__title">
                El espacio donde tu equipo <span className="text-accent">fluye</span>.
              </h1>
              <p className="hero__subtitle">
                Flowly unifica tareas, documentos y conversaciones en una sola plataforma para que
                tu equipo deje de saltar entre herramientas y vuelva a enfocarse en lo importante.
              </p>
              <div className="hero__actions">
                <a href="#contact" className="btn btn--primary">Probar gratis 14 días</a>
                <a href="#features" className="btn btn--ghost">Ver cómo funciona</a>
              </div>
              <p className="hero__meta">Sin tarjeta de crédito · Cancela cuando quieras</p>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="mock-window">
                <div className="mock-window__bar">
                  <span className="dot dot--red"></span>
                  <span className="dot dot--yellow"></span>
                  <span className="dot dot--green"></span>
                </div>
                <div className="mock-window__body">
                  <div className="mock-row mock-row--header"></div>
                  <div className="mock-grid">
                    <div className="mock-card">
                      <div className="mock-line mock-line--80"></div>
                      <div className="mock-line mock-line--60"></div>
                      <div className="mock-tag">En curso</div>
                    </div>
                    <div className="mock-card">
                      <div className="mock-line mock-line--70"></div>
                      <div className="mock-line mock-line--50"></div>
                      <div className="mock-tag mock-tag--alt">Hoy</div>
                    </div>
                    <div className="mock-card">
                      <div className="mock-line mock-line--90"></div>
                      <div className="mock-line mock-line--40"></div>
                      <div className="mock-tag mock-tag--success">Listo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="section features" aria-labelledby="features-title">
          <div className="container">
            <header className="section__head">
              <span className="eyebrow">Funcionalidades</span>
              <h2 id="features-title" className="section__title">
                Todo lo que tu equipo necesita, en un solo lugar
              </h2>
              <p className="section__lead">
                Diseñado para equipos que valoran su tiempo. Sin ruido, sin fricción, sin pestañas
                infinitas.
              </p>
            </header>

            <ul className="features__grid" role="list">
              <FeatureCard
                title="Tareas inteligentes"
                text="Organiza el trabajo en tableros, listas o cronogramas. Prioriza con IA y mantén a todo el equipo alineado sin reuniones innecesarias."
                icon={
                  <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                }
              />
              <FeatureCard
                title="Documentos colaborativos"
                text="Edita en tiempo real con tu equipo, deja comentarios contextuales y conecta cada documento con las tareas que lo originaron."
                icon={
                  <path d="M4 7h16M4 12h10M4 17h16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                }
              />
              <FeatureCard
                title="Conversaciones enfocadas"
                text="Hilos por proyecto, menciones inteligentes y resúmenes automáticos. Todo el contexto de tu equipo, sin perderte en mensajes."
                icon={
                  <path
                    d="M21 12c0 4.97-4.03 9-9 9-1.5 0-2.91-.37-4.15-1.02L3 21l1.05-4.85A8.96 8.96 0 0 1 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                }
              />
              <FeatureCard
                title="Métricas que importan"
                text="Dashboards claros sobre carga de trabajo, progreso por proyecto y bloqueos en tiempo real. Toma decisiones con datos, no con intuiciones."
                icon={
                  <path d="M3 3v18h18M7 14l4-4 3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                }
              />
            </ul>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about" aria-labelledby="about-title">
          <div className="container about__inner">
            <div className="about__content">
              <span className="eyebrow">Sobre nosotros</span>
              <h2 id="about-title" className="section__title">
                Creemos en equipos que trabajan mejor, no más.
              </h2>
              <p className="about__text">
                Flowly nació en 2022 cuando un grupo de diseñadores y desarrolladores se cansó de
                cambiar entre cinco herramientas distintas para terminar un proyecto. Hoy somos un
                equipo distribuido en seis países que construye software para más de 12.000 equipos
                en todo el mundo.
              </p>
              <p className="about__text">
                Nuestra misión es simple: devolverle a tu equipo el tiempo y la concentración que
                las herramientas mal pensadas les quitan cada día.
              </p>
              <ul className="stats" role="list">
                <li className="stat">
                  <span className="stat__value">12k+</span>
                  <span className="stat__label">Equipos activos</span>
                </li>
                <li className="stat">
                  <span className="stat__value">98%</span>
                  <span className="stat__label">Satisfacción</span>
                </li>
                <li className="stat">
                  <span className="stat__value">40+</span>
                  <span className="stat__label">Países</span>
                </li>
              </ul>
            </div>
            <div className="about__visual" aria-hidden="true">
              <div className="about__shape about__shape--1"></div>
              <div className="about__shape about__shape--2"></div>
              <div className="about__shape about__shape--3"></div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="container contact__inner">
            <header className="section__head section__head--left">
              <span className="eyebrow">Contacto</span>
              <h2 id="contact-title" className="section__title">¿Hablamos?</h2>
              <p className="section__lead">
                Cuéntanos sobre tu equipo y te mostraremos cómo Flowly puede ayudarte. Respondemos
                en menos de 24 horas hábiles.
              </p>
            </header>

            <form
              id="contact-form"
              className="form"
              noValidate
              onSubmit={handleSubmit}
              aria-describedby="form-status"
            >
              <div className={fieldClass("name")}>
                <label htmlFor="name" className="form__label">Nombre</label>
                <input
                  ref={nameRef}
                  type="text"
                  id="name"
                  name="name"
                  className="form__input"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={values.name}
                  onChange={(e) => setField("name", e.target.value)}
                  onBlur={() => blurField("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby="name-error"
                />
                <p className="form__error" id="name-error" role="alert">
                  {errors.name ?? ""}
                </p>
              </div>

              <div className={fieldClass("email")}>
                <label htmlFor="email" className="form__label">Email</label>
                <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  name="email"
                  className="form__input"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => blurField("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby="email-error"
                />
                <p className="form__error" id="email-error" role="alert">
                  {errors.email ?? ""}
                </p>
              </div>

              <div className={fieldClass("message")}>
                <label htmlFor="message" className="form__label">Mensaje</label>
                <textarea
                  ref={messageRef}
                  id="message"
                  name="message"
                  className="form__input form__input--textarea"
                  rows={5}
                  required
                  minLength={10}
                  value={values.message}
                  onChange={(e) => setField("message", e.target.value)}
                  onBlur={() => blurField("message")}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby="message-error"
                />
                <p className="form__error" id="message-error" role="alert">
                  {errors.message ?? ""}
                </p>
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--block"
                disabled={submitting}
              >
                {submitting ? "Enviando…" : "Enviar mensaje"}
              </button>

              <p
                id="form-status"
                className={`form__status${status.kind === "success" ? " is-success" : ""}${
                  status.kind === "error" ? " is-error" : ""
                }`}
                role="status"
                aria-live="polite"
              >
                {status.text}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <span className="brand">
              <span className="brand__mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    d="M4 6c4 0 4 12 8 12s4-12 8-12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="brand__name">Flowly</span>
            </span>
            <p className="site-footer__tagline">Productividad real para equipos reales.</p>
          </div>

          <nav className="site-footer__nav" aria-label="Enlaces del pie de página">
            <div className="footer-col">
              <h3 className="footer-col__title">Producto</h3>
              <ul>
                <li><a href="#features">Funcionalidades</a></li>
                <li><a href="#about">Sobre nosotros</a></li>
                <li><a href="#contact">Contacto</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-col__title">Recursos</h3>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Centro de ayuda</a></li>
                <li><a href="#">Estado del sistema</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-col__title">Legal</h3>
              <ul>
                <li><a href="#">Privacidad</a></li>
                <li><a href="#">Términos</a></li>
                <li><a href="#">Cookies</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container site-footer__bottom">
          <small>© {year} Flowly Inc. Todos los derechos reservados.</small>
        </div>
      </footer>
    </>
  );
}

function FeatureCard({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <li className="feature-card">
      <div className="feature-card__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24">
          {icon}
        </svg>
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__text">{text}</p>
    </li>
  );
}

function useYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return year;
}
