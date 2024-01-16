import Submit from "@/components/Submit"
import Access from "@/components/access"
import React from "react"

const page = () => {
  return (
    <div className="max-w-[1200px] grid grid-cols-2 gap-10 mx-auto mt-20 px-10 pb-20">
      <div>
        <Access />
      </div>
      <div>
        <Submit />
      </div>
    </div>
  )
}

export default page
