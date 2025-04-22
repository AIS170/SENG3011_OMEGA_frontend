import { useRef, useCallback } from "react";

export default function useTextToSpeech() {
  const utteranceRef = useRef(null);
  const isSpeakingRef = useRef(false);

  const speak = useCallback((text) => {
    if (!("speechSynthesis" in window) || !text) return;

    // Remove unwanted phrases and emojis
    const filteredText = text
      .replace(/[^\w\s]/g, "") // Remove any non-word characters (like emojis)
      .trim();

    // If filtered text is empty, don't speak
    if (!filteredText) return;

    // If already speaking, cancel and reset
    if (isSpeakingRef.current) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      return;
    }

    // Create and speak new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(filteredText);
    isSpeakingRef.current = true;

    utteranceRef.current.onend = () => {
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utteranceRef.current);
  }, []);

  return speak;
}
