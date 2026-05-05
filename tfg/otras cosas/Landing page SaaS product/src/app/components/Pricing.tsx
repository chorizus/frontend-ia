import { Check } from 'lucide-react';
import { Button } from './ui/button';

const tiers = [
  {
    name: 'Starter',
    price: '29',
    description: 'Perfecto para emprendedores y equipos pequeños',
    features: [
      'Hasta 5 usuarios',
      '10 GB de almacenamiento',
      'Soporte por email',
      'Integraciones básicas',
      'Dashboard analítico',
    ],
    cta: 'Comenzar gratis',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '79',
    description: 'Ideal para equipos en crecimiento',
    features: [
      'Hasta 25 usuarios',
      '100 GB de almacenamiento',
      'Soporte prioritario 24/7',
      'Todas las integraciones',
      'Analytics avanzados',
      'Automatizaciones ilimitadas',
      'API personalizada',
    ],
    cta: 'Prueba 14 días gratis',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Personalizado',
    description: 'Para grandes organizaciones',
    features: [
      'Usuarios ilimitados',
      'Almacenamiento ilimitado',
      'Account manager dedicado',
      'SLA garantizado',
      'Seguridad avanzada',
      'Onboarding personalizado',
      'Desarrollo a medida',
    ],
    cta: 'Contactar ventas',
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-blue-600">Precios</h2>
          <p className="mt-2 text-3xl sm:text-4xl text-gray-900">
            Planes que escalan contigo
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Elige el plan perfecto para tu negocio. Cambia o cancela cuando quieras.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-200 xl:p-10 ${
                tier.highlighted ? 'scale-105 ring-2 ring-blue-600' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                  {tier.highlighted && (
                    <span className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold text-blue-600">
                      Más popular
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  {tier.price !== 'Personalizado' && (
                    <span className="text-4xl font-bold tracking-tight text-gray-900">${tier.price}</span>
                  )}
                  {tier.price === 'Personalizado' ? (
                    <span className="text-3xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                  ) : (
                    <span className="text-sm font-semibold text-gray-600">/mes</span>
                  )}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={`mt-8 w-full ${
                  tier.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300'
                }`}
                variant={tier.highlighted ? 'default' : 'outline'}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
