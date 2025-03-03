import React from 'react';
import { RepoDetails } from '@/types/github';
import { generateQuickChartUrl } from '@/utils/chart';

interface ReportTemplateProps {
    repos: RepoDetails[];
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({ repos }) => {
    return (
        <html>
        <head>
            <title>Weekly GitHub Trend Report</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            {/* Force light mode in email clients */}
            <meta name="color-scheme" content="light"/>
            <meta name="supported-color-schemes" content="light"/>
        </head>
        <body
            style={{
                backgroundColor: '#f4f4f4',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
        <table width="100%" border={0} cellPadding={0} cellSpacing={0} align="center">
            <tr>
                <td align="center">
                    <table
                        width="600"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        <tr>
                            <td style={{ padding: '24px' }}>
                                <h1
                                    style={{
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        color: '#3b82f6',
                                        textAlign: 'center',
                                        marginBottom: '20px',
                                    }}
                                >
                                    Weekly GitHub Trend Report
                                </h1>
                                <hr style={{ borderTop: '2px solid #e5e7eb', margin: '20px 0' }} />
                                {repos.map((repo) => (
                                    <table
                                        key={repo.id}
                                        width="100%"
                                        border={0}
                                        cellPadding={0}
                                        cellSpacing={0}
                                        style={{ marginBottom: '40px' }}
                                    >
                                        <tr>
                                            <td style={{ paddingBottom: '10px' }}>
                                                <h2
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                        color: '#3b82f6',
                                                        margin: 0,
                                                    }}
                                                >
                                                    {repo.name}
                                                </h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                                                    <tr>
                                                        <td
                                                            width="66%"
                                                            valign="top"
                                                            style={{ paddingRight: '10px' }}
                                                        >
                                                            <h3
                                                                style={{
                                                                    fontSize: '16px',
                                                                    fontWeight: 'bold',
                                                                    color: '#1e40af',
                                                                    marginBottom: '8px',
                                                                }}
                                                            >
                                                                {repo.fullName}
                                                            </h3>
                                                            <p
                                                                style={{
                                                                    color: '#374151',
                                                                    fontSize: '14px',
                                                                    marginBottom: '8px',
                                                                }}
                                                            >
                                                                {repo.description}
                                                            </p>
                                                            <ul
                                                                style={{
                                                                    color: '#4b5563',
                                                                    fontSize: '12px',
                                                                    margin: 0,
                                                                    paddingLeft: '20px',
                                                                    marginBottom: '8px',
                                                                }}
                                                            >
                                                                <li>Real-time GitHub API integration</li>
                                                                <li>Interactive analytics dashboard</li>
                                                                <li>Automated AI-generated insights</li>
                                                                <li>Modular architecture for scalability</li>
                                                            </ul>
                                                        </td>
                                                        <td width="34%" valign="top">
                                                            <div style={{height: '200px', position: 'relative'}}>
                                                                {/* Embed QuickChart image */}
                                                                <img
                                                                    src={generateQuickChartUrl(repo.trendData)}
                                                                    alt={`${repo.name} chart`}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'contain',
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{paddingTop: '16px'}}>
                                                <table
                                                    width="100%"
                                                    border={0}
                                                    cellPadding={0}
                                                    cellSpacing={0}
                                                    style={{ fontSize: '12px', color: '#4b5563' }}
                                                >
                                                    <tr>
                                                        <td
                                                            width="50%"
                                                            valign="top"
                                                            style={{ paddingBottom: '8px' }}
                                                        >
                                                            <strong style={{ color: '#10b981' }}>⭐ Stars:</strong> {repo.stars}
                                                        </td>
                                                        <td
                                                            width="50%"
                                                            valign="top"
                                                            style={{ paddingBottom: '8px' }}
                                                        >
                                                            <strong style={{ color: '#8b5cf6' }}>🍴 Forks:</strong> {repo.forks}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            width="50%"
                                                            valign="top"
                                                            style={{ paddingBottom: '8px' }}
                                                        >
                                                            <strong style={{ color: '#3b82f6' }}>👀 Watchers:</strong> {repo.watchers}
                                                        </td>
                                                        <td
                                                            width="50%"
                                                            valign="top"
                                                            style={{ paddingBottom: '8px' }}
                                                        >
                                                            <strong>❗ Open Issues:</strong> {repo.openIssues}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            width="50%"
                                                            valign="top"
                                                            style={{ paddingBottom: '8px' }}
                                                        >
                                                            <strong>Language:</strong>{' '}
                                                            <span
                                                                style={{
                                                                    backgroundColor: '#bfdbfe',
                                                                    color: '#1d4ed8',
                                                                    padding: '2px 4px',
                                                                    borderRadius: '4px',
                                                                }}
                                                            >
                                    {repo.language}
                                  </span>
                                                        </td>
                                                        <td
                                                            width="50%"
                                                            valign="top"
                                                            style={{ paddingBottom: '8px' }}
                                                        >
                                                            <strong>Last Update:</strong> {repo.updatedAt}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                ))}
                                <hr style={{ borderTop: '1px solid #e5e7eb', margin: '20px 0' }} />
                                <p
                                    style={{
                                        fontSize: '12px',
                                        color: '#6b7280',
                                        textAlign: 'center',
                                        margin: 0,
                                    }}
                                >
                                    &copy; 2025 GitHub Trend Report. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        </body>
        </html>
    );
};

export default ReportTemplate;