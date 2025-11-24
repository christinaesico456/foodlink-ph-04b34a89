import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MapPin, AlertCircle } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';

const CaviteMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenInput, setTokenInput] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
  const { recordAction } = useGamification();

  // Cavite municipalities and cities with coordinates
  const locations = [
    { name: "Bacoor", coords: [120.9496, 14.4670], type: "city", programs: ["Feeding Program", "Food Banks"] },
    { name: "Imus", coords: [120.9368, 14.4297], type: "city", programs: ["Community Kitchen", "Nutrition Centers"] },
    { name: "Dasmariñas", coords: [120.9366, 14.3294], type: "city", programs: ["School Feeding", "Food Distribution"] },
    { name: "Cavite City", coords: [120.8958, 14.4791], type: "city", programs: ["Emergency Relief", "Community Pantries"] },
    { name: "Tagaytay", coords: [120.9596, 14.1095], type: "city", programs: ["Urban Farming", "Food Security Programs"] },
    { name: "Trece Martires", coords: [120.8653, 14.2817], type: "city", programs: ["Provincial Nutrition Office", "Feeding Programs"] },
    { name: "General Trias", coords: [120.8806, 14.3863], type: "city", programs: ["Community Feeding", "Agricultural Support"] },
    { name: "Rosario", coords: [120.8553, 14.4123], type: "municipality", programs: ["Food Assistance", "Livelihood Programs"] },
    { name: "Kawit", coords: [120.9030, 14.4463], type: "municipality", programs: ["Supplementary Feeding", "Health Services"] },
    { name: "Silang", coords: [120.9780, 14.2305], type: "municipality", programs: ["Agriculture Projects", "Food Security"] },
  ];

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
      setShowTokenInput(false);
      recordAction('map_explore', 'Explored Cavite Map', 20, '🗺️');
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [120.9, 14.3], // Center of Cavite
        zoom: 10,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add markers for each location
      map.current.on('load', () => {
        locations.forEach(location => {
          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.style.cssText = `
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, hsl(43, 70%, 51%), hsl(28, 75%, 56%));
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.3s ease;
          `;
          
          el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.2)';
          });
          
          el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
          });

          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
              <div style="padding: 8px;">
                <h3 style="font-weight: bold; color: hsl(30, 80%, 15%); margin-bottom: 4px;">${location.name}</h3>
                <p style="font-size: 12px; color: hsl(30, 40%, 40%); margin-bottom: 8px;">
                  ${location.type === 'city' ? 'City' : 'Municipality'}
                </p>
                <div style="font-size: 11px; color: hsl(30, 40%, 40%);">
                  <strong>Programs:</strong>
                  <ul style="margin: 4px 0 0 16px; padding: 0;">
                    ${location.programs.map(p => `<li>${p}</li>`).join('')}
                  </ul>
                </div>
              </div>
            `);

          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat(location.coords as [number, number])
            .setPopup(popup)
            .addTo(map.current!);
        });
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (showTokenInput) {
    return (
      <Card className="p-8 bg-card/40 backdrop-blur-xl border-primary/20">
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-primary">
            <AlertCircle className="h-6 w-6" />
            <h3 className="text-lg font-bold">Setup Required</h3>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            To view the interactive Cavite map, you need a Mapbox public token. 
            Get one free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
          
          <div className="w-full space-y-2">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTokenSubmit()}
              className="w-full"
            />
            <Button 
              onClick={handleTokenSubmit}
              className="w-full"
              disabled={!tokenInput.trim()}
            >
              Load Map
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Legend */}
      <Card className="absolute bottom-4 left-4 p-4 bg-card/95 backdrop-blur-xl border-primary/20 z-10">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-foreground">Feeding Programs in Cavite</span>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent"></div>
            <span>Click markers for program details</span>
          </div>
        </div>
      </Card>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-xl" />
    </div>
  );
};

export default CaviteMap;