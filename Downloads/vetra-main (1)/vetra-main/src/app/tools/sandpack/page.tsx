"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Play } from "lucide-react";
import { apiRequest } from "@/lib/api-client";
import dynamic from "next/dynamic";

// Dynamic import pour Sandpack (évite les erreurs SSR)
const Sandpack = dynamic(
  () => import("@codesandbox/sandpack-react").then((mod) => mod.Sandpack),
  { ssr: false }
);

export default function SandpackPage() {
  const router = useRouter();
  const [code, setCode] = useState({
    App: `export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Hello Sandpack!</h1>
      <p className="text-gray-600">Start editing to see magic happen.</p>
    </div>
  );
}`,
    index: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`,
    "package.json": JSON.stringify({
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
      },
    }, null, 2),
  });

  const handleSave = async () => {
    try {
      await apiRequest("/api/tools", {
        method: "POST",
        body: JSON.stringify({
          tool_name: "sandpack",
          tool_type: "code_editor",
          config: { code },
        }),
      });
      
      await apiRequest("/api/activity", {
        method: "POST",
        body: JSON.stringify({
          activity_type: "code-saved",
          tool_name: "sandpack",
          activity_data: { files: Object.keys(code) },
        }),
      });
      
      alert("Code sauvegardé avec succès!");
    } catch (error) {
      console.error("Error saving code:", error);
      alert("Erreur lors de la sauvegarde");
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
              <h1 className="text-lg font-semibold">Sandpack - Éditeur de Code</h1>
              <p className="text-sm text-white/60">Code, preview et test en temps réel</p>
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
          src="https://sandpack-33otn5ijo-ibagencys-projects.vercel.app/"
          className="w-full h-full border-0"
          title="Sandpack Code Editor"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}

