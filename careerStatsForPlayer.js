player_name = "Michael Jordan";

career_player_stats = db.players_with_stats.aggregate([
  { $match: { full_name: player_name } },
  { $unwind: "$stats" },
  {
    $group: {
      _id: "$id",
      gp: { $sum: "$stats.gp" },
      min: { $sum: "$stats.min" },
      pts: { $sum: "$stats.pts" },
      reb: { $sum: "$stats.reb" },
      ast: { $sum: "$stats.ast" },
      stl: { $sum: "$stats.stl" },
      blk: { $sum: "$stats.blk" },
    },
  },
  { $project: { _id: 0 } },
]);

result = career_player_stats.next();

json_result = JSON.stringify(result, null, 2);

print(json_result);
