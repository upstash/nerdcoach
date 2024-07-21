'use client'

import MemoizedMD from '@/components/memoized-react-markdown'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { useChat } from 'ai/react'
import { Upload } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Page() {
  const { toast } = useToast()
  const { isSignedIn } = useUser()
  const [disabled, setDisabled] = useState(true)
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat()
  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/chat/history')
        .then((res) => res.json())
        .then((res) => {
          if (res?.messages?.length > 0) setMessages(res.messages)
        })
        .finally(() => setDisabled(false))
    }
  }, [isSignedIn])
  return (
    <div className="mx-auto flex w-full max-w-md flex-col py-8">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="application/pdf"
        onChange={() => {
          const fileInput = document.getElementById('fileInput') as HTMLInputElement
          if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            toast({
              duration: 2000,
              variant: 'destructive',
              description: 'No file attached.',
            })
            return
          }
          const fileData = fileInput.files[0]
          const formData = new FormData()
          formData.append('file', fileData)
          const loadingToast = toast({
            duration: 10000,
            description: "Adding your PDF to AI's knowledge...",
          })
          fetch('/api/upsert', {
            method: 'POST',
            body: formData,
          }).then((res) => {
            loadingToast.dismiss()
            if (res.ok) {
              toast({
                duration: 2000,
                description: "Added the PDF to AI's knowledge succesfully.",
              })
            } else {
              toast({
                duration: 2000,
                variant: 'destructive',
                description: "Failed to add the PDF to AI's knowledge.",
              })
            }
          })
        }}
      />
      <div className="flex flex-row items-start justify-between">
        <span className="text-xl font-semibold">NerdCoach</span>
        <SignedIn>
          <div className="size-[28px] rounded-full bg-black/10">
            <UserButton />
          </div>
        </SignedIn>
      </div>
      {isSignedIn ? (
        disabled ? (
          <div className="mt-8 flex flex-col gap-y-2">
            <div className="h-[30px] animate-pulse bg-black/10" />
            <div className="h-[30px] animate-pulse bg-black/10" />
            <div className="h-[30px] animate-pulse bg-black/10" />
          </div>
        ) : (
          messages.map(({ content }, idx) => <MemoizedMD key={idx} message={content} />)
        )
      ) : (
        <div className="mt-8 flex max-w-max flex-col justify-center">
          <SignedOut>
            <div className="rounded border px-3 py-1 shadow transition duration-300 hover:shadow-md">
              <SignInButton mode="modal">Sign in to use NerdCoach &rarr;</SignInButton>
            </div>
          </SignedOut>
        </div>
      )}
      <div className="fixed bottom-0 mb-8 flex w-full max-w-[82vw] flex-row items-center shadow sm:max-w-md">
        <div className="cursor-pointer border bg-white px-2 py-1 pt-2 text-gray-400 hover:text-gray-800">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => {
                  const tmp = document.querySelector(`[id="fileInput"]`) as HTMLInputElement
                  tmp?.click()
                }}
              >
                <Upload className="size-[20px]" />
              </TooltipTrigger>
              <TooltipContent>
                <span>Upload Resume</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          value={input}
          disabled={disabled}
          className="!rounded-none"
          onChange={handleInputChange}
          placeholder="Ask something..."
          onKeyDown={(e) => {
            if (e.key.toLowerCase() == 'enter') handleSubmit()
          }}
        />
      </div>
    </div>
  )
}
