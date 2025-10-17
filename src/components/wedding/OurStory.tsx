import Image from "next/image";

export default function OurStory() {
  return (
    <section id="our-story" className="py-40 bg-yellow-700/5">
      <div className="container mx-auto flex flex-col xl:flex-row p-8 gap-8 xl:gap-16 items-center">
        <div className="flex-1">
          <h2 className="text-7xl xl:text-9xl font-medium font-allura leading-tight text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-400">
            The Story
          </h2>
        </div>
        <div className="relative xl:w-1/3 w-full">
          <div className="xl:aspect-[5/8] relative aspect-square max-w-xs xl:max-w-full mx-auto xl:mx-0 rounded-full overflow-hidden">
            <Image
              src="/wedding/9.jpg"
              alt="Wedding Hero"
              width={1168}
              height={1752}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-full"></div>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-lg text-gray-600">
            Một tin nhắn hỏi thăm bình thường, cả hai đều ngạc nhiên khi người
            kia đang không ở trong một mối quan hệ nào cả. Chúng mình cứ như
            vậy, nói chuyện cùng nhau, tậm sự trên trời dưới biển, mọi thứ về
            cuộc đời và thuộc về nhau không lâu sau đó. Mong rằng hành trình này
            sẽ kéo dài mãi mãi cho tới khi đầu bạc răng long.
          </p>
        </div>
      </div>
    </section>
  );
}
