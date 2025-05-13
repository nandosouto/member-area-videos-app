
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow py-4 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-fitness-500">ElisaFit</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={logout} 
            className="text-fitness-500 hover:text-fitness-700 hover:bg-fitness-100"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
