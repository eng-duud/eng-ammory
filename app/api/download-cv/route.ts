import { NextResponse } from "next/server";
import { getSettings } from "@/app/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getSettings();
    const cvUrl = settings?.cvUrl;

    if (!cvUrl) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    // Fetch the file from Cloudinary
    const response = await fetch(cvUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch CV" }, { status: 500 });
    }

    const buffer = await response.arrayBuffer();
    
    // Determine filename from URL or use default
    let filename = "CV.pdf";
    try {
      const url = new URL(cvUrl);
      const pathname = url.pathname;
      const parts = pathname.split("/");
      const lastPart = parts[parts.length - 1];
      if (lastPart) {
        filename = decodeURIComponent(lastPart);
      }
    } catch (e) {
      // Use default filename if URL parsing fails
    }

    // Return the file with proper headers for direct download
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Download CV error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
