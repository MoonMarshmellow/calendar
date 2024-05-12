import React, { useState } from 'react';
import Login from './login';
import Signup from './signup';

type userProps = {
    
};

const user:React.FC<userProps> = () => {
    const [signup, setSignup] = useState(false)

    return(
        <>
        <div className='h-screen flex items-center justify-center border-0'>
            <div className='w-[300px] border-0 border-red-500'>
                {signup ? <Signup /> : <Login />}
                <div className='cursor-pointer pt-2 text-center text-sm'>
                {signup ? <a onClick={() => setSignup(false)}>Already have an account? Click here to Login instead.</a> : <a onClick={() => setSignup(true)}>Don't have an account? Click here to sign up.</a>}
                </div>
            </div>
        </div>
        </>
    )
}
export default user;