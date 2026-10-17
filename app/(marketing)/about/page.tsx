import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rólunk — közös",
  description: "A közös azért van, hogy könnyebb legyen egymásra találni.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="eyebrow"><span className="eyebrow-dot" /> NEM CSAK PROGRAM</p>
        <h1>
          A legjobb dolgok
          <br />
          <span>közösen történnek.</span>
        </h1>
        <p>
          A közös egy hely, ahol a jó ötletekből valódi találkozások lesznek. Kis
          csoportok, valódi emberek, emlékezetes pillanatok.
        </p>
      </section>
      <section className="about-values">
        <article><span>01</span><h2>Emberek, nem követők</h2><p>Nem a számokért gyűlünk össze. Azért, hogy legyen kivel megosztani az estét.</p></article>
        <article><span>02</span><h2>Kicsi is lehet nagy</h2><p>Egy közös séta pont olyan jó program, mint egy teltházas koncert. Az számít, kivel vagy.</p></article>
        <article><span>03</span><h2>Te is alakítod</h2><p>A közös a te ötletedtől lesz közös. Hozz létre eseményt, és hívd meg a várost.</p></article>
      </section>
    </main>
  );
}
