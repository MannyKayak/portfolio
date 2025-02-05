import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function AboutMe() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <Link
        href={"/"}
        className="fixed bottom-10 right-10 bg-slate-400 p-5 rounded-full shadow-md"
      >
        <FaHome className=" flex text-white text-lg size-10" />
      </Link>
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          My Journey: From the Olympics to Web Development
        </h1>
        <p className="text-xl text-gray-600">
          A Story of Dedication and Transformation
        </p>
      </header>

      {/* Sezione 1: Olympic Experiences */}
      <section className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:w-1/2">
          <Image
            src="/images/tokyo2021.jpg"
            alt="Tokyo 2016 Olympics"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-4">Olympic Experiences</h2>
          <p className="mb-4">
            For many athletes, the Olympics isn’t just an event it’s a dream you
            carry with you forever. I was lucky enough to live that dream not
            once, but twice. Both the Rio 2016 and Tokyo 2020 Games have left a
            lasting impact on my life and my journey in sports. I still remember
            my first Olympic experience in Rio 2016. The whole atmosphere was
            electric, and every moment buzzed with adrenaline and determination.
            Even though I didn’t come home with a medal, that experience pushed
            me to keep training and improve every day. Then came Tokyo 2020.
            Winning the silver medal there was more than just a personal triumph
            it was the payoff after years of hard work, sacrifice, and pure
            dedication.
          </p>
          <p className="mb-4">
            The Rio 2016 Olympics were my first time participating in this
            global event. The excitement was palpable, and every moment was
            filled with adrenaline and determination. Although I didn't win a
            medal, the experience motivated me to keep working hard and improve
            my performance.
          </p>
          <p>
            My determination paid off at Tokyo 2020, where I had the honor of
            winning the silver medal. This achievement was the culmination di
            anni di duro lavoro, sacrifici e dedizione.
          </p>
        </div>
      </section>

      {/* Sezione 2: Academic Background */}
      <section className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Per alternare l'ordine, usiamo "order" */}
        <div className="md:w-1/2 p-6 order-2 md:order-1">
          <h2 className="text-2xl font-semibold mb-4">Academic Background</h2>
          <p>
            I've always believed that education is just as important as sports.
            I earned my master's degree in Materials Engineering at the
            Politecnico di Milano a journey that not only gave me a rock-solid
            scientific and technical foundation but also sharpened my analytical
            and problem-solving skills. Balancing intense training sessions with
            demanding studies wasn’t easy. There were times when the pressure
            felt overwhelming, but thanks to the unwavering support of my family
            and the encouragement of my teammates, I managed to push through and
            come out stronger on both fronts.
          </p>
        </div>
        <div className="md:w-1/2 order-1 md:order-2">
          <Image
            src="/images/studio.jpg"
            alt="Academic Background"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
      </section>

      {/* Sezione 3: Passion for Coding */}
      <section className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:w-1/2">
          <Image
            src="/images/tedx.jpg"
            alt="Passion for Coding"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-4">Passion for Coding</h2>
          <p>
            After earning my degree, I discovered a whole new world in web
            development and coding. I started out with a few online courses in
            C, Python, and JavaScript, and quickly realized that coding wasn't
            just another skill; it was a gateway to endless creative
            possibilities. Over the past five years, I've also had fun
            experimenting with Solidity for blockchain projects and tinkering
            with Arduino on personal projects. It's been an exciting journey,
            and I'm hopeful that with time and dedication, this newfound passion
            will turn into my next career.
          </p>
        </div>
      </section>

      {/* Sezione 4: Embracing the Future */}
      <section className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:w-1/2 p-6 order-2 md:order-1">
          <h2 className="text-2xl font-semibold mb-4">Embracing the Future</h2>
          <p>
            In conclusion, my journey from Olympic athlete to engineer and
            aspiring web developer has been marked by challenges, successes, and
            transformations. Each phase of my life has taught me valuable
            lessons and helped me grow as an individual. I'm excited to see
            where my next chapter will take me, and I'm ready to face new
            challenges with the same tenacity and perseverance that have
            accompanied me so far.
          </p>
        </div>
        <div className="md:w-1/2 order-1 md:order-2">
          <Image
            src="/images/canoa.jpg"
            alt="Embracing the Future"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
