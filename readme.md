
# Example of a project using stencil

This project is built using stencil following guidelines provide in the [Udemy course](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/). This porject is used for testing purpose. to create webcomponents using stencil.

The project use this [API](https://www.alphavantage.co/), you should generate your own key and put this value in `src/global/global.ts`.

The components created in `src/components` cover the basic features that stencil allows us for managinng props, states, event listeners, styles and concepts used in webcomponents.

If you want to publish your components, you only just run npm publish and the components will be available in npm regustry. Make sure you have an account and is logged in on your local machine. Before publishing choose a name for the project in package.json and check stencil.config.ts file.

# Steps to create a project:

 -  npm init stencil.
 -  Choose the type of project
 -  Choose styles type for you project.
 -  Go to your `src` folder and start creating your own components.

# How to use a component after is available on npm registry

You can use your component in any other project that use any other framework like React, Anagular, Vue, a simple HTML page, Nodejs.

First install dependency in your project `npm install ventoji-stencil-comp`. 

For react projects created with `create_react_app` make your you add `defineCustomElements(window);` in index.js below the servirWorker option. Then you can just use them as usual adding like an html tag `<uc-stock-price></uc-stock-price>` in your render function of the component you will use it.

For angular projects make sure your configure `app.module.ts` as is shown below:

`import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
`
Then you can use them the same way as React explanation.

# Manual testing

In a `html` file make your you have the `dist` folder or whaterver name you provided after generation, available when you run `npmm run build` to generate the components you want to share or reuse in other applications. Then you can include in the following way ` <script type="module" src="static/dist/esm/web-components-stencil.js"></script>` assuming you have stored in that location.

In node application make you you have the static route configured `app.use('/static',express.static('public'));` in the express router.

Then you use them in the same way as explained for angular and react.


