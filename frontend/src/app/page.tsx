import { HeroSection } from "./components/Hero-section";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-34 px-8 bg-white dark:bg-black sm:items-start">
        <section id="/"  className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <HeroSection />
        </section>
      </main>
    </div>
  );
}
