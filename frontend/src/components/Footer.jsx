import { MapPin, Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-12 pb-6 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">BCA Association MMC</h2>
          <p className="text-gray-600 mt-3">Empowering students through community, collaboration, and excellence in technology.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2"><MapPin size={18} /> Mechi Multiple Campus</li>
            <li className="flex items-center gap-2"><Mail size={18} /> <a href="mailto:bcaassociationmmc@gmail.com">bcaassociationmmc@gmail.com</a></li>
            <li className="flex items-center gap-2"><Phone size={18} /> <a href="tel:+9779812345678">+977-981-234-5678</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Connect</h3>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-blue-100 text-blue-700 hover:scale-110 transition"><FaFacebookF /></a>
            <a href="mailto:bcaassociationmmc@gmail.com" className="p-2 rounded-full bg-red-100 text-red-600 hover:scale-110 transition"><Mail /></a>
            <a href="#" className="p-2 rounded-full bg-blue-100 text-blue-800 hover:scale-110 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} BCA Association MMC</div>
    </footer>
  );
}