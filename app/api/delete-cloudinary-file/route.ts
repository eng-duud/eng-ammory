import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/adminGuard";

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const { publicId } = await req.json();
    if (!publicId) {
      return NextResponse.json({ error: "publicId is required" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Cloudinary credentials not configured" }, { status: 500 });
    }

    // Delete file from Cloudinary using the Admin API
    const timestamp = Math.floor(Date.now() / 1000);
    const params = new URLSearchParams({
      public_id: publicId,
      timestamp: timestamp.toString(),
    });

    // Generate signature
    const crypto = require("crypto");
    const signature = crypto
      .createHash("sha1")
      .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    params.append("signature", signature);
    params.append("api_key", apiKey);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/raw/upload`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Cloudinary delete error:", error);
      return NextResponse.json({ error: "Failed to delete file from Cloudinary" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Delete file error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
