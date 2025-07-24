package iumtweb.jpa.Player;

/**
 * The PlayerIdAndNameDTO class represents a simplified view of a player.
 * It only contains the player's ID and name.
 */
public class PlayerIdAndNameDTO {
    private Integer player_id;
    private String player_name;

    /**
     * Constructor with all fields.
     *
     * @param player_id The ID of the player.
     * @param player_name The name of the player.
     */
    public PlayerIdAndNameDTO(Integer player_id, String player_name) {
        this.player_id = player_id;
        this.player_name = player_name;
    }
    public Integer getPlayer_id() {
        return player_id;
    }

    public String getPlayer_name() {
        return player_name;
    }
}
