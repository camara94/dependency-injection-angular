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