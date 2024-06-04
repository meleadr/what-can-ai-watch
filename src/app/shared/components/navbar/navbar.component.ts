import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { NgClass, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

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
    MenubarModule,
  ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'What Can AI Watch',
        routerLink: '/',
      },
      {
        label: 'Chat AI',
        routerLink: 'chat',
      },

      {
        label: 'Films',
        icon: 'pi pi-fw pi-video',
        items: [
          {
            label: 'Top films',
            icon: 'pi pi-fw pi-star',
            routerLink: 'movie/top-rated',
          },
          {
            label: 'Populaires',
            icon: 'pi pi-fw pi-thumbs-up',
            routerLink: 'movie/popular',
          },
          {
            label: 'Prochaines sorties',
            icon: 'pi pi-fw pi-calendar',
            routerLink: 'movie/upcoming',
          },
        ],
      },
      {
        label: 'Séries',
        icon: 'pi pi-fw pi-video',
        items: [
          {
            label: 'Top séries',
            icon: 'pi pi-fw pi-star',
            routerLink: 'series/top-rated',
          },
          {
            label: 'Populaires',
            icon: 'pi pi-fw pi-thumbs-up',
            routerLink: 'series/popular',
          },
          {
            label: 'Prochaines sorties',
            icon: 'pi pi-fw pi-calendar',
            routerLink: 'series/upcoming',
          },
        ],
      },
      {
        label: 'A propos',
        routerLink: 'about',
      },
      {
        label: 'Contact',
        routerLink: 'contact',
      },
    ];
  }
}
