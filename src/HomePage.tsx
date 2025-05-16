import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlayCircle } from 'lucide-react'; // Import an icon for the button

function HomePage() {
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate("/encouragement");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4 animate-page-fade-in">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-bold tracking-tight animate-fade-in-down">
          点亮
        </h1>
        <p className="mt-4 text-xl text-slate-300 animate-fade-in-up animation-delay-300">
          在每个瞬间，发现一束光
        </p>
      </header>
      <main className="animate-fade-in animation-delay-600">
        <Button 
          size="lg" 
          className="group px-10 py-5 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-full shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75 flex items-center space-x-3"
          onClick={handleStartClick}
        >
          <PlayCircle size={32} className="transition-transform duration-300 ease-in-out group-hover:rotate-12" />
          <span>开始</span>
        </Button>
      </main>
    </div>
  );
}

export default HomePage;

