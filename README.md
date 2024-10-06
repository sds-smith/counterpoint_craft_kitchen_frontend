# Counterpoint Craft Kitchen

As with some of my other personal portfolio work, this project serves as a playground where I can explore and experiment with new (well, new-to-me) technologies.

Still very much in its infancy stage, this eCommerce React application is one part of a loosely-coupled software system.

This system integrates:
  * **Frontend**: React
  * **Backend**: Node/Express
  * **API/ Data management layer**: Ruby on Rails
    * An API namespace which returns JSON menu data to populate the frontend app,
    * An auth protected browser-based CMS tool for managing that menu data

  [View the Express server code here.](https://github.com/sds-smith/ecomm_server)
  [View the Rails server code here.](https://github.com/sds-smith/restaurant_menu_cms)

The menu data is fetched by the Express server from the API, processed and returned to the Frontend. Payment processing via PayPal API is also handled by the backend. A future release will also include Doordash for delivery options.

Current frontend tech stack includes:
  * React
  * React-router-dom
  * Material-UI
  * Zustand state management
  * PayPal SDK for rendering payment buttons

Future iterations will include:
  * Doordash SDK for delivery options

Stay tuned for updates . . .
