import ProfileSidebar from '@/components/Home/LeftSide/Leftside'
import Rightside from '@/components/Home/RightSide/Rightside'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import './home.css'

const page = () => {
    return (
        <div>
            <Navbar />
            <div className='lmr'><ProfileSidebar />
                <Rightside /></div>
        </div>
    )
}

export default page
