package iumtweb.jpa.Competition;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;




@RestController
@RequestMapping("/competition")
public class CompetitionController {

    private final CompetitionService competitionService;

    /**
     * Constructor for the CompetitionController class.
     *
     * @param competitionService The CompetitionService instance that this controller will use to interact with the service layer.
     */
    @Autowired
    public CompetitionController(CompetitionService competitionService){this.competitionService=competitionService;}

    /**
     * The method fetches the details of a competition by its ID.
     * It is mapped to the GET HTTP method and the URL path '/getCompetitionDetailsById/{id}'.
     *
     * @param id The ID of the competition to fetch.
     * @return The CompetitionDTO object that matches the provided ID.
     */
    @GetMapping("/getCompetitionDetailsById/{id}")
    public CompetitionDTO getDetails(@PathVariable String id){return competitionService.findDetails(id);}

    /**
     * The method fetches a list of CompetitionIdNameCountryDTO objects.
     * Each CompetitionIdNameCountryDTO object contains the ID, name, and country of a competition.
     * It is mapped to the GET HTTP method and the URL path '/getCompetitionIdsNamesCountries'.
     *
     * @return A ResponseEntity containing a List of CompetitionIdNameCountryDTO objects and the HTTP status.
     */
    @GetMapping("/getCompetitionIdsNamesCountries")
    public ResponseEntity<List<CompetitionIdNameCountryDTO>> getCompetitionIdsNamesCountries() {return new ResponseEntity<List<CompetitionIdNameCountryDTO>>(competitionService.getCompetitionIdsNamesCountries(), HttpStatus.OK);    }
}