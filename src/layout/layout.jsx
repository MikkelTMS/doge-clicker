import { ClickableImage } from "../components/ClickableImage/ClickableImage"

export const Layout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[3fr_2fr]">
      <section className="text-black flex flex-col relative">

        {/* Navbar */}
        <div className="absolute top-6 left-0 w-full flex justify-center">
          <div className="bg-[#202253BF] rounded-full h-16 w-[90%] max-w-6xl shadow flex items-center justify-center">
            <span className="font-extrabold tracking-wider text-3xl md:text-4xl text-white">
              NAVBAR
            </span>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex items-center justify-center">
          <span className="font-extrabold tracking-wider text-3xl md:text-4xl">
            <ClickableImage/>
          </span>
        </div>
      </section>

      {/* ASIDE */}
      <aside className="bg-[#202253BF] text-white flex items-center justify-center p-6">
        <span className="font-extrabold tracking-wider text-5xl md:text-6xl">
          ASIDE
        </span>
      </aside>
    </div>
  );
};
