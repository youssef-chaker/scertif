import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatSocketService} from '../services/chat-socket.service';
import {MentionConfig} from 'angular-mentions';
import {ChatService} from '../services/chat.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages = [
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2015-03-25')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-03-25')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-09-19')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-12-02')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-12-01')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-11-25')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-10-20')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-11-11')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-11-29')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-01-10')
    },
    {
      username: 'Username',
      message: 'Message',
      date: new Date('2020-05-25')
    }
  ];
  i = 0;
  newMessage;
  loading = false;
  firstLoading = true;
  mentionedUsers = [];
  mentionConfig: MentionConfig = {};
  activeUsers = [];
  myUsername;
  subs = new Subscription();

  @ViewChild('scroller') private myScrollContainer: ElementRef;

  constructor(private chatSocketService: ChatSocketService,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.subs.add(
      this.chatService.getMessages()
        .subscribe(messages => {
          this.messages = messages;
          this.firstLoading = false;
          setTimeout(() => {
            this.scrollToBottom();
          });
        }, () => {
          this.firstLoading = false;
          setTimeout(() => {
            this.scrollToBottom();
          });
        })
    );
    this.myUsername = localStorage.getItem('username');
    this.subs.add(
      this.chatSocketService.receiveMessage()
        .subscribe(message => {
          message.date = new Date(message.date);
          this.messages.push(message);
          setTimeout(() => {
            this.scrollToBottom();
          });
        })
    );

    this.subs.add(
      this.chatSocketService.getActiveUsers()
        .subscribe((users) => {
          // console.log(users);
          this.activeUsers = users;
          this.mentionedUsers = [];
          users.forEach(u => {
            if (this.mentionedUsers.indexOf(u.username) === -1
              && u.username !== this.myUsername) {
              this.mentionedUsers.push(u.username);
            }
          });
          this.mentionConfig = {items: this.mentionedUsers};
          // console.log(this.mentionedUsers);
        })
    );
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  onScroll($event: any): void {
    if ($event.target.scrollTop === 0) {
      this.loading = true;
      const toAddMessages = [
        {
          username: 'Username' + this.i,
          message: 'Message' + this.i,
          date: new Date('2015-03-25')
        },
        {
          username: 'Username' + this.i,
          message: 'Message' + this.i,
          date: new Date('2015-03-25')
        },
        {
          username: 'Username' + this.i,
          message: 'Message' + this.i,
          date: new Date('2015-03-25')
        },
      ];
      setTimeout(() => {
        this.loading = false;
        toAddMessages.forEach((message) => {
          this.messages.unshift(message);
        });
        this.i++;
        this.myScrollContainer.nativeElement.scrollTop += 50;
      }, 2000);
    }
  }

  invalidMessage(): boolean {
    return this.newMessage === undefined
      || this.newMessage.length === 0;
  }

  onPressKey(e): void {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  highlightMention(content): void {
    return content.replace(new RegExp(/@\S+/g, 'gi'), match => {
      return '<span class="highlight-mention">' + match + '</span>';
    });
  }

  highlightBot(content): void {
    return content.replace(new RegExp('Chatbot', 'gi'), match => {
      return '<span class="highlight-bot">' + match + '</span>';
    });
  }

  sendMessage(username, message, date): void {
    this.chatSocketService.sendMessage(username, message, date);
    this.newMessage = undefined;
  }

  onSend(): void {
    if (!this.invalidMessage()) {
      if (this.newMessage.startsWith('/bot ')) {
        const message = this.newMessage.substring(5);
        this.sendMessage(this.myUsername, this.newMessage, new Date());
        this.chatService.fromChatbot(message).subscribe(res => {
          this.sendMessage('Chatbot', res.message, new Date());
        });
        return;
      }
      let tags = this.newMessage.match(/@\S+/g);
      if (tags) {
        tags = tags.map(tag => tag.substring(1));
        tags.forEach(tag => {
          const users = this.activeUsers.filter(u => u.username === tag);
          users.forEach(user => {
            const userMentioned = user.id;
            this.chatSocketService.mentionUser(this.myUsername, userMentioned);
          });
        });
      }
      this.sendMessage(this.myUsername, this.newMessage, new Date());
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
