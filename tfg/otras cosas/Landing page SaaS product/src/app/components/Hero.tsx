import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1658806264102-2c516eae5e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzc1MDAxMjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/85 to-gray-900/90"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl sm:text-6xl tracking-tight text-white mb-6">
            Transforma tu negocio con{' '}
            <span className="text-blue-400">herramientas inteligentes</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10">
            La plataforma todo-en-uno que necesitas para gestionar, analizar y hacer crecer tu empresa. 
            Automatiza procesos y ahorra tiempo con nuestra solución SaaS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="gap-2 text-base px-8 py-6">
              Comenzar gratis
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Play className="w-5 h-5" />
              Ver demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            No requiere tarjeta de crédito • Configuración en 2 minutos
          </p>
        </div>
        
        {/* Hero Image */}
        <div className="mt-16 sm:mt-24">
          <div className="relative rounded-xl bg-white/5 p-2 ring-1 ring-inset ring-white/10 lg:rounded-2xl lg:p-4">
            <img
              src="https://images.unsplash.com/photo-1761735486587-bcac08b15c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzc1MDMyOTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Dashboard preview"
              className="rounded-md shadow-2xl ring-1 ring-white/10 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}