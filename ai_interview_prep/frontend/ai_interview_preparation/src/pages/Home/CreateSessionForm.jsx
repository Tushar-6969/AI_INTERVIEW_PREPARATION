import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Input from "../../components/Inputs/input"
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import SpinnerLoader from '../../components/Loader/SpinnerLoader'
const CreateSessionForm = () => {

    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevdata) => ({
            ...prevdata,
            [key]: value
        })
        )
    }

    const handleCreateSession = async (e) => {
        e.preventDefault()
        const { role, experience, topicsToFocus } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("pleaese fill all reqired fiels ")
        }

        setError("")

        setIsLoading(true);

        try {
            const airesponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, { role, experience, topicsToFocus, numberOfQuestions: 10 })

            // should be array like [{question,answer},....]

            const generatedQuestions = airesponse.data;

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, { ...formData, questions: generatedQuestions })
            console.log(response)
            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }

        }
        catch (err) {
            if (err.response && err.response.data.messsage) {
                setError(" something went woring ")
            }
        }
        finally {
            setIsLoading(false)
        }



    }

    return (

        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6 border border-gray-200">

            <h3 className="text-2xl font-bold text-gray-800 tracking-tight leading-tight">
                start a new interview joiurney
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
                fill out a few quick details and unlock your personalised sets of interview question
            </p>

            <form
                onSubmit={handleCreateSession}
                className="flex flex-col gap-5 w-full"
            >

                <Input
                    value={formData.role}
                    onChange={(value) => handleChange("role", value)}
                    label="target role"
                    placeholder="(e.g forntend developer , uiux desinger)"
                    type="text"
                />

                <Input
                    value={formData.experience}
onChange={(value) => handleChange("experience", value)}
                    label="yeaers of experience"
                    placeholder="(e.g 1 year, 3 year , 5 year )"
                    type="text"
                />

                <Input
                    value={formData.description}
onChange={(value) => handleChange("description", value)}
                    label="Description"
                    placeholder="(any specfic goals or notes for this session  )"
                    type="text"
                />

                <Input
                    value={formData.topicsToFocus}
onChange={(value) => handleChange("topicsToFocus", value)}
                    label="topics to focus on "
                    placeholder="(comma separted eg react, nodejs, mongodb )"
                    type="text"
                />

                {error && (
                    <p className="text-sm text-red-500 font-medium bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full mt-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading && <SpinnerLoader/>}
                    create session
                </button>

            </form>

        </div>

    )
}

export default CreateSessionForm;