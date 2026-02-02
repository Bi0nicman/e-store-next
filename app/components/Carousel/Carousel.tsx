"use client";
export function Carousel() {
  return (
    <div className="embla">
      <div className="embla__viewport">
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>

      <button className="embla__prev">Scroll to prev</button>
      <button className="embla__next">Scroll to next</button>
    </div>)
}