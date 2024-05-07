import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode, Tooltip } from '@chakra-ui/react'
import React from 'react'

export default function Navbar() {

  const { colorMode, toggleColorMode } = useColorMode()

  const styleSheet = {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
  }

  return (
    <>
      <div className='flex flex-wrap sm:flex-wrap justify-between items-center p-6' style={styleSheet}>
        <div>
          <h1 className='text-bold text-3xl nav-brand'>Todos Maker</h1>
        </div>
        <div className='flex gap-5 items-center'>
          {

            colorMode === "dark" ? <Tooltip label={"Light Mode"}><SunIcon onClick={toggleColorMode} className='text-2xl cursor-pointer' /></Tooltip>  :
            <Tooltip label={"Dark Mode"}><MoonIcon onClick={toggleColorMode} className='text-2xl cursor-pointer'  /></Tooltip>  

          }
        </div>
      </div>
    </>
  )
}
