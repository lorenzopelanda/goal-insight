package iumtweb.jpa.Competition;

import jakarta.persistence.*;

/**
 * The CompetitionDTO class represents a competition in the system.
 * It is mapped to the 'competitions' table in the database.
 */
@Entity
@Table(name="competitions")
public class CompetitionDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String competition_id;
    @Column(name="name")
    private String name;
    @Column(name="country_id")
    private Integer country_id;
    @Column(name="country_name")
    private String country_name;
    @Column(name="domestic_league_code")
    private String domestic_league_code;

    /**
     * Constructor with all fields for the CompetitionDTO class.
     */
    public CompetitionDTO(String competition_id, String name, Integer country_id, String country_name, String domestic_league_code) {
        this.competition_id = competition_id;
        this.name = name;
        this.country_id = country_id;
        this.country_name = country_name;
        this.domestic_league_code = domestic_league_code;
    }
    public CompetitionDTO() {
    }
    public String getCompetition_id() {
        return competition_id;
    }

    public void setCompetition_id(String id) {
        this.competition_id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCountry_id() {
        return country_id;
    }

    public void setCountry_id(Integer country_id) {
        this.country_id = country_id;
    }

    public String getCountry_name() {
        return country_name;
    }

    public void setCountry_name(String country_name) {
        this.country_name = country_name;
    }

    public String getDomestic_league_code() {
        return domestic_league_code;
    }

    public void setDomestic_league_code(String domestic_league_code) {this.domestic_league_code = domestic_league_code;}
}