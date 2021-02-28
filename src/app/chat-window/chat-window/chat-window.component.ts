import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../services/message.service';
import { User } from '../../model/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../../model/message.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [UserService],
  host: { class: 'chat-window' },
})
export class ChatWindowComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('messageContainer') messagesContainer;

  messages: Message[] = [];

  private _message: string = '';

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
    if (this.message) {
      this.typing.next(true);
    } else {
      this.typing.next(false);
    }
  }

  private _senderId: number;

  public name: String;

  get senderId(): number {
    return this._senderId;
  }

  @Input()
  set senderId(value: number) {
    if (typeof value === 'number') {
      this._senderId = value;
      this.populateUserInfo(value);
      this.messageService.register(value, this.messengerObs);
      this.messageService.registerTypingListener(value, this.typingObs);
    }
  }

  private _receiverId: number;

  get receiverId(): number {
    return this._receiverId;
  }

  get receiverName(): string {
    return this.userService.getUserInfo(this.receiverId).name;
  }

  @Input()
  set receiverId(value: number) {
    if (typeof value === 'number') {
      this._receiverId = value;
    }
  }

  receiverTyping: boolean = false;

  /**
   * @type {Subject<string>}
   */
  private messenger: Subject<Message> = new Subject<Message>();

  /**
   * @returns {Observable<String>}
   */
  get messengerObs(): Observable<Message> {
    return this.messenger.asObservable();
  }

  private typing: Subject<boolean> = new Subject<boolean>();

  get typingObs(): Observable<boolean> {
    return this.typing.asObservable();
  }

  private receiverSub: Subscription;
  private receiverTypingSub: Subscription;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const receiver: Observable<Message> = this.messageService.subscribe(
      this.senderId
    );
    if (receiver) {
      this.receiverSub = receiver.subscribe((message) => {
        this.messages.push(message)
        // this.messenger.next(message);
      });
    }

    const receiverTyping: Observable<boolean> = this.messageService.subscribeTyping(
      this.receiverId
    );
    if (receiverTyping) {
      this.receiverTypingSub = receiverTyping.subscribe(
        (typing) => (this.receiverTyping = typing)
      );
    }
  }

  /**
   * @param id
   */
  populateUserInfo(id: number): void {
    const user: User = this.userService.getUserInfo(id);
    if (user) {
      this.name = user.name;
    } else {
      throw new Error('User not found');
    }
  }

  sendMessage(): void {
    if (this._message) {
      const newMessage: Message = new Message(
        this._message,
        this.senderId,
        this.receiverId,
        
      );

      // this.messages.push(newMessage);

      this.messenger.next(newMessage);

      this.message = '';
    }
  }

  ngOnDestroy() {
    this.receiverSub.unsubscribe();
    this.receiverTypingSub.unsubscribe();
  }
}
