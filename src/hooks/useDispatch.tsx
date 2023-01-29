import {useEffect, useState} from "react";



export const useDispatch = (value: string, delayMilliseconds: number = 300) => {
    const [dispatchValue, setDispatchValue] = useState<string>(value)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDispatchValue(value)
        }, delayMilliseconds)
        return () => clearTimeout(timeOut)
    }, [value])


    return { dispatchValue }
}