# Dependency Injection Angular
Everything that you need to know in practice to use the Angular dependency injection system, all in one place. All of its advanced concepts are explained in a practical and easy-to-understand way, with examples.

## Table Of Contents
In this post, we will cover the following topics:
* Introduction to Dependency Injection
* How to set up dependency injection from scratch in Angular?
* What is an Angular Dependency Injection Provider?
* How to write our own provider?
* Introduction to Injection Tokens
* How to manually configure a provider?
* Using class names as Injection Tokens
* Simplified configuration of providers: useClass
* Understanding Angular multiple value dependencies
* When to use an useExisting provider
* Understanding Angular Hierarchical Dependency Injection
* What are the advantages of Hierarchical Dependency Injection?
* Components Hierarchical Dependency Injection - an example
* Modules Hierarchical Dependency Injection - an example
* Modules vs Components Dependency Injection Hierarchies
* Configuring the Dependency Injection Resolution mechanism
* Understanding the @Optional decorator
* Understanding the @SkipSelf decorator
* Understanding the @Self decorator
* Understanding the @Host decorator
* What are Tree-Shakeable Providers?
* Understanding Tree-Shakeable Providers via an example
* Summary
  
## Introduction to Dependency Injection
The dependency injection is a way to use external code on your project without to know how this code is implemente. 

The code to create the dependency has been moved out of the class and placed somewhere else in your code base, thanks to the use of the <code>**@Injectable()**</code> decorator.<br>
With this new decorator, it's super easy to:
* replace an implementation of a dependency for testing purposes
* to support multiple runtime environments
* to provide new versions of a service to a third-party that uses your service in their code base, .etc<br>

This technique of just receiving your dependencies as inputs without knowing how they work internally or how they were created is aptly named dependency injection, and it's one of the cornerstones of Angular.

## How to set up dependency injection from scratch in Angular?
The best way to understand dependency injection in Angular, is to take a plain Typescript class without any decorators applied to it, and turn it into an Angular injectable service manually, from scratch

It's much easier than it sounds. 😃

Let's start with a very simple service class, with no <code>@Injectable()</code> decorator applied to it

<pre>
<code>
export class ProduitService() {

   http: HttpClient;

   constructor(http: HttpClient) {
     this.http = http;
   }
...
}
</code>
</pre> 
<br>
As we can see, this is just a plain Typescript class, that expects some dependencies to be injected in its constructor.

But this class is in no way linked to the Angular dependency injection system at all.

Let's see what happens if we now try to inject this class as a dependency into the constructor of another class:

<pre>
<code>
@Component({
    selector: 'app-produit-card',
    templateUrl: './produit-card.component.html',
    styleUrls: ['./produit-card.component.scss']
})
export class ProduitCardComponent  {

    constructor(private coursesService: CoursesService) {}
    
}
</code>
</pre>

As we can see, we are trying to inject an instance of this class as a dependency.

But our class is not linked to the Angular dependency injection system, so what part of our program will know how to call the <code>ProduitService</code> constructor to create an instance of that class and pass it as a dependency?

The answer is simple: **nobody**, and so we will get an error! 😉<br>
<code>NullInjectorError: No provider for ProduitService!</code><br>
Notice the error message: apparently something known as a provider is missing.

You probably have seen a similar message before, it happens very commonly during development.

Let's now understand exactly what this message means, and how to troubleshoot it.

## What is an Angular Dependency Injection Provider?
The error message "no provider" means simply that the Angular dependency injection system can't instantiate a given dependency, because it does not know how to create it.

In order for Angular to know how to create a dependency such as for example the <code>ProduitService</code> instance injected in the <code>ProduitCardComponent</code> constructor, it needs what is known as a provider factory function.

A provider factory function is simply a plain function that Angular can call in order to create a dependency, it's as simple as that: **it's just a function.** 👍

That provider factory function can even be created implicitly by Angular using some simple conventions that we will talk about, and that is actually what usually happens for most of our dependencies.

But we can also write that function ourselves if needed.

In any case, it's important to understand that for every single dependency in your application, be it a service or a component or anything else, there is somewhere a plain function that is being called that knows how to create your dependency.

