// chat.page.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService, Mensaje } from '../chat';
import { AuthService } from '../../core/services/auth';
import { RealtimeChannel } from '@supabase/supabase-js';
import { AlertController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false
})
export class ChatPage implements OnInit, OnDestroy {
  @ViewChild(IonContent) private content!: IonContent;

  contratacionId: string = '';
  messages: Mensaje[] = [];
  newMessage: string = '';
  sending = false;
  private channel?: RealtimeChannel;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.contratacionId = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.contratacionId) {
      await this.showError('No se encontró la contratación');
      return;
    }

    await this.loadInitialMessages();
    this.setupRealtime();
  }

  private async loadInitialMessages() {
    try {
      const msgs = await this.chatService.getMessages(this.contratacionId);

      this.messages = msgs.map((m: any) => ({
        ...m,
        userId: m.sender_id,
        texto: m.message,
        timestamp: m.timestamp || new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error cargando mensajes:', error);
      await this.showError('No se pudieron cargar los mensajes');
    }
  }

  private setupRealtime() {
    this.channel = this.chatService.subscribeToMessages(this.contratacionId, (payload: any) => {
      const nuevo: Mensaje = {
        ...payload.new,
        userId: payload.new.sender_id,
        texto: payload.new.message,
        timestamp: payload.new.timestamp || new Date().toISOString(),
      };

      this.messages.push(nuevo);
      this.cdr.detectChanges();
      this.scrollToBottom();
    });

    // Importante: manejar errores del canal para evitar bloqueos
    this.channel.on('system', {}, () => {
      console.error('Error en el canal de chat');
      this.showError('Se perdió la conexión en tiempo real');
    });
  }

  async sendMessage() {
    if (!this.newMessage.trim() || this.sending) return;

    const mensaje = this.newMessage.trim();
    this.newMessage = '';
    this.sending = true;

    try {
      const user = this.authService.getCurrentUser();
      if (!user?.id) {
        throw new Error('Usuario no autenticado');
      }

      await this.chatService.sendMessage(this.contratacionId, user.id, mensaje);

      // El mensaje aparecerá automáticamente por realtime
      this.scrollToBottom();
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      this.newMessage = mensaje; // Recuperamos el texto
      await this.showError('No se pudo enviar el mensaje');
    } finally {
      this.sending = false;
      this.cdr.detectChanges();
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.content?.scrollToBottom(300);
    }, 100);
  }

  private async showError(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnDestroy() {
    if (this.channel) {
      this.channel.unsubscribe();
    }
  }
}