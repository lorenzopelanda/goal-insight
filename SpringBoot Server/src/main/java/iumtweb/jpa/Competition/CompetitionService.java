package iumtweb.jpa.Competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class CompetitionService {

    /**
     * The repository for accessing the Competition data from the database.
     * It is marked as final to prevent further extension.
     */
    public final CompetitionRepository competitionRepository;

    /**
     * Constructor for the CompetitionService class.
     * It is annotated with @Autowired to indicate that the Spring framework should automatically manage the CompetitionRepository dependency.
     *
     * @param competitionRepository The repository for accessing the Competition data from the database.
     */
    @Autowired
    public CompetitionService(CompetitionRepository competitionRepository){this.competitionRepository=competitionRepository;}

    /**
     * The findDetails method fetches the details of a competition by its ID.
     * It uses the CompetitionRepository to access the data from the database.
     *
     * @param id The ID of the competition to fetch.
     * @return The CompetitionDTO object that matches the provided ID.
     */
    public CompetitionDTO findDetails(String id){return competitionRepository.findByCompetitionId(id);}

    /**
     * The getCompetitionIdsNamesCountries method fetches a list of CompetitionIdNameCountryDTO objects.
     * Each CompetitionIdNameCountryDTO object contains the ID, name, country name, and domestic league code of a competition.
     * It uses the CompetitionRepository to access the data from the database.
     *
     * @return A List of CompetitionIdNameCountryDTO objects.
     */
    public List<CompetitionIdNameCountryDTO> getCompetitionIdsNamesCountries() {return competitionRepository.getCompetitionIdsNamesCountries();}
}
