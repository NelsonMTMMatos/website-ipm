import React from 'react'

interface props {
    children: React.ReactNode;
  }

  const Container = ({ children }: props) => {
    return (
      <div className="mx-auto flex flex-col min-h-screen w-full pb-16 md:pb-0">
        {children}
      </div>
    );
  };
  
  export default Container;