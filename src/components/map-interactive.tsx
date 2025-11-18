"use client";

import { useEffect, useRef, useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Compass } from "lucide-react";

// Types pour les marqueurs
interface MarkerType {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: 'city' | 'park' | 'landmark';
  description?: string;
  image: string;
}

// Points d'intérêt en République du Congo avec vraies images
const markers: MarkerType[] = [
  { 
    id: "brazza", 
    lat: -4.2634, 
    lng: 15.2429, 
    label: "Brazzaville", 
    type: 'city',
    description: "Capitale politique et administrative du Congo, située sur les rives du fleuve Congo, face à Kinshasa.",
    image: "https://picsum.photos/seed/brazza/200/200"
  },
  { 
    id: "pnoire", 
    lat: -4.7761, 
    lng: 11.8635, 
    label: "Pointe-Noire", 
    type: 'city',
    description: "Ville portuaire et capitale économique du pays, connue pour ses plages et son dynamisme économique.",
    image: "https://picsum.photos/seed/pointenoire/200/200"
  },
  { 
    id: "odzala", 
    lat: 0.5, 
    lng: 14.7, 
    label: "Parc National d'Odzala", 
    type: 'park',
    description: "Vaste réserve de biosphère classée à l'UNESCO, abritant des forêts denses et une faune exceptionnelle dont des gorilles des plaines de l'Ouest.",
    image: "https://picsum.photos/seed/odzala/200/200"
  },
  { 
    id: "conkouati", 
    lat: -3.8, 
    lng: 11.3, 
    label: "Parc National de Conkouati-Douli", 
    type: 'park',
    description: "La plus grande aire protégée du pays, allant de la forêt équatoriale à la côte atlantique, avec une biodiversité exceptionnelle.",
    image: "https://picsum.photos/seed/conkouati/200/200"
  },
  { 
    id: "djoua", 
    lat: -1.3, 
    lng: 14.8, 
    label: "Chutes de la Djoua", 
    type: 'landmark',
    description: "Magnifiques chutes d'eau au cœur de la forêt équatoriale, lieu idéal pour l'écotourisme et les randonnées.",
    image: "https://picsum.photos/seed/djoua/200/200"
  },
  { 
    id: "congo_river", 
    lat: -4.1, 
    lng: 15.3, 
    label: "Fleuve Congo", 
    type: 'landmark',
    description: "Deuxième plus grand fleuve d'Afrique par son débit, frontière naturelle entre les deux Congo, essentiel pour le transport et l'écosystème.",
    image: "https://picsum.photos/seed/congoriver/200/200"
  },
  { 
    id: "diosso", 
    lat: -4.2, 
    lng: 11.4, 
    label: "Gorges de Diosso", 
    type: 'landmark',
    description: "Sites naturels spectaculaires aux falaises de terre rouge érodées, offrant une vue imprenable sur l'océan Atlantique.",
    image: "https://picsum.photos/seed/diosso/200/200"
  },
  { 
    id: "lac_tele", 
    lat: -1.35, 
    lng: 17.2, 
    label: "Réserve de Faune du Lac Télé", 
    type: 'park',
    description: "Vaste zone humide abritant des espèces rares comme les gorilles des plaines et les éléphants de forêt.",
    image: "https://picsum.photos/seed/lactele/200/200"
  },
];

