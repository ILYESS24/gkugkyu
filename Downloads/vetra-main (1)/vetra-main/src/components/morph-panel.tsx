"use client"

import React from "react"
import { cx } from "class-variance-authority"
import { type ClassValue } from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { apiRequest } from "@/lib/api-client"
import { Lightbulb, Sparkles } from "lucide-react"

interface OrbProps {
  dimension?: string
  className?: string
  tones?: {
    base?: string
    accent1?: string
    accent2?: string
    accent3?: string
  }
  spinDuration?: number
}

const ColorOrb: React.FC<OrbProps> = ({
  dimension = "192px",
  className,
  tones,
  spinDuration = 20,
}) => {
  const fallbackTones = {
    base: "oklch(95% 0.02 264.695)",
    accent1: "oklch(75% 0.15 350)",
    accent2: "oklch(80% 0.12 200)",
    accent3: "oklch(78% 0.14 280)",
  }

  const palette = { ...fallbackTones, ...tones }

  const dimValue = parseInt(dimension.replace("px", ""), 10)

  const blurStrength =
    dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4)

  const contrastStrength =
    dimValue < 50 ? Math.max(dimValue * 0.004, 1.2) : Math.max(dimValue * 0.008, 1.5)

  const pixelDot = dimValue < 50 ? Math.max(dimValue * 0.004, 0.05) : Math.max(dimValue * 0.008, 0.1)

  const shadowRange = dimValue < 50 ? Math.max(dimValue * 0.004, 0.5) : Math.max(dimValue * 0.008, 2)

  const maskRadius =
    dimValue < 30 ? "0%" : dimValue < 50 ? "5%" : dimValue < 100 ? "15%" : "25%"

  const adjustedContrast =
    dimValue < 30 ? 1.1 : dimValue < 50 ? Math.max(contrastStrength * 1.2, 1.3) : contrastStrength

  return (
    <div
      className={cn("color-orb", className)}
      style={{
        width: dimension,
        height: dimension,
        "--base": palette.base,
        "--accent1": palette.accent1,
        "--accent2": palette.accent2,
        "--accent3": palette.accent3,
        "--spin-duration": `${spinDuration}s`,
        "--blur": `${blurStrength}px`,
        "--contrast": adjustedContrast,
        "--dot": `${pixelDot}px`,
        "--shadow": `${shadowRange}px`,
        "--mask": maskRadius,
      } as React.CSSProperties}
    />
  )
}

const SPEED_FACTOR = 1

interface ContextShape {
  showForm: boolean
  successFlag: boolean
  triggerOpen: () => void
  triggerClose: () => void
}

const FormContext = React.createContext({} as ContextShape)
const useFormContext = () => React.useContext(FormContext)

interface Recommendation {
  id: string;
  type: string;
  title: string;
  description: string;
  action?: any;
  priority: number;
}

export function MorphPanel() {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

  const [showForm, setShowForm] = React.useState(false)
  const [successFlag, setSuccessFlag] = React.useState(false)
  const [messages, setMessages] = React.useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [recommendations, setRecommendations] = React.useState<Recommendation[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    loadRecommendations();
    setMessages([{
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant AURION. Comment puis-je vous aider ?",
    }]);
  }, []);

  const loadRecommendations = async () => {
    try {
      const data = await apiRequest("/api/recommendations?status=pending&limit=3");
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error("Error loading recommendations:", error);
    }
  };

  const triggerClose = React.useCallback(() => {
    setShowForm(false)
    textareaRef.current?.blur()
  }, [])

  const triggerOpen = React.useCallback(() => {
    setShowForm(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }, [])

  const handleSuccess = React.useCallback(async (message: string) => {
    if (!message.trim() || loading) return;

    const userMessage = { role: "user" as const, content: message };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Utiliser le nouveau système IA unifié avec DeepSeek
      const response = await apiRequest("/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: message }],
          model: "deepseek",
        }),
      });

      const assistantMessage = { 
        role: "assistant" as const, 
        content: response.message?.content || response.response?.content || "Réponse générée" 
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (response.recommendations && response.recommendations.length > 0) {
        setRecommendations((prev) => [...prev, ...response.recommendations]);
      }

      // Réinitialiser le textarea
      if (textareaRef.current) {
        textareaRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
      }]);
    } finally {
      setLoading(false);
    }
  }, [loading])

  React.useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && showForm) {
        triggerClose()
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler)
    return () => document.removeEventListener("mousedown", clickOutsideHandler)
  }, [showForm, triggerClose])

  const ctx = React.useMemo(
    () => ({ showForm, successFlag, triggerOpen, triggerClose }),
    [showForm, successFlag, triggerOpen, triggerClose]
  )

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      <motion.div
        ref={wrapperRef}
        data-panel
        className={cx(
          "bg-[#0C1122] border border-white/10 relative flex flex-col items-center overflow-hidden rounded-[20px] shadow-2xl"
        )}
        initial={false}
        animate={{
          width: showForm ? 400 : "auto",
          height: showForm ? 500 : 44,
          borderRadius: showForm ? 14 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 550 / SPEED_FACTOR,
          damping: 45,
          mass: 0.7,
          delay: showForm ? 0 : 0.08,
        }}
      >
        <FormContext.Provider value={ctx}>
          <DockBar recommendations={recommendations} />
          <InputForm 
            ref={textareaRef} 
            onSuccess={handleSuccess}
            messages={messages}
            loading={loading}
            recommendations={recommendations}
            onAcceptRecommendation={async (rec) => {
              try {
                await apiRequest("/api/recommendations", {
                  method: "PATCH",
                  body: JSON.stringify({
                    id: rec.id,
                    status: "accepted",
                  }),
                });
                setRecommendations((prev) => prev.filter((r) => r.id !== rec.id));
              } catch (error) {
                console.error("Error accepting recommendation:", error);
              }
            }}
          />
        </FormContext.Provider>
      </motion.div>
    </div>
  )
}

