import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type navbarProps = {
    
};

const navbar:React.FC<navbarProps> = () => {
    const [user] = useAuthState(auth)
    const logout = async () => {
        await signOut(auth);
        //clear community state
    };
    return(
        <div className="navbar bg-base-300 rounded-lg w-[98.3%] m-3">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-primary">Calendar</a>
            </div>
            <div className="flex-none">
                <p className=' text-neutral-content pr-2'>{user?.email}</p>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img alt="User Image" src="https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg" />
                    </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow bg-base-300 rounded-box w-52">
                    <li><a onClick={logout}>Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
    )
}
export default navbar;