import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: session.user.id },
        ],
      },
      orderBy: { sentAt: 'desc' },
      take: 50 // Limit to most recent 50 messages
    })

    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { content, recipientId } = body

    if (!content || !recipientId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId: session.user.id,
        content,
      }
    })

    // Create a notification for the recipient
    await prisma.notification.create({
      data: {
        userId: recipientId,
        message: `New message from ${session.user.name}`,
        type: 'MESSAGE'
      }
    })

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}