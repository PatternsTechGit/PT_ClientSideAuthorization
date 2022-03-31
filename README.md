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

Create a service **AuthService** to implement the authentication flow.

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



