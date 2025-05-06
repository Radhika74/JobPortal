import { setSearchedQuery } from '@/redux/jobSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const filterData = [
    {
        filterType: 'Location',
        array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
    },
    {
        filterType: 'Industry',
        array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
    },
    {
        filterType: 'Salary',
        array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue || searchInput));
    }, [selectedValue, searchInput]);

    return (
        <div className="w-full bg-white p-5 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <h1 className="text-xl font-bold text-[#6A38C2]">Filter Jobs</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by title, skill, etc..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] text-sm"
            />

            <hr />

            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4">
                {filterData.map((section, index) => (
                    <div key={index} className="space-y-2">
                        <h2 className="text-lg font-semibold text-[#6A38C2]">{section.filterType}</h2>
                        {section.array.map((item, idx) => {
                            const itemId = `id-${index}-${idx}`;
                            return (
                                <div key={itemId} className="flex items-center space-x-2">
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId} className="text-sm text-gray-700">
                                        {item}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
