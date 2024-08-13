import { currentUser } from '@clerk/nextjs/server'

export default async function getUserSession() {
  const user = await currentUser()
  if (!user?.id) return
  return [`${user.id}_session`, `${user.id}_documents`]
}
