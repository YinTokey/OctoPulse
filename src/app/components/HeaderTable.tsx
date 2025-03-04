// src/app/components/HeaderTable.tsx

import React from 'react';
import { RepoDetails } from '@/types/github';

const styles = `
  .header-table {
    margin-bottom: 20px;
    border-collapse: collapse;
    width: 100%;
  }
  .header-table th {
    padding: 8px;
    text-align: left;
    font-size: 10px;
    font-weight: bold;
    color: #3182ce;
    text-transform: uppercase;
    border-bottom: 2px solid #cbd5e0;
    background-color: #ebf8ff;
  }
  .header-table td {
    padding: 8px;
    white-space: nowrap;
    border-bottom: 1px solid #e2e8f0;
  }
  .header-table a {
    color: #3182ce;
    text-decoration: none;
  }
`;

interface HeaderTableProps {
    repos: RepoDetails[];
}

const HeaderTable: React.FC<HeaderTableProps> = ({ repos }) => {
    return (
        <>
            <style>{styles}</style>
            <table className="header-table" border={0} cellPadding={0} cellSpacing={0}>
                <thead>
                <tr>
                    <th>Repository</th>
                    <th>Stars</th>
                    <th>Forks</th>
                    <th>Contributors</th>
                    <th>Last Update</th>
                </tr>
                </thead>
                <tbody>
                {repos.map((repo) => (
                    <tr key={repo.id}>
                        <td>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                {repo.name}
                            </a>
                        </td>
                        <td>{repo.stars}</td>
                        <td>{repo.forks}</td>
                        <td>{repo.contributors}</td>
                        <td>{repo.updatedAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default HeaderTable;