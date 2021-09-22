import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory, Link, Redirect } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [interest, setInterest] = useState("");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);

  const token = useStoreState((state) => state.token);
  const register = useStoreActions((actions) => actions.register);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setError(null);
    try {
      await register({
        password,
        username,
        firstName: name.split(" ").slice(0, -1).join(" "),
        lastName: name.split(" ").slice(-1).join(" "),
        dob,
        interests,
      });
      history.push("/");
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

  const handleInterest = (event) => {
    if (event.key === "Enter" && event.target.value) {
      event.preventDefault();
      setInterests((interests) => [...interests, interest]);
      setInterest("");
    }
  };

  const removeInterest = (i) => {
    setInterests(interests.filter((interest, index) => index !== i))
  };

  if (token) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign in to your account
          </Link>
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="tel"
                  autoComplete="username"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="interests"
                className="block text-sm font-medium text-gray-700"
              >
                Interests
              </label>
              <small>To add new interest, press enter.</small>
              {interests.length ? (
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {interests.map((interest, i) => (
                    <span
                      key={i}
                      className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-indigo-100 bg-indigo-700 border border-indigo-700"
                    >
                      <span className="text-xs font-normal leading-none max-w-full flex-initial">
                        {interest}
                      </span>
                      <span
                        className="flex flex-auto flex-row-reverse"
                        onClick={() => removeInterest(i)}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </span>
                      </span>
                    </span>
                  ))}
                </div>
              ) : (
                ""
              )}
              <div className="mt-1">
                <input
                  id="interests"
                  name="interests"
                  placeholder="Add interest and press enter to add more"
                  type="text"
                  value={interest}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setInterest(e.target.value)}
                  onKeyPress={handleInterest}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Date of birth
              </label>
              <div className="mt-1">
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  autoComplete="dob"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <p className="text-red-500">{error}</p>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
