import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPanelComponent } from '../notification-panel/notification-panel.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NotificationPanelComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  @Input() title: string = 'Dashboard';
  @Input() showNotifications: boolean = true;
  @Input() showUserAvatar: boolean = true;
  @ViewChild('notificationButton', { static: false }) notificationButton!: ElementRef;

  isNotificationPanelOpen = false;
  unreadNotificationsCount = 2; // Número de notificaciones sin leer
  panelPosition = { top: '70px', right: '60px' };

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const notificationContainer = target.closest('.notification-container');

    if (!notificationContainer && this.isNotificationPanelOpen) {
      this.isNotificationPanelOpen = false;
    }
  }

  toggleNotificationPanel(): void {
    if (!this.isNotificationPanelOpen) {
      this.calculatePanelPosition();
    }
    this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
  }

  private calculatePanelPosition(): void {
    if (this.notificationButton) {
      const buttonRect = this.notificationButton.nativeElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      this.panelPosition = {
        top: (buttonRect.bottom) + 'px', // 10px hacia arriba
        right: (viewportWidth - buttonRect.right - 10) + 'px' // 10px hacia la derecha
      };
    }
  }

  onNotificationPanelClose(): void {
    this.isNotificationPanelOpen = false;
  }

  onNotificationRead(notificationId: string): void {
    // Aquí puedes manejar cuando se lee una notificación
    console.log('Notificación leída:', notificationId);
    if (this.unreadNotificationsCount > 0) {
      this.unreadNotificationsCount--;
    }
  }

  onClearAllNotifications(): void {
    // Aquí puedes manejar cuando se limpian todas las notificaciones
    console.log('Todas las notificaciones limpiadas');
    this.unreadNotificationsCount = 0;
    this.isNotificationPanelOpen = false;
  }
}
