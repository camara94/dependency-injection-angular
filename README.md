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