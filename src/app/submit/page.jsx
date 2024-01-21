import Submit from "@/components/Submit"
import Access from "@/components/access"
import React from "react"

const page = () => {
  return (
    <div className="max-w-[1200px] lg:grid grid-cols-2 gap-10 mx-auto mt-10 md:mt-20 px-5 md:px-10 pb-20">
      <div className="mb-5 md:mb-10">
        <Access />
      </div>
      <div>
        <Submit />
      </div>
    </div>
  )
}

export default page
