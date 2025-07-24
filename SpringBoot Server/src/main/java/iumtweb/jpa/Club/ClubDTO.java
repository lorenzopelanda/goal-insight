package iumtweb.jpa.Club;

import jakarta.persistence.*;

/**
 * The ClubDTO class represents the "clubs" table in the database.
 * Each instance of this class represents a row in the table.
 *
 * @Entity Indicates that this class is a JPA entity.
 * @Table(name="clubs") Specifies the name of the table in the database that this entity class represents.
 */
@Entity
@Table(name="clubs")
public class ClubDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="club_id")
    private Long club_id;
    @Column(name="name")
    private String name;
    @Column(name="domestic_competition_id")
    private String domestic_competition_id;

    @Column(name="total_market_value", nullable = true)
    private Double total_market_value;
    @Column(name="stadium_name")
    private String stadium_name;
    @Column(name="stadium_seats")
    private int stadium_seats;
    @Column(name="coach_name")
    private String coach_name;
    @Column(name="last_season")
    private  int last_season;

    public ClubDTO() {
    }

    /**
     * Constructor with all fields.
     */
    public ClubDTO(Long club_id, String name, String domestic_competition_id, Double total_market_value, String stadium_name, int stadium_seats, String coach_name, int last_season) {
        this.club_id = club_id;
        this.name = name;
        this.domestic_competition_id = domestic_competition_id;
        this.total_market_value = total_market_value;
        this.stadium_name = stadium_name;
        this.stadium_seats = stadium_seats;
        this.coach_name = coach_name;
        this.last_season = last_season;
    }

    public Long getClub_id() {
        return club_id;
    }

    public void setClub_id(long club_id) {
        this.club_id = club_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomestic_competition_id() {
        return domestic_competition_id;
    }

    public void setDomestic_competition_id(String domestic_competition_id) {
        this.domestic_competition_id = domestic_competition_id;
    }

    public Double getTotal_market_value() {
        return total_market_value;
    }

    public void setTotal_market_value(Double total_market_value) {
        this.total_market_value = total_market_value;
    }

    public String getStadium_name() {
        return stadium_name;
    }

    public void setStadium_name(String stadium_name) {
        this.stadium_name = stadium_name;
    }

    public int getStadium_seats() {
        return stadium_seats;
    }

    public void setStadium_seats(int stadium_seats) {
        this.stadium_seats = stadium_seats;
    }

    public String getCoach_name() {
        return coach_name;
    }

    public void setCoach_name(String coach_name) {
        this.coach_name = coach_name;
    }

    public int getLast_season() {
        return last_season;
    }

    public void setLast_season(int last_season) {
        this.last_season = last_season;
    }
}
