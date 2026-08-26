export type CapabilityIconName = "development" | "documentation" | "production" | "filling" | "identity" | "delivery";

/**
 * Linear, technical, single-weight marks on a shared 48 grid. They render small (24–30px), so the
 * geometry is deliberately sparse: no fills, no decorative detail, one consistent stroke weight.
 */
export function CapabilityIcon({ name }: { name: CapabilityIconName }) {
  const common = {
    viewBox: "0 0 48 48",
    width: 48,
    height: 48,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: "false" as const,
  };

  if (name === "development") {
    return <svg {...common}><path d="M19 6h10M21.5 6v13L11 38a3.5 3.5 0 0 0 3 5.5h20a3.5 3.5 0 0 0 3-5.5L26.5 19V6" /><path d="M15.5 31h17" /></svg>;
  }
  if (name === "documentation") {
    return <svg {...common}><path d="M12 5h17l7 7v31H12z" /><path d="M28.5 5.5V12H35" /><path d="M19 24h11" /><path d="m19 33 3 3 7-7.5" /></svg>;
  }
  if (name === "production") {
    return <svg {...common}><circle cx="24" cy="24" r="15" /><circle cx="24" cy="24" r="6" /><path d="M24 4v5M24 39v5M4 24h5M39 24h5" /></svg>;
  }
  if (name === "filling") {
    return <svg {...common}><path d="M13 7h22" /><path d="M24 7v7" /><path d="M24 18c0 3-4 5.5-4 9a4 4 0 0 0 8 0c0-3.5-4-6-4-9Z" /><path d="M15 29h6v14h-6zM27 29h6v14h-6z" /></svg>;
  }
  if (name === "identity") {
    return <svg {...common}><path d="m8 40 4.5-12.5L31 9l8 8-18.5 18.5z" /><path d="m12.5 27.5 8 8" /><path d="M28 12l8 8" /></svg>;
  }
  return <svg {...common}><path d="M4 13h24v22H4z" /><path d="M28 20h8l8 8v7H28z" /><circle cx="13" cy="38" r="3.5" /><circle cx="35" cy="38" r="3.5" /><path d="M16.5 38h15" /></svg>;
}
