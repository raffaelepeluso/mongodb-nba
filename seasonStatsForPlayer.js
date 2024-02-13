player_name = "Tariq Abdul-Wahad";
season = "1999-00";

season_player_stats = db.players_with_stats.aggregate([
  { $match: { full_name: player_name } },
  { $unwind: "$stats" },
  { $match: { "stats.season": season } },
  {
    $project: {
      _id: 0,
      id: 0,
      full_name: 0,
      "stats.season": 0,
      "stats.team_id": 0,
    },
  },
  { $replaceRoot: { newRoot: "$stats" } },
]);

result = season_player_stats.toArray();

json_result = JSON.stringify(result, null, 2);

print(json_result);
