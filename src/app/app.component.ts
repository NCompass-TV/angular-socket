import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'angular-socket';
  socket: any
  socket_endpoint: string = environment.socket_server;
  pong_count: number = 0;

  constructor() {
    this.socket = io(this.socket_endpoint, {
      transports: ['websocket']
    })
  }

  ngOnInit() {
    this.socket.on('connect', (socket: any) => {
      console.log("Connected to sockets");
    })

    this.socket.on('disconnect', () => {
      console.log("Disconnected to sockets");
    })

    this.socket.on('hi', () => {
      this.pong_count++;
    })
  
    setInterval(() => {
      this.socket.emit('hello', 'hello from angular-socket')
    }, 2000)
  }
}
