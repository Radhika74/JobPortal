import CategoryCarousel from "./CategoryCarousal";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./Latestjobs";
import Navbar from "./shared/Navbar";

const Home = () => {
    return (
    <div>
            <Navbar/>
            <HeroSection/>
            <CategoryCarousel/>
            <LatestJobs/>
            <Footer/>
    </div>
    )
};

export default Home;
