package iumtweb.jpa.Club;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/club")
public class ClubController {
    private final ClubService clubService;

    /**
     * Constructor for the ClubController class.
     *
     * @param clubService The service class for club-related operations.
     *                    This is autowired, meaning Spring will automatically provide an instance of ClubService.
     */
    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    /**
     * GET endpoint that returns the details of a club based on the provided ID.
     *
     * @param id The ID of the club whose details are to be fetched.
     * @return A ClubDTO object containing the details of the club.
     *
     * @GetMapping("/getClubDetailsById/{id}")
     */
    @GetMapping("/getClubDetailsById/{id}")
    public ClubDTO getClubDetails(@PathVariable Long id) {
        return clubService.findClubDetails(id);
    }


    /**
     * GET endpoint that returns a list of ClubIdAndNameDTO objects.
     * Each object in the list contains the ID and name of a club.
     *
     * @param page The page of results to return. Default is 0, which represents the first page.
     * @param size The number of results per page. Default is 51.
     * @param sortBy The field by which the results should be sorted. Default is "name", which means the results will be sorted by club name.
     * @param sortDirection The direction of the sort. Default is "default".
     * @return A list of ClubIdAndNameDTO objects, each containing the ID and name of a club.
     *
     * @GetMapping("/getClubIdsAndNAmes")
     */
    @GetMapping("/getClubIdsAndNames")
    public List<ClubIdAndNameDTO> getClubIdsAndNAmes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "51") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "default") String sortDirection) {
        return clubService.getClubIdsAndNames(page, size, sortBy.trim(), sortDirection.trim());
    }

    /**
     * GET endpoint that returns a list of ClubIdAndNameDTO objects that match the provided search query.
     *
     * @param query The search query to match against club names.
     * @param page The page of results to return. Default is 0, which represents the first page.
     * @param size The number of results per page. Default is 51.
     * @param sortBy The field by which the results should be sorted. Default is "name", which means the results will be sorted by club name.
     * @param sortDirection The direction of the sort. Default is "default".
     * @return A list of ClubIdAndNameDTO objects, each containing the ID and name of a club that matches the search query.
     *
     * @GetMapping("/searchClubs")
     */
    @GetMapping("/searchClubs")
    public List<ClubIdAndNameDTO> searchClubs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "51") int size,
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "club_id") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDirection) {
        return clubService.searchClubs(page, size, query, sortBy, sortDirection);
    }



    /**
     * GET endpoint that returns a list of ClubIdNameCompetitionDTO objects for a specific competition.
     *
     * @param id The ID of the competition whose associated clubs are to be fetched.
     * @return A ResponseEntity containing a list of ClubIdNameCompetitionDTO objects,
     * each containing the ID, name, and competition details of a club associated with the given competition ID.
     *
     * @GetMapping("/getCompetitionClubsById/{id}")
     */
    @GetMapping("/getCompetitionClubsById/{id}")
    public ResponseEntity<List<ClubIdNameCompetitionDTO>> getCompetitionClubs(@PathVariable String id) {
        return new ResponseEntity<>(clubService.getClubIdsNamesCompetitions(id), HttpStatus.OK);
    }

}
