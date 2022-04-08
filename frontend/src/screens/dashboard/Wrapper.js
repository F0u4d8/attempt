import React from 'react'
import Navbar from '../../components/Navbar'

function Wrapper({children}) {
  return (
    <> <Navbar/>
<section className=" bg-gray-200 min-h-screen pt-16 px-4"><div className="bg-blue-200 p-4">{children}
    </div></section>



</>
  )
}

export default Wrapper