package iumtweb.jpa.Competition;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompetitionRepository extends JpaRepository<CompetitionDTO, String> {

    /**
     * The method fetches a CompetitionDTO object by its ID.
     * It uses a JPQL query to select the competition from the database.
     *
     * @param id The ID of the competition to fetch.
     * @return The CompetitionDTO object that matches the provided ID.
     */
    @Query("SELECT e FROM CompetitionDTO e WHERE e.competition_id = :id")
    CompetitionDTO findByCompetitionId(String id);

    /**
     * The method fetches a list of CompetitionIdNameCountryDTO objects.
     * Each CompetitionIdNameCountryDTO object contains the ID, name, country name, and domestic league code of a competition.
     * It uses a JPQL query to select the required fields from the CompetitionDTO entities in the database.
     *
     * @return A List of CompetitionIdNameCountryDTO objects.
     */
    @Query("SELECT new iumtweb.jpa.Competition.CompetitionIdNameCountryDTO(e.competition_id, e.name, e.country_name, e.domestic_league_code) FROM CompetitionDTO e")
    List<CompetitionIdNameCountryDTO> getCompetitionIdsNamesCountries();
}
