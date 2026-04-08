
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { MapPin, Loader2, Navigation, Compass, ChevronRight, Play, FileText, Mic, Sparkles, Target, X } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RevealSection } from '@/components/RevealSection';
import { cn } from '@/lib/utils';

// Carga dinámica de componentes de Leaflet para evitar errores de SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Catálogo Maestro de 33 Lugares - Verificado y Geolocalizado
const HOTSPOTS_MOCK = [
  {
    id: 'hs-1',
    name: "ANTIGUA IMPRENTA DEL SEMANARIO",
    description: "Redacción y taller del Semanario Cultural. Allí se imprimían los ejemplares gratuitos en mimeógrafo. Punto neurálgico del registro popular.",
    latitude: 6.2545,
    longitude: -75.5585,
    address: "Calle 58A #40-67, Apto 501",
    category: "HITO HISTÓRICO",
    content: "Audio de archivo disponible",
    type: 'audio'
  },
  {
    id: 'hs-2',
    name: "CAFÉ ASTOR",
    description: "Punto de encuentro de artistas e intelectuales. El Semanario publicaba constantemente su programación de tertulias y lecturas de poesía.",
    latitude: 6.2515,
    longitude: -75.5645,
    address: "Carrera 44 #52-36",
    category: "CAFÉ HISTÓRICO",
    content: "Reseña literaria 1990",
    type: 'pdf'
  },
  {
    id: 'hs-3',
    name: "CASA DE LA MEMORIA",
    description: "Espacio actual de memoria histórica. En los 90, el Semanario cubría eventos de derechos humanos y cultura en este sector.",
    latitude: 6.2490,
    longitude: -75.5570,
    address: "Calle 51 #36-66, Barrio Boston",
    category: "MUSEO",
    content: "Crónica de derechos humanos",
    type: 'pdf'
  },
  {
    id: 'hs-4',
    name: "CATEDRAL METROPOLITANA",
    description: "Sede de conciertos de música sacra anunciados en el Semanario, como el histórico canto gregoriano del conjunto Organum en 1990.",
    latitude: 6.2535,
    longitude: -75.5645,
    address: "Carrera 56 #48-09",
    category: "PATRIMONIO RELIGIOSO",
    content: "Registro sonoro",
    type: 'audio'
  },
  {
    id: 'hs-5',
    name: "CENTRO COLOMBO AMERICANO",
    description: "Referente del cine independiente. El Semanario publicaba su cartelera semanal detallando ciclos como 'Tiempos de gloria'.",
    latitude: 6.2520,
    longitude: -75.5640,
    address: "Carrera 45 #53-24",
    category: "CENTRO CULTURAL",
    content: "Cartelera de archivo",
    type: 'pdf'
  },
  {
    id: 'hs-6',
    name: "EDIFICIO COLTEJER",
    description: "Ícono del centro. Aparecía como referencia urbana en varios avisos del Semanario Hoy.",
    latitude: 6.2505,
    longitude: -75.5670,
    address: "Carrera 52 #50-01",
    category: "HITO ARQUITECTÓNICO",
    content: "Referencia visual",
    type: 'video'
  },
  {
    id: 'hs-7',
    name: "EL ESLABÓN PRENDIDO",
    description: "Bar tradicional de salsa y bohemia donde se realizaban lecturas de poesía y cafés-concierto promovidos por el Semanario.",
    latitude: 6.2525,
    longitude: -75.5630,
    address: "Carrera 43 #53-20",
    category: "BAR HISTÓRICO",
    content: "Relato sonoro",
    type: 'audio'
  },
  {
    id: 'hs-8',
    name: "IGLESIA DE LA VERACRUZ",
    description: "Escenario de conciertos de música antigua y eventos religiosos con difusión en el registro semanal del Semanario.",
    latitude: 6.2510,
    longitude: -75.5680,
    address: "Calle 51 #52-41",
    category: "HITO ARQUITECTÓNICO",
    content: "Registro histórico",
    type: 'pdf'
  },
  {
    id: 'hs-9',
    name: "MUSEO DE ANTIOQUIA",
    description: "Su cinemateca era sede fija del cineclub anunciado cada semana. El Semanario documentó la llegada de las esculturas de Botero.",
    latitude: 6.2525,
    longitude: -75.5690,
    address: "Carrera 52 #52-43",
    category: "MUSEO",
    content: "Galería Antes/Después",
    type: 'video'
  },
  {
    id: 'hs-10',
    name: "PALACIO DE BELLAS ARTES",
    description: "Sede de la Orquesta Sinfónica de Antioquia. El Semanario cubrió allí innumerables recitales. Edición No. 12 disponible.",
    latitude: 6.2510,
    longitude: -75.5615,
    address: "Carrera 42 #52-37",
    category: "CENTRO CULTURAL",
    content: "Registro audiovisual",
    type: 'video'
  },
  {
    id: 'hs-11',
    name: "PALACIO DE LA CULTURA",
    description: "Rafael Uribe Uribe. Antiguo Palacio de Gobierno. Sus salones acogieron exposiciones y conferencias reseñadas en nuestras páginas.",
    latitude: 6.2515,
    longitude: -75.5680,
    address: "Carrera 51 #51-01",
    category: "HITO ARQUITECTÓNICO",
    content: "Crónica histórica",
    type: 'pdf'
  },
  {
    id: 'hs-12',
    name: "PALACIO NACIONAL",
    description: "En los 90 albergaba librerías y salas de arte que pautaban activamente en el Semanario como focos de cultura comercial.",
    latitude: 6.2505,
    longitude: -75.5675,
    address: "Carrera 52 #50-01",
    category: "CENTRO CULTURAL",
    content: "Reseña de arte",
    type: 'pdf'
  },
  {
    id: 'hs-13',
    name: "PARQUE BERRÍO",
    description: "Corazón del centro y punto de distribución donde los ciudadanos buscaban cada lunes la nueva edición de 'la hojita amarilla'.",
    latitude: 6.2505,
    longitude: -75.5675,
    address: "Carrera 52 con Calle 52",
    category: "ESPACIO PÚBLICO",
    content: "Relatos urbanos",
    type: 'audio'
  },
  {
    id: 'hs-14',
    name: "PASAJE JUNÍN",
    description: "Calle peatonal histórica donde se ubicaban librerías como Mundolibro, aliadas constantes en la pauta del Semanario.",
    latitude: 6.2515,
    longitude: -75.5665,
    address: "Entre Carreras 49 y 50",
    category: "CALLE COMERCIAL",
    content: "Galería de archivo",
    type: 'video'
  },
  {
    id: 'hs-15',
    name: "PLAZA BOTERO",
    description: "Zona de constante actividad cultural y artística registrada por nuestras lentes desde su origen como espacio renovado.",
    latitude: 6.2525,
    longitude: -75.5685,
    address: "Carrera 52 #52-01",
    category: "LUGAR DE MEMORIA",
    content: "Galería interactiva",
    type: 'video'
  },
  {
    id: 'hs-16',
    name: "PLAZUELA DE SAN IGNACIO",
    description: "Rodeada del Claustro de la U. de A. Allí se realizaban ferias del libro y eventos académicos reseñados frecuentemente.",
    latitude: 6.2485,
    longitude: -75.5650,
    address: "Carrera 44 con Calle 49",
    category: "ESPACIO PÚBLICO",
    content: "Testimonios 1990",
    type: 'audio'
  },
  {
    id: 'hs-17',
    name: "SALÓN MÁLAGA",
    description: "Templo del tango y punto de distribución clave del Semanario. Un lugar de resistencia que documentamos en la Temporada 2.",
    latitude: 6.2465,
    longitude: -75.5665,
    address: "Carrera 51 #45-80",
    category: "BAR HISTÓRICO",
    content: "Micro-documental T2",
    type: 'video'
  },
  {
    id: 'hs-18',
    name: "TEATRO LIDO",
    description: "Cine-teatro fundamental. Proyectaba las películas del circuito 'Cine Buho' que el Semanario promocionaba cada semana.",
    latitude: 6.2520,
    longitude: -75.5675,
    address: "Carrera 50 #52-31",
    category: "TEATRO",
    content: "Cartelera Cine Buho",
    type: 'pdf'
  },
  {
    id: 'hs-19',
    name: "TEATRO MATACANDELAS",
    description: "En 1990 presentó obras como 'La zapatera prodigiosa', ampliamente apoyadas por la difusión cultural del Semanario.",
    latitude: 6.2525,
    longitude: -75.5610,
    address: "Carrera 42 #53-31",
    category: "TEATRO",
    content: "Reseña de estreno",
    type: 'pdf'
  },
  {
    id: 'hs-20',
    name: "TEATRO PABLO TOBÓN URIBE",
    description: "Escenario principal de la movida artística. Aquí se anunciaron temporadas de la Orquesta Filarmónica y danza internacional.",
    latitude: 6.2495,
    longitude: -75.5605,
    address: "Carrera 42 #52-07",
    category: "ESCENARIO VIVO",
    content: "Cartelera histórica",
    type: 'pdf'
  },
  {
    id: 'hs-21',
    name: "TEATRO METROPOLITANO",
    description: "Inaugurado en 1987, sede de eventos de gala y la Filarmónica de Medellín reseñados en nuestras ediciones especiales.",
    latitude: 6.2415,
    longitude: -75.5770,
    address: "Calle 41 # 55-80",
    category: "TEATRO",
    content: "Registro sonoro",
    type: 'audio'
  },
  {
    id: 'hs-22',
    name: "MUSEO CEMENTERIO SAN PEDRO",
    description: "Museo al aire libre que narra la historia de la ciudad. El Semanario cubría su valor patrimonial y recorridos nocturnos.",
    latitude: 6.2680,
    longitude: -75.5640,
    address: "Carrera 51 # 68-68",
    category: "PATRIMONIO",
    content: "Crónica visual",
    type: 'video'
  },
  {
    id: 'hs-23',
    name: "CENTRO CULTURAL BANREP",
    description: "Pilar en la vida cultural del centro. Ofrecía exposiciones de arte y biblioteca con amplia difusión semanal en 1990.",
    latitude: 6.2505,
    longitude: -75.5650,
    address: "Calle 50 # 50-21",
    category: "CENTRO CULTURAL",
    content: "Registro de arte",
    type: 'pdf'
  },
  {
    id: 'hs-24',
    name: "PARANINFO U. DE A.",
    description: "Edificio emblemático para conferencias y actos protocolarios con una rica historia académica registrada por el Semanario.",
    latitude: 6.2485,
    longitude: -75.5655,
    address: "Calle 49 # 53-50",
    category: "CENTRO CULTURAL",
    content: "Archivo académico",
    type: 'pdf'
  },
  {
    id: 'hs-25',
    name: "BIBLIOTECA PÚBLICA PILOTO",
    description: "Referente cultural fundamental. El Semanario difundía sus ferias del libro y archivos fotográficos desde los años 90.",
    latitude: 6.2580,
    longitude: -75.5780,
    address: "Calle 54 # 30-01",
    category: "BIBLIOTECA",
    content: "Archivo fotográfico",
    type: 'video'
  },
  {
    id: 'hs-26',
    name: "IGLESIA DE SAN IGNACIO",
    description: "Imponente templo jesuita de 1803. Ejemplo de arquitectura religiosa donde se realizaban conciertos de cámara.",
    latitude: 6.2485,
    longitude: -75.5650,
    address: "Carrera 44 # 48-78",
    category: "IGLESIA HISTÓRICA",
    content: "Relato de arquitectura",
    type: 'pdf'
  },
  {
    id: 'hs-27',
    name: "IGLESIA DE LA CANDELARIA",
    description: "La más antigua de la ciudad (1649). Su fachada neoclásica es símbolo del origen fundacional del centro histórico.",
    latitude: 6.2505,
    longitude: -75.5665,
    address: "Carrera 44 # 50-31",
    category: "PATRIMONIO RELIGIOSO",
    content: "Registro fundacional",
    type: 'pdf'
  },
  {
    id: 'hs-28',
    name: "EDIFICIO CARRÉ Y VÁSQUEZ",
    description: "Conocidos como 'edificios gemelos', ejemplo de estilo art decó que cuentan la historia del crecimiento comercial.",
    latitude: 6.2445,
    longitude: -75.5695,
    address: "Av. La Playa",
    category: "EDIFICIO EMBLEMÁTICO",
    content: "Galería de época",
    type: 'video'
  },
  {
    id: 'hs-29',
    name: "PALACIO EGIPCIO",
    description: "Joya ecléctica en el barrio Prado. El Semanario destacaba su singularidad como parte del patrimonio visual del sector.",
    latitude: 6.2540,
    longitude: -75.5635,
    address: "Carrera 44 # 54-91",
    category: "EDIFICIO EMBLEMÁTICO",
    content: "Curiosidad histórica",
    type: 'pdf'
  },
  {
    id: 'hs-30',
    name: "PLACITA DE FLÓREZ",
    description: "Espacio público de flores y ambiente bohemio que el Semanario Hoy retrataba como eje de vida popular.",
    latitude: 6.2500,
    longitude: -75.5600,
    address: "Carrera 44 con Calle 52",
    category: "HITO URBANO",
    content: "Relatos urbanos",
    type: 'audio'
  },
  {
    id: 'hs-31',
    name: "ESTACIÓN DEL FERROCARRIL",
    description: "Ícono de la memoria industrial que hoy alberga eventos culturales registrados por el proyecto El Centro Vive.",
    latitude: 6.2440,
    longitude: -75.5700,
    address: "Calle 44 # 46-64",
    category: "PATRIMONIO INDUSTRIAL",
    content: "Registro histórico",
    type: 'pdf'
  },
  {
    id: 'hs-32',
    name: "CLUB UNIÓN",
    description: "Club social de gran tradición en una edificación patrimonial que ha sido testigo de la vida social del centro.",
    latitude: 6.2515,
    longitude: -75.5650,
    address: "Carrera 44 # 53-33",
    category: "EDIFICIO EMBLEMÁTICO",
    content: "Crónica social",
    type: 'pdf'
  },
  {
    id: 'hs-33',
    name: "BIBLIOTECA CARLOS MAURO HOYOS",
    description: "Biblioteca pública en el corazón del centro, clave para el acceso a la información y cultura comunitaria.",
    latitude: 6.2505,
    longitude: -75.5660,
    address: "Calle 44 # 52 – 165",
    category: "BIBLIOTECA",
    content: "Archivo comunitario",
    type: 'video'
  }
];

