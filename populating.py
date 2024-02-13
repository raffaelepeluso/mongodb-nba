import subprocess

commands = [
    "mongoimport --db nba --collection teams --file teams.json --jsonArray",
    "mongoimport --db nba --collection players_with_stats --file valid_players_with_stats.json --jsonArray"
]

for command in commands:
    try:
        subprocess.run(command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {command}")
        print(f"Return code: {e.returncode}")

print("Database popolato.")
