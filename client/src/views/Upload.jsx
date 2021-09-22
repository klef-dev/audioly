import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Redirect } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Upload = () => {
  const [caption, setCaption] = useState("");
  const [track, setTrack] = useState(null);
  const [newTrack, setNewTrack] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const token = useStoreState((state) => state.token);
  const uploadTrack = useStoreActions((actions) => actions.uploadTrack);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setError("");
    if (file["size"] < 5111775) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setTrack(file);
      };
    } else {
      setError("Your track is greater than 5mb");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setError(null);
    const formData = new FormData();
    formData.append("file", track);
    formData.append("caption", caption);
    try {
      const data = await uploadTrack(formData);
      setNewTrack(data);
      setCaption("");
      setTrack(null);
    } catch (error) {
      const { response } = error;
      if (response) {
        const { data } = response;
        if (data.errors) {
          setErrors(data.errors);
        } else if (data.error) {
          setError(data.error);
        }
      } else {
        setError("Make sure your connection is good");
      }
    }
  };

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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Upload your amazing track
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          This will be added with your registered user data
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            {errors.map((error, i) => (
              <p className="text-red-500" key={i}>
                {error.msg}
              </p>
            ))}
            <div>
              <label
                htmlFor="caption"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  id="caption"
                  name="caption"
                  type="text"
                  autoComplete="caption"
                  value={caption}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="track"
                className="block text-sm font-medium text-gray-700"
              >
                Track
              </label>
              <div className="mt-1">
                <input
                  id="file"
                  type="file"
                  accept="audio/mpeg"
                  onChange={uploadFile}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <p className="text-red-500">{error}</p>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload 🚀
              </button>
            </div>
          </form>
        </div>
        {newTrack && (
          <div className="shadow-md rounded-md">
            <div className="p-5">
              <h5 className="text-xl font-semibold mb-2">{newTrack.caption}</h5>
              <ReactAudioPlayer
                src={`${process.env.REACT_APP_API_URI}/audio/${newTrack.filename}`}
                controls
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
