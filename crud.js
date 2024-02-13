player_name = "Marques Green";
team_abbreviation = "SCA";
player_id = 99; // dovrebbe essere recuperato dal database NBA
team_id = 999; // dovrebbe essere recuperato dal database NBA

insert_player = db.players_with_stats.insertOne({
  id: player_id,
  full_name: player_name,
  stats: [],
});
print(insert_player);

insert_team = db.teams.insertOne({
  id: team_id,
  full_name: "Scandone Avellino",
  abbreviation: team_abbreviation,
  nickname: "Lupi",
  city: "Avellino",
  state: "Italy",
  year_founded: 1948,
});
print(insert_team);

update_player = db.players_with_stats.updateOne(
  { full_name: player_name },
  {
    $push: {
      stats: {
        season: "2008-09",
        team_id: team_id,
        team_abbreviation: team_abbreviation,
        player_age: 26,
        gp: 40,
        min: 300,
        pts: 100,
        reb: 50,
        ast: 200,
        stl: 150,
        blk: 20,
      },
    },
  }
);
print(update_player);

find_player = db.players_with_stats.findOne({ full_name: player_name });
print(find_player);

// delete_team = db.teams.deleteOne({id: team_id});
// print(delete_team);

// delete_players_for_team = db.players_with_stats.deleteMany({"stats.team_id": team_id});
// print(delete_players_for_team);
