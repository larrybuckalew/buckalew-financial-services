import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

// Mock file upload function (replace with actual cloud storage logic)
const uploadFile = async (file: File) => {
  const fileExtension = file.name.split('.').pop()
  const uniqueFileName = `${uuidv4()}.${fileExtension}`
  
  // In a real-world scenario, you'd upload to S3 or similar
  return `/uploads/${uniqueFileName}`
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const documents = await prisma.document.findMany({
      where: { userId: session.user.id },
      orderBy: { uploadedAt: 'desc' }
    })

    return NextResponse.json(documents)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const fileUrl = await uploadFile(file)

    const newDocument = await prisma.document.create({
      data: {
        userId: session.user.id,
        name: file.name,
        fileUrl,
        type: type || 'OTHER'
      }
    })

    return NextResponse.json(newDocument, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 })
  }
}