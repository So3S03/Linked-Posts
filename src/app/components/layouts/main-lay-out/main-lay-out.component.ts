import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavBarComponent } from '../../common/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-main-lay-out',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './main-lay-out.component.html',
  styleUrl: './main-lay-out.component.css'
})
export class MainLayOutComponent implements OnInit{
  private readonly _AuthenticationService: AuthenticationService = inject(AuthenticationService);
  ngOnInit(): void {  
    this._AuthenticationService.loadUserData();
  }
}
