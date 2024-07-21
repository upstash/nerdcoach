export const runtime = 'nodejs'

export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import ragChat from '@/lib/rag.server'
import getUserSession from '@/lib/user.server'
import { NextResponse } from 'next/server'

export async function GET() {
  const userSession = await getUserSession()
  if (!userSession) return new Response(null, { status: 403 })
  const messages = await ragChat.history.getMessages({
    amount: 100,
    sessionId: userSession[0],
  })
  return NextResponse.json({ messages })
}
