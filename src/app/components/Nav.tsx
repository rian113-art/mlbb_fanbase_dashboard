"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/schedule", label: "Jadwal Match" },
  { href: "/standings", label: "Pringkat Match" },
  { href: "/teams", label: "Teams MPL ID S16" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (popRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => firstLinkRef.current?.focus(), 10);
      return () => clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-[var(--nav-bg)] text-[var(--nav-fg)] border-[color:var(--nav-border)]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image
            src="/Logofanbasemlbbid.png"
            alt="Fanbase MLBB ID"
            width={150}
            height={150}
            priority
            className="rounded-md"
          />
          <span className="sr-only">Fanbase MLBB ID</span>
        </Link>

        <div className="ml-auto" />

        {/* Floating Circle Menu */}
        <div className="relative">
          <button
            ref={btnRef}
            type="button"
            aria-label="Buka menu"
            aria-expanded={open}
            aria-controls="floating-menu"
            onClick={() => setOpen((v) => !v)}
            className="h-10 w-10 rounded-full border grid place-items-center transition"
            style={{
              background: "var(--nav-bg)",
              color: "var(--nav-fg)",
              borderColor: "var(--nav-border)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            {/* hamburger → X */}
            <div className="relative h-4 w-4">
              <span
                className={`absolute left-0 right-0 top-0 h-[2px] transition-transform duration-200`}
                style={{
                  background: "var(--nav-fg)",
                  transform: open ? "translateY(7px) rotate(45deg)" : undefined,
                }}
              />
              <span
                className={`absolute left-0 right-0 top-[7px] h-[2px] transition-opacity duration-200`}
                style={{
                  background: "var(--nav-fg)",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className={`absolute left-0 right-0 bottom-0 h-[2px] transition-transform duration-200`}
                style={{
                  background: "var(--nav-fg)",
                  transform: open ? "translateY(-7px) rotate(-45deg)" : undefined,
                }}
              />
            </div>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                ref={popRef}
                id="floating-menu"
                role="menu"
                aria-label="Menu navigasi"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 6, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.16 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden shadow-lg border"
                style={{
                  background: "var(--nav-bg)",
                  color: "var(--nav-fg)",
                  borderColor: "var(--nav-border)",
                }}
              >
                <div className="p-2">
                  {links.map((l, i) => {
                    const active = pathname === l.href;
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        role="menuitem"
                        ref={i === 0 ? firstLinkRef : undefined}
                        className="block w-full text-left px-3 py-2 rounded-lg text-sm transition"
                        style={{
                          background: active ? "var(--nav-active)" : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!active) (e.currentTarget.style.background as any) = "var(--nav-hover)";
                        }}
                        onMouseLeave={(e) => {
                          if (!active) (e.currentTarget.style.background as any) = "transparent";
                        }}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </div>
                <div
                  className="px-3 py-2 border-t text-[11px]"
                  style={{ borderColor: "var(--nav-border)" }}
                >
                  © {new Date().getFullYear()} Fanbase MLBB ID
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
