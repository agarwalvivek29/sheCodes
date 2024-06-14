import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-transparent text-black py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; 2024 Your Company Name. All rights reserved.</p>
        <ul className="flex justify-center space-x-6">
          <li><a href="/privacy-policy" className="text-black hover:underline">Privacy Policy</a></li>
          <li><a href="/terms-of-service" className="text-black hover:underline">Terms of Service</a></li>
          <li><a href="/contact-us" className="text-black hover:underline">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
