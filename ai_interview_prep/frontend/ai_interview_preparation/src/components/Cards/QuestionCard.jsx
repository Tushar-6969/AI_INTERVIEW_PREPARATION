import React, { useEffect, useState, useRef } from 'react'
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu'
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview"

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [height, setHeight] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current?.scrollHeight || 0;
      setHeight(contentHeight + 10)
    }
    else {
      setHeight(0)
    }
  }, [isExpanded])

  const ToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className='group w-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-300 hover:border-cyan-400/20 hover:shadow-[0_12px_35px_rgba(34,211,238,0.08)]'>

        <div className='w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex items-start justify-between gap-3 sm:gap-4'>

          <div className='flex items-start gap-3 sm:gap-4 flex-1 min-w-0'>
            <span className='flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-500 text-white text-sm sm:text-base font-bold flex items-center justify-center shadow-md shadow-cyan-500/20 uppercase'>
              Q
            </span>

            <h3
              className='flex-1 min-w-0 text-white text-sm sm:text-base md:text-lg font-semibold leading-relaxed tracking-tight cursor-pointer hover:text-cyan-300 transition-colors duration-300 break-words'
              onClick={ToggleExpand}
            >
              {question}
            </h3>
          </div>

          <div className='flex items-center gap-2 sm:gap-3 flex-shrink-0'>

            <div className={`items-center gap-2 transition-all duration-300 ${isExpanded ? "flex" : "hidden md:flex group-hover:flex"}`}>
              <button
                className='w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-amber-400/20 bg-amber-500/10 text-amber-300 flex items-center justify-center hover:bg-amber-500/20 hover:border-amber-300/30 transition-all duration-300 shadow-sm'
                onClick={onTogglePin}
              >
                {isPinned ? (
                  <LuPinOff className='text-lg sm:text-xl' />
                ) : (
                  <LuPin className='text-lg sm:text-xl' />
                )}
              </button>

              <button
                className='hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-200 text-xs sm:text-sm font-semibold hover:bg-fuchsia-500/20 hover:border-fuchsia-300/30 transition-all duration-300 shadow-sm whitespace-nowrap'
                onClick={() => { setIsExpanded(true); onLearnMore(); }}
              >
                <LuSparkles className='text-base sm:text-lg' />
                <span className=''> Learn more </span>
              </button>
            </div>

            <button
              className='w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-white/10 bg-white/5 text-slate-200 flex items-center justify-center hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400/20 transition-all duration-300'
              onClick={ToggleExpand}
            >
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>

          </div>
        </div>

        <div
          className='overflow-hidden transition-all duration-500 ease-in-out border-t border-white/5'
          style={{ maxHeight: `${height}px` }}
        >

          <div ref={contentRef} className='px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-3 sm:pt-4'>

            <div className='rounded-2xl border border-cyan-400/10 bg-cyan-500/5 px-4 sm:px-5 py-3 sm:py-4 text-slate-200'>
              <AIResponsePreview content={answer} />
            </div>

            <div className='sm:hidden flex items-center gap-2 mt-4'>
              <button
                className='w-10 h-10 rounded-2xl border border-amber-400/20 bg-amber-500/10 text-amber-300 flex items-center justify-center hover:bg-amber-500/20 hover:border-amber-300/30 transition-all duration-300'
                onClick={onTogglePin}
              >
                {isPinned ? (
                  <LuPinOff className='text-lg' />
                ) : (
                  <LuPin className='text-lg' />
                )}
              </button>

              <button
                className='inline-flex items-center gap-2 px-3 py-2.5 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-200 text-xs font-semibold hover:bg-fuchsia-500/20 hover:border-fuchsia-300/30 transition-all duration-300'
                onClick={() => { setIsExpanded(true); onLearnMore(); }}
              >
                <LuSparkles className='text-base' />
                <span>Learn more</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard