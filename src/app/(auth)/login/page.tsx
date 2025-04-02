export default function Login(){
  return (
    <form>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py mt-25">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Faça seu login
            </p><div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                E-mail
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="password" type="password" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Senha
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="confirmPassword" type="password" />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <label className="font-light text-gray-500 text-gray-300">
                  <a href="#" className="font-medium text-primary-600 hover:underline text-primary-500">
                     Esqueci minha Senha
                  </a>
                </label>
              </div>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white" type="submit">
              Login
            </button>
          </div>
        </div>
      </div></form>
  );
}