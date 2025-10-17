import Image from "next/image";
import CircularText from "../CircularText";

export default function Hero() {
  return (
    <section id="hero" className="py-40 font-allura">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16 items-center relative">
        <div className="text-7xl md:text-9xl gap-4 grid text-center md:text-left">
          <div className="text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-200">
            Save
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-200">
            The
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-200">
            Dates
          </div>

          <div className="md:mt-16 w-40 h-40 relative flex items-center justify-center scale-75 xl:scale-100 mx-auto md:mx-0">
            <CircularText
              text="You are invited * "
              onHover="slowDown"
              spinDuration={20}
              className="font-sans -ml-0 animate-pulse relative z-10"
            />
            <div className="absolute w-full h-full top-0 left-0 z-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gray-600 border-4 border-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="relative grid gap-8 justify-items-center">
          <div className="relative">
            <div className="max-w-xs md:max-w-auto aspect-square md:aspect-[1/2] rounded-full overflow-hidden">
              <Image
                src="/wedding/24.jpg"
                alt="Wedding Hero"
                width={1168}
                height={1752}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-full"></div>
            <div className="absolute bottom-0 right-0 text-9xl text-yellow-900/70">
              01
            </div>
          </div>
          <div className="h-12 w-[1px] bg-gray-200"></div>
          <div className="text-center">
            <div className="text-gray-500 mb-2 font-sans">18 July 2021</div>
            <div className="text-2xl font-merriweather">ĐIỂM BẮT ĐẦU</div>
          </div>
        </div>
        <div className="relative grid gap-8 justify-items-center">
          <div className="relative">
            <div className="max-w-xs md:max-w-auto aspect-square md:aspect-[1/2] rounded-full overflow-hidden">
              <Image
                src="/wedding/6.jpg"
                alt="Wedding Hero"
                width={1168}
                height={1752}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-full"></div>
            <div className="absolute bottom-0 right-0 text-9xl text-yellow-900/70">
              02
            </div>
          </div>
          <div className="h-12 w-[1px] bg-gray-200"></div>
          <div className="text-center">
            <div className="text-gray-500 mb-2 font-sans">26 October 2025</div>
            <div className="text-2xl font-merriweather">LÀ NGÀY CƯỚI</div>
          </div>
        </div>
        <div className="relative grid gap-8 justify-items-center">
          <div className="relative">
            <div className="max-w-xs md:max-w-auto aspect-square md:aspect-[1/2] rounded-full overflow-hidden">
              <Image
                src="/wedding/23.jpg"
                alt="Wedding Hero"
                width={1168}
                height={1752}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-full"></div>
            <div className="absolute bottom-0 right-0 text-9xl text-yellow-900/70">
              03
            </div>
          </div>
          <div className="h-12 w-[1px] bg-gray-200"></div>
          <div className="text-center">
            <div className="text-gray-500 mb-2 font-sans">Và</div>
            <div className="text-2xl font-merriweather">ĐẾN VÔ TẬN</div>
          </div>
        </div>
      </div>
    </section>
  );
}
