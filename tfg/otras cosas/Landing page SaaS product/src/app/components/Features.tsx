import { Zap, Shield, BarChart3, Users, Cloud, Headphones } from 'lucide-react';

const features = [
  {
    name: 'Automatización inteligente',
    description: 'Automatiza tareas repetitivas y ahorra hasta 10 horas semanales con nuestros flujos de trabajo personalizables.',
    icon: Zap,
  },
  {
    name: 'Seguridad empresarial',
    description: 'Protección de datos de nivel empresarial con cifrado end-to-end y cumplimiento GDPR completo.',
    icon: Shield,
  },
  {
    name: 'Analytics avanzados',
    description: 'Visualiza métricas en tiempo real y toma decisiones basadas en datos con nuestros dashboards intuitivos.',
    icon: BarChart3,
  },
  {
    name: 'Colaboración en equipo',
    description: 'Trabaja sin fricciones con tu equipo. Comentarios, menciones y notificaciones en tiempo real.',
    icon: Users,
  },
  {
    name: 'Infraestructura cloud',
    description: 'Escalabilidad infinita con 99.9% de uptime. Tus datos siempre disponibles, en cualquier lugar.',
    icon: Cloud,
  },
  {
    name: 'Soporte 24/7',
    description: 'Nuestro equipo de expertos está disponible las 24 horas para ayudarte cuando lo necesites.',
    icon: Headphones,
  },
];

export function Features() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1712698137596-15ea82027b55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBhZXJpYWx8ZW58MXx8fHwxNzc1MDM4NjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/92"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-blue-400">Todo lo que necesitas</h2>
          <p className="mt-2 text-3xl sm:text-4xl text-white">
            Características diseñadas para tu éxito
          </p>
          <p className="mt-6 text-lg text-gray-300">
            Herramientas potentes que se adaptan a equipos de cualquier tamaño
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}