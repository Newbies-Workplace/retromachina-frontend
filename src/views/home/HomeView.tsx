import React from 'react'
import Navbar from '../../component/navbar/navbar';
import './HomeView.module.scss'

const HomeView: React.FC = () => {
    return (
        <div>
            <Navbar isScrumMaster={true} isOnRun={false}/>
        </div>
    )
}

export default HomeView