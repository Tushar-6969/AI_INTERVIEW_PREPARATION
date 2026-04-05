import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SpinnerLoader from '../../components/Loader/SpinnerLoader'
import moment from 'moment'
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu'
import { AnimatePresence, motion } from "framer-motion"
import { toast } from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import RoleInfoHeader from "./components/RoleInfoHeader"
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import QuestionCard from '../../components/Cards/QuestionCard'
import AIResponsePreview from './components/AIResponsePreview'
import Drawer from '../../components/Drawer'
import SkeletonLoader from '../../components/Loader/SkeletonLoader'

const Interview_Prep = () => {
  const { sessionId } = useParams()

  const [sessionData, setSessionData] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false)
  const [explanation, setExplanation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoader, setIsUpdateLoader] = useState(false)

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId))

      if (response.data && response.data.session) {
        setSessionData(response.data.session)
      }
    } catch (err) {
      console.error("err", err)
    }
  }

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("")
      setExplanation(null)
      setIsLoading(true)
      setOpenLearnMoreDrawer(true)

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question
      })

      if (response.data) {
        setExplanation(response.data)
      }
    } catch (err) {
      setExplanation(null)
      setErrorMsg("Failed to generate explanation, try again later.")
      console.error("error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleQuestionPinStatus = async (questionid) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionid))

      console.log(response)

      if (response.data && response.data.question) {
        // toast.success('Question pinned successfully')
        fetchSessionDetailsById()
      }
    } catch (err) {
      console.error("Error", err)
    }
  }

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true)
      setErrorMsg("")

      // call api to generate questions
      const airesponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      })

      // should be array like [{q,answer}]
      const generatedQuestions = airesponse.data

      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      })

      if (response.data) {
        toast.success("Added more Q&A")
        fetchSessionDetailsById()
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setErrorMsg(err.response.data.message)
      } else {
        setErrorMsg("Something went wrong, try again.")
      }
    } finally {
      setIsUpdateLoader(false)
    }
  }

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById()
    }
  }, [sessionId])

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-gradient-to-br from-[#020617] via-[#071129] to-[#0b1120] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10 flex flex-col gap-8 sm:gap-10">

        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || ""}
          questions={sessionData?.questions?.length || 0}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt
              ? moment(sessionData.updatedAt).format("Do MMM YYYY")
              : ""
          }
        />

        <div className="w-full flex flex-col gap-6 sm:gap-8">
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl px-5 sm:px-6 md:px-8 py-5 sm:py-6 border border-cyan-500/20 bg-gradient-to-r from-[#0f172a]/95 via-[#111827]/95 to-[#1e1b4b]/90 shadow-[0_10px_40px_rgba(8,145,178,0.08)] backdrop-blur-xl">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 border border-fuchsia-400/20 flex items-center justify-center shadow-lg shadow-fuchsia-500/10">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-md shadow-violet-500/30"></div>
              </div>

              <div className="flex flex-col">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight capitalize">
                  Interview Q and A
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium leading-relaxed">
                  Review your generated questions, pin important ones, and explore deeper concepts.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-200 text-xs sm:text-sm md:text-base font-semibold shadow-lg shadow-emerald-500/5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow shadow-emerald-400/60"></span>
              {sessionData?.questions?.length || 0} Questions Loaded
            </div>
          </div>

          <div className="w-full grid grid-cols-12 gap-5 sm:gap-6 md:gap-8 items-start">
            <div
              className={`col-span-12 ${
                openLearnMoreDrawer
                  ? "md:col-span-7 xl:col-span-8"
                  : "md:col-span-8 xl:col-span-9"
              } flex flex-col gap-4 sm:gap-5 md:gap-6`}
            >
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => {
                  return (
                    <motion.div
                      key={data._id || index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1,
                        damping: 15,
                      }}
                      layout
                      layoutId={`question-${data._id || index}`}
                      className="w-full rounded-3xl p-[1px] overflow-hidden bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30 shadow-[0_12px_40px_rgba(99,102,241,0.08)]"
                    >
                      <div className="w-full h-full rounded-[calc(1.5rem-1px)] px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] border border-white/5 hover:border-cyan-400/20 transition-all duration-300 ease-out hover:shadow-[0_8px_30px_rgba(34,211,238,0.08)]">
                        <QuestionCard
                          question={data?.question}
                          answer={data?.answer}
                          onLearnMore={() => generateConceptExplanation(data?.question)}
                          isPinned={data?.isPinned}
                          onTogglePin={() => toggleQuestionPinStatus(data?._id)}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {sessionData?.questions?.length > 0 && !isLoading && (
                <div className="w-full flex justify-center pt-2 sm:pt-4">
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold text-cyan-200 shadow-lg shadow-cyan-500/10 backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.02] hover:border-cyan-300/30 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isLoading || isUpdateLoader}
                    onClick={uploadMoreQuestions}
                  >
                    {isUpdateLoader ? (
                      <SpinnerLoader />
                    ) : (
                      <LuListCollapse className="h-5 w-5" />
                    )}
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={!isLoading ? explanation?.title : ""}
          >
            <div className="w-full">
              {errorMsg && (
                <p className="mb-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-sm">
                  <LuCircleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <span className="leading-relaxed">{errorMsg}</span>
                </p>
              )}

              {isLoading && <SkeletonLoader />}

              {!isLoading && explanation && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <AIResponsePreview content={explanation?.explanation} />
                </div>
              )}
            </div>
          </Drawer>
        </div>

      </div>
    </DashboardLayout>
  )
}

export default Interview_Prep