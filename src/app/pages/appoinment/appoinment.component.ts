import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-appoinment',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.scss'],
  animations: [
    // trigger('fadeInOut', [
    //   transition(':enter', [
    //     style({ opacity: 0 }),
    //     animate('300ms 200ms', style({ opacity: 1 }))
    //   ]),
    //   transition(':leave', [
    //     animate('200ms', style({ opacity: 0 }))
    //   ])
    // ])
  ]
})
export class AppoinmentComponent {
  // Array of slots
  array = [
    { number: 1, time: '7:00 Am' },
    { number: 2, time: '8:00 Am' },
    { number: 3, time: '9:00 Am' },
    { number: 4, time: '10:00 Am' },
    { number: 5, time: '11:00 Am' }
  ];

  // Index of selected slot
  selectedSlotIndex: any=[];

  // Function to handle slot selection
  selectSlot(index: any) {
    this.selectedSlotIndex = index;
  }

  // Check if a slot is selected
  isSlotSelected(index: any): boolean {
    return this.selectedSlotIndex?.number === index?.number;
  }

buttonClick(){
  console.log(this.selectedSlotIndex)
}  

}
