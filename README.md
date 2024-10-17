# Crypto Asset Tracker

## Hello people from Mesh

This is a small application that shows you blockchain coins from the CoinGecko API

### Features

- On the home screen you can see a list of the first 100 coins sorted by market cap
  - There is a search bar in the NavBar to filter by name or symbol
- All calls to the API are cached to:
  - Cache calls that depend on time (latest hour performance) to the hour rounded
  - Cache all calls to 24h
  - Implemented a clean cache button
- A screen to see the performance of a specific coin
  - There is general data about the coin
  - Then there is a comparison for:
    - 1 Week
    - 1 Month
    - 1 Year
- A screen to compare two different coins, we use the same component as before but rendering essentially two lines in the graph, one representing each coin.

### Instructions

1. Clone the repo
2. Install the modules using `yarn`
3. Run tests using `yarn test`
4. Run the development environment running `yarn dev`
