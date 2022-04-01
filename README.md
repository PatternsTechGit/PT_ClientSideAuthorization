# Client Side Authorization in Angular

## Authentication vs Authorization

Authentication verifies who the user is, whereas Authorization determines what resources a user can access. Authentication is the act of validating that users are whom they claim to be. This is the first step in any security process. Authorization in system security is the process of giving the user permission to access a specific resource or function.

## About this exercise

Previously we have developed an Angular application that have components like DashboardComponent, CreateAccountComponent, ManageAccountsComponent, DepositFundsComponent and TransferFundsComponent.
We also have routes configured for these components and a Side Nav that has links for these routes. A Toolbar that controls the Side Nav.

In this exercise we will

- Create AuthService to simulate a User Login and Logout.
- Restrict access to routes unless there is a logged in User.
- Show & Hide Side Nav links based on the logged in User's role.
- Show the name of logged in User in Toolbar.

### Step 1 : AppUser model

Create a model that will represent the logged in User. Create a folder "models" and add AppUser.ts file.

```typescript
export class AppUser {
  id!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  roles!: string[];
  token?: string;
}
```

### Step 2 : Create the Auth Service

Create a service **AuthService** to implement the authentication flow in services folder.

```
ng generate service Auth
```

Inject the angular router in the constructor

```typescript
constructor(private router: Router) { }
```

Create the variable to store the logged in user information

```typescript
loggedInUser?: AppUser;
```

Create the login method which returns the AppUser observable

```typescript
login(): Observable<AppUser> {

    // initializing the user information
    this.loggedInUser = {
      firstName: 'Waqas',
      lastName: 'Tariq',
      username: 'waqastariq',
      roles: ['account-holder']
    } as AppUser;

    // saving the logged in user information in  Web Storage API (localStorage)
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

    // returns the data i.e., user information using RxJs pipe
    // Also using delay of one second just to simulate the API call
    return of(this.loggedInUser).pipe(
      delay(1000)
    );
  }
```

Create the logout method to remove the user information from localStorage which we will be using for checking whether the user session is valid or not.

```typescript
logout(): void {
    // removing logged in user information from the localStorage
    localStorage.removeItem('loggedInUser');

    // navigate to application home using router
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }
```

### Step 3 : Create the Login Component

To navigate the user for credentials information create a login component.

```
ng generate component Login
```

Inject the AuthService and Router in constructor

```typescript
constructor(private authService: AuthService, private router: Router) { }
```

Create a button to simulate the login functionality. When user clicks on this button it will perform the functionality by calling the auth service in login method. 

```typescript
<button class="btn btn-primary"  type="button" (click)="login()">Login</button>
```

Create the login() method in the login.component.ts file

```typescript
login() {

    // calling the login() method in the auth service
    this.authService.login()
      .subscribe(user => {
        console.log("Is Login Success: " + user);

        // check whether the user object has the data
        if (user) {
          // navigate to application home page
          this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
        }
      });
  }
```

