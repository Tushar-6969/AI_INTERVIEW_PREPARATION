import React from 'react'

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated
}) => {
  return (
    <div className='w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl shadow-2xl shadow-black/30 px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 flex flex-col gap-6 overflow-hidden relative'>

      <div className='w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>

        <div className='flex-1 flex items-start gap-4'>
          <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-emerald-400/20 border border-slate-700 flex items-center justify-center shadow-lg shadow-cyan-500/10'>
            <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md shadow-cyan-500/30'></div>
          </div>

          <div className='flex-1'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight break-words'>
              {role}
            </h2>
            <p className='mt-2 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-medium max-w-3xl'>
              {topicsToFocus}
            </p>
          </div>
        </div>

        <div className='w-full lg:w-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4'>
          <div className='px-4 py-3 rounded-2xl bg-slate-800/60 border border-slate-700 text-slate-200 text-sm sm:text-base font-semibold shadow-lg shadow-black/10 backdrop-blur-md'>
            Experience : {experience} {experience == 1 ? "Year" : "Years"}
          </div>

          <div className='px-4 py-3 rounded-2xl bg-slate-800/60 border border-slate-700 text-slate-200 text-sm sm:text-base font-semibold shadow-lg shadow-black/10 backdrop-blur-md'>
            {questions} Q&A
          </div>

          <div className='px-4 py-3 rounded-2xl bg-slate-800/60 border border-slate-700 text-slate-300 text-sm sm:text-base font-semibold shadow-lg shadow-black/10 backdrop-blur-md'>
            Last upadted: {lastUpdated}
          </div>
        </div>
      </div>

      <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2'>
        <div className='h-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 shadow-md shadow-cyan-500/30' />
        <div className='h-2 rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-500 shadow-md shadow-emerald-500/30' />
        <div className='h-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-500 shadow-md shadow-violet-500/30' />
        <div className='h-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 shadow-md shadow-orange-500/30' />
      </div>

    </div>
  )
}

export default RoleInfoHeader