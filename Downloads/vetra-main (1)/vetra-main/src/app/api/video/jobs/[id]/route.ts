"use server";

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase-server-api";
import { createServerSupabaseClient } from "@/lib/supabase-server";

interface UpdateVideoJobPayload {
  status?: "queued" | "processing" | "completed" | "failed";
  result_url?: string | null;
  thumbnail_url?: string | null;
  metadata?: Record<string, any>;
  error?: string | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user } = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("video_jobs")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Video job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ job: data });
  } catch (error: any) {
    console.error("Video job fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch video job" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user } = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const payload = (await request.json()) as UpdateVideoJobPayload;

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("video_jobs")
      .update(payload as any)
      .eq("id", id)
      .eq("user_id", user.id)
      .select("*")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Failed to update video job" },
        { status: 400 }
      );
    }

    return NextResponse.json({ job: data });
  } catch (error: any) {
    console.error("Video job update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update video job" },
      { status: 500 }
    );
  }
}

