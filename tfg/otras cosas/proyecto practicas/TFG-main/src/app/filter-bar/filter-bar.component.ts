import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FilterPanelComponent } from "../filter-panel/filter-panel.component";

@Component({
  selector: "app-filter-bar",
  templateUrl: "./filter-bar.component.html",
  styleUrls: ["./filter-bar.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPanelComponent],
})
export class FilterBarComponent {
  // Estado de los dropdowns
  openDropdown: string | null = null;

  // Estado del panel de filtros
  isFilterPanelOpen: boolean = false;

  // Búsqueda de ubicaciones
  locationSearch: string = '';
  availableLocations: string[] = [
    'Barcelona Diagonal', 'Madrid Centro', 'Valencia Port', 'Sevilla Plaza',
    'Bilbao Centro', 'Zaragoza Mall', 'Málaga Costa', 'Alicante Beach',
    'Granada Centro', 'Santander Bahía', 'Vigo Centro', 'Murcia Plaza'
  ];
  filteredLocations: string[] = [];
  selectedLocation: string | null = null;
  showLocationDropdown: boolean = false;

  // Configuración de filtros con opciones
  filters = [
    {
      id: 'time',
      label: "Últimos 7 días",
      selected: "7days",
      options: [
        { label: "Últimos 7 días", value: "7days" },
        { label: "Últimos 30 días", value: "30days" },
        { label: "Últimos 3 meses", value: "3months" },
        { label: "Últimos 6 meses", value: "6months" },
        { label: "Último año", value: "1year" }
      ]
    },
    {
      id: 'country',
      label: "España",
      selected: "spain",
      options: [
        { label: "España", value: "spain" },
        { label: "Francia", value: "france" },
        { label: "Portugal", value: "portugal" },
        { label: "Italia", value: "italy" },
        { label: "Alemania", value: "germany" }
      ]
    },
    {
      id: 'region',
      label: "Cataluña",
      selected: "catalonia",
      options: [
        { label: "Cataluña", value: "catalonia" },
        { label: "Madrid", value: "madrid" },
        { label: "Andalucía", value: "andalusia" },
        { label: "Valencia", value: "valencia" },
        { label: "País Vasco", value: "basque" }
      ]
    }
  ];

  // Métodos para manejar los dropdowns
  toggleDropdown(filterId: string) {
    this.openDropdown = this.openDropdown === filterId ? null : filterId;
  }

  selectOption(filterId: string, option: any) {
    const filter = this.filters.find(f => f.id === filterId);
    if (filter) {
      filter.selected = option.value;
      filter.label = option.label;
    }
    this.openDropdown = null;
  }

  closeDropdown() {
    this.openDropdown = null;
  }

  isDropdownOpen(filterId: string): boolean {
    return this.openDropdown === filterId;
  }

  // Métodos para el panel de filtros
  openFilterPanel() {
    this.isFilterPanelOpen = true;
  }

  closeFilterPanel() {
    this.isFilterPanelOpen = false;
  }

  // Métodos para búsqueda de ubicaciones
  onLocationInput(event: any) {
    const value = event.target.value;
    this.locationSearch = value;
    if (value.length > 0) {
      this.filteredLocations = this.availableLocations.filter(loc =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      this.showLocationDropdown = this.filteredLocations.length > 0;
    } else {
      this.filteredLocations = [];
      this.showLocationDropdown = false;
    }
  }

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.locationSearch = location;
    this.showLocationDropdown = false;
  }

  clearLocation() {
    this.selectedLocation = null;
    this.locationSearch = '';
    this.filteredLocations = [];
    this.showLocationDropdown = false;
  }
}
