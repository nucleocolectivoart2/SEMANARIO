
export interface TimelineEvent {
  id: string;
  date: string;
  year: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  imageUrl?: string;
  iconType: 'pen' | 'music' | 'theater' | 'video' | 'camera' | 'book' | 'sparkles';
  hasArchive?: boolean;
}

const GITHUB_BASE = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/archivo";
const PORTADA_BASE = `${GITHUB_BASE}/portadas`;
const MAS_IMG_BASE = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/mas%20imagenes";

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '10 Feb 1990',
    year: '1990',
    title: 'PRIMERA EDICIÓN DEL SEMANARIO CULTURAL',
    description: 'Circulación gratuita de "La hojita amarilla" con agenda cultural de Medellín.',
    fullDescription: 'Nace el Semanario Cultural, una publicación semanal que durante una década acercó el arte y la cultura a la ciudadanía. Se distribuyó en universidades, teatros, librerías y centros culturales bajo el lema: Cine, Teatro, Museos, Música, Restaurantes.',
    category: 'HITO',
    iconType: 'pen',
    imageUrl: `${PORTADA_BASE}/sem1%20(1).PNG`,
    hasArchive: true
  },
  {
    id: '2',
    date: '20 Feb 1990',
    year: '1990',
    title: 'CONCIERTO ANIVERSARIO ORQUESTA SINFÓNICA',
    description: 'Presentación especial en el Teatro Metropolitano por los años de la Orquesta Sinfónica.',
    fullDescription: 'La Orquesta Sinfónica de Antioquia celebró su aniversario con un concierto magistral en el Teatro Metropolitano de Medellín. Este evento fue uno de los primeros registros destacados del Semanario Cultural #2.',
    category: 'MÚSICA',
    iconType: 'music',
    imageUrl: `${PORTADA_BASE}/sem2%20(1).PNG`,
    hasArchive: true
  },
  {
    id: '3',
    date: '27 Feb 1990',
    year: '1990',
    title: 'CANTO GREGORIANO EN SAN IGNACIO',
    description: 'Conjunto francés Organum dirigido por Marcel Pérez en la Parroquia de San Ignacio.',
    fullDescription: 'Concierto de canto gregoriano en la Parroquia de San Ignacio, organizado por la Alianza Colombo Francesa. El Semanario Cultural #3 registró este hito de la música sacra en el Centro.',
    category: 'MÚSICA',
    iconType: 'music',
    imageUrl: `${PORTADA_BASE}/sem3%20(1).PNG`,
    hasArchive: true
  },
  {
    id: '4',
    date: '9 Ago 1990',
    year: '1990',
    title: 'NUEVA SEDE TEATRO EXPERIMENTAL LA MANCHA',
    description: 'Inauguración con la obra "Album", textos de Manuel Mejía Vallejo y Oscar Castro.',
    fullDescription: 'El Teatro Experimental La Mancha estrena su sede en la Calle 54 No. 42-61. La obra "Album", dirigida por Jalver Jurado, marcó una época de resistencia teatral en el barrio Prado.',
    category: 'TEATRO',
    iconType: 'theater',
    imageUrl: `${PORTADA_BASE}/sem%2027%20(1).PNG`,
    hasArchive: true
  },
  {
    id: '5',
    date: '16 Ago 1990',
    year: '1990',
    title: 'PROYECCIÓN "CARTAS DEL PARQUE"',
    description: 'Ciclo "Los Amores Difíciles" de Gabriel García Márquez en Cine-Taller Unaula.',
    fullDescription: 'Proyección de "Cartas del Parque", adaptación cinematográfica del cuento de García Márquez, en la Universidad Autónoma Latinoamericana. Registro histórico de la cultura cinéfila universitaria.',
    category: 'CINE',
    iconType: 'video',
    imageUrl: `${MAS_IMG_BASE}/agenda-cp-puente-arch-1.png`
  },
  {
    id: '6',
    date: '18 Sep 1990',
    year: '1990',
    title: 'OBRA "ISADORA DUNCAN" EN EL PABLO TOBÓN',
    description: 'Espectáculo unipersonal sobre la mítica bailarina interpretado por Edgar Guillen.',
    fullDescription: 'El actor peruano Edgar Guillen presenta "Isadora" en el Teatro Pablo Tobón Uribe, con música de Wagner, Mussorgsky y coros búlgaros. Un hito de las artes escénicas en el Centro.',
    category: 'TEATRO',
    iconType: 'theater',
    imageUrl: `${PORTADA_BASE}/sem%2032%20(1).PNG`,
    hasArchive: true
  },
  {
    id: '8',
    date: '26 Oct 1990',
    year: '1990',
    title: 'HOMENAJE A HUMBERTO CASTAÑO "MATACO"',
    description: 'Retrospectiva póstuma del artista en la Universidad Autónoma Latinoamericana.',
    fullDescription: 'Exposición retrospectiva de Humberto Castaño "Mataco" como homenaje póstumo a su legado visual, realizada del 26 de octubre al 10 de noviembre de 1990.',
    category: 'EXPOSICIÓN',
    iconType: 'camera',
    imageUrl: `${PORTADA_BASE}/sem%2038%20(1).PNG`,
    hasArchive: true
  },
  {
    id: '10',
    date: '17 Nov 1990',
    year: '1990',
    title: 'CONCIERTO DE PIANO EN BELLAS ARTES',
    description: 'Recital de María del Rosario Sierra y Julián Gómez en la Sala Beethoven.',
    fullDescription: 'Dúo de piano con obras clásicas en el Palacio de Bellas Artes. Un registro de la excelencia académica musical del Centro de Medellín.',
    category: 'MÚSICA',
    iconType: 'music',
    imageUrl: `${PORTADA_BASE}/sem%2040%20(1).PNG`,
    hasArchive: true
  },
  {
    id: '11',
    date: '6 May 1991',
    year: '1991',
    title: 'SEMANA CULTURAL: CINE Y TEATRO',
    description: 'Eventos como "Tiempos de Gloria" en el MAMM y "El Fin del Comienzo".',
    fullDescription: 'Semana intensa con proyecciones en el MAMM y el Centro Colombo Americano, además de obras en el Pequeño Teatro. Reflejo de la agenda ininterrumpida de "la hojita amarilla".',
    category: 'VARIADO',
    iconType: 'sparkles',
    imageUrl: `${PORTADA_BASE}/sem%2059%20(1).PNG`,
    hasArchive: true
  },
  {
    id: '12',
    date: 'Jul 1991',
    year: '1991',
    title: 'I FESTIVAL INTERNACIONAL DE POESÍA',
    description: 'Nacimiento del evento que se convirtió en referente mundial de la palabra.',
    fullDescription: 'Nace el Festival Internacional de Poesía de Medellín, reuniendo a poetas de todo el mundo en defensa de la palabra y la paz en un contexto social complejo.',
    category: 'LITERATURA',
    iconType: 'book',
    imageUrl: `${MAS_IMG_BASE}/fragmentos-de-memoria-archivo-vivo-4-v2.png`
  },
  {
    id: '13',
    date: 'Año 1993',
    year: '1993',
    title: 'PUBLICACIÓN DEL SEMANUARIO 1993',
    description: 'Primer balance anual del arte y la cultura en Medellín.',
    fullDescription: 'El equipo del Semanario Cultural edita el "Semanuario 1993", un compendio crítico de lo más destacado del año en todas las áreas artísticas.',
    category: 'HITO',
    iconType: 'pen',
    imageUrl: `${MAS_IMG_BASE}/data-stream.png`
  },
  {
    id: '15',
    date: 'Dic 2000',
    year: '2000',
    title: 'CIERRE DEL SEMANARIO CULTURAL',
    description: 'Fin de la circulación impresa tras una década ininterrumpida.',
    fullDescription: 'Después de más de 500 ediciones, el Semanario Cultural deja de circular en diciembre del 2000, cerrando un ciclo dorado de la comunicación popular en Medellín.',
    category: 'HITO',
    iconType: 'sparkles',
    imageUrl: `${MAS_IMG_BASE}/agenda-cp-puente-arch-2.png`
  },
  {
    id: '16',
    date: 'Año 2026',
    year: '2026',
    title: 'EL SEMANARIO HOY: UNIVERSO TRANSMEDIA',
    description: 'Lanzamiento de la nueva etapa digital y narrativa expandida del proyecto.',
    fullDescription: 'Bajo el concepto de Sociedad 5.0, el Semanario Hoy renace como un archivo vivo y activo. Esta nueva fase integra el repositorio histórico con producciones contemporáneas como la serie de podcasts "VOCES DE LA CIUDAD" y los micro-documentales "Resonancia", financiados por Crea Digital.',
    category: 'PRESENTE',
    iconType: 'sparkles',
    imageUrl: `${MAS_IMG_BASE}/fragmentos-de-memoria-archivo-vivo-4.png`
  }
];
