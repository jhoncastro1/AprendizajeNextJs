'use client'

import React from 'react'
import { SimpleWidget } from '../SimpleWidget'
import { IoCartOutline } from 'react-icons/io5'
import { useAppSelector } from '@/store'

const WidgetsGrid = () => {

    const isCart = useAppSelector(state => state.counterReducer.count)

    return (
        <div className="flex flex-wrap p-2 items-center justify-center">

            <SimpleWidget title='Contador' subTitle={`${isCart}`} label='contador' icon={<IoCartOutline size={70} className='text-blue-600'/>}/>
            {/* <SimpleWidget /> */}

        </div>
    )
}

export default WidgetsGrid
