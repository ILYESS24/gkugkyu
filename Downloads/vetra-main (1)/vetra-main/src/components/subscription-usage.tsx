"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, TrendingUp, Database, FileText, Bot, Sparkles, Zap, HardDrive } from "lucide-react";

interface UsageStats {
  plan: string;
  usage: {
    projects: number;
    contentItems: number;
    aiAgents: number;
    aiGenerations: {
      text: number;
      image: number;
      video: number;
    };
    apiCalls: number;
    storage: number;
  };
  limits: {
    projects: number;
    contentItems: number;
    aiAgents: number;
    aiGenerations: {
      text: number;
      image: number;
      video: number;
    };
    apiCalls: number;
    storage: number;
  };
  usagePercentages: {
    projects: number;
    contentItems: number;
    aiAgents: number;
    aiGenerations: {
      text: number;
      image: number;
      video: number;
    };
    apiCalls: number;
    storage: number;
  };
}

export function SubscriptionUsage() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsageStats();
  }, []);

  const fetchUsageStats = async () => {
    try {
      const response = await fetch("/api/subscription/usage");
      if (!response.ok) {
        throw new Error("Failed to fetch usage stats");
      }
      const data = await response.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Usage & Limites</CardTitle>
          <CardDescription className="text-white/60">Chargement de vos statistiques...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertTitle className="text-red-400">Erreur</AlertTitle>
        <AlertDescription className="text-white/80">
          {error || "Impossible de charger les statistiques d'usage"}
        </AlertDescription>
      </Alert>
    );
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "pro":
        return "bg-blue-500 text-white";
      case "starter":
        return "bg-yellow-400 text-black";
      case "basic":
        return "bg-gray-200 text-gray-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  const formatLimit = (value: number) => {
    if (value === -1) return "Illimité";
    return value.toLocaleString();
  };

  const formatStorage = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
    return `${mb} MB`;
  };

  const isUnlimited = (limit: number) => limit === -1;

  return (
    <div className="space-y-4">
      {/* Plan Actuel */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Votre Plan</CardTitle>
              <CardDescription className="text-white/60">Plan d'abonnement actuel</CardDescription>
            </div>
            <Badge className={getPlanColor(stats.plan)}>
              {stats.plan.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Projets */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-white">Projets</CardTitle>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.usage.projects}</div>
              <div className="text-sm text-white/60">
                / {formatLimit(stats.limits.projects)}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isUnlimited(stats.limits.projects) && (
            <>
              <Progress
                value={stats.usagePercentages.projects}
                className="h-2 mb-2"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {stats.usagePercentages.projects}% utilisé
                </span>
                {stats.usagePercentages.projects >= 90 && (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Limite presque atteinte
                  </span>
                )}
              </div>
            </>
          )}
          {isUnlimited(stats.limits.projects) && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Illimité</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contenu */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-white">Éléments de Contenu</CardTitle>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.usage.contentItems}</div>
              <div className="text-sm text-white/60">
                / {formatLimit(stats.limits.contentItems)} ce mois
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isUnlimited(stats.limits.contentItems) && (
            <>
              <Progress
                value={stats.usagePercentages.contentItems}
                className="h-2 mb-2"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {stats.usagePercentages.contentItems}% utilisé
                </span>
                {stats.usagePercentages.contentItems >= 90 && (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Limite presque atteinte
                  </span>
                )}
              </div>
            </>
          )}
          {isUnlimited(stats.limits.contentItems) && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Illimité</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agents IA */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-green-500" />
              <CardTitle className="text-white">Agents IA</CardTitle>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.usage.aiAgents}</div>
              <div className="text-sm text-white/60">
                / {formatLimit(stats.limits.aiAgents)}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isUnlimited(stats.limits.aiAgents) && (
            <>
              <Progress
                value={stats.usagePercentages.aiAgents}
                className="h-2 mb-2"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {stats.usagePercentages.aiAgents}% utilisé
                </span>
                {stats.usagePercentages.aiAgents >= 90 && (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Limite presque atteinte
                  </span>
                )}
              </div>
            </>
          )}
          {isUnlimited(stats.limits.aiAgents) && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Illimité</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Générations IA */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <CardTitle className="text-white">Générations IA</CardTitle>
          </div>
          <CardDescription className="text-white/60">Utilisation mensuelle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Texte */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Texte</span>
              <span className="text-sm text-white/60">
                {stats.usage.aiGenerations.text} / {formatLimit(stats.limits.aiGenerations.text)}
              </span>
            </div>
            {!isUnlimited(stats.limits.aiGenerations.text) && (
              <Progress
                value={stats.usagePercentages.aiGenerations.text}
                className="h-2"
              />
            )}
            {isUnlimited(stats.limits.aiGenerations.text) && (
              <div className="text-xs text-green-400">Illimité</div>
            )}
          </div>

          {/* Image */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Images</span>
              <span className="text-sm text-white/60">
                {stats.usage.aiGenerations.image} / {formatLimit(stats.limits.aiGenerations.image)}
              </span>
            </div>
            {!isUnlimited(stats.limits.aiGenerations.image) && (
              <Progress
                value={stats.usagePercentages.aiGenerations.image}
                className="h-2"
              />
            )}
            {isUnlimited(stats.limits.aiGenerations.image) && (
              <div className="text-xs text-green-400">Illimité</div>
            )}
          </div>

          {/* Vidéo */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Vidéos</span>
              <span className="text-sm text-white/60">
                {stats.usage.aiGenerations.video} / {formatLimit(stats.limits.aiGenerations.video)}
              </span>
            </div>
            {!isUnlimited(stats.limits.aiGenerations.video) && (
              <Progress
                value={stats.usagePercentages.aiGenerations.video}
                className="h-2"
              />
            )}
            {isUnlimited(stats.limits.aiGenerations.video) && (
              <div className="text-xs text-green-400">Illimité</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Appels API */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <CardTitle className="text-white">Appels API</CardTitle>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.usage.apiCalls}</div>
              <div className="text-sm text-white/60">
                / {formatLimit(stats.limits.apiCalls)} ce mois
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isUnlimited(stats.limits.apiCalls) && (
            <>
              <Progress
                value={stats.usagePercentages.apiCalls}
                className="h-2 mb-2"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {stats.usagePercentages.apiCalls}% utilisé
                </span>
                {stats.usagePercentages.apiCalls >= 90 && (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Limite presque atteinte
                  </span>
                )}
              </div>
            </>
          )}
          {isUnlimited(stats.limits.apiCalls) && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Illimité</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stockage */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-indigo-500" />
              <CardTitle className="text-white">Stockage</CardTitle>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {formatStorage(stats.usage.storage)}
              </div>
              <div className="text-sm text-white/60">
                / {formatStorage(stats.limits.storage)}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isUnlimited(stats.limits.storage) && (
            <>
              <Progress
                value={stats.usagePercentages.storage}
                className="h-2 mb-2"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">
                  {stats.usagePercentages.storage}% utilisé
                </span>
                {stats.usagePercentages.storage >= 90 && (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Limite presque atteinte
                  </span>
                )}
              </div>
            </>
          )}
          {isUnlimited(stats.limits.storage) && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Illimité</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alerte si limite atteinte */}
      {(() => {
        const percentages = [
          stats.usagePercentages.projects,
          stats.usagePercentages.contentItems,
          stats.usagePercentages.aiAgents,
          stats.usagePercentages.aiGenerations.text,
          stats.usagePercentages.aiGenerations.image,
          stats.usagePercentages.aiGenerations.video,
          stats.usagePercentages.apiCalls,
          stats.usagePercentages.storage,
        ];
        return percentages.some((p) => p >= 100) || percentages.some((p) => p >= 90);
      })() && (
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertTitle className="text-red-400">Limite atteinte ou proche</AlertTitle>
          <AlertDescription className="text-white/80">
            Vous avez atteint ou êtes proche d'atteindre certaines limites de votre plan.{" "}
            <a
              href="/checkout?plan=pro&billing=monthly"
              className="underline font-semibold text-white hover:text-white/80"
            >
              Passez au plan Pro
            </a>{" "}
            pour bénéficier de limites illimitées.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

