import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegCompass, FaCompass, FaRegCalendarAlt, FaCalendarAlt } from "react-icons/fa";
import { usePathname } from 'next/navigation';

const MobileFooter = () => {
  const [isDiscover, setIsDiscover] = useState(true);
  const [isPlan, setIsPlan] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setIsDiscover(true);
      setIsPlan(false);
    } else if (pathname === '/plans') {
      setIsDiscover(false);
      setIsPlan(true);
    }
  }, [pathname]);

  return (
    <footer className="fixed z-[1000px] h-16 bottom-0 w-full bg-deep-blue text-white px-3 flex items-center justify-around">
      <Link href="/">
        <div className="flex flex-col justify-center items-center">
          {isDiscover ? <FaCompass size={24} /> : <FaRegCompass size={24} />}
          <span className="text-sm">Discover</span>
        </div>
      </Link>
      <Link href="/plans">
        <div className="flex flex-col justify-center items-center">
          {isPlan ? <FaCalendarAlt size={24} /> : <FaRegCalendarAlt size={24} />}
          <span className="text-sm">Plans</span>
        </div>
      </Link>
    </footer>
  );
};

export default MobileFooter;
