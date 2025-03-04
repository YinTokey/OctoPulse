import React from 'react';
import { RepoDetails } from '@/types/github';

interface HeaderTableProps {
    repos: RepoDetails[];
}

const headerCellStyle: React.CSSProperties = {
    padding: '8px',
    textAlign: 'left',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#3182ce',
    textTransform: 'uppercase',
    borderBottom: '2px solid #cbd5e0',
    backgroundColor: '#ebf8ff',
};

const cellStyle: React.CSSProperties = {
    padding: '8px',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #e2e8f0',
};

export default function HeaderTable({ repos }: HeaderTableProps) {
    return (
        <div style={{ overflowX: 'auto', marginBottom: '10px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={headerCellStyle}>Repository</th>
                    <th style={headerCellStyle}>Stars</th>
                    <th style={headerCellStyle}>Forks</th>
                    <th style={headerCellStyle}>Contributors</th>
                    <th style={headerCellStyle}>Last Update</th>
                </tr>
                </thead>
                <tbody style={{ backgroundColor: '#ffffff' }}>
                {repos.map((repo) => (
                    <tr key={repo.id}>
                        <td style={cellStyle}>
                            <a
                                href={repo.html_url}
                                style={{ color: '#3182ce', textDecoration: 'none' }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {repo.name}
                            </a>
                        </td>
                        <td style={cellStyle}>{repo.stars}</td>
                        <td style={cellStyle}>{repo.forks}</td>
                        <td style={cellStyle}>{repo.contributors}</td>
                        <td style={cellStyle}>{repo.updatedAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}