import Map from "@/components/Map";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex-grow w-full max-w-3xl mx-auto">
        <Map />
      </div>
      <div className=" pb-16"></div>
    </main>
  );
}