# mongodb-nba

A MongoDB database for NBA stats.

# How to run

1. Set the current working directory
2. From the MongoDB shell, execute the `creation.js` file: `load("creation.js")`
3. From the terminal, run the `populating.py` Python script
4. From the `nba` database, execute the queries or CRUD operations defined in the `.js` files: `load("trendForTeam.js")`

## Data Extraction (already performed)

1. Run the `nba_to_json.py` Python script: optionally install `requirements.txt`.
2. Run the `filter_json.py` Python script.
