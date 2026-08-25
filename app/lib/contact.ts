export const contactSubjects = [
  "Informações comerciais",
  "Terceirização",
  "Portfólio",
  "Parcerias",
  "Outros",
] as const;

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactField = keyof ContactFormData;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const ORION_WHATSAPP_NUMBER = "5511962320441";

const normalize = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export function validateContactPayload(payload: unknown): { data: ContactFormData; errors: ContactErrors } {
  const source = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};
  const data: ContactFormData = {
    name: normalize(source.name, 120),
    company: normalize(source.company, 160),
    email: normalize(source.email, 180),
    phone: normalize(source.phone, 40),
    subject: normalize(source.subject, 80),
    message: normalize(source.message, 3000),
  };
  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Informe seu nome.";
  if (!data.email) errors.email = "Informe seu e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Informe um e-mail válido.";
  if (!data.message) errors.message = "Escreva uma mensagem.";
  else if (data.message.length < 10) errors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";

  return { data, errors };
}

export function buildWhatsAppMessage(data: ContactFormData) {
  const details = [
    `Nome: ${data.name}`,
    data.company ? `Empresa: ${data.company}` : null,
    `E-mail: ${data.email}`,
    data.phone ? `Telefone: ${data.phone}` : null,
    data.subject ? `Assunto: ${data.subject}` : null,
  ].filter((line): line is string => Boolean(line));

  return [
    "Olá, gostaria de falar com a equipe da Orion.",
    "",
    ...details,
    "",
    "Mensagem:",
    data.message,
  ].join("\n");
}

export function buildWhatsAppUrl(data: ContactFormData) {
  return `https://wa.me/${ORION_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
}