export function MapInteractiveMini() {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const [currentZoom, setCurrentZoom] = useState(6);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  // Création d'icônes avec images circulaires
  const createCustomIcon = (marker: MarkerType) => {
    const colors: Record<string, string> = {
      city: '#009543',
      park: '#10B981',
      landmark: '#F59E0B'
    };
    
    return `
      <div style="position: relative; width: 50px; height: 50px;">
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: ${colors[marker.type]};
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          opacity: 0.6;
        "></div>
        <div style="
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid white;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          background: ${colors[marker.type]};
          cursor: pointer;
          transition: transform 0.3s ease;
        " 
        onmouseover="this.style.transform='scale(1.15)'" 
        onmouseout="this.style.transform='scale(1)'">
          <img 
            src="${marker.image}" 
            alt="${marker.label}"
            style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            "
            crossorigin="anonymous"
          />
        </div>
      </div>
    `;
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
      markersRef.current = [];
    }

    const container = mapContainerRef.current;
    if ((container as any)._leaflet_id) {
      delete (container as any)._leaflet_id;
    }

    import('leaflet').then((L) => {
      if (mapRef.current || !mapContainerRef.current) return;

      const congoBounds = L.latLngBounds(
        L.latLng(-5.5, 10.5),
        L.latLng(4.0, 19.0)
      );

      const map = L.map(mapContainerRef.current, {
        center: [-1.0, 15.0],
        zoom: 6,
        zoomControl: false,
        scrollWheelZoom: true,
        dragging: true,
        doubleClickZoom: true,
        boxZoom: true,
        touchZoom: true,
        minZoom: 5,
        maxZoom: 12,
        maxBounds: congoBounds,
        maxBoundsViscosity: 1.0
      });

      mapRef.current = map;

      map.on('drag', function() {
        map.panInsideBounds(congoBounds, { animate: false });
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      markers.forEach(marker => {
        const markerElement = L.marker([marker.lat, marker.lng], {
          icon: L.divIcon({
            html: createCustomIcon(marker),
            className: '',
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50],
          }),
          title: marker.label,
          alt: marker.label,
        });

        const popupContent = `
          <div style="min-width: 260px;">
            ${marker.image ? `
              <div style="height: 140px; background: #f3f4f6; overflow: hidden; margin: -12px -12px 0 -12px; border-radius: 8px 8px 0 0;">
                <img 
                  src="${marker.image}" 
                  alt="${marker.label}" 
                  style="width: 100%; height: 100%; object-fit: cover;"
                  crossorigin="anonymous"
                />
              </div>
            ` : ''}
            <div style="padding: 12px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #1f2937;">${marker.label}</h3>
              <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.5; color: #6b7280;">${marker.description || ''}</p>
              <a 
                href="/destinations/${marker.id}" 
                style="
                  display: inline-flex;
                  align-items: center;
                  font-size: 13px;
                  font-weight: 600;
                  color: #009543;
                  text-decoration: none;
                  transition: color 0.2s;
                "
                onmouseover="this.style.color='#007A36'"
                onmouseout="this.style.color='#009543'"
              >
                Découvrir
                <svg style="margin-left: 4px; width: 14px; height: 14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        `;
        
        markerElement.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup',
          closeButton: true
        });

        markerElement.on('click', () => {
          setActiveMarker(marker.id);
        });

        markerElement.addTo(map);
        markersRef.current.push(markerElement);
      });

      map.on('zoomend', () => {
        setCurrentZoom(map.getZoom());
      });

      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng] as [number, number]));
      map.fitBounds(bounds.pad(0.5));
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current = [];
    };
  }, []);

  const handleZoom = (type: 'in' | 'out' | 'reset') => {
    if (mapRef.current) {
      switch (type) {
        case 'in':
          mapRef.current.zoomIn();
          break;
        case 'out':
          mapRef.current.zoomOut();
          break;
        case 'reset':
          mapRef.current.flyTo([-1.7, 15.5], 7);
          break;
      }
    }
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const leafletCss = document.createElement('link');
    leafletCss.rel = 'stylesheet';
    leafletCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    leafletCss.integrity = 'sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw==';
    leafletCss.crossOrigin = 'anonymous';
    document.head.appendChild(leafletCss);
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ping {
        0% {
          transform: scale(1);
          opacity: 0.6;
        }
        75%, 100% {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      .custom-tooltip {
        background: rgba(255, 255, 255, 0.95) !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 6px !important;
        padding: 6px 10px !important;
        font-family: inherit !important;
        font-size: 0.8rem !important;
        font-weight: 500 !important;
        color: #1e293b !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
        white-space: nowrap;
      }
      .custom-tooltip:before {
        border-top-color: #e2e8f0 !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        padding: 12px !important;
        overflow: hidden;
      }
      .leaflet-popup-content {
        margin: 0 !important;
        line-height: 1.5;
      }
      .leaflet-popup-tip {
        box-shadow: none !important;
      }
      .leaflet-popup-close-button {
        background: rgba(255, 255, 255, 0.9) !important;
        border-radius: 50%;
        width: 22px !important;
        height: 22px !important;
        line-height: 22px !important;
        text-align: center;
        right: 6px !important;
        top: 6px !important;
        color: #333 !important;
        font-size: 18px !important;
        transition: all 0.2s;
      }
      .leaflet-popup-close-button:hover {
        background: #f8fafc !important;
        color: #000 !important;
      }
      .map-controls {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .map-control-button {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
      }
      .map-control-button:hover {
        background: #f8fafc;
        transform: translateY(-1px);
      }
      .map-control-button:active {
        transform: translateY(1px);
      }
      .map-legend {
        position: absolute;
        bottom: 60px;
        left: 10px;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.9);
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
        font-size: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .legend-item {
        display: flex;
        align-items: center;
        margin: 4px 0;
      }
      .legend-color {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 6px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(leafletCss)) {
        document.head.removeChild(leafletCss);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div 
        ref={mapContainerRef} 
        className="h-[600px] w-full bg-slate-100"
        aria-label="Carte interactive du Congo"
      />
      
      {/* Contrôles de zoom personnalisés */}
      <div className="map-controls">
        <button 
          onClick={() => handleZoom('in')} 
          className="map-control-button"
          aria-label="Zoom avant"
        >
          <ZoomIn size={18} />
        </button>
        <button 
          onClick={() => handleZoom('out')} 
          className="map-control-button"
          aria-label="Zoom arrière"
        >
          <ZoomOut size={18} />
        </button>
        <button 
          onClick={() => handleZoom('reset')} 
          className="map-control-button"
          aria-label="Réinitialiser la vue"
        >
          <Compass size={18} />
        </button>
      </div>
      
      {/* Légende */}
      <div className="map-legend">
        <div className="font-medium mb-2">Légende</div>
        <div className="legend-item">
          <div className="legend-color bg-[#009543]"></div>
          <span>Villes</span>
        </div>
        <div className="legend-item">
          <div className="legend-color bg-[#10B981]"></div>
          <span>Parcs nationaux</span>
        </div>
        <div className="legend-item">
          <div className="legend-color bg-[#F59E0B]"></div>
          <span>Points d'intérêt</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
        <div className="font-medium">Carte interactive du Congo</div>
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-slate-600">
            <MapPin size={12} className="text-[#009543]" />
            {markers.length} lieux à découvrir • Zoom: {currentZoom.toFixed(1)}x
          </span>
        </div>
      </div>
    </div>
  );
}