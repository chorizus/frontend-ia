import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent {
  @Input() isOpen: boolean = false;
  @Output() closePanel = new EventEmitter<void>();

  // Estado de los dropdowns
  openDropdown: string | null = null;

  // Configuración de filtros
  periodFilter = {
    month: 'Mayo 2025',
    options: ['Enero 2025', 'Febrero 2025', 'Marzo 2025', 'Abril 2025', 'Mayo 2025', 'Junio 2025']
  };

  locationFilters = {
    country: {
      selected: 'España',
      options: ['España', 'Francia', 'Portugal', 'Italia', 'Alemania']
    },
    region: {
      selected: 'Cataluña',
      options: ['Cataluña', 'Madrid', 'Andalucía', 'Valencia', 'País Vasco']
    }
  };

  selectedStores = ['Barcelona Diagonal', 'Madrid Centro'];
  availableStores = [
    'Barcelona Diagonal', 'Madrid Centro', 'Valencia Port', 'Sevilla Plaza',
    'Bilbao Centro', 'Zaragoza Mall', 'Málaga Costa', 'Alicante Beach'
  ];

  storeToAdd = '';

  // Métodos para manejar dropdowns
  toggleDropdown(dropdownId: string) {
    this.openDropdown = this.openDropdown === dropdownId ? null : dropdownId;
  }

  isDropdownOpen(dropdownId: string): boolean {
    return this.openDropdown === dropdownId;
  }

  // Métodos para seleccionar opciones
  selectPeriod(month: string) {
    this.periodFilter.month = month;
    this.openDropdown = null;
  }

  selectCountry(country: string) {
    this.locationFilters.country.selected = country;
    this.openDropdown = null;
  }

  selectRegion(region: string) {
    this.locationFilters.region.selected = region;
    this.openDropdown = null;
  }

  // Métodos para tiendas
  removeStore(store: string) {
    this.selectedStores = this.selectedStores.filter(s => s !== store);
  }

  selectStoreToAdd(store: string) {
    this.storeToAdd = store;
    this.openDropdown = null;
  }

  addStore() {
    if (this.storeToAdd && !this.selectedStores.includes(this.storeToAdd)) {
      this.selectedStores.push(this.storeToAdd);
      this.storeToAdd = '';
    }
  }

  // Métodos para cerrar
  close() {
    this.closePanel.emit();
  }

  applyFilters() {
    // Aquí se aplicarían los filtros
    console.log('Aplicando filtros:', {
      period: this.periodFilter.month,
      country: this.locationFilters.country.selected,
      region: this.locationFilters.region.selected,
      stores: this.selectedStores
    });
    this.close();
  }
}
