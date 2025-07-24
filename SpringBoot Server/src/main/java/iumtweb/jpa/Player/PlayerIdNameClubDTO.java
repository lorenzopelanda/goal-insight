package iumtweb.jpa.Player;

/**
 * The PlayerIdNameClubDTO class is a simplified view of a player.
 * It contains the player's ID, name, current club ID, image URL, and position.
 */
public class PlayerIdNameClubDTO {
    private Integer player_id;
    private String player_name;
    private Integer current_club_id;
    private String image_url;
    private String position;

    /**
     * Constructor with all fields.
     *
     * @param player_id The ID of the player.
     * @param player_name The name of the player.
     * @param current_club_id The ID of the club the player currently belongs to.
     * @param image_url The URL of the player's image.
     * @param position The position of the player.
     */
    public PlayerIdNameClubDTO(Integer player_id, String player_name, Integer current_club_id, String image_url, String position) {
        this.player_id = player_id;
        this.player_name = player_name;
        this.current_club_id = current_club_id;
        this.image_url = image_url;
        this.position = position;
    }
    public Integer getPlayer_id() {
        return player_id;
    }

    public String getPlayer_name() {
        return player_name;
    }
    public Integer getCurrent_club_id() {
        return current_club_id;
    }
    public String getImage_url() {
        return image_url;
    }
    public String getPosition() {
        return position;
    }
}
