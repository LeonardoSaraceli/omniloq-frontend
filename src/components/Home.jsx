import FirstSection from './home/FirstSection'
import Footer from './home/Footer'
import Header from './home/Header'
import SecondSection from './home/SecondSection'
import ThirdSection from './home/ThirdSection'
import '../assets/styles/Home.css'

export default function Home() {
  return (
    <main id="home">
      <Header />

      <FirstSection />

      <SecondSection />

      <ThirdSection />

      <Footer />
    </main>
  )
}
