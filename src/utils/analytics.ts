export const trackGAEvent = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  } else {
    console.warn("GA not initialized");
  }
};

const YANDEX_COUNTER_ID = 101186853;

export const trackYMGoal = (
  goalName: string,
  params: Record<string, any> = {}
) => {
  if (typeof window.ym === "function") {
    window.ym(YANDEX_COUNTER_ID, "reachGoal", goalName, params);
  } else {
    console.warn("Yandex Metrika not initialized");
  }
};

export const trackEvent = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  trackGAEvent(eventName, params);
  trackYMGoal(eventName, params);
};
