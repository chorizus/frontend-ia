import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoogleMapsModule } from "@angular/google-maps";

@Component({
  selector: "app-reputation-map",
  templateUrl: "./reputation-map.component.html",
  styleUrls: ["./reputation-map.component.css"],
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
})
export class ReputationMapComponent implements OnInit {
  // Opciones del mapa
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.70379 }; // Madrid como centro
  zoom = 6; // Nivel de zoom para mostrar España

  // Opciones para personalizar el mapa
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    scrollwheel: true,
    disableDefaultUI: false,
    disableDoubleClickZoom: true,
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  // Marcadores de reputación en diferentes ciudades
  markers: any[] = [];

  ngOnInit() {
    // Simular puntos de reputación en diferentes ciudades españolas
    this.addMarkers();
  }

  addMarkers() {
    // Añadir marcadores a ciudades con datos simulados de reputación
    this.markers = [
      {
        position: { lat: 41.3851, lng: 2.1734 }, // Barcelona
        title: 'Barcelona',
        info: '4.8/5 - 745 reseñas',
        options: {
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }
        }
      },
      {
        position: { lat: 40.4168, lng: -3.7038 }, // Madrid
        title: 'Madrid',
        info: '4.5/5 - 920 reseñas',
        options: {
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }
        }
      },
      {
        position: { lat: 37.3891, lng: -5.9845 }, // Sevilla
        title: 'Sevilla',
        info: '4.6/5 - 458 reseñas',
        options: {
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }
        }
      },
      {
        position: { lat: 39.4699, lng: -0.3763 }, // Valencia
        title: 'Valencia',
        info: '4.2/5 - 387 reseñas',
        options: {
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
          }
        }
      },
      {
        position: { lat: 43.2630, lng: -2.9350 }, // Bilbao
        title: 'Bilbao',
        info: '4.7/5 - 289 reseñas',
        options: {
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }
        }
      }
    ];
  }
}
