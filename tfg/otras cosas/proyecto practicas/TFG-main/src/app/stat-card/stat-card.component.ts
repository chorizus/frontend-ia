import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartConfiguration, Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

// Plugin para texto centrado en gráficos doughnut
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: function(chart: any) {
    if (chart.config.options.elements && chart.config.options.elements.center) {
      // Get ctx from chart
      var ctx = chart.ctx;

      // Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var maxFontSize = centerConfig.maxFontSize || 75;
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);

      // Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      // Get the width of the string and also the width of the element minus padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      var minFontSize = centerConfig.minFontSize;
      var lineHeight = centerConfig.lineHeight || 25;
      var wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      var words = txt.split(' ');
      var line = '';
      var lines = [];

      // Break words up into multiple lines if necessary
      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }

      // Move the center up depending on line height and number of lines
      centerY -= (lines.length / 2) * lineHeight;

      for (var n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }
      //Draw text in center
      ctx.fillText(line, centerX, centerY);
    }
  }
};

@Component({
  selector: "app-stat-card",
  templateUrl: "./stat-card.component.html",
  styleUrls: ["./stat-card.component.css"],
  standalone: true,
  imports: [CommonModule, NgChartsModule]
})
export class StatCardComponent implements OnInit {
  @Input() title: string = "";
  @Input() rating: number = 0;
  @Input() count: number = 0;
  @Input() percentage: number = 0;
  @Input() trend: string = "";
  @Input() distribution: number[] = [];
  @Input() type: "reviews" | "percentage" | "visits" | "actions" = "reviews";
  @Input() totalReviews: number = 0;

  constructor() {
    // Registrar el plugin
    Chart.register(centerTextPlugin);
  }

  // Función para formatear números grandes
  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  }

  // Configuración para el gráfico de distribución de reseñas
  public distributionChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['5', '4', '3', '2', '1'],
    datasets: [{
      data: [],
      backgroundColor: '#7f56d9',
      borderRadius: 3,
    }]
  };

  public distributionChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        display: false,
        beginAtZero: true,
        max: 100
      },
      y: {
        display: true,
        ticks: {
          color: '#535862',
          font: {
            family: 'Urbanist',
            size: 14
          }
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // Configuración para el gráfico de porcentaje con texto centrado
  public percentageChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Respondidas', 'No respondidas'],
    datasets: [{
      data: [0, 100],
      backgroundColor: ['#7f56d9', '#e7e7e7'],
      borderWidth: 0
    }]
  };

  public percentageChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#535862',
          font: {
            family: 'Urbanist',
            size: 12
          },
          padding: 8,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    },
    elements: {
      center: {
        text: '0/0',
        color: '#181d27',
        fontStyle: 'Urbanist',
        sidePadding: 15,
        minFontSize: 14,
        maxFontSize: 32
      }
    }
  };

  // Configuración para el gráfico de visitas
  public visitsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: '#7f56d9',
      borderRadius: 4
    }]
  };

  public visitsChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 5 // Pequeño padding para las etiquetas
      }
    },
    scales: {
      x: {
        display: true, // Habilitar el eje X para mostrar la leyenda
        grid: {
          display: false // Sin líneas de cuadrícula
        },
        ticks: {
          color: '#535862',
          font: {
            family: 'Urbanist',
            size: 11
          },
          padding: 2
        }
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // Configuración para el gráfico de acciones
  public actionsChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      data: [65, 59, 80, 81, 56, 55],
      borderColor: '#7f56d9',
      backgroundColor: 'rgba(127, 86, 217, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  public actionsChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  ngOnInit() {
    if (this.type === 'reviews') {
      // Convertir los datos de distribución a porcentajes
      const maxValue = Math.max(...this.distribution);
      const percentageData = this.distribution.map(value => (value / maxValue) * 100);
      this.distributionChartData.datasets[0].data = percentageData;
    } else if (this.type === 'percentage') {
      this.percentageChartData.datasets[0].data = [this.percentage, 100 - this.percentage];
      // Actualizar el texto centrado con el formato "respondidas/total"
      if (this.percentageChartOptions?.elements?.center) {
        this.percentageChartOptions.elements.center.text = `${this.count}/${this.totalReviews}`;
      }
    }
  }
}
