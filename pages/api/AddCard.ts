import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method != "POST") {
        return res.status(405).json({message: 'Method not allowed'})
    }
    const person = JSON.parse(req.body)

    const savedPerson = await prisma.list.create( {
        data: person
    })

    res.json(prisma.list.findMany())
}