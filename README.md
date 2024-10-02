# Counterpoint Craft Kitchen

Still very much in its infancy stage, this eCommerce React application is one part of a decoupled software system.

This system integrates a Ruby on Rails application that exposes:
  * An API which returns JSON menu data to populate the frontend app,
  * An auth protected browser-based CMS tool for managing that menu data

  [View the Rails server code here.](https://github.com/sds-smith/restaurant_menu_cms)

Currently the menu data is fetched directly by the frontend React application from the API. A future release will incorporate a Node/ Express server to handle this, as well as authentication/ authorization with Paypal and Doordash.

Current frontend tech stack includes:
  * React
  * React-router-dom
  * Material-UI

Future iterations will include:
  * Paypal SDK for payment processing
  * Doordash SDK for delivery processing
  * Zustand for state management

Stay tuned for updates . . .
