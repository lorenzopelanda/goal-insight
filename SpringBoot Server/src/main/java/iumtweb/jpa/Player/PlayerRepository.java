package iumtweb.jpa.Player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PlayerRepository extends JpaRepository<PlayerDTO,Long> {

    /**
     * The method fetches a PlayerDTO object based on the player's ID.
     * It uses a custom query to access the data from the database.
     *
     * @param id The ID of the player to fetch.
     * @return A PlayerDTO object.
     */
    @Query("SELECT e FROM PlayerDTO e WHERE e.player_id = :id")
    PlayerDTO findByPlayerId(Integer id);

    /**
     * The method fetches a page of PlayerIdAndNameDTO objects.
     * Each PlayerIdAndNameDTO object contains the ID and name of a player.
     * It uses a custom query to access the data from the database.
     * The result is paginated according to the Pageable argument.
     *
     * @param pageable The pagination information.
     * @return A Page of PlayerIdAndNameDTO objects.
     */
    @Query("SELECT new iumtweb.jpa.Player.PlayerIdAndNameDTO(p.player_id, p.name) FROM PlayerDTO p")
    Page<PlayerIdAndNameDTO> getPlayerIdsAndNamesPage(Pageable pageable);

    /**
     * The method fetches a list of PlayerIdAndNameDTO objects.
     * Each PlayerIdAndNameDTO object contains the ID and name of a player.
     * It uses a custom query to access the data from the database.
     *
     * @return A List of PlayerIdAndNameDTO objects.
     */
    @Query("SELECT new iumtweb.jpa.Player.PlayerIdAndNameDTO(p.player_id, p.name) FROM PlayerDTO p")
    List<PlayerIdAndNameDTO> getPlayerIdsAndNames();

    /**
     * The method fetches a page of PlayerIdAndNameDTO objects that match the search query.
     * Each PlayerIdAndNameDTO object contains the ID and name of a player.
     * It uses a custom query to access the data from the database.
     * The search is case-insensitive and matches any player name that contains the query string.
     * The result is paginated according to the Pageable argument.
     *
     * @param query The search query.
     * @param pageable The pagination information.
     * @return A Page of PlayerIdAndNameDTO objects that match the search query.
     */
    @Query("SELECT new iumtweb.jpa.Player.PlayerIdAndNameDTO(p.player_id, p.name) " +
            "FROM PlayerDTO p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<PlayerIdAndNameDTO> searchPlayers(@Param("query") String query, Pageable pageable);


    /**
     * The method fetches a list of PlayerIdNameClubDTO objects for a specific club.
     * Each PlayerIdNameClubDTO object contains the ID, name, current club ID, image URL, and position of a player.
     * It uses a custom query to access the data from the database.
     * The query filters players based on the club ID.
     *
     * @param id The ID of the club to fetch players for.
     * @return A List of PlayerIdNameClubDTO objects.
     */
    @Query("SELECT new iumtweb.jpa.Player.PlayerIdNameClubDTO(p.player_id, p.name, p.current_club_id, p.image_url, p.position) FROM PlayerDTO p WHERE p.current_club_id = :id AND p.last_season = 2023")
    List<PlayerIdNameClubDTO> getPlayerIdNameClub(@Param("id") Integer id);

}
