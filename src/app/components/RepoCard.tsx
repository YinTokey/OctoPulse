// src/app/components/RepoCard.tsx

import React from 'react';
import { RepoDetails } from '@/types/github';
import { generateQuickChartUrl } from '@/utils/chart';

// Define CSS for the repo card as a string constant
const styles = `
  .repo-card {
    margin-bottom: 40px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 24px;
    width: 100%;
  }
  .repo-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  .repo-details {
    width: 66.66%;
    padding-right: 10px;
  }
  .repo-details h3 {
    font-size: 16px;
    font-weight: bold;
    color: #1e40af;
    margin-bottom: 8px;
    margin-left: 10px;
    margin-right: 5px;
  }
  .repo-details h3 a {
    color: #1e40af;
    text-decoration: none;
  }
  .repo-details h3 a:hover {
    text-decoration: underline;
  }
  .repo-details p {
    color: #374151;
    font-size: 14px;
    margin-bottom: 8px;
    margin-left: 10px;
    margin-right: 5px;
  }
  .repo-details ul {
    margin: 0;
    padding-left: 30px;
    margin-bottom: 8px;
  }
  .repo-details li {
    color: #4b5563;
    font-size: 12px;
    list-style-type: disc;
    margin-bottom: 4px;
    margin-left: 10px;
    margin-right: 5px;
  }
  .chart-container {
    width: 33.33%;
    position: relative;
    height: 200px;
    margin-left: 5px;
    margin-right: 10px;
  }
  .metrics-table {
    width: 100%;
    font-size: 12px;
    color: #4b5563;
  }
  .metrics-table td {
    padding-bottom: 8px;
    vertical-align: top;
    padding-left: 10px;
    padding-right: 5px;
  }
  .metric-label {
    font-weight: bold;
  }
  .language-badge {
    background-color: #bfdbfe;
    color: #1d4ed8;
    padding: 4px 4px;
    border-radius: 4px;
  }
`;

interface RepoCardProps {
    repo: RepoDetails;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
    return (
        <>
            {/* Inject the component-specific CSS */}
            <style>{styles}</style>
            <table className="repo-card" cellPadding={0} cellSpacing={0}>
                <tbody>
                <tr>
                    <td>
                        <table className="repo-header" width="100%" cellPadding={0} cellSpacing={0}>
                            <tbody>
                            <tr>
                                <td className="repo-details">
                                    <h3>
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                            {repo.fullName}
                                        </a>
                                    </h3>
                                    <p>{repo.description}</p>
                                    <ul>
                                        <li>Real-time GitHub API integration</li>
                                        <li>Interactive analytics dashboard</li>
                                        <li>Automated AI-generated insights</li>
                                        <li>Modular architecture for scalability</li>
                                    </ul>
                                </td>
                                <td className="chart-container">
                                    <img
                                        src={generateQuickChartUrl(repo.trendData)}
                                        alt={`${repo.name} chart`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style={{ paddingTop: '16px' }}>
                        <table className="metrics-table" width="100%" cellPadding={0} cellSpacing={0}>
                            <tbody>
                            <tr>
                                <td width="50%">
                                    <span className="metric-label" style={{ color: '#10b981' }}>⭐ Stars:</span> {repo.stars}
                                </td>
                                <td width="50%">
                                    <span className="metric-label" style={{ color: '#8b5cf6' }}>🍴 Forks:</span> {repo.forks}
                                </td>
                            </tr>
                            <tr>
                                <td width="50%">
                                    <span className="metric-label" style={{ color: '#3b82f6' }}>👀 Watchers:</span> {repo.watchers}
                                </td>
                                <td width="50%">
                                    <span className="metric-label">❗ Open Issues:</span> {repo.openIssues}
                                </td>
                            </tr>
                            <tr>
                                <td width="50%">
                                    <span className="metric-label">Language:</span> <span className="language-badge">{repo.language}</span>
                                </td>
                                <td width="50%">
                                    <span className="metric-label">Last Update:</span> {repo.updatedAt}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default RepoCard;