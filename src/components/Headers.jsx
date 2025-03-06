import Swap from "../image/swap.png";
const Header = () => {
  return (
    <header className="w-full bg-blue-600 text-white shadow-md fixed top-0 left-0 z-999">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center p-4">
        {/* Sol Taraf: Logo ve İkon */}
        <div className="flex items-center space-x-2">
        <img src={Swap} className="w-10 h-10 object-contain" alt="Logo" />
          <h1 className="text-lg font-bold">FaceSwapApp</h1>
        </div>

        {/* Sağ Taraf: Kullanıcı Adı */}
        <span className="text-lg font-semibold">Melih Yusuf Ercan</span>
      </div>
    </header>
  );
};

export default Header;
