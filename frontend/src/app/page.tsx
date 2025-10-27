import { HeroSection } from "./components/Hero-section";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-34 px-8 sm:items-start">
        <section  className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <HeroSection />
        </section>
      </main>
    </div>
  );
}
