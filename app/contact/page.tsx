"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, MapPin, Mail } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { FORMATIONS } from "@/lib/data/formations";

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  formation: string;
  message: string;
}

interface FormErrors {
  prenom?: string;
  nom?: string;
  telephone?: string;
  message?: string;
}

export default function ContactPage() {
  const [waSettings, setWaSettings] = useState({ casablanca: "", marrakech: "", enLigne: "" });

  useEffect(() => {
    fetch("https://app.institutlorel.com/api/public/site-settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.whatsapp) {
          const wa = data.whatsapp;
          setWaSettings({
            casablanca: wa.casablanca ?? "",
            marrakech: wa.marrakech ?? "",
            enLigne: wa.enLigne ?? "",
          });
        }
      })
      .catch(() => {});
  }, []);

  const [form, setForm] = useState<FormData>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    formation: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate(): boolean {
    const errs: FormErrors = {};
    if (form.prenom.trim().length < 2) errs.prenom = "Minimum 2 caractères";
    if (form.nom.trim().length < 2) errs.nom = "Minimum 2 caractères";
    if (form.telephone.trim().length < 6) errs.telephone = "Numéro invalide";
    if (!form.message.trim()) errs.message = "Ce champ est requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    // Honeypot — silent success for bots
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (!validate()) return;

    // Build message: append formation title if one was selected
    let fullMessage = form.message.trim();
    if (form.formation) {
      const formation = FORMATIONS.find((f) => f.slug === form.formation);
      if (formation) {
        fullMessage += ` — Intéressé(e) par : ${formation.titreFr}`;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: form.prenom.trim(),
          nom: form.nom.trim(),
          telephone: form.telephone.trim(),
          email: form.email.trim() || undefined,
          cta: "RAPPEL",
          message: fullMessage,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || "Une erreur est survenue, réessayez.");
      }
    } catch {
      setSubmitError("Une erreur est survenue, réessayez.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputClass =
    "w-full font-body text-sm text-text-primary border border-gray-200 rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-brand-blue transition-colors bg-white placeholder:text-text-muted";

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <div className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <Container className="relative z-10 py-16 lg:py-20">
          <div className="flex items-center gap-2 font-body text-[11px] text-white/35 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-white/60">Contact</span>
          </div>
          <p className="font-body text-label-caps text-brand-gold mb-3">CONTACT</p>
          <h1
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Contactez-nous
          </h1>
          <p className="font-body text-white/60 text-base max-w-md">
            Une question sur nos formations ? Notre équipe vous répond dans les 24 heures.
          </p>
        </Container>
      </div>

      {/* Main Section */}
      <section className="bg-brand-cream py-16">
        <Container>
          <div className="lg:grid lg:grid-cols-12 gap-10">
            {/* LEFT — Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-display font-bold text-brand-dark text-2xl mb-6">
                  Envoyez-nous un message
                </h2>

                {submitted ? (
                  <div className="text-center py-10">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-brand-dark text-xl mb-2">
                      Message envoyé !
                    </h3>
                    <p className="font-body text-sm text-text-secondary">
                      Nous vous contacterons sous 24h.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Honeypot — hidden from real users */}
                    <input
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                    />

                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="font-body text-xs font-semibold text-text-primary block mb-1.5">
                          Prénom *
                        </label>
                        <input
                          name="prenom"
                          value={form.prenom}
                          onChange={handleChange}
                          placeholder="Votre prénom"
                          className={inputClass}
                        />
                        {errors.prenom && (
                          <p className="font-body text-[11px] text-red-500 mt-1">{errors.prenom}</p>
                        )}
                      </div>
                      <div>
                        <label className="font-body text-xs font-semibold text-text-primary block mb-1.5">
                          Nom *
                        </label>
                        <input
                          name="nom"
                          value={form.nom}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          className={inputClass}
                        />
                        {errors.nom && (
                          <p className="font-body text-[11px] text-red-500 mt-1">{errors.nom}</p>
                        )}
                      </div>
                    </div>

                    {/* Email / Phone row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="font-body text-xs font-semibold text-text-primary block mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="vous@exemple.com"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs font-semibold text-text-primary block mb-1.5">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          name="telephone"
                          value={form.telephone}
                          onChange={handleChange}
                          placeholder="+212 6 00 00 00 00"
                          className={inputClass}
                        />
                        {errors.telephone && (
                          <p className="font-body text-[11px] text-red-500 mt-1">
                            {errors.telephone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Formation select */}
                    <div className="mb-4">
                      <label className="font-body text-xs font-semibold text-text-primary block mb-1.5">
                        Formation d&apos;intérêt
                      </label>
                      <select
                        name="formation"
                        value={form.formation}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Choisir une formation</option>
                        {FORMATIONS.map((f) => (
                          <option key={f.slug} value={f.slug}>
                            {f.titreFr}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label className="font-body text-xs font-semibold text-text-primary block mb-1.5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Décrivez votre projet ou vos questions..."
                        className={inputClass + " resize-none"}
                      />
                      {errors.message && (
                        <p className="font-body text-[11px] text-red-500 mt-1">{errors.message}</p>
                      )}
                    </div>

                    {submitError && (
                      <p className="font-body text-sm text-red-600 mb-4">{submitError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-bold text-sm py-3.5 rounded-sm transition-colors"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          Envoi en cours…
                        </>
                      ) : (
                        "Envoyer le message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT — Contact Info */}
            <div className="lg:col-span-5 mt-8 lg:mt-0 space-y-4">
              {/* Email */}
              <div className="bg-white rounded-xl p-5 shadow-card flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="font-body font-semibold text-text-primary text-sm">
                    contact@institutlorel.com
                  </p>
                </div>
              </div>

              {/* WhatsApp — by city */}
              {(["casablanca", "marrakech", "enLigne"] as const).map((city) => {
                const num = waSettings[city];
                if (!num) return null;
                const label = city === "casablanca" ? "WhatsApp Casablanca" : city === "marrakech" ? "WhatsApp Marrakech" : "WhatsApp En ligne";
                return (
                  <a
                    key={city}
                    href={`https://wa.me/${num}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl p-5 shadow-card flex items-start gap-4 group hover:border-green-200 border border-transparent transition-colors block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-500" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body font-semibold text-text-primary text-sm mb-0.5">{label}</p>
                      <p className="font-body text-xs text-text-muted">Réponse en moins de 30 min</p>
                    </div>
                  </a>
                );
              })}

              {/* Marrakech */}
              <div className="bg-white rounded-xl p-5 shadow-card flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-cream flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="font-body font-semibold text-text-primary text-sm mb-0.5">
                    Centre de Marrakech
                  </p>
                  <p className="font-body text-xs text-text-muted leading-relaxed">
                    Quartier Guéliz, Marrakech 40000
                    <br />
                    Lun–Sam 8h30–18h
                  </p>
                </div>
              </div>

              {/* Casablanca */}
              <div className="bg-white rounded-xl p-5 shadow-card flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-cream flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="font-body font-semibold text-text-primary text-sm mb-0.5">
                    Centre de Casablanca
                  </p>
                  <p className="font-body text-xs text-text-muted leading-relaxed">
                    Quartier Maârif, Casablanca 20000
                    <br />
                    Lun–Sam 8h30–18h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </>
  );
}
