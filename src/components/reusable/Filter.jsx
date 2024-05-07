import { Select } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Filter({ handleFilterOnChange }) {

    return (
        <div className='flex gap-5 items-center w-full sm:w-auto'>
            <p className='font-bold'>Filter </p>
            <Select onChange={handleFilterOnChange}>
                <option value='all' defaultChecked>All</option>
                <option value='completed'>Completed</option>
                <option value='notCompleted'>Not Completed</option>
            </Select>
        </div>
    )
}
