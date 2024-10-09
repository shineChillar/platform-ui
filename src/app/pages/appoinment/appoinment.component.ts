import { Component } from '@angular/core';

@Component({
  selector: 'app-appoinment',
  standalone: true,
  imports: [],
  templateUrl: './appoinment.component.html',
  styleUrl: './appoinment.component.scss'
})
export class AppoinmentComponent {
    array:any=[{
      number:1,
      time:"7:00 Am"
    },
  {
    number:2,
      time:"8:00 Am"
  },
  {
    number:3,
      time:"3:00 Am"
  },
  {
    number:4,
      time:"9:00 Am"
  }
,{
  number:5,
    time:"10:00 Am"
},{
  number:5,
    time:"10:00 Am"
}]
}
