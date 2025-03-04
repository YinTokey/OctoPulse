import React from 'react';
import HeaderTable from "@/app/components/HeaderTable";
import RepoCard from "@/app/components/RepoCard";
import { RepoDetails } from '@/types/github';

interface ReportTemplateProps {
    repos: RepoDetails[];
}

const styles = `
  /* Global email styles */
  body {
    background-color: #f4f4f4;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .email-container {
    width: 600px;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto;
  }
  .email-header {
    padding: 24px;
  }
  .email-title {
    font-size: 24px;
    font-weight: bold;
    color: #3b82f6;
    text-align: center;
    margin-bottom: 20px;
  }
  .divider {
    border-top: 2px solid #e5e7eb;
    margin: 20px 0;
  }
`;

const ReportTemplate: React.FC<ReportTemplateProps> = ({ repos }) => {
    return (
        <html>
        <head>
            <title>Weekly GitHub Trend Report</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/* Force light mode in email clients */}
            <meta name="color-scheme" content="light" />
            <meta name="supported-color-schemes" content="light" />
            {/* Include our CSS styles */}
            <style>{styles}</style>
        </head>
        <body>
        <table width="100%" border={0} cellPadding={0} cellSpacing={0} align="center">
            <tr>
                <td align="center">
                    <table className="email-container" border={0} cellPadding={0} cellSpacing={0}>
                        <tr>
                            <td className="email-header">
                                <h1 className="email-title">Weekly GitHub Trend Report</h1>
                                <HeaderTable repos={repos} />
                                <div className="divider"></div>
                                {repos.map((repo) => (
                                    <RepoCard key={repo.id} repo={repo} />
                                ))}
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