"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { videoApi } from "@/lib/api-client";
import type { Database } from "@/types/database";
import { Loader2, PlaySquare, Sparkles, Video } from "lucide-react";

type VideoJob = Database["public"]["Tables"]["video_jobs"]["Row"];

const toolOptions = [
  {
    value: "mochi",
    label: "Mochi",
    description: "Génération vidéo ultra rapide",
  },
  {
    value: "open-sora",
    label: "Open Sora",
    description: "Grande fidélité + scènes longues",
  },
  {
    value: "wan",
    label: "Wan",
    description: "Text-to-Video multi formats",
  },
] as const;

const statusAccent: Record<VideoJob["status"], string> = {
  queued: "bg-yellow-500/20 text-yellow-200 border border-yellow-500/40",
  processing: "bg-blue-500/20 text-blue-200 border border-blue-500/40",
  completed: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40",
  failed: "bg-red-500/20 text-red-200 border border-red-500/40",
};

export function VideoStudioPanel() {
  const [jobs, setJobs] = useState<VideoJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    tool: toolOptions[0].value,
    prompt: "",
    duration: "10",
    aspect: "16:9",
    style: "cinematic",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await videoApi.listJobs();
      setJobs(data.jobs || []);
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreating(true);
    setError(null);
    setSuccess(null);
    try {
      await videoApi.createJob({
        tool: form.tool as "mochi" | "open-sora" | "wan",
        prompt: form.prompt,
        config: {
          duration: Number(form.duration),
          aspect: form.aspect,
          style: form.style,
        },
      });
      setSuccess("Génération vidéo lancée. Résultat prêt en quelques secondes.");
      setForm((prev) => ({ ...prev, prompt: "" }));
      fetchJobs();
    } catch (err: any) {
      console.error("Error creating job:", err);
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const latestJob = useMemo(() => jobs?.[0], [jobs]);

  return (
    <section className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Studio Vidéo IA</CardTitle>
              <CardDescription className="text-white/60">
                Lance des générations Mochi, Open Sora ou Wan depuis AURION.
              </CardDescription>
            </div>
            <div className="p-2 rounded-full bg-white/10">
              <Video className="w-5 h-5 text-white/70" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-white/80">Moteur</Label>
                <Select
                  value={form.tool}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, tool: value }))}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#05070F] text-white border-white/10">
                    {toolOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-white/60">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-white/80">Durée (s)</Label>
                  <Input
                    type="number"
                    min={4}
                    max={60}
                    value={form.duration}
                    onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Aspect</Label>
                  <Input
                    value={form.aspect}
                    onChange={(e) => setForm((prev) => ({ ...prev, aspect: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Prompt</Label>
              <Textarea
                value={form.prompt}
                onChange={(e) => setForm((prev) => ({ ...prev, prompt: e.target.value }))}
                minLength={10}
                rows={5}
                placeholder="Décris la scène : caméra travelling, ambiance futuriste, angles, couleurs, actions..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Style</Label>
              <Input
                value={form.style}
                onChange={(e) => setForm((prev) => ({ ...prev, style: e.target.value }))}
                className="bg-white/5 border-white/10 text-white"
                placeholder="cinematic / product launch / anime / documentary..."
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                {error}
              </p>
            )}

            {success && (
              <p className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                {success}
              </p>
            )}

            <Button
              type="submit"
              disabled={creating || form.prompt.trim().length < 10}
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90"
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Génération en cours
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Lancer la génération
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-lg">Historique des jobs</CardTitle>
          <CardDescription className="text-white/60">
            Suivi en temps réel des rendus IA.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex items-center gap-2 text-white/60">
              <Loader2 className="w-4 h-4 animate-spin" />
              Chargement des jobs...
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-sm text-white/60 bg-white/5 rounded-xl p-4">
              Aucun job vidéo pour le moment. Lance ta première génération.
            </div>
          ) : (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium capitalize">{job.tool.replace('-', ' ')}</p>
                      <p className="text-xs text-white/50">
                        {new Date(job.created_at).toLocaleString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <Badge className={statusAccent[job.status]}>
                      {job.status === "completed" && <PlaySquare className="w-3 h-3 mr-1" />}
                      {job.status === "processing" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/70 mt-3 line-clamp-2">{job.prompt}</p>
                  {job.result_url && (
                    <a
                      href={job.result_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/80 underline mt-2 inline-flex items-center gap-1"
                    >
                      Voir la vidéo générée
                    </a>
                  )}
                  {job.error && (
                    <p className="text-xs text-red-400 mt-2">Erreur : {job.error}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {latestJob && (
          <div className="border-t border-white/5 px-6 py-4 text-xs text-white/60">
            Dernier rendu : <span className="text-white">{latestJob.tool}</span> ·{" "}
            {latestJob.status === "completed" ? "Livré" : "En cours"}
          </div>
        )}
      </Card>
    </section>
  );
}

