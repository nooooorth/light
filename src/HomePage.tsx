import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate("/encouragement");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-bold tracking-tight animate-fade-in-down">
          點亮
        </h1>
        <p className="mt-4 text-xl text-slate-300 animate-fade-in-up animation-delay-300">
          在每個瞬間，發現一束光
        </p>
      </header>
      <main className="animate-fade-in animation-delay-600">
        <Button 
          size="lg" 
          className="px-12 py-6 text-2xl font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={handleStartClick}
        >
          開始
        </Button>
      </main>
      <style>
        {`
          @keyframes fade-in-down {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.8s ease-out forwards;
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          .animation-delay-600 {
            animation-delay: 0.6s;
          }
        `}
      </style>
    </div>
  );
}

export default HomePage;

