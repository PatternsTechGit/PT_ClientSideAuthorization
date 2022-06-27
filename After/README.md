# Adding Angular Material's Side Nav for Routing

## What is Angular Material

[Angular Material](https://material.angular.io/guide/getting-started) is a UI component library for Angular  developers. Angular Material helps to construct attractive, consistent, and functional web pages. It is used to create a responsive and faster website.


## What is Angular Material Side Nav

Angular Material provides two sets of components designed to add collapsible side content (often navigation, though it can be any content) alongside some primary content. These are the sidenav and drawer components.

The sidenav components are designed to add side content to a fullscreen app. 
For more details click link https://material.angular.io/components/sidenav/overview 

## About this exercise

Previously we scafolded a new Angular application in which we have integrated 

* FontAwesome Library for icons
* Bootstrap Library for styling buttons
* Routing for multiple components e.g. (CreateAccountComponent, ManageAccountsComponent, DepositFundsComponent, TransferFundsComponent) for which we have already configured routing. Also we have commented code of links in app.component.html as below :
```html
<!-- <ul>
  <li><a><i class="fas fa-chart-line"></i> Dashboard</a></li>
  <div>
    <li><a [routerLink]="['/transfer-funds', { fromAccountId: '111', toAccountId: '222' }]"><i class="fas fa-random"></i> Transfer Funds</a></li>
    <li><a [routerLink]="['/deposit-funds']"><i class="fas fa-money-check-alt"></i>Deposit Funds</a></li>
    <li><a [routerLink]="['/create-account']"><i class="fas fa-user"></i> Create New Account</a></li>
    <li><a [routerLink]="['/manage-accounts']"><i class="fas fa-users"></i> Manage Accounts</a></li>
  </div>
</ul> -->
```
* Bootstrap's Navbar which is responsive and mobile friendly


In this exercise we will

* Integrate Angular Material 
* Integrate Angular Side Nav which will have links to navigate to our components
* Integrate Toggling of Side Nav using Toolbar 


<font size="5" color="grey">**Step 1: Adding Angular Material support**</font> 

Use the `Angular CLI's` installation schematic to set up your Angular Material project by running the following command:

```
ng add @angular/material
```

* press 'y' to confirm.
* Select indigo pink theme.
* Select 'y' for typography.
* press 'y' for browser animation.

The ng add @angular/material command will additionally perform the following actions:

* Add project dependencies to package.json
* Add the Roboto font to your index.html
* Add the Material Design icon font to your index.html
* Add a few global CSS styles to:
* Remove margins from body
* Set height: 100% on html and body
* Set Roboto as the default application font

You can see the changes as below :

![1234](https://user-images.githubusercontent.com/100709775/159500312-1f1ee93c-297f-4ae2-9712-39b775722f61.PNG)




<font size="5" color="grey">**Step 2 : Forms module and MatSidenavModule**</font>

The [FormsModule](https://angular.io/api/forms/FormsModule) is used for form implementation.

Import the `FormsModule` & `MatSidenavModule` in app.module.ts as below 

``` javascript
imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,  // CLI adds AppRoutingModule to the AppModule's imports array
    FormsModule,
    MatSidenavModule
  ],
```

<font size="5" color="grey">**Step 3: Add component for side nav**</font>

Use Angular CLI's generate component command as below 

```
ng g component sidenav
```

<font size="5" color="grey">**Step 4: Setting Up Side Nav**</font>

To set up a `sidenav` we use three components: `mat-sidenav-container`, `mat-sidenav-content`and `mat-sidenav`



```html
<!-- mat-sidenav-container which acts as a structural container for our content and sidenav  -->
    <mat-sidenav-container>
    <!-- mat-sidenav which represents the added side content -->
        <mat-sidenav>
            // Here our side nav component will be render.
        </mat-sidenav>
       <!--  mat-sidenav-content which represents the main content -->
        <mat-sidenav-content>
          //  Here routed components will be shown. 
        </mat-sidenav-content>
    </mat-sidenav-container>
```

<font size="5" color="grey">**Step 5: mat-sidenav**</font>

`mat-sidenav` is going to hold the html for the side nav so we will put `<app-sidenav></app-sidenav>` there
and contents of the routed components will go inside `<mat-sidenav-content>` so we will paste `<router-outlet></router-outlet>` in mat-sidenav-content. 

We don't want our top nav to be effected by the side nav so  add sidenav structure under the toolbar component in app.components.html

Set `height: 100%` so that menu can be render on full screen.

```html
<div class="container-fluid" style="height: 100%;">
<app-toolbar></app-toolbar> 
      <mat-sidenav-container  style="height: 100%;">
          <mat-sidenav opened mode="side">
        <app-sidenav></app-sidenav>
          </mat-sidenav>
          <mat-sidenav-content>
            <router-outlet></router-outlet> 
          </mat-sidenav-content>
      </mat-sidenav-container>

</div>
```

<font size="5" color="grey">**Step 6: Adding Style for side nav**</font>

Add following `CSS` in sidenav.component.css to style the side nav. 

```css
.sidenav { /* styles to give redish gradiesnt to side nav */
    background: #ec250d;
    background: linear-gradient(0deg,#ec250d 0,#fd5d93 100%);
    /* height: calc(100vh - 90px); */
    height: 100%;
    width: 230px;
    display: block;
    box-shadow: 0 0 45px 0 rgba(0,0,0,.6);
    margin-right: 15px;
    border-radius: 5px;
    transition: .5s cubic-bezier(.685,.0473,.346,1);
}
.logo {  /* styles for logo */
    position: relative;
    padding: 0.5rem 0.7rem;
    z-index: 4;
}
.logo a.logo-mini {
    opacity: 1;
    float: left;
    width: 34px;
    text-align: center;
    margin-left: 10px;
    margin-right: 12px;
}
.logo a.logo-normal {
    display: block;
    opacity: 1;
    -webkit-transform: translate3d(0px, 0, 0);
    -moz-transform: translate3d(0px, 0, 0);
    -o-transform: translate3d(0px, 0, 0);
    -ms-transform: translate3d(0px, 0, 0);
    transform: translate3d(0px, 0, 0);
}
.logo:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 15px;
    height: 1px;
    width: calc(100% - 30px);
    background: rgba(255, 255, 255, 0.5);
}
.logo .simple-text {
    text-transform: uppercase;
    padding: 0.5rem 0;
    display: block;
    white-space: nowrap;
    color: #ffffff;
    text-decoration: none;
    font-weight: 400;
    line-height: 30px;
    overflow: hidden;
}
.logo-img img {
    width: 35px;
}
.nav li>a {
    margin: 10px 15px 0;
    border-radius: 30px;
    color: rgba(255, 255, 255, .8);
    width: 200px;
    display: block;
    text-decoration: none;
    position: relative;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 300;
    padding: 10px 15px;
    line-height: 1.5rem;
    transition: all .3s ease 0s;
}
.nav li>a i {
    width: 20px;
    margin-right: 10px;
    font-size: 1.125rem;
}
.nav li>a:hover, .nav li>a:hover i {
    color: rgba(255, 255, 255, 1);
    transition: all .3s ease 0s;
}
.nav li.active>a:before {
    content: " ";
    position: absolute;
    height: 6px;
    width: 6px;
    top: 17px;
    left: -2px;
    background: #fff;
    border-radius: 50%;
}
```

<font size="5" color="grey">**Step 7: Side Nav Html**</font>


Side Nav will have 2 parts. The logo part at the top and navigation links part at the button.


Add logo image to assets and copy the commented routing links from app.components.html under logo div 

add "nav" style to ul and active style to dashboard link.

``` html
<div class="sidenav">
    <div class="logo">
        <a href="/" class="simple-text logo-mini">
            <div class="logo-img">
                <img src="./assets/images/angular2-logo-white.png" />
            </div>
        </a>
        <a href="/" class="simple-text logo-normal">
            BBBank
        </a>
    </div>
    <ul class="nav">
        <li><a [routerLink]="['/']"><i class="active fas fa-chart-line"></i> Dashboard</a></li>
        <div>
          <li><a [routerLink]="['/transfer-funds', { fromAccountId: '111', toAccountId: '222' }]"><i class="fas fa-random"></i> Transfer Funds</a></li>
          <li><a [routerLink]="['/deposit-funds']"><i class="fas fa-money-check-alt"></i>Deposit Funds</a></li>
          <li><a [routerLink]="['/create-account']"><i class="fas fa-user"></i> Create New Account</a></li>
          <li><a [routerLink]="['/manage-accounts']"><i class="fas fa-users"></i> Manage Accounts</a></li>
        </div>
      </ul> 
</div>
```

<font size="5" color="grey">**Step 8: Fixing navbar background colors**</font>

To match the background of navbar with our application's background color use the following style in main `style.css` file 

```css
.mat-drawer-content {
  overflow: hidden !important;
}
.mat-drawer-container {
  background-color: #1e1e2f;

}
.mat-drawer {
  background-color: #1e1e2f;
}
```

<font size="5" color="grey">**Step 9: Opening the side nav**</font>

Setting `opened` and `side` mode to `mat-sidenav` to start is as opened by default. 


```html
<!-- opened is used to show the navbar by default. -->
<!-- side mode is used to ashow side navbar on the side of the page. -->
<!-- #sideNav is used as template regerence variable. -->
  <mat-sidenav #sideNav opened mode="side" >
```

   <font size="5" color="grey">**Step 10: Toggling Sidenav**</font>
      
Add a [Template Refrence variable](https://angular.io/guide/template-reference-variables) to side nav.

```html
​    <mat-sidenav #sideNav opened mode="side" >
```

Add an [@input](https://angular.io/guide/inputs-outputs) variable inputSideNav of type MatSidenav
in Toolbar.Component.ts as below : 

```javascript
export class ToolbarComponent implements OnInit {
  // @ts-ignore: Object is possible 'null'
  @Input() inputSideNav:MatSidenav
  constructor() { }

  ngOnInit(): void {
  }
}
```

After that pass the reference variable to toolbar component so that we can control toggle feature from the toolbar component.

​    <app-toolbar [inputSideNav]="sidenav"></app-toolbar>



Create a link in toolbar.component.html and add a `click` event to it as below : 

```html
   <a class="sidenav-button"><i class="fas fa-bars" aria-hidden="true" (click)="inputSideNav.toggle()" > </i></a>
 
```

Here `inputSideNav.toggle()` is used to switch from one effect to other and vise versa.

Run the application and see its working as below : 

![20220324-213449_capture](https://user-images.githubusercontent.com/100709775/159965696-0a423990-f0b9-4dcb-87a1-ca28bc018c54.gif)