function DockBar({ recommendations }: { recommendations: Recommendation[] }) {
  const { showForm, triggerOpen } = useFormContext()
  return (
    <footer className="mt-auto flex h-[44px] items-center justify-center whitespace-nowrap select-none">
      <div className="flex items-center justify-center gap-2 px-3 max-sm:h-10 max-sm:px-2">
        <div className="flex w-fit items-center gap-2">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="h-5 w-5"
              />
            ) : (
              <motion.div
                key="orb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ColorOrb 
                  dimension="24px" 
                  tones={{ 
                    base: "oklch(95% 0.02 264.695)",
                    accent1: "oklch(75% 0.15 350)",
                    accent2: "oklch(80% 0.12 200)",
                    accent3: "oklch(78% 0.14 280)"
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          type="button"
          className="flex h-fit flex-1 justify-end rounded-full px-2 !py-0.5 bg-transparent hover:bg-white/10 text-white border-0"
          variant="ghost"
          onClick={triggerOpen}
        >
          <span className="truncate">Ask AI</span>
          {recommendations.length > 0 && (
            <span className="ml-2 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
              {recommendations.length}
            </span>
          )}
        </Button>
      </div>
    </footer>
  )
}

const FORM_WIDTH = 400
const FORM_HEIGHT = 500

function InputForm({ 
  ref, 
  onSuccess,
  messages,
  loading,
  recommendations,
  onAcceptRecommendation,
}: { 
  ref: React.Ref<HTMLTextAreaElement>
  onSuccess: (message: string) => void
  messages: Array<{ role: "user" | "assistant"; content: string }>
  loading: boolean
  recommendations: Recommendation[]
  onAcceptRecommendation: (rec: Recommendation) => void
}) {
  const { triggerClose, showForm } = useFormContext()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const formRef = React.useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const message = formData.get("message") as string
    if (message.trim()) {
      onSuccess(message)
    }
  }

  function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") triggerClose()
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      btnRef.current?.click()
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="absolute bottom-0"
      style={{ width: FORM_WIDTH, height: FORM_HEIGHT, pointerEvents: showForm ? "all" : "none" }}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 550 / SPEED_FACTOR, damping: 45, mass: 0.7 }}
            className="flex h-full flex-col p-1"
          >
            {/* Recommandations */}
            {recommendations.length > 0 && (
              <div className="p-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-medium text-white">Recommandations</span>
                </div>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {recommendations.slice(0, 2).map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() => onAcceptRecommendation(rec)}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <p className="text-xs font-medium text-white mb-0.5">{rec.title}</p>
                      <p className="text-xs text-white/60 line-clamp-1">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 mb-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-2 text-sm ${
                      msg.role === "user"
                        ? "bg-[#0066FF] text-white"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-lg p-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between py-1 px-3">
              <p className="text-white z-2 ml-[38px] flex items-center gap-[6px] select-none text-sm">
                AI Assistant
              </p>
              <button
                type="submit"
                ref={btnRef}
                className="text-white right-4 mt-1 flex -translate-y-[3px] cursor-pointer items-center justify-center gap-1 rounded-[12px] bg-transparent pr-1 text-center select-none"
                disabled={loading}
              >
                <KeyHint>⌘</KeyHint>
                <KeyHint className="w-fit">Enter</KeyHint>
              </button>
            </div>

            <textarea
              ref={ref}
              placeholder="Ask me anything..."
              name="message"
              className="h-20 w-full resize-none scroll-py-2 rounded-md p-4 outline-0 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#0066FF]"
              required
              onKeyDown={handleKeys}
              spellCheck={false}
              disabled={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 left-3"
          >
            <ColorOrb dimension="24px" tones={{ base: "oklch(22.64% 0 0)" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

const SPRING_LOGO = { type: "spring", stiffness: 350 / SPEED_FACTOR, damping: 35 } as const

function KeyHint({ children, className }: { children: string; className?: string }) {
  return (
    <kbd
      className={cx(
        "text-white flex h-6 w-fit items-center justify-center rounded-sm border border-white/20 px-[6px] font-sans text-xs",
        className
      )}
    >
      {children}
    </kbd>
  )
}

export default MorphPanel

