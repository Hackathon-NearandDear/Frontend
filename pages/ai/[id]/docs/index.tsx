import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface Log {
  id: number;
  aiid: string;
  createdat: string;
  log: string;
  txurl: string;
  faissid: string;
}

const formatTime = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(":");
  return `${hours}:${minutes}:${seconds.split(".")[0]}`;
};

const AIDocsPage: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchLogs = async () => {
      if (!id) {
        return;
      }

      try {
        const response = await fetch(`http://52.87.64.91:8000/ailogs/ai/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch logs");
        }
        const data = await response.json();
        setLogs(data.logs);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    if (id) {
      fetchLogs();
    }
  }, [id]);

  if (router.isFallback || loading)
    return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen bg-orange-50">
      <main className="flex-grow overflow-y-auto">
        <div className="py-6">
          <h2 className="text-2xl font-bold mb-6">Log History</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {logs.map((log) => (
                <li key={log.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {log.log}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {log.txurl}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Created at: {formatTime(log.createdat)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  return {
    props: {
      title: `AI Docs: ${id}`,
    },
  };
};

export default AIDocsPage;
