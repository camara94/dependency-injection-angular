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