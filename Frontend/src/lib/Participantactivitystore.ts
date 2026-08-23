// A minimal external store (no extra dependency) that tracks, per participant:
// - mic/webcam state
// - whether they are the current dominant speaker
// - when they last were the dominant speaker
//
// It's read via React's useSyncExternalStore so components re-render only
// when the snapshot actually changes.

export type ParticipantActivity = {
    micOn: boolean;
    webcamOn: boolean;
    isSpeaking: boolean;
    lastSpokenAt: number; // epoch ms, 0 = never
    displayName: string;
  };
  
  type ActivityMap = Map<string, ParticipantActivity>;
  
  const EMPTY_ACTIVITY: ParticipantActivity = {
    micOn: false,
    webcamOn: false,
    isSpeaking: false,
    lastSpokenAt: 0,
    displayName: "Participant",
  };
  
  let store: ActivityMap = new Map();
  const listeners = new Set<() => void>();
  
  function emit() {
    listeners.forEach((listener) => listener());
  }
  
  export const participantActivityStore = {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  
    getSnapshot(): ActivityMap {
      return store;
    },
  
    /** Called by ParticipantActivityTracker whenever a participant's mic/cam/name changes. */
    update(id: string, patch: Partial<ParticipantActivity>) {
      const prev = store.get(id) ?? EMPTY_ACTIVITY;
      const next: ParticipantActivity = { ...prev, ...patch };
  
      const unchanged =
        prev.micOn === next.micOn &&
        prev.webcamOn === next.webcamOn &&
        prev.displayName === next.displayName;
      if (unchanged) return;
  
      store = new Map(store);
      store.set(id, next);
      emit();
    },
  
    /** Called on the meeting-level `onSpeakerChanged` event. */
    setActiveSpeaker(activeSpeakerId: string | null) {
      const now = Date.now();
      store = new Map(store);
  
      for (const [id, activity] of store) {
        const isSpeaking = id === activeSpeakerId;
        if (activity.isSpeaking !== isSpeaking) {
          store.set(id, { ...activity, isSpeaking });
        }
      }
  
      if (activeSpeakerId) {
        const prev = store.get(activeSpeakerId) ?? EMPTY_ACTIVITY;
        store.set(activeSpeakerId, {
          ...prev,
          isSpeaking: true,
          lastSpokenAt: now,
        });
      }
  
      emit();
    },
  
    remove(id: string) {
      if (!store.has(id)) return;
      store = new Map(store);
      store.delete(id);
      emit();
    },
  };