// src/app/components/HeaderTable.tsx

import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import { RepoDetails } from "@/types/github";

interface HeaderTableProps {
    repos: RepoDetails[];
}

export default function HeaderTable({ repos }: HeaderTableProps) {
    return (
        <div className="overflow-x-auto mb-10">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Repository
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Stars
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Forks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Contributors
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Last Update
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {repos.map((repo) => (
                    <tr key={repo.id}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
                            <Link href={repo.html_url} legacyBehavior>
                                <a className="flex items-center text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
                                    <FiExternalLink className="mr-2" />
                                    {repo.name}
                                </a>
                            </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{repo.stars}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{repo.forks}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{repo.contributors}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{repo.updatedAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}