import Hero from "../../components/Hero";
import Event from "../../components/Event";
import ContactSection from "../../components/ContactSection";
import News from "./News"
export default function Home() {
  return (
    <>
      <Hero />
      <News />
      <Event />
      <ContactSection />
    </>
  );
}
