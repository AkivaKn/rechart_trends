# Payments and Benchmarks Data Visualisation

An application to visualise payment data versus benchmarks. The application consists of a React app, using Axios to fetch data, Recharts for graphs and Tailwind CSS for styling. It includes a list of total payments and benchmarks for each provider, and graphs showing yearly payment trends for any product with more than a year of data.

## Technology choices

The following technologies were used in this project:

- React was chosen as a JavaScript framework due to familiarity, a virtual DOM to prevent unnecessary rerenders and fast rendering.
- Tailwind was used for styling for ease of use and customisation.
- Recharts was used for data visualisation for its seamless integration with React.


## Prerequisites

To run this project on your local machine please ensure you have the following installed:

- Node.js ([install](https://nodejs.org/en/download/package-manager))


## Instructions

Run the following commands to clone and set up this project:

```
# clone repository
git clone https://github.com/AkivaKn/rechart_trends.git

# open project
cd rechart_trends
code .

# install dependencies
npm install
```
Create a .env file in the root directory. Add the API auth key on a key of VITE_AUTH_KEY, e.g.VITE_AUTH_KEY="example_auth_key".

Run the project:

```
# run project
npm run dev
```

The project should be up and running. Access it at http://localhost:5173. 





