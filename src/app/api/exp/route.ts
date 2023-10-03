import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
    const query = req.url;
    const url = new URL(req.url);
    const chapterId = url.searchParams.get("chapterId");
    console.log(chapterId)
    return NextResponse.json({ success: true }, { status: 200 })
}