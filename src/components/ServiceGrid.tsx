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
  TextCursorInput,
} from 'lucide-react';
import type { Service } from '@/data/services';

interface ServiceGridProps {
  services: Service[];
  showFeatures?: boolean;
}

const icons = [Monitor, Search, Megaphone, Share2, TextCursorInput, BarChart3, Server, Compass];

const ServiceGrid: React.FC<ServiceGridProps> = ({ services, showFeatures = false }) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
    {services.map((service, index) => {
      const Icon = icons[index];
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
          <Link to={showFeatures ? '/kontakt' : service.href} className="service-card-link">
            {showFeatures ? 'Tal om ydelsen' : 'Læs mere'} <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </article>
      );
    })}
  </div>
);

export default ServiceGrid;
