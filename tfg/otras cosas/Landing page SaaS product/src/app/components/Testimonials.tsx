const testimonials = [
  {
    body: 'Esta plataforma ha transformado completamente nuestra forma de trabajar. La automatización nos ha ahorrado incontables horas cada semana.',
    author: {
      name: 'María González',
      title: 'CEO, TechStart',
      imageUrl: 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwZXhlY3V0aXZlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0OTM5MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  },
  {
    body: 'La mejor inversión que hemos hecho este año. El ROI fue evidente desde el primer mes. Altamente recomendado.',
    author: {
      name: 'Carlos Ruiz',
      title: 'Director de Operaciones, InnovateCo',
      imageUrl: 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBvZmZpY2UlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzQ5Nzc5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  },
  {
    body: 'Increíblemente intuitivo y potente. Nuestro equipo se adaptó en días y ahora no podríamos trabajar sin él.',
    author: {
      name: 'Ana Martínez',
      title: 'Product Manager, CloudScale',
      imageUrl: 'https://images.unsplash.com/photo-1758518725921-1eb74ed293be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXNpbmVzcyUyMHRlYW0lMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc3NDk3OTMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-base font-semibold text-blue-600">Testimonios</h2>
          <p className="mt-2 text-3xl sm:text-4xl text-gray-900">
            Confían en nosotros más de 10,000 empresas
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200"
            >
              <div>
                <div className="flex gap-x-1 text-blue-600">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 flex-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-base text-gray-700">{testimonial.body}</p>
              </div>
              <div className="mt-6 flex items-center gap-x-4">
                <img
                  className="h-12 w-12 rounded-full object-cover bg-gray-50"
                  src={testimonial.author.imageUrl}
                  alt=""
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.author.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
