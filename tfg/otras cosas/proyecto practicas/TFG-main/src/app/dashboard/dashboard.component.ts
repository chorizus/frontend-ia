import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "../navigation/navigation.component";
import { FilterBarComponent } from "../filter-bar/filter-bar.component";
import { StatCardComponent } from "../stat-card/stat-card.component";
import { ReputationChartComponent } from "../reputation-chart/reputation-chart.component";
import { KeywordCloudComponent } from "../keyword-cloud/keyword-cloud.component";
import { ReputationMapComponent } from "../reputation-map/reputation-map.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    FilterBarComponent,
    StatCardComponent,
    ReputationChartComponent,
    KeywordCloudComponent,
    ReputationMapComponent,
    HeaderComponent,
  ],
})
export class DashboardComponent {
  // Stats data
  statsData = {
    totalReviews: {
      rating: 4.8,
      count: 106,
      distribution: [65, 18, 12, 6, 6],
    },
    respondedReviews: {
      count: 89,
      percentage: 84,
      trend: "+5%",
    },
    visits: {
      count: 12500,
      trend: "+12%",
    },
    actions: {
      count: 3200,
      trend: "+8%",
    },
  };
}
