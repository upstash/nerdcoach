import { CodeBlock } from '@/components/code-block'
import { MemoizedReactMarkdown } from '@/components/mark'
import clsx from 'clsx'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

const MemoizedMD = ({ message }) => {
  return (
    <MemoizedReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        code({ node, inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == '▍') {
              return <span className="mt-1 animate-pulse cursor-default">▍</span>
            }
            children[0] = children[0].replace('`▍`', '▍')
          }
          const match = /language-(\w+)/.exec(className || '')
          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
          return <CodeBlock key={Math.random()} language={(match && match[1]) || ''} value={String(children).replace(/\n$/, '')} {...props} />
        },
      }}
      className={clsx('prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 mt-4 w-full break-words border-t pt-4')}
    >
      {message}
    </MemoizedReactMarkdown>
  )
}

export default MemoizedMD
