import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AudioList from "../components/AudioList";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const audios = useStoreState((state) => state.audios);

  const getAudioTracks = useStoreActions((actions) => actions.getAudioTracks);

  useEffect(() => {
    const fetchAudioTracks = async () => {
      setLoading(true);
      try {
        await getAudioTracks();
      } catch (error) {
        const { response } = error;
        if (response) {
          const { data } = response;
          if (data.error) {
            setError(data.error);
          } else if (data.message) {
            setError(data.message);
          }
        } else {
          setError("Make sure your connection is good");
        }
      }
      setLoading(false);
    };
    fetchAudioTracks();
  }, [getAudioTracks]);

  return (
    <div className="bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              The Audioly
            </h2>
            <span className="mt-3 text-xl text-gray-500 sm:mt-4">
              Welcome to Audioly 😎
            </span>
          </div>
          <div>
            <p className="mt-3 text-xl text-gray-900 sm:mt-4">
              What will you like to do today? 🙃
              <span className="sm:ml-3">
                <Link
                  to="/upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upload an audio
                </Link>
              </span>
            </p>
          </div>
        </div>

        {loading && <h1>Loading...</h1>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {audios.length ? (
                    <AudioList audios={audios} />
                  ) : (
                    "Hey there 👋, there's no available track yet. You can just upload a new track by clicking the upload button above."
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
