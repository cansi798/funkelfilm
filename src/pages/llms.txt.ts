import type { APIRoute } from "astro";
import { NAME, INHABER, ORT, MAIL, BESCHREIBUNG, LEISTUNGEN, ABLAUF, EINSATZ } from "../daten";
import { HEIMAT } from "../lib/karte";
// Kurzbeschreibung für KI-Assistenten, erzeugt aus derselben Daten-Datei wie die Seite (keine Abweichungen).
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const url = (p: string) => new URL(base + p, site).href;
  const text = `# ${NAME}

> ${BESCHREIBUNG}

- Inhaber: ${INHABER}, Videograf, ${ORT}
- Kontakt: ${MAIL}
- Seit 2017 Imagefilme, über 100 Projekte (Stand 2024)

## Einsatzgebiet
${EINSATZ.text} Standort: ${HEIMAT.name}. Drehs in ganz Deutschland möglich; die Anreise wird im kostenlosen Erstgespräch mitgeplant.

## Leistungen
${LEISTUNGEN.map((l) => `- [${l.titel}](${url(`/${l.slug}/`)}): ${l.kurz}`).join("\n")}

## Ablauf
${ABLAUF.map((a, i) => `${i + 1}. ${a.titel}: ${a.kurz}`).join("\n")}

## Seiten
- [Projekte und Kundenstimmen](${url("/erfolgsgeschichten/")})
- [Über Sheeras Iqbal](${url("/about/")})
- [Kontakt](${url("/kontakt/")})
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
