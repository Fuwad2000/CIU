"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import {
  donateLink,
  navBarContent,
  navLinks,
} from "@/content/NavBarContent";
import type { NavItem } from "@/content/types";

const { brand, mobile, aria } = navBarContent;

function isLinkActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function isNavItemActive(pathname: string, item: NavItem) {
  if (isLinkActive(pathname, item.href)) return true;
  return item.children?.some((child) => pathname.startsWith(child.href)) ?? false;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function DesktopDropdown({
  item,
  openDropdown,
  setOpenDropdown,
}: {
  item: NavItem;
  openDropdown: string | null;
  setOpenDropdown: (href: string | null) => void;
}) {
  const pathname = usePathname();
  const isActive = isNavItemActive(pathname, item);
  const isOpen = openDropdown === item.href;

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        onMouseEnter={() => setOpenDropdown(null)}
        className={`relative flex h-full items-center px-3.5 text-base font-medium transition-colors ${
          isActive ? "text-brand" : "text-stone-600 hover:text-foreground"
        }`}
      >
        {item.label}
        <span
          className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full transition-colors ${
            isActive ? "bg-brand" : "bg-transparent"
          }`}
        />
      </Link>
    );
  }

  return (
    <div
      className="relative flex h-full"
      onMouseEnter={() => setOpenDropdown(item.href)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <Link
        href={item.href}
        className={`relative flex h-full items-center gap-1 px-3.5 text-base font-medium transition-colors ${
          isActive ? "text-brand" : "text-stone-600 hover:text-foreground"
        }`}
      >
        {item.label}
        <ChevronIcon open={isOpen} />
        <span
          className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full transition-colors ${
            isActive ? "bg-brand" : "bg-transparent"
          }`}
        />
      </Link>

      <div
        className={`absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 transition-all duration-200 ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="relative overflow-hidden rounded-md border border-stone-200 bg-white shadow-[0_8px_30px_rgba(28,25,23,0.12)]">
          <div className="absolute -top-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-stone-200 bg-white" />
          {item.children.map((child, index) => {
            const childActive = pathname.startsWith(child.href);

            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpenDropdown(null)}
                className={`block px-5 py-3.5 text-center text-base font-medium transition-colors ${
                  index < item.children!.length - 1
                    ? "border-b border-stone-200"
                    : ""
                } ${
                  childActive
                    ? "bg-brand/5 text-brand"
                    : "text-slate-700 hover:bg-stone-50 hover:text-brand"
                }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({
  item,
  onNavigate,
  expandedItem,
  setExpandedItem,
}: {
  item: NavItem;
  onNavigate: () => void;
  expandedItem: string | null;
  setExpandedItem: (href: string | null) => void;
}) {
  const pathname = usePathname();
  const isActive = isNavItemActive(pathname, item);
  const hasChildren = Boolean(item.children?.length);
  const expanded = expandedItem === item.href;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className={`block border-b border-border px-1 py-4 text-xl font-medium transition-colors ${
          isActive ? "text-brand" : "text-foreground hover:text-brand"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setExpandedItem(expanded ? null : item.href)}
        className={`flex w-full items-center justify-between px-1 py-4 text-xl font-medium transition-colors ${
          isActive ? "text-brand" : "text-foreground"
        }`}
      >
        <span>{item.label}</span>
        <ChevronIcon open={expanded} />
      </button>

      {expanded ? (
        <ul className="mb-3 space-y-1 border-l-2 border-brand/20 pl-4">
          <li>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={`block rounded-md px-2 py-2.5 text-lg transition-colors ${
                pathname === item.href
                  ? "text-brand"
                  : "text-stone-600 hover:text-brand"
              }`}
            >
              {mobile.allItemsPrefix} {item.label}
            </Link>
          </li>
          {item.children!.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className={`block rounded-md px-2 py-2.5 text-lg transition-colors ${
                  pathname.startsWith(child.href)
                    ? "text-brand"
                    : "text-stone-600 hover:text-brand"
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobileItem(null);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);
  const isDonateActive = pathname.startsWith(donateLink.href);

  return (
    <>
      <div className="sticky top-0 z-50">
        <TopBar compact={isScrolled} />
        <header
          className={`border-b border-border/80 bg-surface shadow-[0_1px_0_rgba(0,0,0,0.03),0_4px_24px_rgba(28,25,23,0.06)] transition-all duration-300 ease-out ${
            isScrolled ? "shadow-md" : ""
          }`}
        >
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-300 ease-out sm:px-6 lg:px-8 ${
              isScrolled ? "h-14 lg:h-16" : "h-[4.5rem]"
            }`}
          >
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded-lg py-1 transition-all duration-300 hover:opacity-90"
          >
            <div
              className={`flex items-center justify-center rounded-full border border-border bg-background p-1.5 shadow-sm transition-all duration-300 ${
                isScrolled ? "h-9 w-9 lg:h-10 lg:w-10" : "h-11 w-11"
              }`}
            >
              <Image
                src={brand.logoSrc}
                alt={brand.logoAlt}
                width={36}
                height={36}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span
              className={`hidden font-semibold tracking-tight text-foreground transition-all duration-300 sm:inline ${
                isScrolled ? "text-lg lg:text-xl" : "text-xl"
              }`}
            >
              {brand.name}
            </span>
          </Link>

          <nav
            className="hidden h-full items-stretch gap-0.5 lg:flex"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {navLinks.map((item) => (
              <DesktopDropdown
                key={item.href}
                item={item}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            ))}
            <div className="ml-4 flex items-center border-l border-border pl-4">
              <Link
                href={donateLink.href}
                className={`inline-flex items-center rounded-lg font-semibold shadow-sm transition-all duration-300 ${
                  isScrolled
                    ? "px-4 py-2 text-sm lg:px-4 lg:py-2"
                    : "px-5 py-2.5 text-base"
                } ${
                  isDonateActive
                    ? "bg-brand-dark text-white shadow-md"
                    : "bg-brand text-white hover:bg-brand-dark hover:shadow-md"
                }`}
              >
                {donateLink.label}
              </Link>
            </div>
          </nav>

          <button
            type="button"
            aria-label={aria.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className={`inline-flex items-center justify-center rounded-lg border border-border bg-background text-foreground transition-all duration-300 hover:border-brand/30 hover:bg-brand-light/40 lg:hidden ${
              isScrolled ? "h-9 w-9" : "h-11 w-11"
            }`}
          >
            <MenuIcon />
          </button>
        </div>
        </header>
      </div>

      <div
        className={`fixed inset-0 z-[100] flex flex-col bg-surface transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="border-b border-brand/15 bg-brand/[0.03]">
          <div className="h-1 bg-gradient-to-r from-brand/20 via-brand to-brand/20" />
        </div>

        <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background p-1.5 shadow-sm">
              <Image
                src={brand.logoSrc}
                alt={brand.logoAlt}
                width={36}
                height={36}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              {brand.name}
            </span>
          </Link>

          <button
            type="button"
            aria-label={aria.closeMenu}
            onClick={closeMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-white transition hover:bg-brand-dark"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-4 sm:px-6">
          <ul>
            {navLinks.map((item) => (
              <li key={item.href}>
                <MobileNavItem
                  item={item}
                  onNavigate={closeMenu}
                  expandedItem={expandedMobileItem}
                  setExpandedItem={setExpandedMobileItem}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-border bg-background px-4 py-4 sm:px-6">
          <Link
            href={donateLink.href}
            onClick={closeMenu}
            className={`block rounded-lg px-4 py-3.5 text-center text-base font-semibold tracking-wide shadow-sm transition-all ${
              isDonateActive
                ? "bg-brand-dark text-white"
                : "bg-brand text-white hover:bg-brand-dark"
            }`}
          >
            {donateLink.label}
          </Link>
        </div>
      </div>
    </>
  );
}
