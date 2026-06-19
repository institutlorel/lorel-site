"use client";

import { useState, useEffect } from "react";
import { X, Lock, ShieldCheck } from "lucide-react";

type Cta = "PAYER" | "RAPPEL";

interface Choice {
  cta: Cta;
  message?: string;
  icon: string;
  label: string;
  desc: string;
  badge?: string;
  hint?: string;
}

const CHOICES: Choice[] = [
  {
    cta: "PAYER",
    icon: "💳",
    label: "Payer par carte en ligne",
    desc: "Place confirmée immédiatement après paiement",
    badge: "Recommandé",
    hint: "Paiement sécurisé via YouCan Pay",
  },
  {
    cta: "RAPPEL",
    icon: "📞",
    label: "Être rappelé(e) par un conseiller",
    desc: "Notre équipe vous rappelle sous 24h",
    hint: "Sans engagement",
  },
  {
    cta: "RAPPEL",
    message: "Souhaite payer sur place au centre",
    icon: "🏫",
    label: "Payer sur place au centre",
    desc: "Casablanca · Marrakech",
    hint: "Sans engagement",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  formationId: string;
  formationTitre: string;
  formationSlug: string;
  formationPrix?: string;
}

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full font-body text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all bg-white placeholder:text-text-muted";

export function InscriptionModal({
  open,
  onClose,
  formationId,
  formationTitre,
  formationSlug,
  formationPrix,
}: Props) {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [choiceIdx, setChoiceIdx] = useState(0);
  const [errors, setErrors] = useState<{ prenom?: string; nom?: string; telephone?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setPrenom("");
      setNom("");
      setTelephone("");
      setEmail("");
      setHoneypot("");
      setChoiceIdx(0);
      setErrors({});
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  if (!open) return null;

  function validate(): boolean {
    const errs: { prenom?: string; nom?: string; telephone?: string } = {};
    if (prenom.trim().length < 2) errs.prenom = "Minimum 2 caractères";
    if (nom.trim().length < 2) errs.nom = "Minimum 2 caractères";
    if (telephone.trim().length < 6) errs.telephone = "Numéro invalide";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit() {
    if (honeypot) {
      setStatus("success");
      return;
    }
    if (!validate()) return;
    setStatus("loading");
    const choice = CHOICES[choiceIdx];
    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: prenom.trim(),
          nom: nom.trim(),
          telephone: telephone.trim(),
          email: email.trim() || undefined,
          formationId,
          cta: choice.cta,
          message: choice.message || undefined,
          slug: formationSlug,
        }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      if (data.ok) {
        setStatus("success");
        return;
      }
      setStatus("error");
      setErrorMsg(data.error || "Une erreur est survenue, réessayez.");
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur est survenue, réessayez.");
    }
  }

  const isPayer = CHOICES[choiceIdx].cta === "PAYER";

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet / Card */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[94dvh] flex flex-col">

        {/* ── Header ── */}
        <div className="bg-brand-dark px-6 pt-5 pb-4 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-body text-[10px] font-bold text-brand-gold uppercase tracking-[0.18em] mb-1.5">
                Inscription
              </p>
              <h2 className="font-display font-bold text-white text-[1.1rem] leading-snug line-clamp-2">
                {formationTitre}
              </h2>
              {formationPrix && (
                <p className="font-display font-bold text-brand-gold text-lg mt-1.5 leading-none">
                  {formationPrix}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-5 py-5 sm:px-6 sm:py-6">

          {/* ── Success state ── */}
          {status === "success" ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-display font-bold text-brand-dark text-xl mb-2">
                Demande envoyée !
              </h3>
              <p className="font-body text-sm text-text-secondary mb-6 max-w-xs mx-auto">
                Un conseiller vous contactera sous 24h pour finaliser votre inscription.
              </p>
              <button
                onClick={onClose}
                className="font-body text-sm font-bold text-brand-dark bg-brand-gold hover:bg-brand-gold-dark px-8 py-2.5 rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              {/* ── Payment choice ── */}
              <p className="font-body text-[11px] font-bold text-text-muted uppercase tracking-[0.12em] mb-3">
                Comment souhaitez-vous procéder ?
              </p>
              <div className="space-y-2 mb-5">
                {CHOICES.map((c, i) => {
                  const selected = choiceIdx === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setChoiceIdx(i)}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-150 ${
                        selected
                          ? "border-brand-gold bg-brand-gold/8 shadow-gold"
                          : "border-gray-100 bg-gray-50 hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl shrink-0 leading-none">{c.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p
                              className={`font-body text-[13px] font-bold leading-snug ${
                                selected ? "text-brand-dark" : "text-text-primary"
                              }`}
                            >
                              {c.label}
                            </p>
                            {c.badge && (
                              <span className="shrink-0 font-body text-[9px] font-bold uppercase tracking-wider bg-brand-gold text-brand-dark px-1.5 py-0.5 rounded-full leading-none">
                                {c.badge}
                              </span>
                            )}
                          </div>
                          <p className="font-body text-[11px] text-text-muted mt-0.5">{c.desc}</p>
                          {c.hint && (
                            <p
                              className={`font-body text-[10px] mt-0.5 font-semibold ${
                                selected ? "text-brand-gold" : "text-text-muted"
                              }`}
                            >
                              {c.hint}
                            </p>
                          )}
                        </div>
                        {/* Radio dot */}
                        <div
                          className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                            selected ? "border-brand-gold bg-brand-gold" : "border-gray-300 bg-white"
                          }`}
                        >
                          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-100" />
                <p className="font-body text-[11px] text-text-muted shrink-0">Vos coordonnées</p>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* ── Form fields ── */}
              <div className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-body text-xs font-semibold text-text-primary block mb-1.5">
                      Prénom *
                    </label>
                    <input
                      value={prenom}
                      onChange={(e) => {
                        setPrenom(e.target.value);
                        if (errors.prenom) setErrors((prev) => ({ ...prev, prenom: undefined }));
                      }}
                      placeholder="Votre prénom"
                      className={inputClass + (errors.prenom ? " !border-red-400 !ring-red-100" : "")}
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
                      value={nom}
                      onChange={(e) => {
                        setNom(e.target.value);
                        if (errors.nom) setErrors((prev) => ({ ...prev, nom: undefined }));
                      }}
                      placeholder="Votre nom"
                      className={inputClass + (errors.nom ? " !border-red-400 !ring-red-100" : "")}
                    />
                    {errors.nom && (
                      <p className="font-body text-[11px] text-red-500 mt-1">{errors.nom}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-text-primary block mb-1.5">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => {
                      setTelephone(e.target.value);
                      if (errors.telephone) setErrors((prev) => ({ ...prev, telephone: undefined }));
                    }}
                    placeholder="+212 6 00 00 00 00"
                    className={inputClass + (errors.telephone ? " !border-red-400 !ring-red-100" : "")}
                  />
                  {errors.telephone && (
                    <p className="font-body text-[11px] text-red-500 mt-1">{errors.telephone}</p>
                  )}
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-text-primary block mb-1.5">
                    Email{" "}
                    <span className="font-normal text-text-muted">(optionnel)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className={inputClass}
                  />
                </div>

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
              </div>

              {/* Error banner */}
              {status === "error" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <span className="text-red-500 text-base leading-none mt-0.5">⚠</span>
                  <p className="font-body text-sm text-red-600">{errorMsg}</p>
                </div>
              )}

              {/* ── CTA button ── */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark disabled:opacity-60 disabled:cursor-not-allowed text-brand-dark font-body font-bold text-[15px] py-4 rounded-xl transition-colors shadow-gold"
              >
                {status === "loading" ? (
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
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Envoi en cours…
                  </>
                ) : isPayer ? (
                  "Réserver ma place →"
                ) : (
                  "Envoyer ma demande →"
                )}
              </button>

              {/* Trust row */}
              <div className="mt-3 flex items-center justify-center gap-4">
                {isPayer ? (
                  <span className="flex items-center gap-1.5 font-body text-[11px] text-text-muted">
                    <Lock className="w-3 h-3 text-green-500" />
                    Paiement 100% sécurisé · YouCan Pay
                  </span>
                ) : (
                  <span className="font-body text-[11px] text-text-muted">
                    Sans engagement · Réponse sous 24h
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
