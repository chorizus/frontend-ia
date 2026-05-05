import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class NavigationComponent {
  navItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets%2Fbe32a78ac3ad4c2b893f916c2625ad63%2F02579f95e2f54fa799fd23c25a675c11",
      active: false,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/be32a78ac3ad4c2b893f916c2625ad63/c5cdf4c38e93099ea6d08ef2217b9e55fba799b7?placeholderIfAbsent=true",
      active: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/be32a78ac3ad4c2b893f916c2625ad63/39f1c1f5d61dc944b6657e6ed614614831c0e1b5?placeholderIfAbsent=true",
      active: false,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/be32a78ac3ad4c2b893f916c2625ad63/0e4e7d023c74613c55547e7841d34e01958e0d0c?placeholderIfAbsent=true",
      active: false,
    },
  ];
}