## How to write our own provider?
To really understand what a provider is, let's simply write our own provider factory function for the <code>ProduitService</code> class:
<pre>
<code>
function ProduitServiceProviderFactory(http:HttpClient): ProduitService {
  return new CoursesService(http);
}
</code>
</pre>

As you can see, this is just a plain function that takes as input any dependencies that <code>ProduitService</code> needs.

This provider factory function will then call the <code>CoursesService</code>
constructor manually, pass all the needed dependencies, and return the new <code>ProduitService</code> instance as the output.

So any time that the Angular dependency injection system needs an instance of <code>ProduitService</code>, all it needs to do is to call this function!

This looks very simple, but the problem is the Angular dependency injection system does not know about this function yet.

More important than that, even if Angular knew about this function, how would it know that it needs to call it to inject this particular dependency:

I mean, there is no way for Angular to make the link between this injected instance of <code>ProduitService</code> and the provider factory function, right?

## Introduction to Injection Tokens
So how does Angular know what to inject where, and what provider factory functions to call to create which dependency?

Angular needs to be able to classify dependencies somehow, in order to identify that a given set of dependencies are **all of the same type**.

In order to uniquely identify a category of dependencies, we can define what is known as an Angular injection token.

Here is how we create our injection token manually, for our <code>ProduitService</code> dependency:
<pre>
<code>
export const COURSES_SERVICE_TOKEN = 
      new InjectionToken<ProduitService>("PRODUIT_SERVICE_TOKEN");
</code>
</pre>

This injection token object will be used to clearly identify our <code>ProduitService</code> dependency in the dependency injection system.

The dependency injection token is an object, so in that sense it's unique, unlike a string for example.

So this token object can be used to uniquely identify a set of dependencies.

## How to manually configure a provider?
Now that we have both the provider factory function and the injection token, we can configure a provider in the Angular dependency injection system, that will know how to create instances of  <code>ProduitService</code> if needed.

The provider itself is simply a configuration object, that we pass on to the

<code>providers</code>array of a module or component:
<pre>
<code>
@NgModule({
  imports: [
    ...
  ],
  declarations: [
    ...
  ],
  providers: [
      {
      provide: COURSES_SERVICE_TOKEN,
      useFactory: produitServiceProviderFactory,
      deps: [HttpClient]
    }
    ]
})
export class AppModule { }
</code>
</pre>

As we can see, this manually configured provider needs the following things defined:

* <code>**useFactory**</code>: this should contain a reference to the provider factory function, that Angular will call when needed to create dependencies and inject them
* <code>**provide**</code>: this contains the injection token linked to this type of dependency. The injection token will help Angular determine when a given provider factory function should be called or not
* <code>**deps**</code>: this array contains any dependencies that the <code>**useFactory**</code> function needs in order to run, in this case the HTTP client

So now Angular knows how to create instances of <code>**ProduitService**</code>, right?

Let's see what happens if we now try to inject an instance of <code>**ProduitService**</code> in our application:
<pre>
<code>
@Component({
    selector: 'app-produit-card',
    templateUrl: './produit-card.component.html',
    styleUrls: ['./produit-card.component.css']
})
export class ProduitCardComponent  {

    constructor(private produitService: ProduitService) {
      ...
    }
    ...
}
</code>
</pre>

We might be a bit surprised to see that the same error message still occurs:

<pre>
<code>
NullInjectorError: No provider for ProduitService
</code>
</pre>

So what is going on here? Didn't we just define the provider?

Well, yes, but there is no way for Angular to know that it needs to use our particular provider factory function when attempting to create this dependency, right?

So how do we make that link?

We need to explicitly tell Angular that it should use our provider to create this dependency.

We can do so by using the <code>**@Inject**</code> annotation, everywhere where <code>ProduitService</code> is being injected:

<pre>
<code>
@Component({
    selector: 'app-produit-card',
    templateUrl: './produit-card.component.html',
    styleUrls: ['./produit-card.component.css']
})
export class ProduitCardComponent  {

    constructor( @Inject(PRODUIT_SERVICE_TOKEN) private produitService: ProduitService) {
      ...
    }
    ...
}
</code>
</pre>

