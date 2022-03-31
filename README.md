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

### Step 4 : Create the Auth Guard

In order to authorize the user to access the application after login to the application. We will be using angular **Guard**. 

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
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-account', component: CreateAccountComponent, canActivate: [AuthGuard] },
  { path: 'manage-accounts', component: ManageAccountsComponent, canActivate: [AuthGuard] },
  { path: 'deposit-funds', component: DepositFundsComponent, canActivate: [AuthGuard] },
  { path: 'transfer-funds', component: TransferFundsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
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

```html
*ngIf="this.loggedInUserRole == 'account-holder'"
```

