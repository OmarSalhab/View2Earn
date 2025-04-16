import React from 'react';
import { FaTwitter, FaDiscord, FaTelegram, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto w-full">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">View2Earn</h3>
                        <p className="text-gray-400">
                            Revolutionizing the way you earn through viewing content.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white transition">About</a></li>
                            <li><a href="/earn" className="text-gray-400 hover:text-white transition">Start Earning</a></li>
                            <li><a href="/faq" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaDiscord size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaTelegram size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} View2Earn. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;