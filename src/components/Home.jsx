import FirstSection from './home/FirstSection'
import HomeFooter from './home/HomeFooter'
import HomeHeader from './home/HomeHeader'
import SecondSection from './home/SecondSection'
import ThirdSection from './home/ThirdSection'
import '../assets/styles/Home.css'

export default function Home() {
  return (
    <main id='home'>
      <HomeHeader />

      <FirstSection />

      <SecondSection />

      <ThirdSection />

      <HomeFooter />
    </main>
  )
}
