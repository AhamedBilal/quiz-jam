import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  followed = true;
  isAdmin = true;
  players = 28;

  navLinks = [
    { path: '.', label: 'Posts' },
    { path: 'about', label: 'About' },
    { path: 'leaderboard', label: 'Leaderboard' },
    { path: 'members', label: 'Members' },
    { path: 'settings', label: 'Settings' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
