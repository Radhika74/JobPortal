
import LatestJobCards from './LatestJobCards';

const randomJobs = [1,2,3,4,5,6]
const LatestJobs = () => {

    return (
        <section className="py-10 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Latest Job Opportunities</h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {
                    randomJobs.slice(0,6).map((item,index)=> <LatestJobCards/>)
                    }
                </div>
            </div>
        </section>
    );
};

export default LatestJobs;
