import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  navLinks = [
    { path: '.', label: 'Posts' },
    { path: 'about', label: 'About' },
    { path: 'leaderboard', label: 'Leaderboard' },
    { path: 'members', label: 'Members' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
