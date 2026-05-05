import { Component, Inject, PLATFORM_ID, OnInit } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";

interface WordCloudItem {
  text: string;
  size: number;
  color: string;
  weight: number;
  fontFamily: string;
}

@Component({
  selector: "app-keyword-cloud",
  templateUrl: "./keyword-cloud.component.html",
  styleUrls: ["./keyword-cloud.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class KeywordCloudComponent implements OnInit {
  public isBrowser: boolean;
  public wordCloudItems: WordCloudItem[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.generateWordCloud();
  }

  private generateWordCloud() {
    const words = [
      { text: 'excelente', weight: 50 },
      { text: 'profesional', weight: 45 },
      { text: 'calidad', weight: 42 },
      { text: 'recomendable', weight: 40 },
      { text: 'servicio', weight: 38 },
      { text: 'atención', weight: 35 },
      { text: 'rápido', weight: 33 },
      { text: 'amable', weight: 30 },
      { text: 'eficiente', weight: 28 },
      { text: 'experiencia', weight: 26 },
      { text: 'satisfecho', weight: 24 },
      { text: 'confianza', weight: 22 },
      { text: 'precio', weight: 20 },
      { text: 'trato', weight: 18 },
      { text: 'rapidez', weight: 16 },
      { text: 'resultado', weight: 15 },
      { text: 'solución', weight: 14 },
      { text: 'garantía', weight: 13 },
      { text: 'cercanía', weight: 12 },
      { text: 'variedad', weight: 11 },
      { text: 'bueno', weight: 10 },
      { text: 'perfecto', weight: 9 },
      { text: 'fantástico', weight: 8 },
      { text: 'increíble', weight: 7 }
    ];

    // Generar colores variados
    const colors = [
      '#000000', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444',
      '#3B82F6', '#F97316', '#84CC16', '#EC4899', '#6366F1',
      '#14B8A6', '#F59E0B', '#8B5CF6', '#EF4444', '#10B981',
      '#3B82F6', '#F97316', '#84CC16', '#EC4899', '#6366F1',
      '#14B8A6', '#374151', '#6B7280', '#9CA3AF'
    ];

    this.wordCloudItems = words.map((word, index) => ({
      text: word.text,
      size: Math.max(12, Math.min(42, word.weight * 0.9)),
      color: colors[index % colors.length],
      weight: word.weight,
      fontFamily: 'Urbanist, -apple-system, Roboto, Helvetica, sans-serif'
    }));

    // Ordenar por peso para mejor distribución (palabras más grandes primero)
    this.wordCloudItems.sort((a, b) => b.weight - a.weight);
  }
}
