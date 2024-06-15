import React from 'react';
import { MdOutlineForest } from 'react-icons/md';
import {Link , NavLink} from 'react-router-dom';
import { useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { dataActions } from '../store/data-slice';

const Navbar = () => {

  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.data.walletAddress);

  const connectWallet = async () => {
    console.log('Requesting account...');

    if(window.ethereum) {
      console.log('MetaMask detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        dispatch(dataActions.setWalletAddress(accounts[0]));
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  };

  const connectWalletRef = useRef();

  return (
    <header className="bg-transparent text-black p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="flex gap-2" >
          <MdOutlineForest className="text-xl mt-1" />
          <h1 className="font-bold text-xl">EcoTokens</h1>
          </Link>
       
        <nav className="flex items-center gap-6 font-bold">

          <NavLink 
                                to="/tokens"
                                    className={({isActive}) => //note that here class is written in backtisk '' and not in "" because we will change the classes in future according to our activity so to make it dynamic it is written in that way
                                        `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-[#3f4233]" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#3f4233] lg:p-0`
                                    }
                                > 
                                    Marketplace
                                </NavLink>
           <NavLink 
                                to="/learn"
                                    className={({isActive}) => //note that here class is written in backtisk '' and not in "" because we will change the classes in future according to our activity so to make it dynamic it is written in that way
                                        `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-[#3f4233]" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#3f4233] lg:p-0`
                                    }
                                > 
                                    Explorer
             </NavLink>
             <NavLink 
                                to="/learn3"
                                    className={({isActive}) => //note that here class is written in backtisk '' and not in "" because we will change the classes in future according to our activity so to make it dynamic it is written in that way
                                        `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-[#3f4233]" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#3f4233] lg:p-0`
                                    }
                                > 
                                    Company
                                </NavLink>
                                <NavLink 
                                to="/"
                                    className={({isActive}) => //note that here class is written in backtisk '' and not in "" because we will change the classes in future according to our activity so to make it dynamic it is written in that way
                                        `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-[#3f4233]" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#3f4233] lg:p-0`
                                    }
                                > 
                                    Learn
                                </NavLink>
          {!walletAddress && <button className="bg-transparent  text-black py-2 px-4 rounded" onClick={connectWallet} ref={connectWalletRef}>Connect Wallet</button>}
          {
            walletAddress && <button className='whitespace-nowrap'>{walletAddress}</button>
          }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
