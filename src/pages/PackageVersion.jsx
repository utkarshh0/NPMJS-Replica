import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PackageVersionPage = () => {
    const { packageName, version } = useParams(); // Extracts the package name and version from the URL parameters
    const [versionInfo, setVersionInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch version information from the NPM registry whenever the package name or version changes
    useEffect(() => {
        const fetchVersionInfo = async () => {
            try {
                const response = await axios.get(`https://registry.npmjs.org/${packageName}/${version}`);
                setVersionInfo(response.data);
            } catch (err) {
                setError('An error occurred while fetching version information. Please try again.');
                console.error('Version info fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVersionInfo();
    }, [packageName, version]);

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;
    if (!versionInfo) return null;

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-xl font-bold mb-4">{versionInfo.name} v{versionInfo.version}</h1>
            <p className="text-xl mb-8">{versionInfo.description}</p>
            <div className="bg-white p-3 md:p-6 rounded-md shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Package Information</h2>
                <p className="mb-2"><strong>Author:</strong> {versionInfo.author?.name || 'Not specified'}</p>
                <p className="mb-2"><strong>License:</strong> {versionInfo.license || 'Not specified'}</p>
                <p className="mb-2"><strong>Homepage:</strong> <Link to={versionInfo.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm md:text-base hover:underline">{versionInfo.homepage}</Link></p>
                <p className="mb-2"><strong>Repository:</strong> <Link to={versionInfo.repository?.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm md:text-base hover:underline">{versionInfo.repository?.url}</Link></p>
            </div>
            <div className="bg-white p-6 rounded-md shadow mb-8">
                <h2 className="text-2xl font-semibold mb-4">Dependencies</h2>
                {Object.entries(versionInfo.dependencies || {}).length > 0 ? (
                    <ul className="list-disc pl-6">
                        {Object.entries(versionInfo.dependencies).map(([dep, ver]) => (
                            <li key={dep} className="mb-2">
                                <Link to={`/package/${dep}`} className="text-blue-600 hover:underline">{dep}</Link>: {ver}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No dependencies</p>
                )}
            </div>
        </div>
    );
};

export default PackageVersionPage;