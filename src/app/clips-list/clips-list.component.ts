import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css',
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy {

  @Input() scrollable: boolean = true;

  constructor(public clipService: ClipService) {
    this.clipService.getClips();
  }

  ngOnInit(): void {
    if(this.scrollable){
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy(): void {
    if(this.scrollable){
      window.removeEventListener('scroll', this.handleScroll);
    }

    this.clipService.pageClips = [];
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

    if (bottomOfWindow) {
      console.log('You have reached the bottom of the page!');
      this.clipService.getClips();
    }
  };
}
