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