As we can see, the explicit use of the <code>**@Inject**</code> decorator allows us to tell Angular that in order to create this dependency, it needs to use the specific provider linked to the <code>**PRODUIT_SERVICE_TOKEN**</code> injection token.

The injection token uniquely identifies a dependency type from the point of view of Angular, and that is how the dependency injection system knows what provider to use.

So now Angular knows what provider factory function to call to create the right dependency, and it goes ahead and does just that.

And with this, our application is now working correctly, no more errors! 😉

I think now you have a good understanding of how the Angular dependency injection system works, but I guess you are probably thinking:

## But why don't I ever have to configure providers manually?

You see, even though you usually don't have to configure provider factory functions or injection tokens manually yourself, this is what is actually happening under the hood.

For every single type of dependency of your application, be it a service, a component or something else, there is always a provider, and there is always an injection token, or some other mechanism of uniquely identifying a dependency type.

This makes sense, because the constructors of your classes need to be called by some part of your system, and Angular always needs to know what dependency type to create, right?

So even when you configure your dependencies in a simplified way, there is always a provider under the hood.

To better understand this, let's progressively simplify the definition of our provider, until we reach something that you are much more used to.

## Using class names as Injection Tokens
One of the most interesting features of the Angular dependency injection system, is that you can use anything that is guaranteed to be unique in the Javascript runtime in order to identify a type of dependency, it doesn't have to be an explicit injection token object.

For example, in the Javascript runtime, class names are represented by constructor functions, and a reference to a function like for example its name is guaranteed to be unique at runtime.

A class name can then be uniquely represented at runtime by its constructor function, and because it's guaranteed to be unique, it can be used as an injection token.

So we can simplify a bit the definition of our provider, by taking advantage of this powerful feature:

