import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import { Image } from "blitz"

function Slider() {
  return (
    <section className="relative mt-7 shadow-2xl max-w-screen-2xl mx-auto">
      <div />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div className="w-full h-full">
          <Image loading="lazy" src="/images/slider-1.jpg" alt="" width={2000} height={600} />
        </div>
        <div className="w-full h-full">
          <Image loading="lazy" src="/images/slider-2.jpg" alt="" width={2000} height={600} />
        </div>
        <div className="w-full h-full">
          <Image loading="lazy" src="/images/slider-3.jpg" alt="" width={2000} height={600} />
        </div>
        <div className="w-full h-full">
          <Image loading="lazy" src="/images/slider-4.jpeg" alt="" width={2000} height={600} />
        </div>
      </Carousel>
    </section>
  )
}

export default Slider
