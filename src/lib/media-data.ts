
/**
 * @fileOverview Repositorio central de datos multimedia para El Semanario HOY.
 * Centraliza videos, podcasts, reels y comparativas para evitar duplicidad.
 */

export const officialVideos = [
  // EL CENTRO VIVE Y RESUENA CON EL SEMANARIO - SOCIALIZACIÓN
  { id: 'v-social-vive', title: 'SOCIALIZACIÓN DEL PROYECTO', season: 'DESTACADO', youtubeId: 'g23v49jUT1s', description: 'Presentación oficial de la iniciativa cultural y periodística que busca revitalizar el corazón de Medellín.', project: 'centro-vive' },

  // TEMPORADA 2 (2026) / REGISTRO ACTUALIDAD
  { id: 'v-t2-reg', title: 'EL CENTRO VIVE Y RESUENA: REGISTRO ACTUAL', season: 'TEMPORADA 2 (2026)', youtubeId: 'l530ZiOZjQk', description: 'Un faro en el corazón de Medellín - Registro 2024.', project: 'centro-vive' },
  { id: 'v-t2-confiar', title: 'CASA DE LA CULTURA Y LA COOPERACIÓN - CONFIAR', season: 'TEMPORADA 2 (2026)', youtubeId: 'pjaVRc87HXs', description: 'Registro patrimonial 2024 en el corazón de la ciudad.', project: 'centro-vive' },
  { id: 'v-t2-homero', title: 'LA CASA CULTURAL DEL TANGO - HOMERO MANZI', season: 'TEMPORADA 2 (2026)', youtubeId: 'H-xpovnPZaQ', description: 'La esquina del tango en Medellín. Tradición y bohemia.', project: 'centro-vive' },
  { id: 'v-t2-tpm', title: 'TEATRO POPULAR DE MEDELLÍN', season: 'TEMPORADA 2 (2026)', youtubeId: 'VDFE_1Cgl2g', description: 'Donde el silencio habla y la palabra vuela.', project: 'centro-vive' },
  { id: 'v-t2-pablo', title: 'TEATRO PABLO TOBÓN URIBE', season: 'TEMPORADA 2 (2026)', youtubeId: 'lrrYQthosl8', description: 'En el alma de Medellín. Un recorrido por la gestión cultural actual.', project: 'centro-vive' },
  { id: 'v-t2-bellas-artes', title: 'PALACIO DE BELLAS ARTES: 100 AÑOS PERFILANDO EL ARTE EN MEDELLÍN', season: 'TEMPORADA 2 (2026)', youtubeId: 'b1-7M43vr0U', description: 'Un siglo de historia, formación y creación artística en el corazón de la ciudad.', project: 'centro-vive' },

  // TEMPORADA 1 (2025)
  { id: 'v-t1-9', title: 'EPISODIO 9: LA HUERTA', season: 'TEMPORADA 1 (2025)', youtubeId: 'YaLSyFGmT5Y', description: 'Un espacio cultural en el corazón de Medellín. Soberanía alimentaria y cultura.', project: 'centro-vive' },
  { id: 'v-t1-8', title: 'EPISODIO 8: AGUA DULCE', season: 'TEMPORADA 1 (2025)', youtubeId: 'vgiHCjG4OzY', description: 'Un oasis con tres experiencias en el Parque del Periodista.', project: 'centro-vive' },
  { id: 'v-t1-7', title: 'EPISODIO 7: VIVA PALABRA', season: 'TEMPORADA 1 (2025)', youtubeId: 'jaS5sXS67Xc', description: '28 años contando cuentos en el centro de Medellín.', project: 'centro-vive' },
  { id: 'v-t1-6', title: 'EPISODIO 6: ARTE URBANO', season: 'TEMPORADA 1 (2025)', youtubeId: 'KdFvqG0qUlQ', description: 'La calle como lienzo de expresión cultural.', project: 'centro-vive' },
  { id: 'v-t1-5', title: 'EPISODIO 5: CASA DEL ENCUENTRO', season: 'TEMPORADA 1 (2025)', youtubeId: 'zMFHJfp6st4', description: 'Diálogos y saberes en un espacio histórico.', project: 'centro-vive' },
  { id: 'v-t1-4', title: 'EPISODIO 4: PEQUEÑO TEATRO', season: 'TEMPORADA 1 (2025)', youtubeId: '3nwMCxiW57E', description: '45 años de arte dramático y resistance cultural.', project: 'centro-vive' },
  { id: 'v-t1-3', title: 'EPISODIO 3: TRADICIÓN', season: 'TEMPORADA 1 (2025)', youtubeId: 'l1nhyWNDgp0', description: 'Historias que definen nuestra identidad.', project: 'centro-vive' },
  { id: 'v-t1-2', title: 'EPISODIO 2: REGISTRO', season: 'TEMPORADA 1 (2025)', youtubeId: 'D_7TBSnII94', description: 'Primeros pasos del proyecto El Centro Vive.', project: 'centro-vive' },
  { id: 'v-t1-1', title: 'EPISODIO 1: EL ORIGEN', season: 'TEMPORADA 1 (2025)', youtubeId: 'FaGMpv2db_M', description: 'El inicio de una historia de resistance cultural en el corazón de la ciudad.', project: 'centro-vive' },

  // CREA DIGITAL 2026
  { 
    id: 'v-2026-1', 
    title: 'CORTOMETRAJE 1: ORIGEN Y RESISTENCIA', 
    season: 'PRODUCCIÓN 2026', 
    description: 'Acto I: El contexto, el sueño fundacional y los primeros pasos de las organizaciones que habitan el centro.',
    thumbnailUrl: 'https://picsum.photos/seed/crea1/800/450',
    isPlaceholder: true,
    project: 'crea-digital'
  },
  { 
    id: 'v-2026-2', 
    title: 'CORTOMETRAJE 2: PRESENTE Y ECOSISTEMA', 
    season: 'PRODUCCIÓN 2026', 
    description: 'Acto II: El quehacer cotidiano y el impacto en el entorno. El trabajo vivo capturado desde el aire y la calle.',
    thumbnailUrl: 'https://picsum.photos/seed/crea2/800/450',
    isPlaceholder: true,
    project: 'crea-digital'
  },
  { 
    id: 'v-2026-3', 
    title: 'CORTOMETRAJE 3: FUTURO Y CIUDADANÍAS', 
    season: 'PRODUCCIÓN 2026', 
    description: 'Acto III: Los sueños por cumplir y las nuevas ciudadanías. Un cierre que abre preguntas sobre el territorio.',
    thumbnailUrl: 'https://picsum.photos/seed/crea3/800/450',
    isPlaceholder: true,
    project: 'crea-digital'
  }
];

