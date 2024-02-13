import json


def validate_team_id(team_id, teams_data):
    return any(team["id"] == team_id for team in teams_data)


with open("teams.json", "r") as teams_file:
    teams_data = json.load(teams_file)

with open("players_with_stats.json", "r") as players_with_stats_file:
    players_with_stats_data = json.load(players_with_stats_file)

valid_players_with_stats = []
for player in players_with_stats_data:
    valid_stats = []
    for stat in player["stats"]:
        if validate_team_id(stat["team_id"], teams_data):
            valid_stats.append(stat)
    if valid_stats:
        player["stats"] = valid_stats
        valid_players_with_stats.append(player)

with open("valid_players_with_stats.json", "w") as valid_file:
    json.dump(valid_players_with_stats, valid_file, indent=2)
