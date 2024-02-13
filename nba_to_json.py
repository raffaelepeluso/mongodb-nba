# pip install -r requirements.txt

from nba_api.stats.static import teams
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats
import json
import pandas as pd


def handle_nan(value, default_value=None):
    if pd.isna(value):
        return default_value
    return value


nba_teams = teams.get_teams()

with open('teams.json', 'w') as teams_file:
    json.dump(nba_teams, teams_file, indent=4)

nba_players = players.get_players()

players_with_stats = []

for player in nba_players:
    player_id = player['id']

    career_stats = playercareerstats.PlayerCareerStats(player_id=player_id)
    career_stats_data = career_stats.get_data_frames()[0]

    # non considerare i record con somme di statistiche
    career_stats_data = career_stats_data[career_stats_data['TEAM_ID'] != 0]

    if not career_stats_data.empty:
        team_id = career_stats_data['TEAM_ID'].tolist()
        team_abbreviation = [handle_nan(abbreviation, default_value="N/A")
                             for abbreviation in career_stats_data['TEAM_ABBREVIATION'].tolist()]
        player_age = [handle_nan(age, default_value=0.0)
                      for age in career_stats_data['PLAYER_AGE'].tolist()]
        gp = [handle_nan(gp, default_value=0)
              for gp in career_stats_data['GP'].tolist()]
        min = [handle_nan(min, default_value=0.0)
               for min in career_stats_data['MIN'].tolist()]
        pts = [handle_nan(pts, default_value=0)
               for pts in career_stats_data['PTS'].tolist()]
        reb = [handle_nan(reb, default_value=0)
               for reb in career_stats_data['REB'].tolist()]
        ast = [handle_nan(ast, default_value=0)
               for ast in career_stats_data['AST'].tolist()]
        stl = [handle_nan(stl, default_value=0)
               for stl in career_stats_data['STL'].tolist()]
        blk = [handle_nan(blk, default_value=0)
               for blk in career_stats_data['BLK'].tolist()]

        player_with_stats = {
            "id": player_id,
            "full_name": player['full_name'],
            "stats": [
                {
                    "season": season,
                    "team_id": team_id[i],
                    "team_abbreviation": team_abbreviation[i],
                    "player_age": player_age[i],
                    "gp": gp[i],
                    "min": min[i],
                    "pts": pts[i],
                    "reb": reb[i],
                    "ast": ast[i],
                    "stl": stl[i],
                    "blk": blk[i]
                }
                for i, season in enumerate(career_stats_data['SEASON_ID'].tolist())
            ]
        }
        players_with_stats.append(player_with_stats)

with open('players_with_stats.json', 'w') as players_file:
    json.dump(players_with_stats, players_file, indent=4)
