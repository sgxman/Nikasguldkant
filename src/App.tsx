import React, { useState } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-3xl font-logo text-stone-800">Nikas guldkant</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-12">
              <button onClick={() => scrollToSection('hem')} className="text-stone-700 hover:text-stone-900 font-medium transition-colors text-lg">
                Hem
              </button>
              <button onClick={() => scrollToSection('produkter')} className="text-stone-700 hover:text-stone-900 font-medium transition-colors text-lg">
                Produkter
              </button>
              <button onClick={() => scrollToSection('hur-det-fungerar')} className="text-stone-700 hover:text-stone-900 font-medium transition-colors text-lg">
                Process
              </button>
              <button onClick={() => scrollToSection('kontakt')} className="bg-stone-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-900 transition-colors">
                Kontakt
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-stone-700 hover:text-stone-900 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-stone-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button onClick={() => scrollToSection('hem')} className="block w-full text-left px-3 py-3 text-stone-700 hover:text-stone-900 font-medium text-lg">
                  Hem
                </button>
                <button onClick={() => scrollToSection('produkter')} className="block w-full text-left px-3 py-3 text-stone-700 hover:text-stone-900 font-medium text-lg">
                  Produkter
                </button>
                <button onClick={() => scrollToSection('hur-det-fungerar')} className="block w-full text-left px-3 py-3 text-stone-700 hover:text-stone-900 font-medium text-lg">
                  Process
                </button>
                <button onClick={() => scrollToSection('kontakt')} className="block w-full text-left px-3 py-3 bg-stone-800 text-white font-medium rounded-lg mx-3 mt-2">
                  Kontakt
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hem" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.dropbox.com/scl/fi/cq5njj2dqykkta6e5yeeo/IMG_3742-2025-09-28.jpeg?rlkey=tpc62so4irte9x7weapgxsaki&st=uwzyc0we&raw=1" 
            alt="Nikas guldkant table setting" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-50/60 to-stone-100/60"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-logo text-stone-800 mb-6 leading-tight">
            Nikas guldkant
          </h1>
          <p className="text-2xl md:text-3xl font-logo text-stone-600 mb-8">
            Porslin, Glas & Tillbehör
          </p>
          <p className="text-xl md:text-2xl text-stone-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Professionell festuthyrning för alla tillfällen. Jag levererar kvalitet, elegans och trygghet 
            så att du kan fokusera på det som verkligen betyder något – dina gäster och minnen som skapas.
          </p>
        </div>
      </section>

      {/* Produkter Section */}
      <section id="produkter" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
              Komplett sortiment för alla evenemang
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Från intima middagar till storslagna celebrationer – jag har allt du behöver för en perfekt upplevelse
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-stone-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <div className="w-12 h-12 bg-stone-100 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-4">Porslin & Glas</h3>
            </div>

            <div className="bg-stone-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <div className="w-14 h-10 bg-stone-100 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-4">Dekor & Tillbehör</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Tillfällen Section */}
      <section id="tillfallen" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
              Expertis för alla livets högtider
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Med år av erfarenhet hjälper jag dig skapa minnesvärda stunder, oavsett tillfälle
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="hur-det-fungerar" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
              Smidig process från start till mål
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Jag tar hand om alla detaljer så du kan fokusera på det viktiga
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-stone-200 transition-colors duration-300">
                <span className="text-3xl font-bold text-stone-600">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-4">Konsultation</h3>
              <p className="text-stone-600 leading-relaxed">Ring mig så diskuterar vi dina behov, antal gäster och önskemål för evenemanget</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-stone-200 transition-colors duration-300">
                <span className="text-3xl font-bold text-stone-600">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-4">Planering</h3>
              <p className="text-stone-600 leading-relaxed">Jag sätter ihop ett skräddarsytt paket och planerar leverans efter ditt schema</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-stone-200 transition-colors duration-300">
                <span className="text-3xl font-bold text-stone-600">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-4">Leverans</h3>
              <p className="text-stone-600 leading-relaxed">Punktlig leverans av ren och kontrollerad utrustning direkt till din dörr</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-stone-200 transition-colors duration-300">
                <span className="text-3xl font-bold text-stone-600">4</span>
              </div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-4">Avslut</h3>
              <p className="text-stone-600 leading-relaxed">Lämna tillbaka odiskat – jag sköter rengöringen så du kan vila efter festen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-24 bg-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Redo att planera ditt evenemang?
          </h2>
          <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ring mig idag så hjälper jag dig skapa en oförglömlig upplevelse för dig och dina gäster
          </p>
          
          <div className="bg-white rounded-2xl p-12 shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center">
                <Phone className="h-10 w-10 text-stone-600" />
              </div>
            </div>
            <h3 className="text-3xl font-semibold text-stone-800 mb-4">Ring mig direkt</h3>
            <p className="text-4xl font-bold text-stone-800 mb-6">0XX-XXX XX XX</p>
            <p className="text-stone-600 text-lg">
              Eller skicka ett sms så återkommer jag till er
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <span className="text-3xl font-logo text-stone-300">Nikas guldkant</span>
            </div>
            <p className="text-stone-400 text-lg mb-8">
              Professionell festuthyrning med personlig service
            </p>
            <div className="flex justify-center text-stone-400 text-lg">
              <span>Telefon: 0XX-XXX XX XX</span>
            </div>
            <div className="mt-12 pt-8 border-t border-stone-800 text-stone-500">
              <p>&copy; 2025 Nikas guldkant. Alla rättigheter förbehållna.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;