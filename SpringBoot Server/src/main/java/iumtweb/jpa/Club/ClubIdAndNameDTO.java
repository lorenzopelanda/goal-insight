package iumtweb.jpa.Club;

import jakarta.persistence.*;

/**
 * The ClubIdAndNameDTO class is a Data Transfer Object (DTO) that holds a club's ID and name.
 */
public class ClubIdAndNameDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="club_id")
    private Long club_id;
    @Column(name="name")
    private String club_name;

    /**
     * Constructor for the ClubIdAndNameDTO class.
     *
     * @param club_id The ID of the club.
     * @param club_name The name of the club.
     */
    public ClubIdAndNameDTO(Long club_id, String club_name) {
        this.club_id = club_id;
        this.club_name = club_name;
    }

    public Long getClub_id() {
        return club_id;
    }

    public String getClub_name() {
        return club_name;
    }
}
