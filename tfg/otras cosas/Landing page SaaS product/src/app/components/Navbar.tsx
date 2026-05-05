import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Características', href: '#features' },
    { name: 'Precios', href: '#pricing' },
    { name: 'Testimonios', href: '#testimonials' },
    { name: 'Recursos', href: '#resources' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Tu SaaS</span>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SaasFlow</span>
            </div>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900 hover:text-blue-600">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost">Iniciar sesión</Button>
          <Button>Comenzar gratis</Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 px-6 pb-6 pt-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">Iniciar sesión</Button>
              <Button className="w-full">Comenzar gratis</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
