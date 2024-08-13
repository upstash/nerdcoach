export const runtime = 'nodejs'

export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import ragChat from '@/lib/rag.server'
import getUserSession from '@/lib/user.server'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const [user, data] = await Promise.all([getUserSession(), request.formData()])
  const file = data.get('file') as File
  if (!file) return new Response(null, { status: 400 })
  if (!user) return new Response(null, { status: 403 })
  const namespace = user[1]
  const arrayBuffer = await file.arrayBuffer()
  const fileSource = new Blob([arrayBuffer], { type: file.type })
  await ragChat.context.add({
    fileSource,
    type: 'pdf',
    options: { namespace },
  })
  return new Response()
}
