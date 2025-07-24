package iumtweb.jpa.Competition;

/**
 * The CompetitionIdNameCountryDTO class represents a competition with its ID, name, country name, and domestic league code.
 */
public class CompetitionIdNameCountryDTO {
    private String competition_id;
    private String name;
    private String country_name;
    private String domestic_league_code;

    /**
     * Constructor with all fields for the CompetitionIdNameCountryDTO class.
     *
     * @param competition_id The ID of the competition.
     * @param name The name of the competition.
     * @param country_name The name of the country where the competition is held.
     * @param domestic_league_code The code of the domestic league associated with the competition.
     */
    public CompetitionIdNameCountryDTO(String competition_id, String name, String country_name, String domestic_league_code) {
        this.competition_id = competition_id;
        this.name = name;
        this.country_name = country_name;
        this.domestic_league_code = domestic_league_code;
    }

    public String getCompetition_id() {
        return competition_id;
    }

    public String getName() {
        return name;
    }

    public String getCountry_name() {
        return country_name;
    }
    public String getDomestic_league_code() {
        return domestic_league_code;
    }
}