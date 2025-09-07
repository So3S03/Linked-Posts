import { Routes } from '@angular/router';
import { AuthLayOutComponent } from './components/layouts/auth-lay-out/auth-lay-out.component';
import { SignUpComponent } from './components/Auth/sign-up/sign-up.component';
import { SignInComponent } from './components/Auth/sign-in/sign-in.component';
import { MainLayOutComponent } from './components/layouts/main-lay-out/main-lay-out.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { TimeLineComponent } from './components/main/time-line/time-line.component';
import { homeAccessGuard } from './core/guards/home-access.guard';
import { authLayerAccessGuard } from './core/guards/auth-layer-access.guard';

export const routes: Routes = [
    {
        path: "", component: AuthLayOutComponent, children: [
            { path: "", redirectTo: "SignIn", pathMatch: "full" },
            { path: "SignUp", component: SignUpComponent },
            { path: "SignIn", component: SignInComponent }
        ], canActivate: [authLayerAccessGuard]
    },
    { path: "", component: MainLayOutComponent, children: [
        {path: "", redirectTo: "TimeLine", pathMatch: "full"},
        {path: "TimeLine", component: TimeLineComponent},
        {path: "PostDetailes/:id", loadComponent: () => import("./components/main/post-detailes/post-detailes.component").then( e => e.PostDetailesComponent )},
        {path: "UserProfile", loadComponent: () => import("./components/main/user-profile/user-profile.component").then(e => e.UserProfileComponent)},
        {path: "Settings", loadComponent: ()=> import("./components/main/user-settings/user-settings.component").then(e => e.UserSettingsComponent)},
        {path: "UpdatePost/:id", loadComponent: () => import("./components/common/update-post/update-post.component").then(e => e.UpdatePostComponent)}
    ], canActivate: [homeAccessGuard] },
    { path: "**", component: NotFoundComponent }
];
