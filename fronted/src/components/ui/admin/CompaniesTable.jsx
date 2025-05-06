import { Edit2, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const [filteredCompanies, setFilteredCompanies] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilteredCompanies(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-hidden bg-white shadow-md rounded-lg">
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCompanies.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={company.logo} alt={company.name} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                                        >
                                            <Edit2 className="w-4 h-4 text-gray-600" />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
