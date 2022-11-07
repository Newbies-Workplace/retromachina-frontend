import React from 'react';
import './navbar.scss';

import CreateTeamSvg from '../../assets/icons/create-team.svg'

interface PropsNavbar{
    isScrumMaster: boolean;
}

const Navbar: React.FC<PropsNavbar> = ({isScrumMaster}) =>{
    
    return(
        <div className='navbar'>
            <div className='section-wrapper'>
                <div className='visual'>
                    <h1>RETROMACHINA</h1> 
                </div>
                <div className='section'>
                    <div className='profile-wrapper'>
                        <div className='profile'></div>
                    </div>
                    {
                        isScrumMaster &&
                        <div className='btn-wrapper'>
                            <div className='create-team-btn'>
                                    <CreateTeamSvg />
                                <p>Stwórz Zespół</p>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
            <div className='line'></div>
        </div>
    );
};

export default Navbar;