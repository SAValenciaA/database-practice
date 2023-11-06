import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method != "DELETE") {
        return res.status(405).json({message: 'Method not allowed'})
    }
    const person = JSON.parse(req.body)

    const deletedPerson = await prisma.list.delete( {
        where: {
            id: person.id
        }
    })

    res.json(deletedPerson)
}