import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Building2 } from 'lucide-react';

declare global {
  interface Window {
    L: any;
  }
}

const CaviteMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Organizations with verified actual locations in Cavite
  const organizations = [
    {
      name: "DSWD Field Office IV-A (CALABARZON)",
      type: "Government Agency",
      coords: { lat: 14.4193, lng: 121.0416 }, // Alabang, Muntinlupa (serves Cavite)
      programs: ["4Ps Program", "AICS", "Supplementary Feeding", "Social Pension"],
      color: "#DAA325",
      note: "Regional office serving all of CALABARZON including Cavite"
    },
    {
      name: "DSWD Cavite SWAD Office",
      type: "Government Office",
      coords: { lat: 14.4670, lng: 120.9496 }, // Bacoor City (Main Square Mall)
      programs: ["Social Assistance", "Crisis Response", "Family Services"],
      color: "#DAA325"
    },
    {
      name: "Provincial Capitol - Cavite",
      type: "Provincial Government",
      coords: { lat: 14.2798, lng: 120.8672 }, // Trece Martires City
      programs: ["Provincial Nutrition Council", "Food Security Programs", "Agri Support"],
      color: "#10B981"
    },
    {
      name: "Bacoor City Social Welfare Office",
      type: "City Government",
      coords: { lat: 14.4670, lng: 120.9496 },
      programs: ["City Feeding Program", "Food Assistance", "Senior Citizen Support"],
      color: "#10B981"
    },
    {
      name: "Imus City Social Services",
      type: "City Government",
      coords: { lat: 14.4297, lng: 120.9368 },
      programs: ["School Feeding", "Community Pantries", "Nutrition Education"],
      color: "#10B981"
    },
    {
      name: "Dasmariñas City Social Services",
      type: "City Government",
      coords: { lat: 14.3294, lng: 120.9366 },
      programs: ["Supplementary Feeding", "Food Distribution", "Health Services"],
      color: "#10B981"
    },
    {
      name: "Cavite City Social Welfare",
      type: "City Government",
      coords: { lat: 14.4791, lng: 120.8958 },
      programs: ["Emergency Relief", "Community Kitchen", "Livelihood Programs"],
      color: "#10B981"
    },
    {
      name: "General Trias City Programs",
      type: "City Government",
      coords: { lat: 14.3863, lng: 120.8806 },
      programs: ["Community Feeding", "Agricultural Support", "Food Banks"],
      color: "#10B981"
    },
    {
      name: "Tagaytay City Social Services",
      type: "City Government",
      coords: { lat: 14.1095, lng: 120.9596 },
      programs: ["Urban Farming", "Food Security", "Community Support"],
      color: "#10B981"
    },
    {
      name: "Philippine Red Cross - Cavite Chapter",
      type: "NGO",
      coords: { lat: 14.4791, lng: 120.8958 }, // P. Burgos Avenue, Cavite City
      programs: ["Emergency Feeding", "Disaster Response", "Blood Services", "Health Programs"],
      color: "#DC2626"
    },
    {
      name: "Red Cross - Dasmariñas Branch",
      type: "NGO",
      coords: { lat: 14.3294, lng: 120.9366 }, // Aguinaldo Highway, Dasmariñas
      programs: ["Blood Services", "Community Health", "First Aid Training"],
      color: "#DC2626"
    },
    {
      name: "Gawad Kalinga - Dasmariñas Village",
      type: "NGO",
      coords: { lat: 14.3100, lng: 120.9500 }, // Sampaloc, Dasmariñas (GK Georgetown)
      programs: ["Community Building", "Food Security", "Housing", "Livelihood"],
      color: "#EA580C"
    },
    {
      name: "World Vision - CALABARZON Area",
      type: "NGO",
      coords: { lat: 14.2305, lng: 120.9780 }, // Operations in Silang area
      programs: ["Child Nutrition", "Sustainable Agriculture", "Education Support"],
      color: "#EA580C"
    },
    {
      name: "Rise Against Hunger - Cavite Operations",
      type: "NGO",
      coords: { lat: 14.4200, lng: 120.9200 }, // Cavite area operations
      programs: ["Meal Packing Events", "Food Distribution", "Community Outreach"],
      color: "#EA580C"
    },
    {
      name: "Rosario Municipal Office",
      type: "Municipal Government",
      coords: { lat: 14.4123, lng: 120.8553 },
      programs: ["Food Assistance", "Livelihood Programs", "Health Services"],
      color: "#10B981"
    },
    {
      name: "Kawit Municipal Programs",
      type: "Municipal Government",
      coords: { lat: 14.4463, lng: 120.9030 },
      programs: ["Supplementary Feeding", "Health Services", "Community Support"],
      color: "#10B981"
    }
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    const loadLeaflet = () => {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(link);
      }

      if (window.L) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      script.onerror = () => {
        console.error('Failed to load Leaflet');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      try {
        // Center on Cavite province
        const caviteCenter = [14.3, 120.9];

        map.current = window.L.map(mapContainer.current).setView(caviteCenter, 10);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map.current);

        // Add markers for each organization
        organizations.forEach((org) => {
          // Create custom marker based on type
          const markerIcon = window.L.divIcon({
            className: 'custom-marker',
            html: `<div style="width: 28px; height: 28px; background: ${org.color}; border: 3px solid white; border-radius: 50%; box-shadow: 0 3px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
              <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
            </div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });

          const marker = window.L.marker(
            [org.coords.lat, org.coords.lng],
            { icon: markerIcon }
          ).addTo(map.current);

          // Create popup content
          const popupContent = `
            <div style="padding: 12px; max-width: 300px; font-family: system-ui, -apple-system, sans-serif;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 12px; height: 12px; background: ${org.color}; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>
                <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: #1f2937;">
                  ${org.name}
                </h3>
              </div>
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #6b7280; font-weight: 600;">
                ${org.type}
              </p>
              <div style="font-size: 13px; color: #374151;">
                <strong style="color: ${org.color};">Programs & Services:</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.6;">
                  ${org.programs.map(p => `<li>${p}</li>`).join('')}
                </ul>
              </div>
              ${org.note ? `<p style="margin-top: 8px; font-size: 11px; color: #6b7280; font-style: italic;">${org.note}</p>` : ''}
            </div>
          `;

          marker.bindPopup(popupContent);
        });

        setIsLoading(false);
        setIsMapLoaded(true);
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoading(false);
      }
    };

    loadLeaflet();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
      <div 
        ref={mapContainer} 
        className="absolute inset-0"
        style={{ background: '#e5e7eb' }}
      />
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
          <div className="text-center space-y-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="font-semibold text-foreground">Loading organizations map...</p>
            <p className="text-sm text-muted-foreground">Mapping Cavite food security network</p>
          </div>
        </div>
      )}
      
      {/* Legend */}
      {isMapLoaded && (
        <Card className="absolute bottom-4 left-4 p-4 bg-card/95 backdrop-blur-xl border-primary/20 z-10 shadow-lg max-w-[280px]">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">Organizations in Cavite</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#DAA325] border-2 border-white shadow"></div>
              <span className="text-muted-foreground">DSWD Offices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981] border-2 border-white shadow"></div>
              <span className="text-muted-foreground">LGU Programs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#DC2626] border-2 border-white shadow"></div>
              <span className="text-muted-foreground">Red Cross</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EA580C] border-2 border-white shadow"></div>
              <span className="text-muted-foreground">NGOs & Community Orgs</span>
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <span className="text-muted-foreground italic">Click markers for details</span>
            </div>
          </div>
        </Card>
      )}

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-xl" />
    </div>
  );
};

export default CaviteMap;