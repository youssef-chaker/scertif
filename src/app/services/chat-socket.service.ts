import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ChatSocketService {

  socket: any;
  users = [];

  constructor(private toastr: ToastrService) {
  }

  setupSocketConnection(): void {
    // @ts-ignore
    this.socket = io('http://localhost:3000');
  }

  setupSocketChannels(): void {
    this.socket.on('logged-out', users => {
      this.users = users;
      // console.log(users);
    });

    this.socket.on('exit', users => {
      this.users = users;
      // console.log(users);
    });

    this.socket.on('mentioned', data => {
      console.log(data);
      this.toastr.info(data, 'Chat');
    });
  }

  sendMessage(username, message, date): void {
    this.socket.emit('sent', {
      username,
      message,
      date
    });
  }

  receiveMessage(): Observable<any> {
    return new Observable(subscriber => {
      this.socket.on('received', data => {
        subscriber.next(data);
      });
    });
  }

  getUsers(): void {
    this.socket.emit('users');
    this.socket.on('users-list', users => {
      this.users = users;
      // console.log(users);
    });
  }

  getActiveUsers(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.emit('users');
      this.socket.on('users-list', users => {
        this.users = users;
        subscriber.next(users);
      });
    });
  }

  addUser(username): void {
    this.socket.emit('add-user', username);
    this.getUsers();
  }

  logOut(): void {
    this.socket.emit('logout');
    this.socket.on('logged-out', () => this.getUsers());
  }

  disconnect(): void {
    this.socket.emit('disconnect');
  }

  mentionUser(whoMentioned, userMentioned): void {
    this.socket.emit('mention', whoMentioned, userMentioned);
  }
}
