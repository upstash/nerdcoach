export const runtime = 'nodejs'

export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

export const maxDuration = 30

import ragChat from '@/lib/rag.server'
import getUserSession from '@/lib/user.server'
import { aiUseChatAdapter } from '@upstash/rag-chat/nextjs'
import { Index } from '@upstash/vector'
import type { Message } from 'ai'

export async function POST(request: Request) {
  const [user, { messages = [] }, namespaceList] = await Promise.all([getUserSession(), request.json(), new Index().listNamespaces()])
  if (!user) return new Response(null, { status: 403 })
  const question = (messages as Message[]).at(-1)?.content
  if (!question) return new Response('No question in the request.')
  const [sessionId, namespace] = user
  if (!namespaceList.includes(namespace)) {
    await ragChat.context.add({
      type: 'text',
      data: 'The speed of light is approximately 299,792,458 meters per second.',
      options: { namespace },
    })
  }
  const response = await ragChat.chat(question, { streaming: true, namespace, sessionId })
  return aiUseChatAdapter(response)
}
