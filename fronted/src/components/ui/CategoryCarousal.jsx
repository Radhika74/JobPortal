import { setSearchedQuery } from '@/redux/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="my-16 px-4">
            <h2 className="text-center text-3xl font-bold mb-8">
                Latest & Top <span className="text-[#6C3FCF]">Categories</span>
            </h2>

            <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent className="flex gap-2">
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                className="w-full rounded-full bg-white border-2 border-[#6C3FCF] text-[#6C3FCF] hover:bg-[#6C3FCF] hover:text-white transition-all duration-300 shadow-sm text-sm sm:text-base font-semibold py-4"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
