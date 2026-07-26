import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Nota: Ajustado a 'framer-motion' estándar si usas v11-
const fotoSentado = new URL("../img/c-sentado.JPG", import.meta.url).href;
const fotoAbrazado = new URL("../img/b-abrazado.JPG", import.meta.url).href;
const fotoAbrazo = new URL("../img/c-abrazo.JPG", import.meta.url).href;
const fotoPlaya = new URL("../img/b-sentado.jpg", import.meta.url).href;

// ─── Palette ───────────────────────────────────────────────────────────────
const GOLD = "#C5A059";
const SAGE = "#708672";
const SAND = "#FAF9F6";
const INK = "#2e2b25";

// ─── Fonts ─────────────────────────────────────────────────────────────────
const serif = "'Cormorant Garamond', serif";
const sans = "'Montserrat', sans-serif";
// ─── Helpers ───────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
  <p style={{ fontFamily: sans, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, marginBottom: "0.75rem", fontWeight: 500 }}>
    {children}
    </p>
    );
  }

function Divider() {

return (

<div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0 auto 3.5rem", maxWidth: 240 }}>

<div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}40)` }} />

<svg width="14" height="14" viewBox="0 0 14 14" fill="none">

<path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8L7 0Z" fill={GOLD} opacity="0.7" />

</svg>

<div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />

</div>

);

}

// ─── Tracks ────────────────────────────────────────────────────────────────
const SINGLE_TRACK = { 
  title: "Hasta mi final", 
  artist: "Il Divo", 
  duration: 212, 
  src: new URL("../audio/Hasta-mi-final.mp3", import.meta.url).href // Archivo real dentro de src/audio
};

// ─── COMPONENTE PRINCIPAL (CONTENEDOR) ──────────────────────────────────────
function Invitation() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playAudioRef = useRef<(() => Promise<void>) | null>(null);

  // Acción combinada al interactuar con el sobre
  const handleOpenEnvelope = () => {
    setOpened(true);
    playAudioRef.current?.().catch(err => {
      console.log("El navegador bloqueó la reproducción:", err);
    });
    setPlaying(true); // Dispara la música inmediatamente tras la interacción del usuario
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: SAND }}>
      {/* 1. Sección de Portada / Sobre */}
      <HeroSection opened={opened} onOpen={handleOpenEnvelope} />

      {/* 2. Reproductor de Música (Se monta globalmente controlado por el padre) */}
      <MusicWidget playing={playing} setPlaying={setPlaying} onReady={(play) => {
        playAudioRef.current = play;
      }} />
    </div>
  );
}

// ─── 1. HERO / ENVELOPE (Ajustado para recibir props) ───────────────────────
interface HeroSectionProps {
  opened: boolean;
  onOpen: () => void;
}

function HeroSection({ opened, onOpen }: HeroSectionProps) {
  const [sealHovered, setSealHovered] = useState(false);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: `url(${new URL("../img/DSC08684.JPG", import.meta.url)}) center/cover no-repeat`,
      position: "relative",
      overflow: "hidden",
      padding: "4rem 1.5rem",
    }}>
      {/* Ambient sun glow */}
      <div style={{ position: "absolute", top: "10%", right: "8%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,89,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(112,134,114,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Date ribbon */}
      <p style={{ fontFamily: sans, fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: SAGE, marginBottom: "2.5rem", fontWeight: 800 }}>
        19 · Diciembre · 2026
      </p>

      {/* Envelope */}
      <div 
        style={{ position: "relative", width: "min(420px, 90vw)", cursor: opened ? "default" : "pointer" }} 
        onClick={!opened ? onOpen : undefined}
      >
        {/* Envelope body */}
        <div style={{
          width: "100%",
          paddingBottom: "66%",
          background: "#f8f3ea",
          borderRadius: 8,
          boxShadow: "0 20px 60px rgba(112,134,114,0.15), 0 4px 16px rgba(0,0,0,0.06)",
          border: `1px solid rgba(197,160,89,0.25)`,
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease",
          transform: sealHovered && !opened ? "translateY(-4px)" : "translateY(0)",
        }}>
          {/* Envelope liner pattern */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} viewBox="0 0 420 280">
            {Array.from({ length: 8 }).map((_, i) =>
              Array.from({ length: 6 }).map((_, j) => (
                <path key={`${i}-${j}`} d={`M${i * 60 - 10} ${j * 50 - 10} L${i * 60 + 20} ${j * 50 + 15}`} stroke={GOLD} strokeWidth="1" />
              ))
            )}
          </svg>

          {/* Envelope flap open animation */}
          <motion.div
            animate={{ rotateX: opened ? -160 : 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "absolute", top: 0, left: 0, width: "100%",
              height: "50%", transformOrigin: "top center",
              background: "linear-gradient(135deg, #f2ebe0 0%, #ede5d4 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              zIndex: 4,
            }}
          />

          {/* V-fold bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, width: "100%", height: "50%",
            background: "linear-gradient(315deg, #ede8da 0%, #f5f0e5 100%)",
            clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
          }} />

          {/* Letter inside */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: -30, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                style={{
                  position: "absolute", top: "10%", left: "10%", width: "80%",
                  background: SAND, borderRadius: 6,
                  padding: "1.5rem 1.25rem",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  border: `1px solid rgba(197,160,89,0.2)`,
                  textAlign: "center", zIndex: 5,
                }}
              >
                <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "0.75rem", color: GOLD, marginBottom: "0.5rem", letterSpacing: "0.1em" }}>Con la bendición de nuestras familias</p>
                <p style={{ fontFamily: serif, fontSize: "1.6rem", color: INK, lineHeight: 1.2, fontWeight: 300 }}>Josseline & Eduardo</p>
                <p style={{ fontFamily: sans, fontSize: "0.58rem", letterSpacing: "0.2em", color: SAGE, marginTop: "0.5rem", textTransform: "uppercase" }}>Nos casamos</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wax seal */}
          {!opened && (
            <div
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 6, transition: "transform 0.2s ease",
              }}
              onMouseEnter={() => setSealHovered(true)}
              onMouseLeave={() => setSealHovered(false)}
            >
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="29" fill={GOLD} opacity="0.92" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <text x="32" y="27" textAnchor="middle" fontFamily={serif} fontSize="14" fill="white" opacity="0.9"></text>
                <text x="32" y="40" textAnchor="middle" fontFamily={serif} fontSize="16" fill="white" opacity="0.9">J &amp; E</text>
                <text x="32" y="53" textAnchor="middle" fontFamily={serif} fontSize="14" fill="white" opacity="0.9"></text>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      {!opened ? (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ fontFamily: sans, fontSize: "0.6rem", letterSpacing: "0.2em", color: INK, marginTop: "2rem", textTransform: "uppercase",fontWeight: 800 }}
        >
          Toca para abrir
        </motion.p>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300, color: INK, lineHeight: 1.05, letterSpacing: "0.02em" }}>
            Josseline &amp; Eduardo
          </h1>
          <p style={{ fontFamily: sans, fontSize: "1rem", letterSpacing: "0.3em", color: SAND, marginTop: "0.75rem", fontWeight: 400, textTransform: "uppercase" }}>
            Puerto Arista · 19 Diciembre 2026 · 5:00 PM
          </p>
          <div style={{ width: 40, height: "1px", background: GOLD, margin: "1.5rem auto 0", opacity: 0.6 }} />
        </motion.div>
      )}
      <br/>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background:"#faf9f6ed", border: `1px solid rgba(197,160,89,0.25)`, borderRadius: 24, padding: "0.4rem 1rem", marginBottom: "2.5rem" }}>
        {/* Cambiado stroke-width a strokeWidth para JSX válido */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
        <span style={{ fontFamily: sans, fontSize: "0.58rem", letterSpacing: "0.15em", color: "#8a7040", textTransform: "uppercase" }}>2 personas</span>
      </div>

      <br />
      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", opacity: 0.6 }}
      >
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke={SAND} strokeWidth="1.5" />
          <rect x="9" y="6" width="2" height="6" rx="1" fill={SAND} />
        </svg>
      </motion.div>
    </section>
  );
}

// ─── 2. MUSIC PLAYER (Sincronizado vía Props) ──────────────────────────────
interface MusicWidgetProps {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onReady: (play: () => Promise<void>) => void;
}

function MusicWidget({ playing, setPlaying, onReady }: MusicWidgetProps) {
  const [elapsed, setElapsed] = useState(0);
  const [expanded, setExpanded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Inicializar el elemento de audio nativo una sola vez
  useEffect(() => {
    audioRef.current = new Audio(SINGLE_TRACK.src);
    const audio = audioRef.current;
    onReady(() => audio.play());

    const handleTimeUpdate = () => setElapsed(audio.currentTime);
    const handleEnded = () => {
      setPlaying(false);
      setElapsed(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      onReady(() => Promise.resolve());
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [onReady, setPlaying]);

  // 2. Escuchar los cambios del estado 'playing' controlado por el padre
  useEffect(() => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.play().catch(err => {
        console.log("El navegador bloqueó la reproducción:", err);
        setPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [playing, setPlaying]);

  const progress = Math.min(elapsed / SINGLE_TRACK.duration, 1);
  const r = 22;
  const circ = 2 * Math.PI * r;

  function fmt(s: number) { 
    const m = Math.floor(s / 60); 
    return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`; 
  }

  return (
    <div style={{
      position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100,
      display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem",
    }}>
      {/* Panel Expandido */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            style={{
              background: "rgba(250,249,246,0.92)", backdropFilter: "blur(16px)",
              border: `1px solid rgba(197,160,89,0.2)`, borderRadius: 12,
              padding: "1rem 1.25rem", width: 200,
              boxShadow: playing ? `0 8px 32px rgba(112,134,114,0.2), 0 0 24px rgba(112,134,114,0.15)` : "0 8px 32px rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ fontFamily: serif, fontSize: "0.95rem", color: INK, fontWeight: 400, marginBottom: "0.1rem" }}>{SINGLE_TRACK.title}</p>
            <p style={{ fontFamily: sans, fontSize: "0.58rem", letterSpacing: "0.15em", color: SAGE, textTransform: "uppercase", marginBottom: "0.75rem" }}>{SINGLE_TRACK.artist}</p>
            
            {/* Barra de progreso */}
            <div style={{ height: 1, background: `rgba(197,160,89,0.2)`, borderRadius: 1, marginBottom: "0.75rem", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: 1, width: `${progress * 100}%`, background: GOLD, borderRadius: 1, transition: "width 0.1s linear" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {/* Botón de alternancia manual */}
              <button onClick={() => setPlaying(p => !p)} style={{ background: "none", border: `1px solid ${playing ? SAGE : GOLD}`, cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {playing
                  ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="5.5" y="4" width="4" height="16" rx="1.5" fill={SAGE} /><rect x="14.5" y="4" width="4" height="16" rx="1.5" fill={SAGE} /></svg>
                  : <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6.5 4.5L19 12L6.5 19.5V4.5Z" fill={GOLD} /></svg>
                }
              </button>
              
              <span style={{ fontFamily: sans, fontSize: "0.55rem", color: "#a09282" }}>{fmt(elapsed)} / {fmt(SINGLE_TRACK.duration)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Circular Flotante */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          position: "relative", width: 54, height: 54, borderRadius: "50%",
          background: "rgba(250,249,246,0.9)", backdropFilter: "blur(12px)",
          border: `1px solid rgba(197,160,89,0.25)`, cursor: "pointer",
          boxShadow: playing ? `0 0 20px rgba(112,134,114,0.3), 0 4px 16px rgba(0,0,0,0.06)` : "0 4px 16px rgba(0,0,0,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <svg width="54" height="54" viewBox="0 0 54 54" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
          <circle cx="27" cy="27" r={r} fill="none" stroke={`${GOLD}25`} strokeWidth="1.5" />
          <circle cx="27" cy="27" r={r} fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray={`${circ * progress} ${circ * (1 - progress)}`}
            style={{ transition: "stroke-dasharray 0.1s linear" }}
          />
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ zIndex: 1 }}>
          <path d="M9 18V5l12-2v13" stroke={playing ? SAGE : GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" fill={playing ? SAGE : GOLD} />
          <circle cx="18" cy="16" r="3" fill={playing ? SAGE : GOLD} />
        </svg>
      </button>
    </div>
  );
}
// ─── 3. Nuestros Padres ────────────────────────────────────────────────────
function PadresSection() {
  const families = [
    {
      side: "Familia de la Novia",
      parents: [
        { name: "Miguel Angel Carrasco Chevez", role: "Padre de Josseline" },
        { name: "Araceli Martínez Cabrera", role: "Madre de Josseline" },
      ],
    },
    {
      side: "Familia del Novio",
      parents: [
        { name: "Alejandro Enriquez Antonio", role: "Padre de Alexis Eduardo" },
        { name: "Martha Castillo Piñón", role: "Madre de Alexis Eduardo" },
      ],
    },
  ];

  return (
    <section style={{ padding: "6rem 1.5rem", background: SAND, textAlign: "center" }}>
      <SectionLabel>Nuestros Padres</SectionLabel>
      <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: INK, marginBottom: "0.5rem", lineHeight: 1.15 }}>
        Con su amor y bendición
      </h2>
      <p style={{ fontFamily: sans, fontSize: "0.75rem", color: SAGE, marginBottom: "3.5rem", letterSpacing: "0.05em", maxWidth: 380, margin: "0 auto 3.5rem" }}>
        Quienes nos han guiado y apoyado en este camino
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2px", maxWidth: 780, margin: "0 auto" }}>
        {families.map((fam, fi) => (
          <div key={fi} style={{ padding: "2.5rem 2rem", background: fi === 0 ? "#f5f2eb" : SAND, borderRadius: 8, border: `1px solid rgba(197,160,89,0.15)` }}>
            <p style={{ fontFamily: sans, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD, marginBottom: "1.5rem", fontWeight: 500 }}>{fam.side}</p>
            {fam.parents.map((p, pi) => (
              <div key={pi} style={{ marginBottom: pi < fam.parents.length - 1 ? "1.25rem" : 0 }}>
                <p style={{ fontFamily: serif, fontSize: "1.15rem", color: INK, fontWeight: 400, marginBottom: "0.15rem" }}>{p.name}</p>
                <p style={{ fontFamily: sans, fontSize: "0.6rem", color: SAGE, letterSpacing: "0.08em" }}>{p.role}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Ampersand divider */}
      <div style={{ textAlign: "center", margin: "3rem 0 0" }}>
        <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: "2.5rem", color: GOLD, opacity: 0.4 }}>&amp;</span>
      </div>
    </section>
  );
}

// ─── 4. Nuestra Historia ───────────────────────────────────────────────────
const HISTORIA = [
  { title: "El primer encuentro", body: "Éramos apenas unos niños en 1999 aprendiendo a colorear, y entre casualidades (o quizá planes de Dios), casi siempre nos tocaba bailar juntos en los festivales escolares.", img: fotoSentado, imgAlt: "Pareja en la ciudad" },
  { title: "Un reencuentro inesperado", 
    body: "Los años pasaron y, en la preparatoria, la amistad nos volvió a reunir. Entre risas, conversaciones y momentos compartidos, nunca dejamos de estar presentes en la vida del otro. Siempre hubo un cariño sincero que permaneció con el tiempo.", img: fotoAbrazado, imgAlt: "Pareja bailando entre árboles" },
  { title: "Cuando la amistad se convirtió en amor", 
    body: "Hasta que un día decidimos darle una oportunidad al amor y descubrimos que compartíamos sueños, valores y la misma ilusión de construir un futuro juntos.", img: fotoAbrazo, imgAlt: "Momento íntimo en pareja" },
  { title:"El inicio de nuestro para siempre", body: "Hoy, con Dios en el centro de nuestra vida y la certeza de que queremos caminar juntos para siempre.", img: fotoPlaya, imgAlt:"Pareja caminando en la playa" },
  //{ title: "La propuesta", body: "Al atardecer frente al mar, con los pies en la arena y los corazones llenos, Alexis Eduardo le pidió matrimonio a Sofía.", img: "https://images.unsplash.com/photo-1591969851586-adbbd4accf81?w=400&h=320&fit=crop&auto=format", imgAlt: "Silueta al atardecer en la playa" },
  //{ title: "Para siempre", body: "Hoy celebramos nuestro amor rodeados de quienes más queremos, a orillas del Caribe.", img: "https://images.unsplash.com/photo-1768611262527-2b22941ac27f?w=400&h=320&fit=crop&auto=format", imgAlt: "Pareja caminando en la playa" },
];

function HistoriaSection() {
  return (
    <section style={{ padding: "6rem 1.5rem", background: "#f5f2eb", textAlign: "center" }}>
      <SectionLabel>Nuestra Historia</SectionLabel>
      <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: INK, marginBottom: "1.5rem", lineHeight: 1.15 }}>
        El camino hasta aquí
      </h2>
      <p style={{ fontFamily: sans, fontSize: "0.8rem", color: SAGE, marginBottom: "2.5rem", maxWidth: 520, margin: "0 auto 3.5rem" }}>
        Dicen que algunas historias de amor comienzan con una mirada… la nuestra comenzó con crayones y un salón de kínder.
      </p>

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* Vertical spine */}
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${GOLD}45, transparent)`, transform: "translateX(-50%)", pointerEvents: "none" }} />

        {HISTORIA.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 40px 1fr",
                alignItems: "center",
                gap: "0 1.5rem",
                textAlign: isEven ? "right" : "left",
              }}
            >
              {/* Left slot */}
              {isEven ? (
                <div style={{ paddingRight: "0.5rem" }}>
                  <p style={{ fontFamily: serif, fontSize: "1.1rem", color: INK, fontWeight: 500, marginBottom: "0.4rem" }}>{item.title}</p>
                  <p style={{ fontFamily: sans, fontSize: "0.68rem", color: "#6a6255", lineHeight: 1.7, fontWeight: 300 }}>{item.body}</p>
                </div>
              ) : (
                <div style={{ paddingRight: "0.5rem", borderRadius: 8, overflow: "hidden", background: "#ddd", aspectRatio: "4/3", position: "relative" }}>
                  <img src={item.img} alt={item.imgAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 8 }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: 8, boxShadow: "inset 0 0 0 1px rgba(197,160,89,0.18)" }} />
                </div>
              )}

              {/* Center node */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, zIndex: 1 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: GOLD, border: `3px solid #f5f2eb`, boxShadow: `0 0 0 1px rgba(197,160,89,0.5)`, flexShrink: 0 }} />
              </div>

              {/* Right slot */}
              {isEven ? (
                <div style={{ paddingLeft: "0.5rem", borderRadius: 8, overflow: "hidden", background: "#ddd", aspectRatio: "4/3", position: "relative" }}>
                  <img src={item.img} alt={item.imgAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 8 }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: 8, boxShadow: "inset 0 0 0 1px rgba(197,160,89,0.18)" }} />
                </div>
              ) : (
                <div style={{ paddingLeft: "0.5rem", textAlign: "left" }}>
                  <p style={{ fontFamily: serif, fontSize: "1.1rem", color: INK, fontWeight: 500, marginBottom: "0.4rem" }}>{item.title}</p>
                  <p style={{ fontFamily: sans, fontSize: "0.68rem", color: "#6a6255", lineHeight: 1.7, fontWeight: 300 }}>{item.body}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <p style={{ fontFamily: sans, fontSize: "0.8rem", color: SAGE, marginBottom: "2.5rem", maxWidth: 520, margin: "0 auto 3.5rem" }}>
        Porque algunas historias simplemente estaban destinadas a encontrarse… una y otra vez.
      </p>
    </section>
  );
}

// ─── 5. Ceremony Details ───────────────────────────────────────────────────
function CeremonySection() {
  return (
    <section style={{ padding: "6rem 1.5rem", background: SAND, textAlign: "center" }}>
      <SectionLabel>La Ceremonia</SectionLabel>
      <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: INK, marginBottom: "3.5rem", lineHeight: 1.15 }}>
        Detalles del día especial
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: 860, margin: "0 auto" }}>
        {/* Details card */}
        <div style={{ background: "#f5f2eb", borderRadius: 8, border: `1px solid rgba(197,160,89,0.18)`, padding: "2.5rem 2rem", textAlign: "left" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: "1.25rem" }}>
            <rect x="2" y="6" width="28" height="24" rx="3" stroke={GOLD} strokeWidth="1.5" fill="none" />
            <path d="M2 12H30" stroke={GOLD} strokeWidth="1" opacity="0.5" />
            <rect x="9" y="2" width="2" height="8" rx="1" fill={GOLD} />
            <rect x="21" y="2" width="2" height="8" rx="1" fill={GOLD} />
            <text x="16" y="24" textAnchor="middle" fontFamily={serif} fontSize="10" fill={GOLD} fontWeight="600">19</text>
          </svg>
          <p style={{ fontFamily: serif, fontSize: "2rem", color: INK, fontWeight: 300, lineHeight: 1.15, marginBottom: "0.5rem" }}>
            19 de Diciembre<br />
            <span style={{ fontStyle: "italic", color: SAGE }}>2026</span>
          </p>
          <p style={{ fontFamily: sans, fontSize: "0.7rem", color: SAGE, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>5:00 PM · Hora local</p>
          <div style={{ height: 1, background: `rgba(197,160,89,0.2)`, marginBottom: "1.25rem" }} />
          {[
            { label: "Ceremonia civil", val: "5:00 PM — Playa Principal" },
            { label: "Recepción", val: "6:00 PM — Salón Palma Real" },
          ].map((row, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? "0.75rem" : 0 }}>
              <p style={{ fontFamily: sans, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "0.15rem" }}>{row.label}</p>
              <p style={{ fontFamily: serif, fontSize: "0.9rem", color: INK }}>{row.val}</p>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid rgba(197,160,89,0.18)`, position: "relative", minHeight: 300, background: "#e8e4d8" }}>
          <img
            src={new URL("../img/playa.JPG", import.meta.url).toString()}
            alt="Camino a la playa"
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: 0.65 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(46,43,37,0.5) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
            <p style={{ fontFamily: serif, fontSize: "1.1rem", color: SAND, marginBottom: "0.25rem" }}>Salón Palma Real</p>
            <p style={{ fontFamily: sans, fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(250,249,246,0.8)", textTransform: "uppercase" }}>Blvd. Mariano Matamoros S/N, Puerto Arista, Chiapas</p>
            <a href="https://maps.app.goo.gl/cvX8Y9EjtA1krsSH7?g_st=iw" style={{ display: "inline-block", marginTop: "0.75rem", fontFamily: sans, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: SAND, textDecoration: "none", border: `1px solid ${SAND}60`, borderRadius: 4, padding: "0.4rem 0.85rem" }}>
              Ver en Maps →
            </a>
          </div>
          {/* Pin */}
          <div style={{ position: "absolute", top: "40%", left: "52%", transform: "translate(-50%, -50%)" }}>
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
              <path d="M14 0C6.27 0 0 6.27 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.27 21.73 0 14 0Z" fill={GOLD} />
              <circle cx="14" cy="14" r="6" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. Itinerary ──────────────────────────────────────────────────────────
const ITINERARY = [
  { time: "4:30 PM", event: "Recepción de invitados", note: "Encuentro en la ceremonia civil frente al mar", icon: "🌊" },
  { time: "5:00 PM", event: "Enlace civil", note: "Playa de la ceremonia con vista al mar", icon: "💍" },
  { time: "5:30 PM", event: "Cocktail", note: "Salón Palma Real · Toma de asientos", icon: "🥂" },
  { time: "5:35 PM", event: "Sesión de fotos", note: "Luz dorada del atardecer", icon: "📸" },
  { time: "6:00 PM", event: "Celebración", note: "Programa tradicional", icon: "🎤" },
  { time: "6:40 PM", event: "Cena de bodas", note: "Menú de dos tiempos", icon: "🍽️" },
  { time: "8:30 PM", event: "Fiesta y baile", note: "DJ set · Hasta las 12 AM", icon: "🎶" },
];

function ItinerarySection() {
  return (
    <section style={{ padding: "6rem 1.5rem", background: "#f5f2eb", textAlign: "center" }}>
      <SectionLabel>Cronograma</SectionLabel>
      <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: INK, marginBottom: "3.5rem", lineHeight: 1.15 }}>
        Programa del Día
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", maxWidth: 860, margin: "0 auto" }}>
        {ITINERARY.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              background: SAND, borderRadius: 8, padding: "1.5rem 1.25rem",
              border: `1px solid rgba(197,160,89,0.15)`,
              textAlign: "left",
              transition: "box-shadow 0.2s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: sans, fontSize: "0.6rem", letterSpacing: "0.15em", color: GOLD, fontWeight: 500 }}>{item.time}</span>
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
            </div>
            <p style={{ fontFamily: serif, fontSize: "1rem", color: INK, fontWeight: 500, marginBottom: "0.3rem" }}>{item.event}</p>
            <p style={{ fontFamily: sans, fontSize: "0.62rem", color: SAGE, lineHeight: 1.55, fontWeight: 300 }}>{item.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── 7. Info Cards ─────────────────────────────────────────────────────────
function InfoSection() {  
  const cards = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" stroke={GOLD} strokeWidth="1.5" fill="none" />
          <path d="M14 6v8l5 3" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: "Clima en la Playa",
      content: "En diciembre, Puerto Arista disfruta de un clima cálido y agradable, con temperaturas entre 21 °C y 30 °C. Es una de las mejores temporadas para visitar la playa, gracias a sus días soleados, pocas lluvias y tardes frescas.",
      tag: "21-30°C promedio",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M8 4c0 4 4 8 4 12s-4 8-4 8" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M14 6c0 3 3 6 3 10s-3 7-3 7" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      ),
      title: "Vestimenta",
      content: "Queremos que disfrutes este día con total comodidad. Al ser una celebración en la playa, siéntete libre de vestir de la manera en que te sientas más cómodo, siempre con el toque especial que merece esta ocasión.",
      tag: "Playa Formal",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="8" width="22" height="16" rx="3" stroke={GOLD} strokeWidth="1.5" fill="none" />
          <path d="M3 13h22" stroke={GOLD} strokeWidth="1" opacity="0.5" />
          <circle cx="20" cy="18" r="2" fill={GOLD} opacity="0.7" />
        </svg>
      ),
      title: "Mesa de Regalos",
      content: "Lo más importante para nosotros es compartir este día contigo. Si además deseas hacernos un obsequio, con mucho cariño agradeceremos una contribución para nuestro nuevo hogar, ya sea mediante transferencia bancaria o personalmente el día de la celebración.",
      tag: "Transferencia CLABE",
      extra: "CLABE: 012 680 015 587 187 027\nBanco BBVA\nJosseline Carrasco Martínez",
    },
  ];

  return (
    <section style={{ padding: "6rem 1.5rem", background: `url(${new URL("../img/fondo.png", import.meta.url)}) center/cover no-repeat`, textAlign: "center" }}>
         <SectionLabel>
        <span style={{ color: "#3c563f" }}>Información Práctica</span>
      </SectionLabel>
      <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: SAND, marginBottom: "3.5rem", lineHeight: 1.15 }}>
        Todo lo que necesitas saber
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", maxWidth: 900, margin: "0 auto" }}>
        {cards.map((card, i) => (
          <div key={i} style={{ background: "#f5f2eb", borderRadius: 8, border: `1px solid rgba(197,160,89,0.15)`, padding: "2rem 1.75rem", textAlign: "left" }}>
            <div style={{ marginBottom: "1rem" }}>{card.icon}</div>
            <span style={{ display: "inline-block", fontFamily: sans, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, border: `1px solid rgba(197,160,89,0.35)`, borderRadius: 3, padding: "0.25rem 0.6rem", marginBottom: "0.75rem" }}>{card.tag}</span>
            <h3 style={{ fontFamily: serif, fontSize: "1.2rem", color: INK, fontWeight: 500, marginBottom: "0.6rem" }}>{card.title}</h3>
            <p style={{ fontFamily: sans, fontSize: "0.68rem", color: "#6a6255", lineHeight: 1.7, fontWeight: 300 }}>{card.content}</p>
            {card.extra && (
              <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(197,160,89,0.06)", borderRadius: 6, border: `1px solid rgba(197,160,89,0.15)` }}>
                <p style={{ fontFamily: "monospace", fontSize: "0.62rem", color: SAGE, lineHeight: 1.6, whiteSpace: "pre-line" }}>{card.extra}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 8. Lodging ────────────────────────────────────────────────────────────
const HOTELS = [
  { name: "Hotel Orquideas", cat: "https://maps.app.goo.gl/irge7cUwJ4EEbSsK6", price: "Desde $950 MXN/noche", perks: "TV Cable · Clima · Estacionamiento · Restaurante/Cafe a un costado · WIFI", img: new URL("../img/HOTEL-ORQUIDIAS.png", import.meta.url).href },
  { name: "Hotel Luz Marina", cat: "https://maps.app.goo.gl/mKgfwQU8Cmkr135A8", price: "Desde $1,700 MXN/noche", perks: "TV Cable · Clima · Vista playa · Estacionamiento · Restaurante · WIFI", img: new URL("../img/HOTEL-LUZ-MARIA.png", import.meta.url).href },
  { name: "Hotel Garden Beach", cat: "https://maps.app.goo.gl/fMJKTm2jcW7MvqKQ7", price: "Desde $2,000 MXN/noche", perks: "TV Cable · Clima · Estacionamiento · Restaurante · WIFI", img: new URL("../img/HOTEL-GARDEN-BEACH.png", import.meta.url).href },
  { name: "Hotel Grant Coral", cat: "https://maps.app.goo.gl/QcVQBPqJbBj6sXAEA", price: "Desde $2,000 MXN/noche", perks: "TV Cable · Clima · Alberca · Estacionamiento · Restaurante · WIFI", img: new URL("../img/HOTEL-GRAND-CORAL.png", import.meta.url).href },
];

function LodgingSection() {
  return (
    <section style={{ padding: "6rem 1.5rem", background: "#f5f2eb", textAlign: "center" }}>
      <SectionLabel>Hospedaje</SectionLabel>
      <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: INK, marginBottom: "0.5rem", lineHeight: 1.15 }}>
        Dónde quedarse
      </h2>
      <p style={{ fontFamily: sans, fontSize: "0.72rem", color: SAGE, marginBottom: "3.5rem", maxWidth: 420, margin: "0 auto 3.5rem" }}>
        Hemos recopilado algunas sugerencias de lugares cerca de nuestra gran fiesta.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", maxWidth: 820, margin: "0 auto" }}>
        {HOTELS.map((h, i) => (
          <div key={i} style={{ borderRadius: 8, overflow: "hidden", background: SAND, border: `1px solid rgba(197,160,89,0.18)`, textAlign: "left" }}>
            <div style={{ height: 180, overflow: "hidden", background: "#ddd", position: "relative" }}>
              <img src={h.img} alt={h.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontFamily: serif, fontSize: "1.15rem", color: INK, fontWeight: 400, marginBottom: "0.3rem" }}>{h.name}</h3>
              <p style={{ fontFamily: sans, fontSize: "0.65rem", color: GOLD, fontWeight: 500, marginBottom: "0.75rem" }}>{h.price}</p>
              <p style={{ fontFamily: sans, fontSize: "0.62rem", color: "#7a7060", lineHeight: 1.6, marginBottom: "1rem" }}>{h.perks}</p>
              <a
        href={h.cat}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", marginBottom: "0.5rem", fontFamily: sans, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, textDecoration: "none", border: `1px solid ${GOLD}60`, borderRadius: 4, padding: "0.4rem 0.85rem" }}
      >
        Ver en Maps →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 10. Countdown ─────────────────────────────────────────────────────────
function CountdownSection() {
  const TARGET = new Date("2026-12-19T17:00:00").getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, TARGET - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const units = [
    { val: d, label: "Días" },
    { val: h, label: "Horas" },
    { val: m, label: "Minutos" },
    { val: s, label: "Segundos" },
  ];

  return (
    <section style={{
      padding: "7rem 1.5rem",
      background: `linear-gradient(rgba(0,0,0,0.45), rgba(94, 92, 92, 0.45)), url(${new URL("../img/DSC08716.jpg", import.meta.url)}) center/cover no-repeat`,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,89,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <SectionLabel>Cuenta Regresiva</SectionLabel>
      <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: INK, marginBottom: "3.5rem", lineHeight: 1.15 }}>
        Faltan solo…
      </h2>

      <div style={{ display: "flex", gap: "clamp(1rem,3vw,3rem)", justifyContent: "center", flexWrap: "wrap" }}>
        {units.map((u, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: serif, fontSize: "clamp(3rem,8vw,5.5rem)", fontWeight: 300, color: INK,
              lineHeight: 1, width: "clamp(80px,12vw,120px)",
              borderBottom: `1px solid rgba(197,160,89,0.35)`,
              paddingBottom: "0.25rem", marginBottom: "0.5rem",
            }}>
              {String(u.val).padStart(2, "0")}
            </div>
            <p style={{fontFamily: sans, fontSize: "0.8rem", letterSpacing: "0.25em", textTransform: "uppercase", color: SAND, fontWeight: 500}}>{u.label}</p>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1.5rem", color: INK, marginTop: "3rem", opacity: 1 }}>
        19 de Diciembre de 2026 · 5:00 PM · Puerto Arista
      </p>
    </section>
  );
}

// ─── 11. RSVP ──────────────────────────────────────────────────────────────
function RSVPSection() {
  const WA_LINK = "https://wa.link/iys8d5";

  return (
    <section style={{ padding: "7rem 1.5rem", background: SAND, textAlign: "center" }}>
      <SectionLabel>Confirma tu Asistencia</SectionLabel>
      <h2 style={{ fontFamily: serif, fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 300, color: INK, lineHeight: 1.1, marginBottom: "1rem" }}>
        ¿Nos acompañas?
      </h2>
      <p style={{ fontFamily: sans, fontSize: "0.72rem", color: SAGE, lineHeight: 1.75, maxWidth: 420, margin: "0 auto 0.5rem", fontWeight: 300 }}>
        Queremos tenerte con nosotros en este día tan especial. Por favor confirma tu asistencia antes de
      </p>
      <br/>
      {/* Deadline pill */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(197,160,89,0.08)", border: `1px solid rgba(197,160,89,0.25)`, borderRadius: 24, padding: "0.4rem 1rem", marginBottom: "2.5rem" }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" stroke={GOLD} strokeWidth="1.2" />
          <path d="M5 2.5V5L6.5 6.5" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: sans, fontSize: "0.58rem", letterSpacing: "0.15em", color: "#8a7040", textTransform: "uppercase" }}>Fecha límite: 15 Sep 2026</span>
      </div>

      <br />

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.75rem",
          background: SAGE, color: SAND, textDecoration: "none",
          fontFamily: sans, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500,
          padding: "1rem 2.5rem", borderRadius: 8,
          boxShadow: `0 8px 24px rgba(112,134,114,0.3)`,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 32px rgba(112,134,114,0.4)`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 24px rgba(112,134,114,0.3)`; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.836L0 24l6.335-1.492A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.845 0-3.576-.474-5.083-1.305l-.366-.217-3.761.886.902-3.671-.239-.378A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fill="currentColor" />
        </svg>
        Confirmar por WhatsApp
      </a>

      <p style={{ fontFamily: sans, fontSize: "0.58rem", color: "#b0a898", marginTop: "1.5rem", letterSpacing: "0.05em" }}>
        También puedes escribirnos directamente: 999 113 7056
      </p>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "3rem 1.5rem", background: "#f0ede4", textAlign: "center", borderTop: `1px solid rgba(197,160,89,0.15)` }}>
      <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1.4rem", color: INK, fontWeight: 300, marginBottom: "0.5rem" }}>Josseline &amp; Alexis Eduardo</p>
      <p style={{ fontFamily: sans, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: SAGE, marginBottom: "1.5rem" }}>19 · Diciembre · 2026 · Puerto Arista</p>
      <div style={{ width: 32, height: "1px", background: GOLD, margin: "0 auto", opacity: 0.5 }} />
      <p style={{ fontFamily: sans, fontSize: "0.55rem", color: "#b0a898", marginTop: "1.5rem", letterSpacing: "0.08em" }}>Hecho con amor para nuestra familia y amigos</p>
    </footer>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playAudioRef = useRef<(() => Promise<void>) | null>(null);

  const handleOpenEnvelope = () => {
    setOpened(true);
    playAudioRef.current?.().catch(err => {
      console.log("El navegador bloqueó la reproducción:", err);
    });
    setPlaying(true);
  };

  return (
    <div style={{ fontFamily: sans, background: SAND, overflowX: "hidden" }}>
      <HeroSection opened={opened} onOpen={handleOpenEnvelope} />
      <MusicWidget
        playing={playing}
        setPlaying={setPlaying}
        onReady={(play) => {
          playAudioRef.current = play;
        }}
      />
      <PadresSection />
      <Divider />
      <HistoriaSection />
      <Divider />
      <CeremonySection />
      <ItinerarySection />
      <InfoSection />
      <LodgingSection />
      <CountdownSection />
      <RSVPSection />
      <Footer />
    </div>
  );
}