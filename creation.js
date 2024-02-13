// Connessione al database
const db_name = "nba";
const connection_string = `mongodb://localhost/${db_name}`;
db = connect(connection_string);

// Pulizia database
db.getCollectionNames().forEach(function (collection_name) {
  db[collection_name].drop();
});

// Creazione delle collezioni con validator
db.createCollection("teams", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "id",
        "full_name",
        "abbreviation",
        "nickname",
        "city",
        "state",
        "year_founded",
      ],
      properties: {
        id: { bsonType: "int" },
        full_name: { bsonType: "string" },
        abbreviation: { bsonType: "string" },
        nickname: { bsonType: "string" },
        city: { bsonType: "string" },
        state: { bsonType: "string" },
        year_founded: { bsonType: "int", pattern: "^[0-9]{4}$" },
      },
    },
  },
});

db.createCollection("players_with_stats", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "id", "full_name", "stats"],
      properties: {
        id: { bsonType: "int" },
        full_name: { bsonType: "string" },
        stats: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              season: { bsonType: "string", pattern: "^[0-9]{4}-[0-9]{2}$" },
              team_id: { bsonType: "int" },
              team_abbreviation: { bsonType: "string" },
            },
          },
        },
      },
    },
  },
});

print("Database creato.");

// Creazione degli indici
db.players_with_stats.createIndex({ full_name: 1, "stats.pts": 1 });
db.players_with_stats.createIndex({ full_name: 1, "stats.season": 1 });
db.players_with_stats.createIndex({ "stats.team_id": 1, "stats.season": 1 });
db.players_with_stats.createIndex({ "stats.team_id": 1, "stats.pts": 1 });

print("Indici creati.");
