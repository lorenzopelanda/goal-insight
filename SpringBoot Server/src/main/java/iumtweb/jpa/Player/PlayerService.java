package iumtweb.jpa.Player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    /**
     * Constructor for the PlayerService class.
     * It uses Spring's Autowired annotation to automatically inject an instance of PlayerRepository.
     *
     * @param playerRepository The PlayerRepository instance to be used by this service.
     */
    @Autowired
    public PlayerService(PlayerRepository playerRepository){this.playerRepository=playerRepository;}

    /**
     * The findDetails method fetches the details of a player by their ID.
     * It uses the findByPlayerId method of the PlayerRepository to access the data from the database.
     *
     * @param id The ID of the player whose details are to be fetched.
     * @return A PlayerDTO object containing the details of the player.
     */
    public PlayerDTO findDetails(Integer id){return playerRepository.findByPlayerId(id);}

    /**
     * The getPlayerIdsAndNamesPage method fetches a page of PlayerIdAndNameDTO objects.
     * It trims any white spaces from the sortBy and sortDirection parameters.
     * If the sortDirection is "default", it creates a Pageable object with the given page and size.
     * Otherwise, it creates a Pageable object with the given page, size, and sort.
     * If the sortDirection is not valid, it throws an IllegalArgumentException.
     *
     * @param page The number of the page to fetch.
     * @param size The size of the page to fetch.
     * @param sortBy The field to sort by.
     * @param sortDirection The direction to sort in.
     * @return A List of PlayerIdAndNameDTO objects.
     * @throws IllegalArgumentException If the sortDirection is not valid.
     */
    public List<PlayerIdAndNameDTO> getPlayerIdsAndNamesPage(int page, int size, String sortBy, String sortDirection) {
        Pageable pageable;
        sortBy = sortBy.trim();
        sortDirection = sortDirection.trim();

        if ("default".equalsIgnoreCase(sortDirection)) {
            pageable = PageRequest.of(page, size);
        } else {
            try {
                Sort sort = Sort.by(Sort.Direction.fromString(sortDirection.toUpperCase()), sortBy);
                pageable = PageRequest.of(page, size, sort);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid value '" + sortDirection + "' for sort direction");
            }
        }
        return playerRepository.getPlayerIdsAndNamesPage(pageable).getContent();
    }

    /**
     * The searchPlayers method searches for players based on a query string and returns a page of PlayerIdAndNameDTO objects.
     * It creates a Sort object using the sortBy and sortDirection parameters.
     * It then creates a Pageable object using the page, size, and sort.
     * It uses the searchPlayers method of the PlayerRepository to access the data from the database.
     *
     * @param query The query string to search for players.
     * @param page The number of the page to fetch.
     * @param size The size of the page to fetch.
     * @param sortBy The field to sort by.
     * @param sortDirection The direction to sort in.
     * @return A List of PlayerIdAndNameDTO objects.
     */
    public List<PlayerIdAndNameDTO> searchPlayers(String query, int page, int size, String sortBy, String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return playerRepository.searchPlayers(query, pageable).getContent();
    }


    /**
     * The getPlayerIdsAndNames method fetches a list of PlayerIdAndNameDTO objects.
     * It uses the getPlayerIdsAndNames method of the PlayerRepository to access the data from the database.
     *
     * @return A List of PlayerIdAndNameDTO objects.
     */
    public List<PlayerIdAndNameDTO> getPlayerIdsAndNames() {
        return playerRepository.getPlayerIdsAndNames();
    }

    /**
     * The getPlayerIdNameClub method fetches a list of PlayerIdNameClubDTO objects for a specific player ID.
     * It uses the getPlayerIdNameClub method of the PlayerRepository to access the data from the database.
     *
     * @param id The ID of the player whose details are to be fetched.
     * @return A List of PlayerIdNameClubDTO objects.
     */
    public List<PlayerIdNameClubDTO> getPlayerIdNameClub(Integer id){return playerRepository.getPlayerIdNameClub(id);}


}
