CREATE DATABASE GoalInsight_postgreSQL;

CREATE TABLE clubs (
   club_id INT PRIMARY KEY,
   name VARCHAR(100),
   domestic_competition_id VARCHAR(5),
   stadium_name VARCHAR(100),
   stadium_seats INT,
   coach_name VARCHAR(100),
   last_season INT
);

CREATE TABLE competitions (
      competition_id VARCHAR(5) PRIMARY KEY,
      name VARCHAR(100),
      country_id INT,
      country_name VARCHAR(100),
      domestic_league_code VARCHAR(5)
);

CREATE TABLE players_valuation (
     player_id INT,
     last_season INT,
     date DATE,
     market_value_in_eur INT,
     current_club_id INT
);

CREATE TABLE players (
     player_id INT PRIMARY KEY,
     name VARCHAR(100),
     last_season INT,
     current_club_id INT,
     country_of_birth VARCHAR(100),
     city_of_birth VARCHAR(100),
     country_of_citizenship VARCHAR(100),
     date_of_birth DATE,
     sub_position VARCHAR(100),
     position VARCHAR(100),
     foot VARCHAR(10),
     height_in_cm FLOAT,
     market_value_in_eur FLOAT,
     highest_market_value_in_eur FLOAT,
     agent_name VARCHAR(100),
     image_url VARCHAR(200),
     current_club_name VARCHAR(100)
);