// Controlador interno que maneja el movimiento del mapa
function MapController({ activePlace }: { activePlace: any }) {
  // Intentamos obtener el mapa del contexto de react-leaflet
  let map: any = null;
  try {
    const { useMap } = require('react-leaflet');
    map = useMap();
  } catch (e) {
    return null;
  }

  useEffect(() => {
    if (activePlace && activePlace.latitude && activePlace.longitude && map) {
      map.flyTo([activePlace.latitude, activePlace.longitude], 17, {
        animate: true,
        duration: 1.5
      });
    }
  }, [activePlace, map]);

  return null;
}

export function MemoryMap() {
  const [isClient, setIsClient] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [activePlace, setActivePlace] = useState<any>(null);
  
  const db = useFirestore();
  const placesQuery = useMemoFirebase(() => collection(db, 'memory_places'), [db]);
  const { data: firestorePlaces } = useCollection(placesQuery);

  // Lógica de unión y deduplicación por nombre
  const allPlaces = useMemo(() => {
    const fromFirestore = firestorePlaces || [];
    const uniqueMap = new Map();
    
    // Primero añadimos los de Firestore si existen
    fromFirestore.forEach(place => {
      const key = place.name?.toUpperCase().trim();
      if (key) uniqueMap.set(key, place);
    });
    
    // Luego los del MOCK verificando que no existan ya
    HOTSPOTS_MOCK.forEach(place => {
      const key = place.name.toUpperCase().trim();
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, {
          ...place,
          image: `https://picsum.photos/seed/${place.id}/600/400`
        });
      }
    });
    
    return Array.from(uniqueMap.values());
  }, [firestorePlaces]);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setMapReady(true), 500);

    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    }
    return () => clearTimeout(timer);
  }, []);

  const handlePlaceSelect = (place: any) => {
    setActivePlace(place);
  };

  const medellinCenter: [number, number] = [6.2500, -75.5647];
  const mapHeroImg = PlaceHolderImages.find(img => img.id === 'mapa-hero');

  return (
    <section id="mapa" className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 md:mb-24 items-center">
          <div className="lg:col-span-7 space-y-8 md:space-y-10">
            <RevealSection className="flex flex-col border-l-[12px] md:border-l-[16px] border-brand-teal pl-6 md:pl-10">
              <Badge className="bg-brand-teal text-white px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.5em] w-fit mb-6 md:mb-8">
                RUTA DE LA MEMORIA • MEDELLÍN
              </Badge>
              <h2 className="text-5xl md:text-8xl font-black text-brand-black tracking-tighter leading-[0.8] uppercase">
                MAPA DE <br />
                <span className="text-brand-teal">LA MEMORIA</span>
              </h2>
              <p className="mt-6 md:mt-8 text-lg md:text-2xl text-muted-foreground font-medium leading-tight max-w-2xl">
                Haz clic en los hitos del listado para navegar automáticamente por los hotspots que definen el alma del Centro.
              </p>
            </RevealSection>
          </div>
          <div className="lg:col-span-5 relative group">
            <RevealSection delay={300}>
              <div className="relative aspect-square w-full bg-muted shadow-2xl overflow-hidden border-4 border-brand-black">
                {mapHeroImg && (
                  <Image 
                    src={mapHeroImg.imageUrl} 
                    alt="Mapa de la Memoria" 
                    fill 
                    className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-brand-black/10 mix-blend-multiply pointer-events-none" />
              </div>
            </RevealSection>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-brand-black shadow-[15px_15px_0px_0px_rgba(43,137,141,0.1)] md:shadow-[30px_30px_0px_0px_rgba(43,137,141,0.1)]">
          <div className="lg:col-span-4 bg-white border-b-4 lg:border-b-0 lg:border-r-4 border-brand-black h-[400px] lg:h-[750px] flex flex-col">
            <div className="p-6 md:p-8 border-b-4 border-brand-black bg-brand-teal/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Compass size={18} className="text-brand-teal animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-brand-black">
                  HITOS DE MEMORIA ACTIVOS ({allPlaces.length})
                </span>
              </div>
              <Target size={16} className="text-brand-teal/40" />
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scrollbar">
              {allPlaces.map((loc: any) => (
                <div 
                  key={loc.id} 
                  onClick={() => handlePlaceSelect(loc)}
                  className={cn(
                    "group p-5 md:p-6 border-b border-muted transition-all cursor-pointer",
                    activePlace?.id === loc.id ? "bg-brand-teal/10 border-l-8 border-l-brand-teal" : "bg-white hover:bg-brand-teal/5"
                  )}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-muted overflow-hidden border border-brand-black/10">
                       <img 
                         src={loc.image || `https://picsum.photos/seed/${loc.id}/200/200`} 
                         className={cn("w-full h-full object-cover transition-all duration-500", activePlace?.id === loc.id ? "grayscale-0 scale-110" : "grayscale")} 
                         alt="" 
                       />
                    </div>
                    <div className="flex-grow space-y-1 md:space-y-2">
                      <Badge variant="outline" className={cn(
                        "text-[6px] md:text-[7px] font-black uppercase tracking-widest rounded-none px-2",
                        activePlace?.id === loc.id ? "bg-brand-teal text-white border-brand-teal" : "border-brand-teal text-brand-teal"
                      )}>
                        {loc.category}
                      </Badge>
                      <h4 className={cn(
                        "font-black text-base md:text-lg tracking-tighter uppercase leading-[1] transition-colors",
                        activePlace?.id === loc.id ? "text-brand-teal" : "text-brand-black"
                      )}>
                        {loc.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[7px] md:text-[8px] font-black text-brand-teal/60 uppercase">
                        {loc.type === 'audio' && <Mic size={10} />}
                        {loc.type === 'video' && <Play size={10} />}
                        {loc.type === 'pdf' && <FileText size={10} />}
                        {loc.content}
                      </div>
                    </div>
                    <ChevronRight className={cn(
                      "transition-all",
                      activePlace?.id === loc.id ? "text-brand-teal translate-x-1" : "text-brand-black/20"
                    )} size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 relative h-[500px] lg:h-[750px] bg-muted/5">
            {isClient && mapReady ? (
              <MapContainer 
                center={medellinCenter} 
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Controlador de movimiento */}
                <MapController activePlace={activePlace} />

                {allPlaces.map((loc: any) => (
                  <Marker 
                    key={loc.id} 
                    position={[loc.latitude || 6.2523, loc.longitude || -75.5647]}
                    eventHandlers={{
                      click: () => setActivePlace(loc)
                    }}
                  />
                ))}

                {/* Tarjeta de información activa (Popup Automático) */}
                {activePlace && (
                  <Popup 
                    position={[activePlace.latitude, activePlace.longitude]}
                    closeButton={false}
                    onClose={() => setActivePlace(null)}
                  >
                    <div className="p-0 bg-white min-w-[280px] md:min-w-[340px] border-l-8 border-brand-teal shadow-2xl relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActivePlace(null); }}
                        className="absolute top-2 right-2 z-[100] bg-white/80 hover:bg-brand-red hover:text-white p-1 rounded-full transition-all"
                      >
                        <X size={16} />
                      </button>
                      <div className="h-32 md:h-40 w-full overflow-hidden bg-muted">
                         <img src={activePlace.image || `https://picsum.photos/seed/${activePlace.id}/600/400`} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles size={14} className="text-brand-teal" />
                          <Badge className="bg-brand-teal text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-none px-4">
                            {activePlace.category}
                          </Badge>
                        </div>
                        <h3 className="font-black text-brand-black text-2xl md:text-3xl tracking-tighter uppercase leading-[0.9] mb-3 md:mb-4">{activePlace.name}</h3>
                        <p className="text-[11px] md:text-[12px] text-brand-black/70 mb-6 md:mb-8 line-clamp-4 font-medium leading-relaxed italic">
                          "{activePlace.description}"
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-[8px] md:text-[9px] font-black text-brand-black/40 uppercase tracking-widest">
                              <MapPin size={12} className="text-brand-teal" /> {activePlace.address}
                          </div>
                          <button className="flex items-center justify-center gap-4 w-full h-12 md:h-14 bg-brand-black text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-brand-teal transition-all">
                            EXPLORAR ARCHIVO <Navigation size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Popup>
                )}
              </MapContainer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-muted/10">
                <Loader2 className="animate-spin text-brand-teal mb-6" size={56} />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-black/40">CALIBRANDO CARTOGRAFÍA...</span>
              </div>
            )}
            
            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-[1000]">
               <div className="bg-white border-2 md:border-4 border-brand-black p-3 md:p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.05)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] flex items-center gap-3 md:gap-5">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-brand-teal animate-pulse" />
                  <span className="text-brand-black font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em]">SATÉLITE ACTIVO</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
