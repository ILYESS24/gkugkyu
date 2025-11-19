"use server";

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase-server-api";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import {
  canGenerateAI,
  canMakeAPICall,
  trackAIGeneration,
  trackAPICall,
} from "@/lib/subscription-checker";

const VIDEO_TOOLS = ["mochi", "open-sora", "wan"] as const;
type VideoTool = (typeof VIDEO_TOOLS)[number];

interface CreateVideoJobPayload {
  tool: VideoTool;
  prompt: string;
  config?: Record<string, any>;
}

const mockResultByTool: Record<
  VideoTool,
  { result_url: string; thumbnail_url: string }
> = {
  mochi: {
    result_url:
      "https://storage.googleapis.com/aurion-mock-assets/videos/mochi-demo.mp4",
    thumbnail_url:
      "https://storage.googleapis.com/aurion-mock-assets/thumbnails/mochi-demo.jpg",
  },
  "open-sora": {
    result_url:
      "https://storage.googleapis.com/aurion-mock-assets/videos/open-sora-demo.mp4",
    thumbnail_url:
      "https://storage.googleapis.com/aurion-mock-assets/thumbnails/open-sora-demo.jpg",
  },
  wan: {
    result_url:
      "https://storage.googleapis.com/aurion-mock-assets/videos/wan-demo.mp4",
    thumbnail_url:
      "https://storage.googleapis.com/aurion-mock-assets/thumbnails/wan-demo.jpg",
  },
};

export async function GET(request: NextRequest) {
  try {
    const { user } = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("video_jobs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching video jobs:", error);
      return NextResponse.json(
        { error: "Failed to fetch video jobs" },
        { status: 500 }
      );
    }

    return NextResponse.json({ jobs: data || [] });
  } catch (error: any) {
    console.error("Video jobs GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch video jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as CreateVideoJobPayload;
    const { tool, prompt, config } = body;

    if (!tool || !VIDEO_TOOLS.includes(tool)) {
      return NextResponse.json(
        { error: "Tool must be one of mochi | open-sora | wan" },
        { status: 400 }
      );
    }

    if (!prompt || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: "Prompt must contain at least 10 characters" },
        { status: 400 }
      );
    }

    const aiLimit = await canGenerateAI(user.id, "video");
    if (!aiLimit.allowed) {
      return NextResponse.json(
        { error: aiLimit.message || "AI generation limit reached" },
        { status: 403 }
      );
    }

    const apiLimit = await canMakeAPICall(user.id);
    if (!apiLimit.allowed) {
      return NextResponse.json(
        { error: apiLimit.message || "API call limit reached" },
        { status: 403 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const { data: insertedJob, error: insertError } = await supabase
      .from("video_jobs")
      .insert({
        user_id: user.id,
        tool,
        prompt,
        config: config || {},
        status: "processing",
        metadata: {
          source: "aurion",
          generation_mode: "mock",
        },
      })
      .select("*")
      .single();

    if (insertError || !insertedJob) {
      console.error("Error inserting video job:", insertError);
      return NextResponse.json(
        { error: "Failed to create video job" },
        { status: 500 }
      );
    }

    // Mock completion to simulate pipeline until GPU engines are wired
    const mockResult = mockResultByTool[tool];
    const { data: updatedJob, error: updateError } = await supabase
      .from("video_jobs")
      .update({
        status: "completed",
        result_url: mockResult.result_url,
        thumbnail_url: mockResult.thumbnail_url,
        metadata: {
          ...insertedJob.metadata,
          duration: config?.duration || 10,
          aspect: config?.aspect || "16:9",
        },
      })
      .eq("id", insertedJob.id)
      .select("*")
      .single();

    if (updateError || !updatedJob) {
      console.error("Error updating video job:", updateError);
      return NextResponse.json(
        { error: "Failed to finalize video job" },
        { status: 500 }
      );
    }

    await Promise.all([
      trackAIGeneration(user.id, "video", { tool }),
      trackAPICall(user.id, "/api/video/jobs"),
    ]);

    return NextResponse.json({ job: updatedJob }, { status: 201 });
  } catch (error: any) {
    console.error("Video jobs POST error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create video job" },
      { status: 500 }
    );
  }
}

