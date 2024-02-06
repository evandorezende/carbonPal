# CarbonPal

## Video Demo: https://youtu.be/D6ixIjbuOwg

## Description

This Next.js application simplifies carbon footprint calculations for road-based goods delivery and present to the user options to offset the emissions. Ideal for professionals and businesses, it offers a simple interface with a form on the homepage, powered by the react-hook-form library and input validation using Yup. Integrated with a MySQL database using NextJs api endpoints only, which means we don't have a dedicated service backend here. We utilized the Google Distance Matrix API to determine the distance between the specified origin and destination points. 

## Design Choices

I'm familiar with Next.js and have primarily used its pages router in the past. However, for this project, I decided to explore the app router on this project.

To ensure seamless compatibility across desktop and mobile devices, as well as accommodate light and dark settings, we've integrated Tailwind into our project. Tailwind's versatile approach empowers us to efficiently manage class usage while retaining the flexibility to explore a wide range of CSS possibilities.

Regarding the database, I opted against using an ORM and instead chose to handle queries and migrations manually. To do it, I'm utilizing the Mysql2 package to perform the connection and execute queries. Very simple.

Given the straightforward nature of the app and lack of complex relationships among entities, leveraging Next.js API endpoints seemed like a fitting choice to maintain simplicity and render dynamic results on the client side.

As for form handling, I prefer working with react-hook-form due to its ease of use and seamless integration with validation libraries like Yup.

To accurately calculate distances between addresses, I've integrated the Google Distance Matrix API, which is accessed via the "/api/carbon" endpoint using axios with PUT requests. This ensures precise distance calculations for the application's needs. Note that the app might not work if the api key is not active at the moment.

## Data structure

We have three essential tables in our database: "equipment," "fuel," and "offset_company." These tables collectively provide the necessary data to perform our calculations based on user input.

The "equipment" table contains crucial information regarding transportation vehicles such as trucks and semis. It includes details like fuel efficiency and load capacity, which are essential for accurate calculations.

Each piece of equipment must be associated with a specific fuel type, which is stored in the "fuel" table. This table includes emission factors for different types of fuels, allowing us to calculate carbon footprints accurately.

Additionally, we have the "offset_company" table, which represents enterprises offering solutions to offset carbon footprints. These companies provide services or products aimed at reducing environmental impact and must have associated pricing information.

Together, these tables provide a comprehensive framework for gathering data and performing calculations to assess and mitigate carbon footprints effectively.

## Tree

We've structured our application using Next.js's router and incorporated Tailwind for streamlined styling. TypeScript enhances typing throughout the project, ensuring robustness and clarity. Yarn serves as the package manager, facilitating dependency management.

In the "db" folder, we've centralized database operations like creation, dropping, migration, and seeding. These operations are implemented in JavaScript for simplicity when executing commands. Also for simplicity, we assume to populate the database using the seed function instead of creating an interface to perform this task.

Within the "app" folder, the homepage resides in "(site)", featuring components rendered based on state values. The "carbon-form.tsx" component within the "components" directory manages the state, including the "myResults" value. Using axios, this component sends requests to the "/api/carbon" endpoint, which exclusively handles PUT requests.

The application has a single endpoint responsible for calculating the carbon footprint. Upon successful calculation, the "carbon-view.tsx" component renders the results. Users have the option to reset the state, returning to the main form.
.
├── README.md
├── actions
├── app
│   ├── (site)
│   │   └── page.tsx
│   ├── api
│   │   └── carbon
│   │       └── route.ts
│   ├── error.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components
│   └── carbon
│       ├── carbon-form.tsx
│       ├── carbon-view.tsx
│       └── form-utils.ts
├── db
│   ├── create.js
│   ├── db.js
│   ├── drop.js
│   ├── migrate.js
│   └── seed.js
├── lib
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── public
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock


## Getting Started

The following description is sourced from the README file of the Next.js template, detailing instructions for running the application.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.