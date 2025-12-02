interface Lap {
    id: number;
    timeRemaining: number;
    difference: number;
    timestamp: any;
}

interface LapListProps {
    laps: Lap[];
}

export default function LapList({ laps }: LapListProps) {
    const formatTime = (ms: number) => {
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recorded Laps</h3>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Lap #
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Time Remaining
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Difference
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {laps.map((lap) => (
                            <tr key={lap.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {lap.id}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {formatTime(lap.timeRemaining)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {lap.difference !== 0 ? formatTime(Math.abs(lap.difference)) : "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
