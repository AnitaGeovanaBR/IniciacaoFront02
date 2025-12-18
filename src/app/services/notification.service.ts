import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  public notifications = this.notifications$.asObservable();
  private timeouts = new Map<string, any>();

  constructor() { }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000): void {
    const id = Date.now() + '-' + Math.random();
    const notification: Notification = { id, message, type };

    // Obter notificações atuais
    const current = this.notifications$.getValue();
    
    // Adicionar nova notificação
    const updated = [...current, notification];
    this.notifications$.next(updated);

    // Agendar remoção
    const timeout = setTimeout(() => {
      const current = this.notifications$.getValue();
      this.notifications$.next(current.filter(n => n.id !== id));
      this.timeouts.delete(id);
    }, duration);

    this.timeouts.set(id, timeout);
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration || 3000);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration || 3000);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration || 3000);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration || 3000);
  }

  removeNotification(id: string): void {
    const current = this.notifications$.getValue();
    this.notifications$.next(current.filter(n => n.id !== id));
    
    // Limpar timeout se ainda não foi executado
    if (this.timeouts.has(id)) {
      clearTimeout(this.timeouts.get(id));
      this.timeouts.delete(id);
    }
  }
}
