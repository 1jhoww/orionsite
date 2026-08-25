import { validateContactPayload } from "../../lib/contact";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Não foi possível ler os dados enviados." }, { status: 400 });
  }

  const { errors } = validateContactPayload(payload);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  return Response.json(
    {
      ok: false,
      code: "CONTACT_DELIVERY_NOT_CONFIGURED",
      message: "O envio direto pelo site ainda depende da integração de um serviço de e-mail.",
    },
    { status: 501 },
  );
}
