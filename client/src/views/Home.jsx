import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
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
    if (audios.length === 0) {
      fetchAudioTracks();
    }
  }, [audios, getAudioTracks]);

  return (
    <div className="bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            The Audioly
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Welcome to Audioly
          </p>
        </div>

        {loading && <h1>Loading...</h1>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <AudioList audios={audios} />
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
