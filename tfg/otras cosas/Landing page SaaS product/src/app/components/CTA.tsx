import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1760483144305-7c04a6cec114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwZGlnaXRhbCUyMG5ldHdvcmt8ZW58MXx8fHwxNzc1MDM4NjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/90"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Únete a miles de empresas que ya están creciendo con nuestra plataforma.
            Empieza tu prueba gratuita hoy mismo, sin tarjeta de crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="gap-2 text-base px-8 py-6">
              Comenzar ahora
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 text-base px-8 py-6 bg-transparent text-white border-white hover:bg-white/10"
            >
              Hablar con ventas
            </Button>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            Prueba gratis durante 14 días • Sin compromiso • Cancela cuando quieras
          </p>
        </div>
      </div>
    </section>
  );
}