
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

