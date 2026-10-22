import { NextResponse } from "next/server";
import { getActiveAnnouncementById } from "@/db/queries/announcements";

const MAX_POSTGRES_INT = 2147483647;

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
){
    try{
        const { id } = await params;

        if (!/^\d+$/.test(id)) {
        return NextResponse.json(
                { message: "Invalid announcement id" },
                { status: 400 }
            );
        }

        const announcementId = Number(id);

        if (announcementId <= 0 || announcementId > MAX_POSTGRES_INT) {
        return NextResponse.json(
                { message: "Invalid announcement id" },
                { status: 400 }
            );
        }
        const announcement = await getActiveAnnouncementById(announcementId);
        if(!announcement){
            return NextResponse.json(
                { message: "Announcement not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(announcement);
    }catch(error){
        console.error("Error fetching announcement:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}