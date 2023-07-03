import { Github } from "../Icons/Icons";

const OAuthGithub = () => {
  
function loginWithGitHub() {
  const url =
    import.meta.env.VITE_CLIENT_ID_URL + import.meta.env.VITE_CLIENT_ID;
  window.location.assign(url);
}
  return (
    <button
      onClick={loginWithGitHub}
      className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mb-2">
      <Github /> <span className="mx-auto">Login with GitHub</span>
    </button>
  );
};

export default OAuthGithub;
