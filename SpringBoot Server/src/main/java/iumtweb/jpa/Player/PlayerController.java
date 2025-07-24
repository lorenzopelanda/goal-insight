package iumtweb.jpa.Player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {

    private final PlayerService playerService;

    /**
     * Constructor for the PlayerController class.
     * It is annotated with @Autowired to indicate that the Spring framework should automatically manage the PlayerService dependency.
     *
     * @param playerService The service for accessing the Player data.
     */
    @Autowired
    public PlayerController(PlayerService playerService){this.playerService=playerService;}

    /**
     * The method fetches the details of a player by their ID.
     * It uses the PlayerService to access the data from the database.
     * It is mapped to the GET HTTP method and the URL path '/getPlayerDetailsById/{id}', where {id} is a path variable representing the player's ID.
     *
     * @param id The ID of the player to fetch.
     * @return The PlayerDTO object that matches the provided ID.
     */
    @GetMapping("/getPlayerDetailsById/{id}")
    public PlayerDTO findDetails(@PathVariable Integer id){return playerService.findDetails(id);}

    /**
     * The method fetches a list of PlayerIdAndNameDTO objects.
     * Each PlayerIdAndNameDTO object contains the ID and name of a player.
     * It uses the PlayerService to access the data from the database.
     * It is mapped to the GET HTTP method and the URL path '/getPlayerIdsAndNames'.
     *
     * @return A ResponseEntity containing a List of PlayerIdAndNameDTO objects and the HTTP status.
     */
    @GetMapping("/getPlayerIdsAndNames")
    public ResponseEntity<List<PlayerIdAndNameDTO>> getPlayerIdsAndNames() {
        return new ResponseEntity<>(playerService.getPlayerIdsAndNames(), HttpStatus.OK);
    }

    /**
     * The method fetches a paginated list of PlayerIdAndNameDTO objects, sorted by a specified field and direction.
     * Each PlayerIdAndNameDTO object contains the ID and name of a player.
     * It uses the PlayerService to access the data from the database.
     * It is mapped to the GET HTTP method and the URL path '/getPlayerIdsAndNamesPage'.
     *
     * @param page The page number to fetch. Defaults to 0 if not provided.
     * @param size The number of records per page. Defaults to 51 if not provided.
     * @param sortBy The field to sort the records by. Defaults to "name" if not provided.
     * @param sortDirection The direction to sort the records in. Defaults to "default" if not provided.
     * @return A List of PlayerIdAndNameDTO objects.
     */
    @GetMapping("/getPlayerIdsAndNamesPage")
    public List<PlayerIdAndNameDTO> getPlayerIdsAndNamesPositions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "51") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "default") String sortDirection) {
        return playerService.getPlayerIdsAndNamesPage(page, size, sortBy.trim(), sortDirection.trim());
    }

    /**
     * The method fetches a paginated and sorted list of PlayerIdAndNameDTO objects based on a search query.
     * Each PlayerIdAndNameDTO object contains the ID and name of a player.
     * It uses the PlayerService to access the data from the database.
     * It is mapped to the GET HTTP method and the URL path '/searchPlayers'.
     *
     * @param query The search query to filter the players by.
     * @param page The page number to fetch. Defaults to 0 if not provided.
     * @param size The number of records per page. Defaults to 51 if not provided.
     * @param sortBy The field to sort the records by. Defaults to "name" if not provided.
     * @param sortDirection The direction to sort the records in. Defaults to "asc" if not provided.
     * @return A List of PlayerIdAndNameDTO objects.
     */
    @GetMapping("/searchPlayers")
    public List<PlayerIdAndNameDTO> searchPlayers(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "51") int size,
            @RequestParam(defaultValue = "player_id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        return playerService.searchPlayers(query, page, size, sortBy, sortDirection);
    }


    /**
     * This method fetches a list of PlayerIdNameClubDTO objects for a specific player.
     * Each PlayerIdNameClubDTO object contains the ID, name, and club of a player.
     * It uses the PlayerService to access the data from the database.
     * It is mapped to the GET HTTP method and the URL path '/getPlayerIdNameClub/{id}', where {id} is a path variable representing the player's ID.
     *
     * @param id The ID of the player to fetch.
     * @return A ResponseEntity containing a List of PlayerIdNameClubDTO objects and the HTTP status.
     */
    @GetMapping("/getPlayerIdNameClub/{id}")
    public ResponseEntity<List<PlayerIdNameClubDTO>> getPlayerIdNameClub(@PathVariable Integer id){return new ResponseEntity<>(playerService.getPlayerIdNameClub(id), HttpStatus.OK);}

}
