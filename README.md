# El Semanario HOY: Archivo Vivo

## 📌 Descripción del Proyecto
**El Semanario HOY** es una plataforma transmedia diseñada para revitalizar la memoria cultural del Centro de Medellín. El proyecto transforma el legado histórico del "Semanario Cultural" (1990-2000) en un **Archivo Vivo** bajo el concepto de **Sociedad 5.0**, integrando repositorios digitales, narrativas audiovisuales contemporáneas y herramientas de Inteligencia Artificial para conectar diversas generaciones con el corazón de la ciudad.

Esta aplicación funciona como el eje central de un ecosistema que incluye podcasts, micro-documentales, cartografía social y una agenda cultural activa.

---

## 🚀 Tecnologías Principales (Stack)
- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Radix UI](https://www.radix-ui.com/) & [ShadCN](https://ui.shadcn.com/)
- **Backend & Auth:** [Firebase](https://firebase.google.com/) (Firestore, Authentication)
- **Inteligencia Artificial:** [Google Genkit](https://firebase.google.com/docs/genkit) con modelos Gemini 2.5 Flash
- **Mapas:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Audio:** Custom Web Audio API para NC Radio

---

## 🧩 Ecosistema Transmedia
El proyecto se divide en secciones clave que componen el universo narrativo:

1.  **Archivo Vivo (Impreso):** Digitalización y visualización de ediciones históricas en formato PDF interactivo.
2.  **Ruta de la Memoria (Mapa):** Cartografía interactiva con más de 30 hitos culturales y patrimoniales georreferenciados en el centro de Medellín.
3.  **Mediateca (Resonancia):**
    -   **VOCES DE LA CIUDAD:** Serie de podcasts de 5 episodios.
    -   **Tres Cortometrajes:** Serie cinematográfica producida para Crea Digital 2026.
    -   **NC Radio:** Widget de radio sintonizado con frecuencias culturales globales y locales.
4.  **Sabías Qué (Gamificación):** Sistema de descubrimiento de fragmentos de curiosidad histórica para fomentar la participación ciudadana.
5.  **Agenda Cultural:** Programación veraz y oportuna de los eventos del centro.

---

## 🤖 Capacidades de IA (Genkit Flows)
La plataforma utiliza flujos de IA avanzados para la gestión de contenidos:
- **Curaduría Web:** Extracción automática de datos estructurados para la agenda desde texto plano o URLs.
- **Categorización Inteligente:** Sugerencia de tags y resúmenes editoriales para piezas de archivo.
- **Conexiones Semánticas:** Recomendación de vínculos entre nuevos contenidos y lugares del mapa o hitos históricos.
- **Generación de Boletines:** Redacción automática de newsletters semanales basados en el contenido real de la base de datos.

---

## 🛠️ Estructura del Proyecto
```text
src/
├── ai/             # Flujos de Genkit y configuración de IA
├── app/            # Rutas de Next.js (Admin, Historia, Mapa, Mediateca, etc.)
├── components/     # Componentes de UI y secciones de la página
├── firebase/       # Configuración y hooks de conexión con Firebase
├── hooks/          # Hooks personalizados (uso de toast, dispositivos móviles)
└── lib/            # Utilidades, datos estáticos y placeholders
```

---

## 📻 NC Radio Widget
Desarrollado específicamente para el proyecto por **Núcleo Colectivo**, el widget cuenta con:
-   **Tres Estados:** Integrado en página, ventana flotante y badge de icono minimalista.
-   **Visualizador de Malla:** Una red de nodos reactiva al estado del sistema.
-   **Sintonización Maestro:** Inicia por defecto en Radio Paradise (AAC) para garantizar estabilidad.

---

## 🤝 Créditos
-   **Dirección General:** María Victoria Álvarez Gómez.
-   **Ejecución:** Corporación Gaia.
-   **Desarrollo Tecnológico y Creativo:** [Núcleo Colectivo](https://nucleocolectivo.com/).
-   **Apoyo Institucional:** Proyecto apoyado por el Ministerio de las Culturas, las Artes y los Saberes (Programa Nacional de Concertación Cultural).

---
*© 2026 El Semanario HOY. El Corazón de Medellín en un solo lugar.*