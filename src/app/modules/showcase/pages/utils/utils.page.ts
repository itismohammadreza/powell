import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ng-utils-page',
  templateUrl: './utils.page.html',
  styleUrls: ['./utils.page.scss'],
})
export class UtilsPage implements OnInit {
  testParag = ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto deserunt
  numquam similique odio sequi perspiciatis magnam, ratione, nobis quaerat
  placeat praesentium a eos perferendis veritatis. Tempora quibusdam expedita
  voluptatibus porro? Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Architecto deserunt numquam similique odio sequi perspiciatis magnam, ratione,
  nobis quaerat placeat praesentium a eos perferendis veritatis. Tempora
  quibusdam expedita voluptatibus porro? Lorem ipsum dolor sit amet consectetur
  adipisicing elit. Architecto deserunt numquam similique odio sequi
  perspiciatis magnam, ratione, nobis quaerat placeat praesentium a eos
  perferendis veritatis. Tempora quibusdam expedita voluptatibus porro? `;
  list = [
    {
      color: 'red',
      value: '#f00',
    },
    {
      color: 'green',
      value: '#0f0',
    },
    {
      color: 'blue',
      value: '#00f',
    },
    {
      color: 'cyan',
      value: '#0ff',
    },
    {
      color: 'magenta',
      value: '#f0f',
    },
    {
      color: 'yellow',
      value: '#ff0',
    },
    {
      color: 'black',
      value: '#000',
    },
  ];

  ngOnInit(): void {
  }
}
