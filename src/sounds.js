const catSound = `${import.meta.env.BASE_URL}sounds/cat.oga`;

let currentAudio = null;

export function playMeow(enabled, special = false) {
  if (!enabled) return;

  if (currentAudio) {
    currentAudio.pause();
  }

  const audio = new Audio(catSound);

  audio.volume = special ? 0.6 : 0.35;
  audio.playbackRate = special
    ? 1.15
    : 0.95 + Math.random() * 0.35;

  currentAudio = audio;

  audio.play().catch(() => {});
}
