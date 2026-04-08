
'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook para gestionar efectos de sonido de la interfaz.
 * Utiliza audios precargados para garantizar baja latencia.
 */
export function useSoundEffects() {
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const hoverAudio = useRef<HTMLAudioElement | null>(null);
  const transitionAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Precargar sonidos
    clickAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    hoverAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    transitionAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2565/2568-preview.mp3');

    // Configurar volúmenes bajos para no ser intrusivos
    if (clickAudio.current) clickAudio.current.volume = 0.15;
    if (hoverAudio.current) hoverAudio.current.volume = 0.05;
    if (transitionAudio.current) transitionAudio.current.volume = 0.1;
  }, []);

  const playClick = useCallback(() => {
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(() => {}); // Silenciar error si no hay interacción previa
    }
  }, []);

  const playHover = useCallback(() => {
    if (hoverAudio.current) {
      hoverAudio.current.currentTime = 0;
      hoverAudio.current.play().catch(() => {});
    }
  }, []);

  const playTransition = useCallback(() => {
    if (transitionAudio.current) {
      transitionAudio.current.currentTime = 0;
      transitionAudio.current.play().catch(() => {});
    }
  }, []);

  return { playClick, playHover, playTransition };
}