When we run the project 
![image](https://user-images.githubusercontent.com/100778209/161303446-e788de20-65b8-43f3-b50f-93d9a640565a.png)


### Step 4 : Create the Auth Guard

In order to authorize the user to access the application after login to the application. We will be using angular canActivate [Route Guard](https://angular.io/api/router/CanActivate).

Guards in Angular are nothing but the functionality, logic, and code which are executed before the route is loaded or the ones leaving the route. There are different type of guards.

Create the gurad **AuthGuard** using the command in guards folder.

```
ng generate guard Auth
```

It will generate the auth.guard.ts file in this folder.

We will inject the router using the constructor.

```typescript
constructor(private router: Router) { }
```

Now we will use the **canActivate** method to implement the required functionality.

```typescript
canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // check whether the localStorage has data for loggedInUser
    if (localStorage.getItem('loggedInUser') != null) {
      return true;
    }
    else {
      // navigate to login page
      return this.router.navigate(['/login']);
    }
  }
```

### Step 5 : Implement the Auth Guard

To implement the guard in the application. Add another property to each route in the routes array in app-routing.module.ts file.

```typescript
const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: "create-account",
    component: CreateAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "manage-accounts",
    component: ManageAccountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "deposit-funds",
    component: DepositFundsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "transfer-funds",
    component: TransferFundsComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "**", component: PageNotFoundComponent },
];
```

This property will check the logic we have implemented in **AuthGuard** before navigating to the respective route or path.

### Step 6 : Controlling SideBar Behaviour

Create a variable to save the user role.

```typescript
loggedInUserRole: string;
```

Inject the AuthService in the constructor.

```typescript
constructor(private authService: AuthService) { }
```

Using OnInit life cycle hook we will initialize the variable **loggedInUserRole**

```typescript
ngOnInit(): void {
    this.loggedInUserRole = JSON.parse(localStorage.getItem('loggedInUser')).roles[0];
  }
```

Now in order to control on view / html page which controls to be shown based on the user role. We will be using angular structural directive.

Structural Directives are directives which change the structure of the DOM by adding or removing elements. There are three built-in structural directives, NgIf , NgFor and NgSwitch.

SideNav links were created using the anchor html tag as follows

```
<div>
    <li><a [routerLink]="['/transfer-funds', { fromAccountId: '111', toAccountId: '222' }]"><i
                class="fas fa-random"></i> Transfer Funds</a></li>
    <li><a [routerLink]="['/deposit-funds']"><i
                class="fas fa-money-check-alt"></i>Deposit Funds</a></li>
    <li><a [routerLink]="['/create-account']"><i
                class="fas fa-user"></i> Create New Account</a></li>
    <li><a [routerLink]="['/manage-accounts']"><i
                class="fas fa-users"></i> Manage Accounts</a></li>
</div>
```

To control the behavior of sidenav we are using the **NgIf** structural directive

```
<div>
    <li *ngIf="this.loggedInUserRole == 'account-holder'"><a
            [routerLink]="['/transfer-funds', { fromAccountId: '111', toAccountId: '222' }]"><i
                class="fas fa-random"></i> Transfer Funds</a></li>
    <li *ngIf="this.loggedInUserRole == 'account-holder'"><a [routerLink]="['/deposit-funds']"><i
                class="fas fa-money-check-alt"></i>Deposit Funds</a></li>
    <li *ngIf="this.loggedInUserRole == 'bank-manager'"><a [routerLink]="['/create-account']"><i
                class="fas fa-user"></i> Create New Account</a></li>
    <li *ngIf="this.loggedInUserRole == 'bank-manager'"><a [routerLink]="['/manage-accounts']"><i
                class="fas fa-users"></i> Manage Accounts</a></li>
</div>
```

The *ngIf="this.loggedInUserRole == 'account-holder'" is checking for role of account holder. 
The *ngIf="this.loggedInUserRole == 'bank-manager'" is checking for role of the bank manager.

When we run the application. Since the user is having role of **account-holder** so, cann't be able to view links for;
- Create New Account
- Manage Accounts

### Step 7 : Controlling ToolBar Behaviour

In Toolbar component we will implement the authorization behaviour using AuthService. So inject the auth service in the controller and create a variable for logged in user

```typescript
loggedInUser?: AppUser;
constructor(private authService: AuthService) { }
```

Initialize the data in the logged in user using OnInit life cycle hook.

```typescript
ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
}
```

Also create a method to logout the user when clicking on the logout link

```typescript
logout(): void {
    this.authService.logout();
}
```

There to implement the functionality in the component view 

```
<ul class="navbar-nav ml-auto">
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="photo">
                <img alt="Profile Photo" src="assets/images/anime3.png" />
            </div>
            {{loggedInUser.firstName + ' ' + loggedInUser.lastName}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item">Profile</a>
        <a class="dropdown-item" (click)="logout()" >Logout</a>
        </div>
    </li>
</ul>
```

When we run the application and click on login button following response will be received as the user has role of account holder.
![image](https://user-images.githubusercontent.com/100778209/161303657-960e11c1-9aaa-44cd-a748-4f2c00d4b977.png)

To logout the application click on Logout link by using context menu under user avatar.
![image](https://user-images.githubusercontent.com/100778209/161303841-2f81f823-2544-4237-b184-4c38b25e672c.png)

