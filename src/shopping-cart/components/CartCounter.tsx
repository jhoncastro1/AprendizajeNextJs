'use client'

import { useAppDispatch, useAppSelector } from '@/store';
import React, { useEffect } from 'react'
import { addOne, substractOne, initCounterState } from '@/store/counter/counterSlice';

interface Props {
    value?: number;
}

export interface CounterResponse {
    method: string;
    count:  number;
}

const getApiCounter = async () => {
    const data = await fetch('/api/counter').then(res => res.json());


    return data as CounterResponse;
}


const CartCounter = ({ value = 0 }: Props) => {

    const dispatch = useAppDispatch();

    const count = useAppSelector(state => state.counterReducer.count)

    // useEffect(()=>{
    //     dispatch(initCounterState(value))
    // }, [dispatch, value])


    useEffect(() => {
        getApiCounter()
        .then(({count}) => dispatch(initCounterState(count)))
    }, [dispatch]);

    // const [counter, setCounter] = useState(value);

    return (
        <>

            <span className="text-9xl">{count}</span>

            <div className="flex">
                <button
                    onClick={() => dispatch(addOne())}
                    // onClick={() => setCounter(count + 1)} 
                    className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
                    +1
                </button>
                <button
                    onClick={() => dispatch(substractOne())}
                    // onClick={() => setCounter(count - 1)} 
                    className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
                    -1
                </button>
            </div>
        </>
    )
}

export default CartCounter
