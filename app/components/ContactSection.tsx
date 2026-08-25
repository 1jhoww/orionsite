"use client";

import { FormEvent, useState } from "react";
import { buildWhatsAppUrl, contactSubjects, type ContactErrors, type ContactField, validateContactPayload } from "../lib/contact";

const whatsappHref = "https://wa.me/5511962320441?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Orion.";

export function ContactSection() {
  const [errors, setErrors] = useState<ContactErrors>({});

  const clearError = (field: ContactField) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const validation = validateContactPayload(payload);
    setErrors(validation.errors);

    const firstInvalidField = Object.keys(validation.errors)[0] as ContactField | undefined;
    if (firstInvalidField) {
      (form.querySelector(`[name="${firstInvalidField}"]`) as HTMLElement | null)?.focus();
      return;
    }

    window.open(buildWhatsAppUrl(validation.data), "_blank", "noopener,noreferrer");
  };

  const errorId = (field: ContactField) => errors[field] ? `contact-${field}-error` : undefined;

  return (
    <section className="contact contact-commercial" id="contato" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">Contato</p>
          <h2 id="contact-title">Vamos conversar sobre seu projeto?</h2>
          <p>
            Empresas interessadas em desenvolvimento, produção, terceirização ou
            informações institucionais podem falar diretamente com a Orion.
          </p>

          <div className="contact-channels" aria-label="Canais de contato">
            <div>
              <span>E-mail</span>
              <a href="mailto:administrativo@orionpet.com.br">administrativo@orionpet.com.br</a>
            </div>
            <div>
              <span>WhatsApp</span>
              <a href={whatsappHref} target="_blank" rel="noreferrer">(11) 96232-0441</a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form-heading">
            <p>Conte um pouco sobre a sua necessidade.</p>
            <span>Campos marcados com * são obrigatórios.</span>
          </div>

          <div className="contact-form-grid">
            <div className="form-field">
              <label htmlFor="contact-name">Nome *</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errorId("name")} onInput={() => clearError("name")} />
              {errors.name && <span className="field-error" id="contact-name-error">{errors.name}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="contact-company">Empresa</label>
              <input id="contact-company" name="company" type="text" autoComplete="organization" onInput={() => clearError("company")} />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">E-mail *</label>
              <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errorId("email")} onInput={() => clearError("email")} />
              {errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="contact-phone">Telefone / WhatsApp</label>
              <input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" onInput={() => clearError("phone")} />
            </div>
            <div className="form-field form-field--full">
              <label htmlFor="contact-subject">Assunto</label>
              <select id="contact-subject" name="subject" defaultValue="" onInput={() => clearError("subject")}>
                <option value="">Selecione um assunto</option>
                {contactSubjects.map((subject) => <option value={subject} key={subject}>{subject}</option>)}
              </select>
            </div>
            <div className="form-field form-field--full">
              <label htmlFor="contact-message">Mensagem *</label>
              <textarea id="contact-message" name="message" rows={6} required aria-invalid={Boolean(errors.message)} aria-describedby={errorId("message")} onInput={() => clearError("message")} />
              {errors.message && <span className="field-error" id="contact-message-error">{errors.message}</span>}
            </div>
          </div>

          <div className="contact-form-footer">
            <button className="button button--primary contact-submit" type="submit">
              Continuar pelo WhatsApp
            </button>
            <p className="form-status">A conversa será aberta com os dados preenchidos. Você decide quando enviar.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
