import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from "lucide-react"

function TaskDataAccordion({assignmentDetails}) {

    const [openIndex, setOpenIndex] = useState(null)

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const accordionItems = [
        { title: "Description", content: `${assignmentDetails.description}`},
        { title: "Requirements", content: `${assignmentDetails.requirements}` },
        { title: "Submission Methods", content: `${assignmentDetails.submissionGuidelines}`}    
    ]

    return <>
        <div className="w-full px-25 mx-auto mb-16">
            {
                accordionItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-300">
                        <button className="flex justify-between items-center w-full p-4 text-lg font-medium text-left bg-gray-100 hover:bg-gray-200 transition" onClick={() => toggleAccordion(index)}>
                            {item.title}
                            {
                                openIndex === index ? <ChevronUp className="w-5 h-10" /> : <ChevronDown className="w-5 h-10" />                                    
                            }
                        </button>
                        {
                            openIndex === index && <div className="p-4 bg-white text-gray-700 border-t border-gray-200">{item.content}</div>
                        }
                    </div>
                ))
            }
        </div>
    </>
}

export default TaskDataAccordion