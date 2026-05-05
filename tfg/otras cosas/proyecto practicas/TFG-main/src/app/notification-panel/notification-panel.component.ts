import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NotificationPanelComponent {
  @Input() isOpen: boolean = false;
  @Input() panelPosition: { top: string; right: string } = { top: '70px', right: '60px' };
  @Output() closePanel = new EventEmitter<void>();
  @Output() notificationRead = new EventEmitter<string>();
  @Output() clearAll = new EventEmitter<void>();

  notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Reputación mejorada',
      message: 'Tu puntuación aumentó un 12% esta semana',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Nueva reseña',
      message: 'Reseña de 5 estrellas en Google',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Respuesta pendiente',
      message: '2 reseñas requieren tu respuesta',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'Reseña negativa',
      message: 'Requiere atención inmediata',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
      read: true
    }
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Ahora mismo';
    if (diffMinutes < 60) return `hace ${diffMinutes}m`;
    if (diffHours < 24) return `hace ${diffHours}h`;
    return `hace ${diffDays}d`;
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'success': return '✓';
      case 'info': return 'ℹ';
      case 'warning': return '⚠';
      case 'error': return '✕';
      default: return 'ℹ';
    }
  }

  onNotificationClick(notification: Notification): void {
    if (!notification.read) {
      notification.read = true;
      this.notificationRead.emit(notification.id);
    }
  }

  onClose(): void {
    this.closePanel.emit();
  }

  onClearAll(): void {
    this.clearAll.emit();
  }
}
