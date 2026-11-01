import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#172033", muted: "#667085", line: "#e7eaf0", brand: "#635bff" }, boxShadow: { soft: "0 12px 35px rgba(16,24,40,.06)" } } }, plugins: [] };
export default config;
