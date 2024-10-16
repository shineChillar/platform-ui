import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit  {
  loaderVisible = false;
  loaderText: string = '';

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loaderVisibility$.subscribe((visible: boolean) => {
      this.loaderVisible = visible;
    });

    this.loaderService.loaderText$.subscribe((text: string) => {
      this.loaderText = text;
    });
}
}