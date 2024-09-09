import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toUpperCase()

    if (!query) {
        return NextResponse.json({ message: 'Invalid search query' }, { status: 400 })
    }

    const start = performance.now()

    try {
        const results = await prisma.country.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            select: {
                name: true,
            },
            take: 100,
            orderBy: {
                name: 'asc',
            },
        })

        const end = performance.now()

        return NextResponse.json({
            results: results.map((country) => country.name),
            duration: end - start,
        })
    } catch (error) {
        console.error('Error occurred:', error)
        return NextResponse.json(
            { results: [], message: 'Something went wrong.' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}