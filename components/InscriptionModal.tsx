"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Cta = "PAYER" | "RAPPEL";

interface Choice {
  cta: Cta;
  message?: string;
  icon: string;
  label: string;
  desc: string;
}

const CHOICES: Choice[] = [
  {
    cta: "PAYER",
    icon: "💳",
    label: "Payer par carte maintenant",
    desc: "Paiement sécurisé — place confirmée immédiatement",
  },
  {
    cta: "RAPPEL",
    icon: "📞",
    label: "Être rappelé(e) par un conseiller",
    desc: "Notre équipe vous rappelle sous 24h",
  },
  {
    cta: "RAPPEL",
    message: "Souhaite payer sur place au centre",
    icon: "🏫",
    label: "Payer sur place au centre",
    desc: "Paiement à Casablanca ou Marrakech",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  formationId: string;
  formationTitre: string;
  formationSlug: string;
}

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full font-body text-sm border border-gray-200 rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-brand-blue transition-colors bg-white placeholder:text-text-muted";

export function InscriptionModal({
  open,
  onClose,
  formationId,
  formationTitre,
  formationSlug,
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

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col">
        {/* Header */}
        <div className="bg-brand-dark px-6 py-4 flex items-start justify-between shrink-0">
          <div className="min-w-0 pr-2">
            <p className="font-body text-[10px] text-brand-gold uppercase tracking-widest mb-1">
              Inscription
            </p>
            <h2 className="font-display font-bold text-white text-lg leading-snug line-clamp-2">
              {formationTitre}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-display font-bold text-brand-dark text-xl mb-2">Merci !</h3>
              <p className="font-body text-sm text-text-secondary mb-6">
                Votre demande a bien été enregistrée. Un conseiller vous contactera sous 24h.
              </p>
              <button
                onClick={onClose}
                className="font-body text-sm font-semibold text-brand-blue border border-brand-blue px-6 py-2.5 rounded-sm hover:bg-brand-blue hover:text-white transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              {/* Payment choice */}
              <p className="font-body text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Comment souhaitez-vous procéder ?
              </p>
              <div className="space-y-2 mb-6">
                {CHOICES.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setChoiceIdx(i)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-150 ${
                      choiceIdx === i
                        ? "border-brand-blue bg-brand-blue/5"
                        : "border-gray-100 bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{c.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-body text-sm font-semibold ${
                            choiceIdx === i ? "text-brand-blue" : "text-text-primary"
                          }`}
                        >
                          {c.label}
                        </p>
                        <p className="font-body text-[11px] text-text-muted">{c.desc}</p>
                      </div>
                      {choiceIdx === i && (
                        <div className="ml-auto shrink-0 w-4 h-4 rounded-full bg-brand-blue flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Form fields */}
              <div className="space-y-4">
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
                      className={inputClass + (errors.prenom ? " !border-red-400" : "")}
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
                      className={inputClass + (errors.nom ? " !border-red-400" : "")}
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
                      if (errors.telephone)
                        setErrors((prev) => ({ ...prev, telephone: undefined }));
                    }}
                    placeholder="+212 6 00 00 00 00"
                    className={inputClass + (errors.telephone ? " !border-red-400" : "")}
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

              {status === "error" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-body text-sm text-red-600">{errorMsg}</p>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-bold text-sm py-3.5 rounded-sm transition-colors"
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
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Envoi en cours…
                  </>
                ) : CHOICES[choiceIdx].cta === "PAYER" ? (
                  "Procéder au paiement →"
                ) : (
                  "Envoyer ma demande →"
                )}
              </button>

              <p className="font-body text-[10px] text-text-muted text-center mt-3">
                Paiement sécurisé · Vos données sont protégées
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
