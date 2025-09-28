import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import headerimg from './images/bg_4.png';
import NgkTitleSubtitle from './components/NgkTitleSubtitle';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentSection, setCurrentSection] = useState<string>('');
  const currentSectionRef = useRef<string>('');
  const scrollDebounceIdRef = useRef<number | null>(null);
  const lockTimeoutRef = useRef<number | null>(null);
  const userSelectedRef = useRef<string | null>(null);
  const userLockUntilRef = useRef<number>(0);
  const userScrollingRef = useRef<boolean>(false);
  const scrollEndTimeoutRef = useRef<number | null>(null);  


  useEffect(() => {
    const onUserScrollStart = () => {
      // ignorera om användaren nyligen klickade i menyn (programmatisk scroll)
      if (userLockUntilRef.current > Date.now()) return;

      // endast första scroll-händelsen i ett "scroll-pass" ska nollställa valet
      if (!userScrollingRef.current) {
        userScrollingRef.current = true;
        userSelectedRef.current = null;
        // direkt nollställ visuell markering
        currentSectionRef.current = '';
        setCurrentSection('');
        // avbryt eventuell debounce från observern
        if (scrollDebounceIdRef.current) {
          window.clearTimeout(scrollDebounceIdRef.current);
          scrollDebounceIdRef.current = null;
        }
      }

      // återställ "scroll-pass" efter kort timeout (så nästa manuella scroll igen reset-:ar)
      if (scrollEndTimeoutRef.current) window.clearTimeout(scrollEndTimeoutRef.current);
      scrollEndTimeoutRef.current = window.setTimeout(() => {
        userScrollingRef.current = false;
        scrollEndTimeoutRef.current = null;
      }, 300);
    };

    window.addEventListener('wheel', onUserScrollStart, { passive: true });
    window.addEventListener('touchstart', onUserScrollStart, { passive: true });
    window.addEventListener('scroll', onUserScrollStart, { passive: true });

    return () => {
      window.removeEventListener('wheel', onUserScrollStart);
      window.removeEventListener('touchstart', onUserScrollStart);
      window.removeEventListener('scroll', onUserScrollStart);
      if (scrollEndTimeoutRef.current) window.clearTimeout(scrollEndTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const ids = ['hem', 'sortiment', 'vem_ar_jag', 'tillfallen', 'hur_det_fungerar', 'kontakt'];

    const updateSection = (id: string) => {
      if (currentSectionRef.current === id) return;
      currentSectionRef.current = id;
      setCurrentSection(id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // välj element som syns mest eller närmast toppen
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        let targetId: string | null = null;

        if (visible) {
          targetId = visible.target.id;
        } else {
          const closest = entries
            .map(e => ({ id: e.target.id, distance: Math.abs(e.boundingClientRect.top - 80) }))
            .sort((a, b) => a.distance - b.distance)[0];
          if (closest) targetId = closest.id;
        }

        if (!targetId) return;

        // Om användaren nyligen klickade i menyn, lås valet så observer inte överskriver
        if (userLockUntilRef.current > Date.now()) {
          // behåll användarens val tills lock går ut
          return;
        }

        // Debounce updates när användaren scrollar (300 ms)
        if (scrollDebounceIdRef.current) {
          window.clearTimeout(scrollDebounceIdRef.current);
        }
        scrollDebounceIdRef.current = window.setTimeout(() => {
          scrollDebounceIdRef.current = null;
          updateSection(targetId!);
        }, 300);
      },
      { root: null, rootMargin: '-80px 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollDebounceIdRef.current) {
        window.clearTimeout(scrollDebounceIdRef.current);
      }
      if (lockTimeoutRef.current) {
        window.clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      setIsMenuOpen(false);
      return;
    }

    // Markera användarens val direkt (så knappen tänds omedelbart)
    userSelectedRef.current = sectionId;
    userLockUntilRef.current = Date.now() + 1000; // lås i 1s så observer inte skriver över
    if (lockTimeoutRef.current) window.clearTimeout(lockTimeoutRef.current);
    lockTimeoutRef.current = window.setTimeout(() => {
      userSelectedRef.current = null;
      userLockUntilRef.current = 0;
      lockTimeoutRef.current = null;
    }, 1000);

    // Uppdatera state omedelbart så menymarkeringen inte "hoppar"
    currentSectionRef.current = sectionId;
    setCurrentSection(sectionId);

    // Stäng mobilmenyn först så layouten inte ändras efter scrollning
    setIsMenuOpen(false);

    // Vänta kort så header/menu har blivit stängd och layouten stabil
    // Justera timeout vid behov (50–200 ms)
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#50d71e]/40 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-5xl font-logo text-stone-800">Nikas guldkant</span>
            </div>

            {/* Desktop Navigation */}
            {/* <nav className="hidden md:flex space-x-12">
              <button onClick={() => scrollToSection('hem')}
                className={`text-lg font-medium transition-colors ${currentSection === 'hem' ? 'bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-900' : 'text-stone-700 hover:text-stone-900'}`}>
                Hem
              </button>
              <button onClick={() => scrollToSection('sortiment')}
                className={`text-lg font-medium transition-colors ${currentSection === 'sortiment' ? 'bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-900' : 'text-stone-700 hover:text-stone-900'}`}>
                Sortiment
              </button>
              <button onClick={() => scrollToSection('vem_ar_jag')}
                className={`text-lg font-medium transition-colors ${currentSection === 'vem_ar_jag' ? 'bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-900' : 'text-stone-700 hover:text-stone-900'}`}>
                Vem är jag?
              </button>
              <button onClick={() => scrollToSection('hur_det_fungerar')}
                className={`text-lg font-medium transition-colors ${currentSection === 'hur_det_fungerar' ? 'bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-900' : 'text-stone-700 hover:text-stone-900'}`}>
                Hur gör man?
              </button>
              <button onClick={() => scrollToSection('kontakt')}
                className={`text-lg font-medium transition-colors ${currentSection === 'kontakt' ? 'bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-900' : 'text-stone-700 hover:text-stone-900'}`}>
                Kontakt
              </button>
            </nav> */}

            <nav className="hidden md:flex space-x-4 items-center">
              {['hem','sortiment','vem_ar_jag','hur_det_fungerar','kontakt'].map(id => {
                const label = id === 'hem' ? 'Hem' : id === 'sortiment' ? 'Sortiment' : id === 'vem_ar_jag' ? 'Vem är jag?' : id === 'hur_det_fungerar' ? 'Hur gör man?' : 'Kontakt';
                const isActive = currentSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-lg font-medium transition-all duration-200 px-6 py-3 rounded-lg ${isActive ? 'bg-stone-800 text-white ring-2 ring-stone-900' : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'}`}
                  >
                    {label}
                  </button>
                );
              })}
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
                {/* <button onClick={() => scrollToSection('hem')}
                  className={`block w-full text-left px-3 py-3 text-stone-700 hover:text-stone-900 font-medium text-lg ${currentSection === 'hem' ? 'text-stone-900' : ''}`}>
                  Hem
                </button>
                <button onClick={() => scrollToSection('sortiment')}
                  className={`block w-full text-left px-3 py-3 text-stone-700 hover:text-stone-900 font-medium text-lg ${currentSection === 'sortiment' ? 'text-stone-900' : ''}`}>
                  Sortiment
                </button>
                <button onClick={() => scrollToSection('vem_ar_jag')}
                  className={`block w-full text-left px-3 py-3 text-stone-700 hover:text-stone-900 font-medium text-lg ${currentSection === 'vem_ar_jag' ? 'text-stone-900' : ''}`}>
                  Vem är jag?
                </button>
                <button onClick={() => scrollToSection('hur_det_fungerar')}
                  className={`block w-full text-left px-3 py-3 text-stone-700 hover:text-stone-900 font-medium text-lg ${currentSection === 'hur_det_fungerar' ? 'text-stone-900' : ''}`}>
                  Process
                </button>
                <button onClick={() => scrollToSection('kontakt')}
                  className={`block w-full text-left px-3 py-3 text-stone-700 hover:text-stone-900 font-medium text-lg ${currentSection === 'kontakt' ? 'text-stone-900' : ''}`}>
                  Kontakt
                </button> */}
                <button onClick={() => scrollToSection('hem')}
                  className={`block w-full text-left px-3 py-3 text-lg font-medium rounded ${currentSection === 'hem' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'}`}>
                  Hem
                </button>
                <button onClick={() => scrollToSection('sortiment')}
                  className={`block w-full text-left px-3 py-3 text-lg font-medium rounded ${currentSection === 'sortiment' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'}`}>
                  Sortiment
                </button>
                <button onClick={() => scrollToSection('vem_ar_jag')}
                  className={`block w-full text-left px-3 py-3 text-lg font-medium rounded ${currentSection === 'vem_ar_jag' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'}`}>
                  Vem är jag?
                </button>
                <button onClick={() => scrollToSection('hur_det_fungerar')}
                  className={`block w-full text-left px-3 py-3 text-lg font-medium rounded ${currentSection === 'hur_det_fungerar' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'}`}>
                  Hur det fungerar
                </button>
                <button onClick={() => scrollToSection('kontakt')}
                  className={`block w-full text-left px-3 py-3 text-lg font-medium rounded ${currentSection === 'kontakt' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'}`}>
                  Kontakt
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hem" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden scroll-mt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={headerimg}
            alt="Nikas guldkant table setting"
            className="w-full opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100/10 to-stone-100"></div>
        </div>
        <NgkTitleSubtitle title="Nikas guldkant" subtitle="Porslin, Glas & Tillbehör" nineGridAlign='bottomright' />
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl md:text-2xl text-stone-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Professionell festuthyrning för alla tillfällen.<br />Jag levererar kvalitet, elegans och trygghet
            så att du kan fokusera på det som verkligen betyder något – dina gäster och minnen som skapas.
          </p>
        </div>
      </section>

      {/* Sortiment Section */}
      <section id="sortiment" className="py-24 bg-white scroll-mt-20">
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

      {/* Vem är jag Section */}
      <section id="vem_ar_jag" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
              Vem är jag?
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Jag är Nika.<br />Kvinnan som grundade Nikas guldkant. <br />Med en passion för fest och service strävar jag efter att göra varje evenemang speciellt genom att erbjuda högkvalitativ uthyrning och personlig service.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="hur_det_fungerar" className="py-24 bg-white scroll-mt-20">
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
      <section id="kontakt" className="py-24 bg-stone-800 scroll-mt-20">
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