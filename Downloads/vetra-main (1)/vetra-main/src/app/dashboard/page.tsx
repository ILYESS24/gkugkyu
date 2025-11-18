"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LogOut,
  User,
  Settings,
  Zap,
  Globe,
  Code,
  Image,
  Video,
  Sparkles,
  LayoutDashboard,
  PenTool,
  Brain,
  Activity,
  Shield,
  BarChart3,
  Rows3,
  MessageSquare,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { getCurrentUser, logout, User as UserType } from "@/lib/auth";
import { MorphPanel } from "@/components/morph-panel";
import { IntegratedToolsPanel } from "@/components/integrated-tools-panel";
import { AIAutonomousGenerator } from "@/components/ai-autonomous-generator";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070F] flex items-center justify-center text-white">
        Chargement...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const quickActions = [
    {
      label: "Créer un Site",
      description: "Assistant IA + UI Library",
      icon: <LayoutDashboard className="w-5 h-5" />,
      accent: "from-[#8EE3FF]/20 to-[#0066FF]/20",
    },
    {
      label: "Lancer une App",
      description: "Code + API + Agents",
      icon: <Code className="w-5 h-5" />,
      accent: "from-[#FFE897]/20 to-[#FFB347]/20",
    },
    {
      label: "Studio Contenu",
      description: "Texte · Image · Vidéo",
      icon: <Image className="w-5 h-5" />,
      accent: "from-[#F9D4FF]/20 to-[#D67BFF]/20",
    },
    {
      label: "Agents IA",
      description: "Automation complète",
      icon: <Brain className="w-5 h-5" />,
      accent: "from-[#C6FFAF]/20 to-[#44FFA1]/20",
    },
  ];

  const workspaces = [
    {
      title: "Web Builder",
      caption: "Templates dynamiques, layout responsive",
      icon: <PenTool className="w-4 h-4" />,
      chips: ["Landing", "Store", "Docs"],
    },
    {
      title: "App Studio",
      caption: "Code assisté, tests & déploiement",
      icon: <Rows3 className="w-4 h-4" />,
      chips: ["Next.js", "Expo", "API"],
    },
    {
      title: "Content Lab",
      caption: "IA multimodale 8K · Workflows",
      icon: <Video className="w-4 h-4" />,
      chips: ["Copy", "Assets", "Social"],
    },
    {
      title: "Agent Ops",
      caption: "Playbooks, monitoring, analytics",
      icon: <Globe className="w-4 h-4" />,
      chips: ["Support", "Growth", "Ops"],
    },
  ];

  const activity = [
    {
      label: "Site e-commerce généré",
      time: "Il y a 12 min",
      detail: "Template Luxe + 32 composants",
    },
    {
      label: "Assistant IA déployé",
      time: "Il y a 47 min",
      detail: "Agent Support multilingue",
    },
    {
      label: "Vidéo promo livrée",
      time: "Il y a 1 h",
      detail: "Script + voix + montage auto",
    },
  ];

  const tasks = [
    {
      title: "Onboarding SaaS pour Alto",
      tag: "Site Web",
      status: "En cours",
    },
    {
      title: "Agent support Fintech",
      tag: "IA Agent",
      status: "Review",
    },
    {
      title: "Campagne vidéo lancement",
      tag: "Contenu",
      status: "À produire",
    },
  ];

  return (
    <div className="min-h-screen bg-[#05070F] text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C1122] via-[#05070F] to-[#05070F]" />
      <div className="relative">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl bg-[#05070F]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/50">Tableau de bord</p>
                <p className="font-semibold">AURION</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/settings")}
                className="border-white/10 text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Préférences
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-white/10 text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Quitter
              </Button>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <User className="w-4 h-4 text-white/70" />
                <span className="text-sm">{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Hero */}
          <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-white/60 text-sm mb-2">Bonjour {user.name}</p>
                    <h1 className="text-4xl font-semibold tracking-tight">
                      Crée ton business complet, <span className="text-white/60">sans changer d’outil.</span>
                    </h1>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-white text-black hover:bg-white/90">
                      <Zap className="w-4 h-4 mr-2" />
                      Nouvelle création
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Explorer les templates
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white/50">Projets actifs</p>
                      <p className="text-2xl font-semibold mt-1">06</p>
                    </div>
                    <div>
                      <p className="text-white/50">Agents IA</p>
                      <p className="text-2xl font-semibold mt-1">04</p>
                    </div>
                    <div>
                      <p className="text-white/50">Livraisons 30j</p>
                      <p className="text-2xl font-semibold mt-1">18</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-white/10 to-white/0 border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Health Monitor</CardTitle>
                <CardDescription className="text-white/60">
                  Synchronisation en direct avec tes espaces
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-white/60">Performance globale</p>
                      <p className="text-2xl font-semibold">98%</p>
                    </div>
                    <BarChart3 className="w-10 h-10 text-white/40" />
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-white rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/50">Temps moyen build</p>
                    <p className="text-lg font-semibold mt-1">2m 41s</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/50">Coût IA aujourd’hui</p>
                    <p className="text-lg font-semibold mt-1">18,40 €</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Générateur IA Autonome */}
          <AIAutonomousGenerator />

          {/* Outils intégrés et Activité */}
          <IntegratedToolsPanel />

          {/* Quick Actions */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.label}
                className="bg-white/5 border-white/5 hover:border-white/20 transition-colors cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.accent} opacity-50`} />
                <CardContent className="relative p-5 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-xl">{action.icon}</div>
                      <div>
                        <p className="font-medium">{action.label}</p>
                        <p className="text-sm text-white/60">{action.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="h-px bg-white/10" />
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-sm">
                    Ouvrir l'espace
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Workspaces + Insights */}
          <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-col gap-2">
                <CardTitle>Espace de création</CardTitle>
                <CardDescription className="text-white/60">
                  Choisis un module et laisse l’IA accélérer tes livraisons.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {workspaces.map((workspace) => (
                  <div
                    key={workspace.title}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-xl">{workspace.icon}</div>
                        <div>
                          <p className="font-medium">{workspace.title}</p>
                          <p className="text-xs text-white/50">{workspace.caption}</p>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="text-white/60 hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {workspace.chips.map((chip) => (
                        <span key={chip} className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/70">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-base">Insights IA</CardTitle>
                  <CardDescription className="text-white/60">
                    Prévisions basées sur tes derniers projets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Activity className="w-4 h-4 text-emerald-300 mt-1" />
                    <div>
                      <p className="font-medium">Conversion prévisionnelle +18%</p>
                      <p className="text-white/60">Optimise la hero section du site Alto</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-sky-300 mt-1" />
                    <div>
                      <p className="font-medium">Stabilité agents 99.4%</p>
                      <p className="text-white/60">Surveillance temps réel activée</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-amber-300 mt-1" />
                    <div>
                      <p className="font-medium">Feedback AI Copy</p>
                      <p className="text-white/60">5 suggestions prêtes pour ta campagne</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-base">Calendrier</CardTitle>
                  <CardDescription className="text-white/60">Synchronisé avec tes releases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Livraison MVP - Flowspace</p>
                      <p className="text-white/60 text-xs">11 décembre · 09:00</p>
                    </div>
                    <Calendar className="w-4 h-4 text-white/50" />
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Review Agents Support</p>
                      <p className="text-white/60 text-xs">11 décembre · 14:30</p>
                    </div>
                    <Calendar className="w-4 h-4 text-white/50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Activity + Tasks */}
          <section className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Timeline en direct</CardTitle>
                <CardDescription className="text-white/60">Suivi de toutes les exécutions IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {activity.map((item, index) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                      {index !== activity.length - 1 && <div className="w-px h-full bg-white/10" />}
                    </div>
                    <div>
                      <p className="text-sm text-white/60">{item.time}</p>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-white/60 text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Roadmap du jour</CardTitle>
                  <CardDescription className="text-white/60">
                    Toutes les briques de ton business en un coup d’œil
                  </CardDescription>
                </div>
                <Button variant="ghost" className="text-white/60 hover:text-white text-sm">
                  Voir tout
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.title}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{task.title}</p>
                      <span className="text-xs text-white/60">{task.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                        {task.tag}
                      </span>
                      <span>·</span>
                      <span>Synchronisé AURION OS</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
      <MorphPanel />
    </div>
  );
}