export const podcasts = [
  { 
    id: 0, 
    title: "RESUMEN HISTÓRICO: EL SEMANARIO CULTURAL", 
    duration: "MÍN. 5 MIN", 
    audioUrl: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/podcast_semanario/el-semanario.mp3",
    desc: "Medellín, 1990. Una ciudad que bullía entre la industria y una violencia que empezaba a teñir sus calles. En ese contexto nació un periódico que no hablaba de política ni de crímenes, sino de versos, cámaras y escenarios.",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/podcast_semanario/portada-podcast.png",
    color: "#D9A02F",
    overlay: "rgba(217, 160, 47, 0.6)",
    questions: [
      "¿Cómo nació el Semanario Cultural en 1990?",
      "¿Quiénes fueron sus fundadores?",
      "¿Cuál era el lema de la primera edición?",
      "¿Qué papel jugó la Cooperativa Confiar?"
    ]
  },
  { 
    id: 1, 
    title: "EPISODIO 1: ORÍGENES", 
    duration: "MÍN. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    desc: "Indagamos en los inicios del Semanario Cultural como herramienta de comunicación alternativa en una ciudad que aprendía a resistir.",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/archivo/portadas/collage.jpg",
    color: "#C43D4C",
    overlay: "rgba(196, 61, 76, 0.6)",
    questions: [
      "¿Qué motivó la creación del Semanario?",
      "¿Cómo se tejieron las primeras redes de solidaridad?",
      "¿Qué temas atravesaban sus páginas?"
    ]
  },
  { 
    id: 2, 
    title: "EPISODIO 2: VOX POPULI", 
    duration: "MÍN. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    desc: "Exploramos las organizaciones de ayer que permanecen aún hoy, demostrando que la cultura es un eje de transformación que persiste.",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/mas%20imagenes/fragmentos-de-memoria-archivo-vivo-4.png",
    color: "#2B898D",
    overlay: "rgba(43, 137, 141, 0.6)",
    questions: [
      "¿Qué organizaciones de los 90 siguen activas?",
      "¿Cómo han evolucionado sus procesos?",
      "¿Cuál es su relación con la memoria del territorio?"
    ]
  },
  { 
    id: 3, 
    title: "EPISODIO 3: PERSONAJES", 
    duration: "MÍN. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    desc: "Testimonios de protagonistas de una época: periodistas, artistas y gestores que hicieron del periodismo cultural un escudo de resistance.",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/mas%20imagenes/agenda-cp-puente-arch-1.png",
    color: "#D9A02F",
    overlay: "rgba(217, 160, 47, 0.6)",
    questions: [
      "¿Quiénes fueron las voces clave?",
      "¿Qué anécdotas marcaron la década?",
      "¿Cómo ven la ciudad hoy?"
    ]
  },
  { 
    id: 4, 
    title: "EPISODIO 4: CÓMO SE CRECE", 
    duration: "MÍN. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    desc: "Redes culturales, salas concertadas y proyectos colaborativos. Analizamos cómo se ha construido el ecosistema creativo hoy en Medellín.",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/mas%20imagenes/data-stream.png",
    color: "#7D518F",
    overlay: "rgba(125, 81, 143, 0.6)",
    questions: [
      "¿Cómo funcionan las salas concertadas?",
      "¿Cuál es el poder de los proyectos colaborativos?",
      "¿Cómo se fortalece el tejido cultural?"
    ]
  },
  { 
    id: 5, 
    title: "EPISODIO 5: NUEVAS ORGANIZACIONES", 
    duration: "MÍN. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    desc: "Jóvenes creadores y gestores que hoy lideran la escena. Un diálogo intergeneracional sobre el derecho a la ciudad desde la cultura.",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/mas%20imagenes/fragmentos-de-memoria-archivo-vivo-4-v2.png",
    color: "#6C8157",
    overlay: "rgba(108, 129, 87, 0.6)",
    questions: [
      "¿Quiénes son los nuevos protagonistas?",
      "¿Cómo narran la ciudad hoy?",
      "¿Cuál es su visión de futuro?"
    ]
  }
];

