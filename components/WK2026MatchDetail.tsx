
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MATCHES, MatchCard, PackCta, WA } from './WK2026Wedstrijden';

export const WK2026MatchDetail: React.FC = () => {
  const { matchSlug } = useParams<{ matchSlug: string }>();
  const m = MATCHES.find(x => x.pageSlug === matchSlug);

  React.useEffect(() => {
    if (!m) return;
    document.title = m.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', m.metaDesc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel','canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', `https://www.iptvtotaal.digital/wk-2026-live-kijken/${m.pageSlug}`);
    return () => {
      document.title = 'IPTVTotaal';
      if (metaDesc) metaDesc.setAttribute('content','');
      canonical.remove();
    };
  }, [m]);

  if (!m) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-28">
        <div className="text-center">
          <p className="text-white/40 mb-4">Wedstrijd niet gevonden.</p>
          <Link to="/wk-2026-live-kijken" className="text-amber-400 hover:text-amber-300 font-bold">
            ← Alle WK 2026 wedstrijden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/30 mb-6 sm:mb-8 font-medium overflow-hidden">
          <Link to="/" className="hover:text-white/60 transition-colors shrink-0">Home</Link>
          <span className="shrink-0">/</span>
          <Link to="/wk-2026-live-kijken" className="hover:text-white/60 transition-colors shrink-0">WK 2026 Live</Link>
          <span className="shrink-0">/</span>
          <span className="text-white/60 truncate min-w-0">{m.team1} vs {m.team2}</span>
        </nav>

        {/* Badge + date */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"/>
            FIFA WK 2026 · {m.group}
          </span>
          <span className="text-white/30 text-xs font-medium">{m.date} · {m.kickoff}</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter text-white leading-none mb-5 sm:mb-6">
          {m.team1} vs {m.team2}<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Live Kijken</span>
        </h1>

        <p className="text-white/50 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl">
          {m.intro}
        </p>

        {/* Match card — full width */}
        <div className="mb-14">
          <MatchCard
            team1={m.team1} team2={m.team2} code1={m.code1} code2={m.code2}
            matchDateISO={m.matchDateISO} kickoff={m.kickoff} venue={m.venue} group={m.group}
          />
        </div>

        {/* Quick CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-14">
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-base sm:text-lg rounded-full hover:scale-[1.02] transition-transform shadow-xl shadow-amber-500/30">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.532 5.85L.057 23.292a.75.75 0 00.908.98l5.65-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.704 9.704 0 01-4.95-1.354l-.354-.21-3.655.957.975-3.562-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            Kijk Live via WhatsApp — €78
          </a>
          <Link to={`/blog/${m.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/20 text-white/60 font-bold rounded-full hover:border-amber-400/50 hover:text-white transition-colors text-base no-underline">
            Uitgebreide matchanalyse →
          </Link>
        </div>

        {/* Team analysis */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-14">
          {/* Team 1 */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="text-2xl font-black text-white">{m.team1}</div>
              <div className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold uppercase tracking-widest">Sterktes</div>
            </div>
            <ul className="space-y-3">
              {m.team1Strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                  <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          {/* Team 2 */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="text-2xl font-black text-white">{m.team2}</div>
              <div className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold uppercase tracking-widest">Sterktes</div>
            </div>
            <ul className="space-y-3">
              {m.team2Strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                  <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Analysis */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 lg:p-8 mb-8 sm:mb-14">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Matchanalyse
          </h2>
          <p className="text-white/60 leading-relaxed">{m.analysis}</p>
        </div>

        {/* Why watch */}
        <div className="rounded-2xl p-px bg-gradient-to-br from-amber-400/40 via-yellow-500/20 to-amber-600/10 mb-8 sm:mb-14">
          <div className="rounded-[15px] bg-neutral-950 p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </div>
              <div>
                <div className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Waarom dit een must-watch is</div>
                <p className="text-white/70 leading-relaxed font-medium">{m.whyWatch}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="mb-8 sm:mb-14">
          <div className="text-xs font-black text-white/20 uppercase tracking-widest mb-3">Zoekopdrachten</div>
          <div className="flex flex-wrap gap-2">
            {m.keywords.map(kw => (
              <span key={kw} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/60 font-medium">{kw}</span>
            ))}
          </div>
        </div>

        {/* How to watch section */}
        <div className="mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-white mb-5 sm:mb-6">
            Hoe kijk je {m.team1} vs {m.team2} live?
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { step: '1', title: 'Bestel via WhatsApp', desc: 'Stuur een bericht en je bent binnen 5 minuten actief.' },
              { step: '2', title: 'Ontvang je inloggegevens', desc: 'Directe toegang op Smart TV, telefoon, tablet of laptop.' },
              { step: '3', title: 'Kijk live in HD/4K', desc: 'ESPN, Viaplay, Ziggo Sport — alles in één pakket.' },
            ].map(s => (
              <div key={s.step} className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-black font-black text-sm mb-3">{s.step}</div>
                <div className="font-black text-white mb-1">{s.title}</div>
                <div className="text-white/40 text-sm">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Pack */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-14">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-white mb-2">Activeer nu voor €78</h2>
            <p className="text-white/40">15 maanden toegang · Alle 104 WK-duels · Geen verborgen kosten</p>
          </div>
          <PackCta />
        </div>

        {/* Other matches */}
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-white mb-6">Andere WK 2026 wedstrijden</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {MATCHES.filter(x => x.pageSlug !== m.pageSlug).map(other => (
              <Link key={other.pageSlug} to={`/wk-2026-live-kijken/${other.pageSlug}`}
                className="group rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 p-4 transition-colors no-underline">
                <div className="text-xs font-black text-amber-400/60 uppercase tracking-widest mb-1">{other.group}</div>
                <div className="font-black text-white group-hover:text-amber-400 transition-colors">{other.team1} vs {other.team2}</div>
                <div className="text-white/30 text-xs mt-1">{other.date}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link to="/wk-2026-live-kijken" className="text-white/40 hover:text-white/70 text-sm font-medium transition-colors no-underline">
            ← Terug naar alle WK 2026 wedstrijden
          </Link>
        </div>

      </div>
    </div>
  );
};
