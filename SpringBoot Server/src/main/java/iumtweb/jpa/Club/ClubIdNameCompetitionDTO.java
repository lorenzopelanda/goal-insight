package iumtweb.jpa.Club;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

/**
 * The ClubIdNameCompetitionDTO class is a Data Transfer Object (DTO) that holds a club's ID, name, and domestic competition ID.
 */
public class ClubIdNameCompetitionDTO {
    @Id
    @Column(name="club_id")
    private Long club_id;
    @Column(name="name")
    private String club_name;
    @Column(name="domestic_competition_id")
    private String domestic_competition_id;

    /**
     * Constructor for the ClubIdNameCompetitionDTO class.
     *
     * @param club_id The ID of the club.
     * @param club_name The name of the club.
     * @param domestic_competition_id The ID of the domestic competition that the club is part of.
     */
    public ClubIdNameCompetitionDTO(Long club_id, String club_name, String domestic_competition_id) {
        this.club_id = club_id;
        this.club_name = club_name;
        this.domestic_competition_id = domestic_competition_id;
    }

    public Long getClub_id() {
        return club_id;
    }

    public String getClub_name() {
        return club_name;
    }
    public String getDomestic_competition_id() {
        return domestic_competition_id;
    }
}

