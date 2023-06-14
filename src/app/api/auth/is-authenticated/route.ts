import { NextResponse } from "next/server";
import { getServerSession } from "@/utils/NextAuthSession.utils";

export async function GET() {
    const session = await getServerSession();
    const isAuthenticated = session != null;

    return NextResponse.json({ isAuthenticated: isAuthenticated });
}
