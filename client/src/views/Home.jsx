import { Redirect } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useStoreState((state) => state.token);
  const audios = useStoreState((state) => state.audios);

  const getAudioTracks = useStoreActions((actions) => actions.getAudioTracks);
  const getTrack = useStoreActions((actions) => actions.getTrack);

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
    if (token) {
      fetchAudioTracks();
    }
  }, [token, getAudioTracks]);

  if (!token) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
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
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Artist
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          DOB
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Interests
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Play</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {audios.length &&
                        audios.map((audio, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {audio.caption}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {audio.user.firstName} {audio.user.lastName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {audio.user.dob}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {audio.user.interests.map((interest) => interest)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <ReactAudioPlayer
                                src={`${process.env.REACT_APP_API_URI}/audio/${audio.filename}`}
                                controls
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
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
