import React, { useState } from 'react'
import { LuCopy, LuCheck, LuCode } from "react-icons/lu"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error("Failed to copy code:", error)
    }
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/80 transition-all duration-300 ease-in-out">
      <div className="flex flex-col gap-3 border-b border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-100 text-slate-700 shadow-sm shadow-slate-200/50">
            <LuCode size={18} />
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Code Snippet
            </span>
            <span className="text-sm font-semibold text-slate-800">
              {language || "Code"}
            </span>
          </div>
        </div>

        <button
          onClick={copyCode}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm shadow-slate-200/40 transition-all duration-200 ease-in-out hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          aria-label="Copy code"
          type="button"
        >
          {copied ? (
            <>
              <LuCheck size={16} className="text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <LuCopy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto bg-slate-950">
        <SyntaxHighlighter
          language={language}
          style={oneLight}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "#0f172a",
            fontSize: "14px",
            lineHeight: "1.7",
            borderRadius: 0,
          }}
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

const AIResponsePreview = ({ content }) => {
  if (!content) {
    return null
  }

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-100/80">
      <div className="border-b border-slate-200/70 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.15)]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-rose-400 shadow-[0_0_0_4px_rgba(251,113,133,0.15)]"></div>

          <span className="ml-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            AI Response Preview
          </span>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p({ children }) {
              return (
                <p className="mb-4 text-[15px] sm:text-[15.5px] md:text-[16px] leading-7 font-normal tracking-[0.01em] text-slate-700 break-words whitespace-pre-wrap last:mb-0">
                  {children}
                </p>
              )
            },

            strong({ children }) {
              return (
                <strong className="font-semibold text-slate-900">
                  {children}
                </strong>
              )
            },

            em({ children }) {
              return (
                <em className="italic font-medium text-slate-800">
                  {children}
                </em>
              )
            },

            ul({ children }) {
              return (
                <ul className="mb-5 ml-5 list-disc space-y-2 text-[15px] sm:text-[15.5px] md:text-[16px] leading-7 text-slate-700 marker:text-slate-500">
                  {children}
                </ul>
              )
            },

            ol({ children }) {
              return (
                <ol className="mb-5 ml-5 list-decimal space-y-2 text-[15px] sm:text-[15.5px] md:text-[16px] leading-7 text-slate-700 marker:text-slate-500">
                  {children}
                </ol>
              )
            },

            li({ children }) {
              return (
                <li className="pl-1 text-[15px] sm:text-[15.5px] md:text-[16px] leading-7 text-slate-700">
                  {children}
                </li>
              )
            },

            blockquote({ children }) {
              return (
                <blockquote className="my-5 rounded-2xl border border-emerald-200/70 border-l-[6px] border-l-emerald-500 bg-emerald-50/70 px-4 py-3 sm:px-5 sm:py-4 text-[15px] sm:text-[15.5px] md:text-[16px] leading-7 text-emerald-900 shadow-sm shadow-emerald-100/40">
                  {children}
                </blockquote>
              )
            },

            h1({ children }) {
              return (
                <h1 className="mb-4 mt-7 text-3xl sm:text-[2rem] md:text-[2.2rem] leading-tight font-bold tracking-tight text-slate-900">
                  {children}
                </h1>
              )
            },

            h2({ children }) {
              return (
                <h2 className="mb-4 mt-6 text-2xl sm:text-[1.7rem] md:text-[1.85rem] leading-tight font-bold tracking-tight text-slate-900">
                  {children}
                </h2>
              )
            },

            h3({ children }) {
              return (
                <h3 className="mb-3 mt-5 text-xl sm:text-[1.35rem] md:text-[1.5rem] leading-snug font-semibold tracking-tight text-slate-900">
                  {children}
                </h3>
              )
            },

            h4({ children }) {
              return (
                <h4 className="mb-3 mt-4 text-lg sm:text-[1.1rem] md:text-[1.2rem] leading-snug font-semibold text-slate-800">
                  {children}
                </h4>
              )
            },

            h5({ children }) {
              return (
                <h5 className="mb-2 mt-4 text-base font-semibold text-slate-800">
                  {children}
                </h5>
              )
            },

            h6({ children }) {
              return (
                <h6 className="mb-2 mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
                  {children}
                </h6>
              )
            },

            a({ children, href }) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 underline underline-offset-4 decoration-blue-300 transition-colors duration-200 hover:text-blue-700 hover:decoration-blue-500 break-all"
                >
                  {children}
                </a>
              )
            },

            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              const code = String(children).replace(/\n$/, "")

              if (match) {
                return (
                  <CodeBlock
                    code={code}
                    language={match[1]}
                  />
                )
              }

              return (
                <code
                  className="rounded-lg border border-slate-200 bg-slate-100 px-1.5 py-1 text-[0.9em] font-medium text-pink-600 shadow-sm"
                  {...props}
                >
                  {children}
                </code>
              )
            },

            table({ children }) {
              return (
                <div className="my-6 w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/40 ring-1 ring-slate-100/80">
                  <table className="min-w-full border-collapse text-left text-sm sm:text-[15px]">
                    {children}
                  </table>
                </div>
              )
            },

            thead({ children }) {
              return (
                <thead className="bg-slate-100/90">
                  {children}
                </thead>
              )
            },

            tbody({ children }) {
              return (
                <tbody className="divide-y divide-slate-200/80 bg-white">
                  {children}
                </tbody>
              )
            },

            tr({ children }) {
              return (
                <tr className="transition-colors duration-200 hover:bg-slate-50/70">
                  {children}
                </tr>
              )
            },

            th({ children }) {
              return (
                <th className="border-b border-r border-slate-200/80 px-4 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 last:border-r-0">
                  {children}
                </th>
              )
            },

            td({ children }) {
              return (
                <td className="border-r border-slate-200/70 px-4 py-3 align-top text-sm sm:text-[15px] leading-6 text-slate-700 last:border-r-0">
                  {children}
                </td>
              )
            },

            hr() {
              return (
                <hr className="my-6 h-px border-0 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              )
            },

            img({ src, alt }) {
              return (
                <div className="my-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-sm shadow-slate-200/40">
                  <img
                    src={src}
                    alt={alt || "Markdown image"}
                    className="block h-auto max-w-full object-contain"
                  />
                </div>
              )
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default AIResponsePreview