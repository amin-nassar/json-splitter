// src/analytics.js
import ReactGA from "react-ga4";

// Optional: use .env for cleanliness
const MEASUREMENT_ID = "G-RG54XE8C62"; // ← Replace this

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
  ReactGA.send("pageview");
};

export const trackEvent = (
  action: string,
  category = "General",
  label = ""
) => {
  ReactGA.event({ category, action, label });
};
