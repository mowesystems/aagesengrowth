import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Compass,
  Megaphone,
  Monitor,
  Search,
  Server,
  Share2,
  ShoppingCart,
} from 'lucide-react';
import type { Service } from '@/data/services';

interface ServiceGridProps {
  services: Service[];
  showFeatures?: boolean;
}

const icons = {
  websites: Monitor,
  seo: Search,
  'google-ads': Megaphone,
  'meta-ads': Share2,
  tracking: BarChart3,
  hosting: Server,
  woocommerce: ShoppingCart,
  strategy: Compass,
};

const ServiceGrid: React.FC<ServiceGridProps> = ({ services, showFeatures = false }) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
    {services.map((service) => {
      const Icon = icons[service.id as keyof typeof icons] || Monitor;
      return (
        <article key={service.id} id={showFeatures ? service.id : undefined} className="service-card scroll-mt-28">
          <div className="flex items-start justify-between gap-5">
            <Icon size={25} strokeWidth={1.35} aria-hidden="true" />
            <span className="service-card-number">{service.index}</span>
          </div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          {showFeatures && (
            <ul>
              {service.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          )}
          {showFeatures ? (
            <div className="mt-auto flex flex-wrap gap-x-5 pt-6">
              <Link to={service.pricingHref} className="service-card-link !mt-0 !pt-0">Se priser <ArrowRight size={14} aria-hidden="true" /></Link>
              <Link to="/kontakt" className="service-card-link !mt-0 !pt-0 text-off-white/60">Tal om ydelsen</Link>
            </div>
          ) : (
            <Link to={service.href} className="service-card-link">Læs mere <ArrowRight size={14} aria-hidden="true" /></Link>
          )}
        </article>
      );
    })}
  </div>
);

export default ServiceGrid;
