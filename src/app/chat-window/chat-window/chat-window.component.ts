import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {MessageService} from "../../services/message.service";
import {User} from "../../model/user.model";
import {Subscription} from "rxjs/Subscription";
import {Message} from "../../model/message.model";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [UserService],
  host: {'class': 'chat-window'}
})
export class ChatWindowComponent implements OnDestroy, OnInit, AfterViewInit {

  @ViewChild("messageContainer") messagesContainer;

  messages: Message[] = [];

  private _message: string = "";

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

  /**
   * ID of this chat window's sender. This could be used to get info
   * like user details etc.
   * Ideally this would be at the Chat App level and each Chat Window would
   * request it but for this exercise since our browser has the sender and the receiver
   * at the same level, I am bring it down to the ChatWindow level.
   */
  private _senderId: number;

  public name: String;

  get senderId(): number {
    return this._senderId;
  }

  @Input()
  set senderId(value: number) {
    if (typeof value === "number") {
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
    if (typeof value === "number") {
      this._receiverId = value;
    }
  }

  receiverTyping: boolean = false;

  /**
   * Will be used to send the message
   * @type {Subject<string>}
   */
  private messenger: Subject<Message> = new Subject<Message>();

  /**
   * The receiver will subscribe to this observable
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

  constructor(private userService: UserService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  /**
   * Connect to the receiver
   */
  ngAfterViewInit() {
    // The receiver would retrieve the message history from the database here
    // every time the connection is view is loaded.

    const receiver: Observable<Message> = this.messageService.subscribe(this.receiverId);
    if (receiver) {
      this.receiverSub = receiver.subscribe((message) => {
        this.messages.push(message);
        this.scrollToBottom();
      });
    }

    const receiverTyping: Observable<boolean> = this.messageService.subscribeTyping(this.receiverId);
    if (receiverTyping) {
      this.receiverTypingSub = receiverTyping.subscribe(typing => this.receiverTyping = typing);
    }
  }

  /**
   * Populates user info
   * @param id
   */
  populateUserInfo(id: number): void {
    const user: User = this.userService.getUserInfo(id);
    if (user) {
      this.name = user.name;
    } else {
      throw new Error("User not found");
    }
  }

  /**
   * Sends message to the receiver
   */
  sendMessage(): void {
    if (this._message) {
      // Send Message

      const newMessage: Message = new Message(this._message, this.senderId, this.receiverId);

      this.messages.push(newMessage);

      this.messenger.next(
        newMessage
      );

      // Clear Message
      this.message = "";

      // The sender would save the messages array to the database
      // That way both sender and receiver have the same history
      // Each time the connection is re-established the message array is
      // retrieved from the database

      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      // Set timeout to scroll after the view has been updated with the new message
      setTimeout(() => {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy() {
    this.receiverSub.unsubscribe();
    this.receiverTypingSub.unsubscribe();
  }

}