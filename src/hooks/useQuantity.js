import { useState, useRef } from "react"


const useQuantity = ()=>{
    const [count,setCount] = useState(0)
  
    const countRef = useRef(0)

    return {count,countRef,setCount}
}

export default useQuantity;