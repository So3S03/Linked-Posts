import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { IUser } from '../../../core/interfaces/iuser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router: Router = inject(Router);
  public readonly _AuthenticationService: AuthenticationService = inject(AuthenticationService);
  userSubscription!: Subscription
  isCollapsed: boolean = false;
  collapsing(): void
  {
    if(!this.isCollapsed) 
      this.isCollapsed = true;
    else
      this.isCollapsed = false;
  }



  logOut() :void
  {
    if(isPlatformBrowser(this._PLATFORM_ID))
    {
      const token = localStorage.getItem("socialToken");
      if(token)
      {
        localStorage.removeItem("socialToken");
        this._Router.navigate(["/SignIn"]);
      }
    }
  }

}
