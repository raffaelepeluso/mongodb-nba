team_abbreviation = "LAL";
statistic = "ast";
team_id = db.teams.findOne({ abbreviation: team_abbreviation }).id;

all_time_player = db.players_with_stats.aggregate([
  { $unwind: "$stats" },
  { $match: { "stats.team_id": team_id } },
  {
    $group: {
      _id: "$id",
      player_name: { $first: "$full_name" },
      total: { $sum: "$stats." + statistic },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { _id: 0 } },
]);

result = all_time_player.next();

json_result = JSON.stringify(result, null, 2);

print(json_result);
