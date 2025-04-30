import FilterCard from './FilterCard';
import Job from './Job';
import Navbar from './shared/Navbar';

const jobArray = [1,2,3,4,5,6,7,8]; // Replace with your actual job data or state

const Jobs = () => {
    return (
        <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-1/5'>
                        <FilterCard />
                    </div>
                    <div>
                        {
                        jobArray.length <= 0 ?
                            <span>Job not found</span>
                        : (
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                jobArray.map((item, index) => (
                                    <div>
                                        <Job/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
