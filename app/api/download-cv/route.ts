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

    // Fetch the file from the remote storage (Cloudinary)
    const response = await fetch(cvUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch CV" }, { status: 500 });
    }

    const buffer = await response.arrayBuffer();
    
    // Attempt to extract a clean filename from the Cloudinary URL
    // Cloudinary URLs usually look like: .../upload/v12345/folder/filename.pdf
    let filename = "CV_Amro_Aljamal.pdf";
    try {
      const urlParts = cvUrl.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      if (lastPart && lastPart.includes('.')) {
        // If it's a direct file link with extension
        filename = decodeURIComponent(lastPart);
      } else if (lastPart) {
        // If it's a public ID without extension, append .pdf as default
        filename = `${decodeURIComponent(lastPart)}.pdf`;
      }
    } catch (e) {
      // Fallback to default
    }

    // Return the file with proper headers for direct download
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Download CV error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
