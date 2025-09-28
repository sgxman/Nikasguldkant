import React, { useState } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Wine, Utensils, Heart, Building2, Truck, CheckCircle, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Wine className="h-8 w-8 text-amber-600 mr-2" />
              <span className="text-xl font-logo text-gray-900">Nikas guldkant</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('hem')} className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Hem
              </button>
              <button onClick={() => scrollToSection('produkter')} className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Våra produkter
              </button>
              <button onClick={() => scrollToSection('tillfallen')} className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Tillfällen
              </button>
              <button onClick={() => scrollToSection('hur-det-fungerar')} className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Så fungerar det
              </button>
              <button onClick={() => scrollToSection('kontakt')} className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Kontakt
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-amber-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button onClick={() => scrollToSection('hem')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-amber-600 font-medium">
                  Hem
                </button>
                <button onClick={() => scrollToSection('produkter')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-amber-600 font-medium">
                  Våra produkter
                </button>
                <button onClick={() => scrollToSection('tillfallen')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-amber-600 font-medium">
                  Tillfällen
                </button>
                <button onClick={() => scrollToSection('hur-det-fungerar')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-amber-600 font-medium">
                  Så fungerar det
                </button>
                <button onClick={() => scrollToSection('kontakt')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-amber-600 font-medium">
                  Kontakt
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hem" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=1600)'}}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="relative z-10 text-white drop-shadow-lg font-logo text-5xl md:text-7xl">Nikas guldkant</span>
            <span className="block text-amber-300 relative z-10 drop-shadow-lg font-logo text-2xl md:text-3xl">porslin, glas & tillbehör</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed relative z-10 drop-shadow-lg font-elegant">
            Vi hyr ut porslin, glas, bestick, dukar, filtar, karaffer och mycket mer. 
            Oavsett om du planerar en liten middag, en stor fest, ett bröllop eller en minnesstund.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button 
              onClick={() => scrollToSection('produkter')}
              className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center"
            >
              Se våra produkter
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => scrollToSection('kontakt')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200 flex items-center justify-center shadow-xl backdrop-blur-sm"
            >
              <Phone className="mr-2 h-5 w-5" />
              Kontakta oss
            </button>
          </div>
        </div>
      </section>

      {/* Produkter Section */}
      <section id="produkter" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Allt du behöver för en lyckad fest
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Från elegant porslin till praktiska tillbehör – vi har allt för ditt evenemang
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wine className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-elegant">Porslin & glas</h3>
              <p className="text-gray-600">Tallrikar, glas, muggar, karaffer och elegant servering</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-elegant">Bestick & servering</h3>
              <p className="text-gray-600">Knivar, gafflar, skedar och vackra uppläggningsfat</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-sm flex items-center justify-center">
                  <div className="w-6 h-1 bg-white rounded"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-elegant">Textilier</h3>
              <p className="text-gray-600">Dukar, servetter, filtar och linne för perfekt dukning</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 text-purple-600">⚱️</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-elegant">Tillbehör</h3>
              <p className="text-gray-600">Ljusstakar, termosar, skålar och andra festtillbehör</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tillfällen Section */}
      <section id="tillfallen" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vi hjälper dig vid alla typer av tillställningar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Från intima middagar till stora celebrationer – vi har erfarenheten och utrustningen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Heart className="h-12 w-12 text-rose-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-elegant">Bröllop</h3>
              <p className="text-gray-600 text-lg">Elegant dukning för den stora dagen. Vi hjälper er skapa minnen som varar för evigt.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Wine className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-elegant">Fester & kalas</h3>
              <p className="text-gray-600 text-lg">Stort som smått – vi har utrustning för alla typer av festligheter och celebrationer.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 text-gray-500 mb-4 text-2xl">🕊️</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-elegant">Minnesstunder & begravningar</h3>
              <p className="text-gray-600 text-lg">Stilrent och diskret för värdiga minnesstunder i svåra stunder.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Building2 className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-elegant">Företagsevent</h3>
              <p className="text-gray-600 text-lg">Mingel, konferens eller firmafest – professionell service för företagstillställningar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hur det fungerar Section */}
      <section id="hur-det-fungerar" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enkelt och smidigt – så här går det till
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vi gör processen så enkel som möjligt så du kan fokusera på det viktiga – din fest
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-amber-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-elegant">Välj produkter</h3>
              <p className="text-gray-600">Kontakta oss så hjälper vi dig välja rätt produkter för ditt evenemang</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-elegant">Leverans</h3>
              <p className="text-gray-600">Vi levererar eller du hämtar själv – vi anpassar oss efter dina behov</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wine className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-elegant">Njut av festen</h3>
              <p className="text-gray-600">Använd utrustningen och fokusera på att ha en fantastisk fest</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-purple-600" />
              </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-3 font-elegant">Lämna tillbaka</h3>
              <p className="text-gray-600">Lämna tillbaka odiskat – vi sköter disken så du slipper</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Boka eller fråga oss direkt
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ring oss, mejla eller fyll i vårt formulär så hjälper vi dig att planera din beställning
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="lg:col-span-2">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-8 font-elegant text-center">Kontaktinformation</h3>
                <div className="text-center">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-10 w-10 text-amber-600" />
                  </div>
                  <h4 className="text-2xl font-semibold text-gray-900 mb-4 font-elegant">Ring oss</h4>
                  <p className="text-3xl font-bold text-amber-600 mb-3">0XX-XXX XX XX</p>
                  <p className="text-lg text-gray-600">Vardagar 9-17</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Wine className="h-8 w-8 text-amber-500 mr-2" />
              <span className="text-2xl font-logo">Nikas guldkant</span>
            </div>
            <p className="text-gray-400 mb-6">
              Din partner för minnesvärda evenemang
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <span>Telefon: 0XX-XXX XX XX</span>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
              <p>&copy; 2025 Nikas guldkant. Alla rättigheter förbehållna.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;