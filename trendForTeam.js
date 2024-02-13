team_abbreviation = "LAL";
team_id = db.teams.findOne({ abbreviation: team_abbreviation }).id;

team_stats = db.players_with_stats.aggregate([
  { $unwind: "$stats" },
  { $match: { "stats.team_id": team_id } },
  {
    $group: {
      _id: "$stats.season",
      pts: { $sum: "$stats.pts" },
      reb: { $sum: "$stats.reb" },
      ast: { $sum: "$stats.ast" },
      stl: { $sum: "$stats.stl" },
      blk: { $sum: "$stats.blk" },
    },
  },
  { $sort: { _id: 1 } },
  {
    $project: {
      _id: 0,
      season: "$_id",
      pts: 1,
      reb: 1,
      ast: 1,
      stl: 1,
      blk: 1,
    },
  },
]);

result = team_stats.toArray();

json_result = JSON.stringify(result, null, 2);

print(json_result);
