import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Trending from './components/Trending/Trending'
import ComingSoon from './components/ComingSoon/ComingSoon'
import Newsletter from './components/Newsletter/Newsletter'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Trending />
        <ComingSoon />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default App
