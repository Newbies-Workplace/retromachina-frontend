import React from 'react';
import './navbar.sass';



const Navbar = (props: any) =>{
    const isScrumMaster=props.isScrumMaster;
    if(isScrumMaster){
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
                    <div className='btn-wrapper'>
                        <div className='create-team-btn'>
                            <img src="create-team.svg" />
                            <p>Stwórz Zespół</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='line'></div>
        </div>
    );
    }else{
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
                </div>
            </div>
            <div className='line'></div>
        </div>
        );   
    }
};

export default Navbar;