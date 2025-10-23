export default function Hero() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center grow px-6"
      style={{
        backgroundImage: "url('/subtle-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className=" rounded-2xl p-10 ">
        <div className="text-5xl md:text-[70px] font-light mb-4">
          Welcome to <span className="font-semibold">PhantomPost</span>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">
          Send and receive anonymous messages — express freely, stay unseen.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/signup"
            className="px-6 py-2 rounded-full border border-white/40 hover:bg-white hover:text-black transition-all"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-6 py-2 rounded-full border border-white/20 hover:border-white/60 transition-all"
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
}