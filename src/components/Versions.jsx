export default function Versions({ packageInfo }) {
    // Extract the latest version from "dist-tags"
    const latestVersion = packageInfo["dist-tags"]?.latest;

    return (
        <>
            <p className="font-bold">Version</p>
            {Object.keys(packageInfo.versions)
                .reverse() // Reverse the order of the keys
                .map(version => (
                    <div className="tracking-wider text-gray-600 underline my-4 border-b" key={version}>
                        <p>{version}</p>
                    </div>
                ))}
        </>
    );
}
