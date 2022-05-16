import { useEffect } from "react"
const useMountEffect = fn => useEffect(fn, [])
export default useMountEffect