<pre>
<code>
@NgModule({
  declarations: [
    AppComponent,
    ProduitCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: PRODUIT_SERVICE_TOKEN,
      useFactory: produitServiceProviderFactory,
      deps: [HttpClient]
    },
    {
      provide: URL_TOKEN,
      useFactory: urlFactory
    },
    {
      provide: CategoryService,
      useFactory: categoryServiceProviderFactory,
      deps: [HttpClient, URL_TOKEN]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
</code>
</pre>

As we can see, we are no longer using the CATEGORY_SERVICE_TOKEN injection token object that we have manually created as a means to identify our dependency type.

In fact, we have removed that object from our code base altogether, because for the particular case of service classes, we can use the class name itself to identify the dependency type!

But if we try our program without any further modifications, we would get again the "*no provider*" error.

In order to make things work again, you need to use the <code>**CategoryService**</code> constructor function to also identify which dependencies you need:

<pre>
<code>
@Component({
    selector: 'app-produit-card',
    templateUrl: './produit-card.component.html',
    styleUrls: ['./produit-card.component.css']
})
export class ProduitCardComponent  {

    constructor( @Inject(CategoryService) private categoryService: CategoryService) {
      ...
    }
    ...
}
</code>
</pre>

And with this, Angular knows what dependency to inject, and everything is working again as expected! 

So the good news is that we don't need, in most cases, to explicitly create an injection token.

Let's now see how can we further simplify our provider.

## Simplified configuration of providers: useClass
Instead of explicitly defining a provider factory function with <code>**useFactory**</code>, we have other ways to tell Angular how to instantiate a dependency.

In the case of our provider, we can use the <code>**useClass**</code> property.

This way Angular will know that the value that we are passing is a valid constructor function, that Angular can simply call using the <code>**new**</code> operator:

<pre>
<code>
@NgModule({
  declarations: [
    AppComponent,
    ProduitCardComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: PRODUIT_SERVICE_TOKEN,
      useFactory: produitServiceProviderFactory,
      deps: [HttpClient]
    },
    {
      provide: URL_TOKEN,
      useFactory: urlFactory
    },
    {
      provide: CategoryService,
      useFactory: categoryServiceProviderFactory,
      deps: [HttpClient, URL_TOKEN]
    },
    {
      provide: UserService,
      useClass: UserService,
      deps: [HttpClient, URL_TOKEN]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
</code>
</pre>

And this already greatly simplifies our provider, as we don't need to write a provider factory function manually ourselves! 👍

Another super convenient feature of <code>**useClass**</code> is that for this type of dependencies, Angular will try to infer the injection token at runtime based on the value of the Typescript type annotations.

This means that with <code>**useClass**</code> dependencies, we don't even need the<br>
<code>**Inject**</code> decorator anymore, which explains why you rarely see it:

<pre>
<code>
@Component({
    selector: 'app-produit-card',
    templateUrl: './produit-card.component.html',
    styleUrls: ['./produit-card.component.css']
})
export class ProduitCardComponent  {

    constructor(private userService: UserService) {
      ...
    }
    ...
}
</code>
</pre>

So how does Angular know which dependency to inject?

Angular can determine this by inspecting the type of the injected property which is <code>**UserService**</code>, and using that type to determine a provider for that dependency.

As we can see, class dependencies are much more convenient to use, as opposed to having to use <code>**@Inject**</code> explicitly! 👍

For the particular case of <code>**useClass**</code> providers, we can simplify this even further.

Instead of defining a provider object manually, we can simply pass the name of the class itself as a valid provider configuration item:
<pre>
  <code>
    @NgModule({
  imports: [
    ...
  ],
  declarations: [
    ...
  ],
  providers: [
    UserService
  ]
})
export class appModule { }
  </code>
</pre>


Angular will determine that this provider is a constructor function, so Angular will inspect the function, it will then create a factory function determine the necessary dependencies, and create an instance of the class on demand.

And this happens implicitly just based on the name of the function.

This is the notation that you usually use in most cases, which is super simplified and easy to use! 😉

With this simplified notation, you won't even be aware that there are providers and injection tokens behind the scenes.

But notice that just setting your provider like this won't work, because Angular will not know how to find the dependencies of this class (remember the <code>**deps**</code> property).

For this to work, you need to also apply the <code>**Injectable()**</code> decorator to the service class:

<code>
<pre>
@Injectable()
export class UserService() {
   http: HttpClient;
   constructor(http: HttpClient) {
     this.http = http;
   }
...
}
</pre>
</code>

This decorator will tell Angular to try to find the dependencies for this class by inspecting the types of the constructor function arguments at runtime!

So as you can see, this very simplified notation is how we usually use the Angular dependency injection system, without even thinking about all the nuts and bolts that are being used under the hood. 😉

One thing to bear in mind is that the <code>useClass</code> option will not work with interface names, **it works only with class names**.

This is because an interface is a **compile-time** only construct of the Typescript language, so the interface does not exist at runtime.

This means that an interface name, unlike a class name (via its runtime constructor function) can't be used to uniquely identify a dependency type.

Besides its base concepts of provider, dependencies and injection tokens, there are a few other things that are important to bear in mind about the Angular dependency injection system.

## What are the advantages of Hierarchical Dependency Injection?

Angular is typically used to build large applications, which in some cases can become quite large.

## What are the advantages of Hierarchical Dependency Injection?

Angular is typically used to build large applications, which in some cases can become quite large.

One way to manage this complexity is to split up the application into many small well encapsulated modules, that are by themselves split up into a well-defined tree of components.

These different sections of the page will need certain services and other dependencies to work, that they might or might not want to share with other sections of the application.

We can imagine a well isolated section of our page that works in a completely independent way than the rest of the application, with its own local copies of a series of services and other dependencies that it needs.

We want to ensure that these dependencies remain private and cannot be reached by the rest of the application, to avoid bugs and other maintenance issues.

Some of the services that our isolated section of the application uses might be shared with other parts of the application, or with parent components that are further up in the component tree, while other dependencies are meant to be private.

An hierarchical dependency injection system allows us to do just that! 👍

With hierarchical dependency injection, we can isolate sections of the application and give them their own private dependencies not shared with the rest of the application, we can have parent components share certain dependencies with its child components only but not with the rest of the component tree, etc.

An hierarchical dependency injection system allows us to build our system in a much more modular way, allowing us to share dependencies between different parts of the application only when and if we need to.

This initial explanation is a good starting point, but to really understand how this all works, we need a complete example.