// src/analytics.js
import ReactGA from "react-ga4";

// Optional: use .env for cleanliness
const MEASUREMENT_ID = "G-RG54XE8C62"; // ← Replace this

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
  ReactGA.send("pageview");
};

export const trackEvent = (action, category = "General", label = "") => {
  ReactGA.event({ category, action, label });
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
