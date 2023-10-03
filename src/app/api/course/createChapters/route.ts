import { NextResponse } from "next/server";
import { createChapterSchema } from '@/validators/course'
import { ZodError } from "zod";

type outputUnits = {
    title: string,
    chapters: {
        youtube_search_query: string,
        chapter_title: string,
    }[]
}

export async function POST(req: Request, res: Response) {

    try {
        const body = req.json();
        const { title, units } = createChapterSchema.parse(body);

    } catch (error) {
        if (error instanceof ZodError) {
            return new NextResponse('invalid body', { status: 400 })
        }
    }
}
