"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/api-client";

export default function AiEditorPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Enregistrer l'utilisation au chargement
  useEffect(() => {
    apiRequest("/api/tools", {
      method: "POST",
      body: JSON.stringify({
        tool_name: "aieditor",
        tool_type: "text_editor",
      }),
    }).catch(console.error);

    apiRequest("/api/activity", {
      method: "POST",
      body: JSON.stringify({
        activity_type: "tool-opened",
        tool_name: "aieditor",
      }),
    }).catch(console.error);
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await apiRequest("/api/content", {
        method: "POST",
        body: JSON.stringify({
          type: "text",
          title: "Document AiEditor",
          content: content,
          metadata: { tool: "aieditor" },
        }),
      });

      await apiRequest("/api/activity", {
        method: "POST",
        body: JSON.stringify({
          activity_type: "content-saved",
          tool_name: "aieditor",
          activity_data: { content_length: content.length },
        }),
      });

      alert("Contenu sauvegardé avec succès!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070F] text-white">
      <div className="border-b border-white/10 bg-[#05070F]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-lg font-semibold">AiEditor - Éditeur de Texte Riche</h1>
              <p className="text-sm text-white/60">Éditeur WYSIWYG avec assistance IA</p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            className="bg-white text-black hover:bg-white/90"
          >
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      <div className="h-[calc(100vh-64px)] w-full">
        <iframe
          src="https://5ae0c482.aieditor.pages.dev/"
          className="w-full h-full border-0"
          title="AI Editor"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}

