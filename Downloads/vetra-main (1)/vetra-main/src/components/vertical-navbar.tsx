"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/cn";
import { 
  LayoutDashboard, 
  Code, 
  FileText, 
  Bot, 
  Workflow, 
  Sparkles,
  Video,
  Image as ImageIcon,
  Settings,
  LogOut,
  Home
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  href: string;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  href?: never;
}

type TabItem = Tab | Separator;

interface VerticalNavbarProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingTop: isSelected ? "1rem" : ".5rem",
    paddingBottom: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function VerticalNavbar({
  tabs,
  className,
  activeColor = "text-primary",
}: VerticalNavbarProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef(null);
  const router = useRouter();

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
  });

  const handleSelect = (index: number, href?: string) => {
    setSelected(index);
    if (href) {
      router.push(href);
    }
  };

  const Separator = () => (
    <div className="my-1 w-[24px] h-[1.2px] bg-border mx-auto" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border bg-background p-2 shadow-sm fixed left-4 top-1/2 -translate-y-1/2 z-50",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isSelected = selected === index;
        
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isSelected}
            onClick={() => handleSelect(index, tab.href)}
            transition={transition}
            className={cn(
              "relative flex items-center justify-center rounded-xl px-2 py-2 w-full min-w-[48px] text-sm font-medium transition-colors duration-300",
              isSelected
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title={tab.title}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {isSelected && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap ml-2"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

// Composant par défaut avec les outils AURION
export function AURIONVerticalNavbar() {
  const router = useRouter();
  
  const tabs: TabItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Home", icon: Home, href: "/" },
    { type: "separator" },
    { title: "Sandpack", icon: Code, href: "/tools/sandpack" },
    { title: "AiEditor", icon: FileText, href: "/tools/aieditor" },
    { title: "Langchain", icon: Bot, href: "/tools/langchain" },
    { title: "Workflows", icon: Workflow, href: "/workflows" },
    { title: "Bolt.new", icon: Sparkles, href: "/tools/bolt" },
    { title: "Agent Builder", icon: Bot, href: "/tools/agent-builder" },
    { type: "separator" },
    { title: "Video Studio", icon: Video, href: "/dashboard" },
    { title: "Image Gen", icon: ImageIcon, href: "/dashboard" },
    { type: "separator" },
    { title: "Settings", icon: Settings, href: "/dashboard" },
  ];

  return <VerticalNavbar tabs={tabs} />;
}

