import React from 'react';
import { MdOutlineForest } from 'react-icons/md';

const Navbar = () => {
  return (
    <header className="bg-transparent text-black p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MdOutlineForest className="text-xl" />
          <h1 className="font-bold text-xl">EcoChain</h1>
        </div>
        <nav className="flex items-center gap-6 font-bold">
          <a href="/marketplace" className="hover:underline">Marketplace</a>
          <a href="/explorer" className="hover:underline">Explorer</a>
          <a href="/company" className="hover:underline">Company</a>
          <a href="/learn" className="hover:underline">Learn</a>
          <button className="bg-transparent  text-black py-2 px-4 rounded">Connect Wallet</button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
