import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { NgClass, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MegaMenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MegaMenuModule,
    NgClass,
    ButtonModule,
    AvatarModule,
    RippleModule,
    NgIf,
    InputGroupModule,
    InputTextModule,
  ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  items: MegaMenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Chat AI',
        routerLink: 'chat',
      },
      {
        label: 'Top films',
        routerLink: 'movie/top-rated',
      },
      {
        label: 'Contact',
      },
    ];
  }
}