export const reels = [
  { id: 'r1', title: 'UN DÍA EN LA VIDA', youtubeId: 'jaS5sXS67Xc', description: 'Narrativa observacional de 60 segundos.' },
  { id: 'r2', title: 'EL ORIGEN EN 60"', youtubeId: 'KdFvqG0qUlQ', description: 'Condensado de la historia fundacional.' },
  { id: 'r3', title: 'MANOS QUE CREAN', youtubeId: 'lrrYQthosl8', description: 'Estudio visual sobre el trabajo manual.' },
  { id: 'r4', title: 'MANOS QUE CREAN 2', youtubeId: 'l530ZiOZjQk', description: 'Estudio visual sobre el trabajo manual.' },
  { id: 'r5', title: 'LO QUE MEDELLÍN NO SABE', youtubeId: 'YaLSyFGmT5Y', description: 'Tríptico cinematográfico que conecta organizaciones.' }
];

const FRAGMENTOS_BASE = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/mas%20imagenes";

export const comparisons = [
  {
    id: 1,
    title: 'PUENTE DE MEMORIA',
    location: 'CENTRO HISTÓRICO',
    oldImage: `${FRAGMENTOS_BASE}/agenda-cp-puente-arch-1.png`,
    newImage: `${FRAGMENTOS_BASE}/agenda-cp-puente-arch-2.png`,
    description: 'Registro visual del puente que conecta la historia del Semanario con el presente.'
  },
  {
    id: 2,
    title: 'SISTEMAS DE INFORMACIÓN',
    location: 'REDISEÑO DIGITAL',
    oldImage: `${FRAGMENTOS_BASE}/data-stream.png`,
    newImage: `${FRAGMENTOS_BASE}/data-stream2.png`,
    description: 'La transformation de los lenguajes informativos. Del registro impreso a los flujos de datos.'
  },
  {
    id: 3,
    title: 'FRAGMENTOS DE ARCHIVO',
    location: 'MEMORIA URBANA',
    oldImage: `${FRAGMENTOS_BASE}/fragmentos-de-memoria-archivo-vivo-4.png`,
    newImage: `${FRAGMENTOS_BASE}/fragmentos-de-memoria-archivo-vivo-4-v2.png`,
    description: 'Recuperación visual de hitos emblemáticos.'
  }
];

export function getYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) return match[2];
  return null;
}
