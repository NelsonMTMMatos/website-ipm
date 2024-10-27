import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex-grow w-full max-w-3xl mx-auto">
        <Map />
      </div>
      <div className="pb-16"></div>
    </main>
  );
}
