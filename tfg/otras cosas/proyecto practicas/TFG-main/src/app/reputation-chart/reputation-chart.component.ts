import { Component, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: "app-reputation-chart",
  templateUrl: "./reputation-chart.component.html",
  styleUrls: ["./reputation-chart.component.css"],
  standalone: true,
  imports: [CommonModule, NgChartsModule],
})
export class ReputationChartComponent implements AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [4.1, 4.4, 4.3, 4.5, 4.7, 4.8, 5],
        label: 'E-Reputation',
        fill: true,
        tension: 0.4,
        borderColor: '#7f56d9',
        backgroundColor: (ctx) => {
          if (!this.isBrowser) return 'rgba(127,86,217,0.08)';
          const chart = ctx.chart;
          const {ctx: canvas, chartArea} = chart;
          if (!chartArea) return 'rgba(127,86,217,0.08)';
          const gradient = canvas.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(127,86,217,0.18)');
          gradient.addColorStop(1, 'rgba(127,86,217,0.01)');
          return gradient;
        },
        pointRadius: 0,
        borderWidth: 2,
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#535862',
          font: { family: 'Urbanist', size: 12 },
          padding: 5
        }
      },
      y: {
        min: 0,
        max: 5,
        grid: { color: 'rgba(127,86,217,0.08)' },
        ticks: {
          color: '#535862',
          font: { family: 'Urbanist', size: 12 },
          padding: 5,
          stepSize: 1
        }
      }
    }
  };

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => this.chart?.update(), 100);
    }
  }
}
