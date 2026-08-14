import React from 'react';
import Reveal from '@/components/ui/Reveal';

const principles = [
  {
    number: '01',
    title: 'Rækkefølge før indsats',
    body: 'Det dyreste i digital markedsføring er at gøre de rigtige ting i den forkerte rækkefølge. Annoncer til en side, der ikke konverterer. Tracking sat op efter kampagnen er kørt. Vi lægger rækkefølgen fast først.',
  },
  {
    number: '02',
    title: 'Afgrænsning frem for løfter',
    body: 'Hvert tilbud beskriver, hvad der er med, og hvad der ikke er. Det er mindre sælgende at skrive, hvad man ikke laver — men det er den eneste måde at undgå, at et samarbejde bliver en skuffelse.',
  },
  {
    number: '03',
    title: 'Ingen garantier på det, ingen kontrollerer',
    body: 'Placeringer, leads og afkast afhænger af marked, budget og konkurrence. Vi lover en prioriteret indsats, målbar opsætning og ærlig rapportering — ikke tal, vi ikke er herre over.',
  },
];

/**
 * Three principles, set as a manifesto.
 *
 * The one paper-ground section on the homepage, so it lands as a change of
 * register rather than as another dark band. These are the existing three and
 * only these three: expanding them into passion, innovation and transparency
 * would cost the page the only thing that makes it worth reading.
 */
const ManifestoSection: React.FC = () => (
  <section
    className="on-light relative overflow-hidden bg-paper py-20 text-ink lg:py-30"
    aria-labelledby="manifesto-heading"
  >
    <div className="grid-lines-ink pointer-events-none absolute inset-0" aria-hidden="true" />

    <div className="frame relative">
      <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
        <div className="col-span-4 lg:col-span-5">
          <p className="meta-ink">Sådan arbejder vi</p>
          <h2
            id="manifesto-heading"
            className="mt-6 max-w-measure font-display text-section text-ink text-balance"
          >
            Tre principper, der koster os opgaver.
          </h2>
        </div>
        <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted-ink lg:col-span-5 lg:col-start-8">
          Og som er grunden til, at samarbejderne holder længere end selve projektet.
        </p>
      </div>

      <div className="rule-ink mt-14 lg:mt-20">
        {principles.map((principle, index) => (
          <Reveal key={principle.number} delay={index * 70} className="rule-row-ink block">
            <div className="grid grid-cols-4 items-start gap-x-6 gap-y-4 py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-14">
              <p
                aria-hidden="true"
                className="col-span-4 font-display text-[3.5rem] leading-[0.8] text-ink/40 lg:col-span-2 lg:text-[5rem]"
              >
                {principle.number}
              </p>
              <h3 className="col-span-4 max-w-measure font-display text-display uppercase leading-[0.9] text-ink lg:col-span-5">
                {principle.title}
              </h3>
              <p className="col-span-4 max-w-measure text-[0.95rem] leading-relaxed text-muted-ink text-pretty lg:col-span-5">
                {principle.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ManifestoSection;
