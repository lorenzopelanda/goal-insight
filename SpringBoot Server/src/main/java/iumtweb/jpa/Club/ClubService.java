package iumtweb.jpa.Club;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClubService {

    /**
     * The ClubRepository instance that this service will use to interact with the database.
     */
    private final ClubRepository clubRepository;

    /**
     * Constructor for the ClubService class.
     *
     * @param clubRepository The ClubRepository instance that this service will use to interact with the database.
     */
    @Autowired
    public ClubService(ClubRepository clubRepository){this.clubRepository=clubRepository;}

    /**
     * The findClubDetails method fetches the details of a club by its ID.
     *
     * @param id The ID of the club to fetch.
     * @return The ClubDTO object that matches the provided ID.
     */
    public ClubDTO findClubDetails(Long id){
        return clubRepository.getClubById(id);
    }

    /**
     * The getClubIdsAndNames method fetches a list of ClubIdAndNameDTO objects with pagination and sorting options.
     * The sorting direction can be 'asc', 'desc', or 'default'. If 'default' is provided, no sorting is applied.
     * If an invalid sort direction is provided, an IllegalArgumentException is thrown.
     *
     * @param page The page number to fetch.
     * @param size The number of items per page.
     * @param sortBy The field to sort by.
     * @param sortDirection The direction to sort in. Can be 'asc', 'desc', or 'default'.
     * @return A List of ClubIdAndNameDTO objects.
     * @throws IllegalArgumentException if an invalid sort direction is provided.
     */
   public List<ClubIdAndNameDTO> getClubIdsAndNames(int page, int size, String sortBy, String sortDirection) {
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
       return clubRepository.getClubIdsAndNames(pageable).getContent();
   }

    /**
     * The searchClubs method searches for clubs based on a query string and returns a list of ClubIdAndNameDTO objects.
     * It creates a Pageable object using the page, size, sortDirection, and sortBy parameters.
     * If the query string is empty, it fetches all clubs, otherwise, it fetches clubs that match the query string.
     *
     * @param page The number of the page to fetch.
     * @param size The size of the page to fetch.
     * @param query The query string to search for clubs.
     * @param sortBy The field to sort by.
     * @param sortDirection The direction to sort in.
     * @return A List of ClubIdAndNameDTO objects that match the search query.
     */

    public List<ClubIdAndNameDTO> searchClubs(int page, int size, String query, String sortBy, String sortDirection) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.fromString(sortDirection), sortBy);
        if (query.isEmpty()) {
            return clubRepository.findAll(pageable)
                    .map(club -> new ClubIdAndNameDTO(club.getClub_id(), club.getName()))
                    .getContent();
        } else {
            return clubRepository.searchByQuery(query, pageable)
                    .map(club -> new ClubIdAndNameDTO(club.getClub_id(), club.getClub_name()))
                    .getContent();
        }
    }

    /**
     * The getClubIdsNamesCompetitions method fetches a list of ClubIdNameCompetitionDTO objects by a specific competition ID.
     * Each ClubIdNameCompetitionDTO object contains the ID, name of a club, and the ID of the domestic competition that the club is part of.
     *
     * @param id The ID of the domestic competition.
     * @return A List of ClubIdNameCompetitionDTO objects that are part of the specified competition.
     */
    public List<ClubIdNameCompetitionDTO> getClubIdsNamesCompetitions(String id) {
        return clubRepository.getClubIdsNamesCompetitions(id);
    }

}
