import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email/sendEmail'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    // Validate input
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' }, 
        { status: 400 }
      )
    }

    const emailService = EmailService.getInstance()
    const loginUrl = `${process.env.NEXTAUTH_URL}/login`

    await emailService.sendWelcomeEmail(email, name, loginUrl)

    return NextResponse.json(
      { message: 'Welcome email sent successfully' }, 
      { status: 200 }
    )
  } catch (error) {
    console.error('Welcome email send failed:', error)
    return NextResponse.json(
      { error: 'Failed to send welcome email' }, 
      { status: 500 }
    )
  }
}