package iumtweb.jpa.Club;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClubRepository extends JpaRepository<ClubDTO,Long> {

    /**
     * JPA query method that fetches a ClubDTO object by its ID.
     *
     * @param id The ID of the club to fetch.
     * @return The ClubDTO object that matches the provided ID.
     */
    @Query("SELECT e FROM ClubDTO e WHERE e.club_id = :id")
    ClubDTO getClubById(@Param("id") Long id);


    /**
     * JPA query method that fetches a page of ClubIdAndNameDTO objects.
     * Each ClubIdAndNameDTO object contains the ID and name of a club.
     *
     * @param pageable A Pageable object that defines the paging information.
     * @return A Page of ClubIdAndNameDTO objects.
     */
    @Query("SELECT new iumtweb.jpa.Club.ClubIdAndNameDTO(c.club_id,c.name) FROM ClubDTO c")
    Page<ClubIdAndNameDTO> getClubIdsAndNames(Pageable pageable);

    /**
     * JPA query method that fetches a page of ClubIdAndNameDTO objects that match a search query.
     * The search is case-insensitive and matches any club name that contains the query string.
     *
     * @param query The search query string.
     * @param pageable A Pageable object that defines the paging information.
     * @return A Page of ClubIdAndNameDTO objects that match the search query.
     */
    @Query("SELECT new iumtweb.jpa.Club.ClubIdAndNameDTO(c.club_id, c.name) FROM ClubDTO c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<ClubIdAndNameDTO> searchByQuery(@Param("query") String query, Pageable pageable);

    /**
     * JPA query method that fetches a list of ClubIdNameCompetitionDTO objects by a specific competition ID.
     * Each ClubIdNameCompetitionDTO object contains the ID, name of a club, and the ID of the domestic competition that the club is part of.
     *
     * @param id The ID of the domestic competition.
     * @return A List of ClubIdNameCompetitionDTO objects that are part of the specified competition.
     *
     * @Query("SELECT new iumtweb.jpa.Club.ClubIdNameCompetitionDTO(c.club_id, c.name, c.domestic_competition_id) FROM ClubDTO c WHERE c.domestic_competition_id = :id")
     */
    @Query("SELECT new iumtweb.jpa.Club.ClubIdNameCompetitionDTO(c.club_id, c.name, c.domestic_competition_id) FROM ClubDTO c WHERE c.domestic_competition_id = :id")
    List<ClubIdNameCompetitionDTO> getClubIdsNamesCompetitions(@Param("id") String id);
}
