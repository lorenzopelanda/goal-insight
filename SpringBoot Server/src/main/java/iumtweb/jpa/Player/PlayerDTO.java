package iumtweb.jpa.Player;
import jakarta.persistence.*;

import java.time.LocalDate;

/**
 * The PlayerDTO class represents a player in the database.
 * It is mapped to the "players" table.
 */
@Entity
@Table(name= "players")
public class PlayerDTO {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Integer player_id;
     private String name;
     private Integer last_season;
     private Integer current_club_id;
     private String country_of_citizenship;
     private LocalDate date_of_birth;
     private String sub_position;
     private String position;
     private String foot;
     private Double height_in_cm;
     private Double highest_market_value_in_eur;
     private String image_url;
     private String current_club_name;
     private LocalDate contract_expiration;
     private Double market_value_in_eur;

     public PlayerDTO() {
     }

     /**
      * Constructor with all fields.
      */
     public PlayerDTO(Integer player_id, String name, Integer last_season, Integer current_club_id, String country_of_citizenship, LocalDate date_of_birth, String sub_position, String position, String foot, Double height_in_cm, Double highest_market_value_in_eur, String image_url, String current_club_name, LocalDate contract_expiration, Double market_value_in_eur) {
          this.player_id = player_id;
          this.name = name;
          this.last_season = last_season;
          this.current_club_id = current_club_id;
          this.country_of_citizenship = country_of_citizenship;
          this.date_of_birth = date_of_birth;
          this.sub_position = sub_position;
          this.position = position;
          this.foot = foot;
          this.height_in_cm = height_in_cm;
          this.highest_market_value_in_eur = highest_market_value_in_eur;
          this.image_url = image_url;
          this.current_club_name = current_club_name;
          this.contract_expiration = contract_expiration;
          this.market_value_in_eur = market_value_in_eur;
     }

     public Integer getPlayer_id() {
          return player_id;
     }

     public void setPlayer_id(Integer player_id) {
          this.player_id = player_id;
     }

     public String getName() {
          return name;
     }

     public void setName(String name) {
          this.name = name;
     }

     public Integer getLast_season() {
          return last_season;
     }

     public void setLast_season(Integer last_season) {
          this.last_season = last_season;
     }

     public Integer getCurrent_club_id() {
          return current_club_id;
     }

     public void setCurrent_club_id(Integer current_club_id) {
          this.current_club_id = current_club_id;
     }

     public String getCountry_of_citizenship() {
          return country_of_citizenship;
     }

     public void setCountry_of_citizenship(String country_of_citizenship) {
          this.country_of_citizenship = country_of_citizenship;
     }

     public LocalDate getDate_of_birth() {
          return date_of_birth;
     }

     public void setDate_of_birth(LocalDate date_of_birth) {
          this.date_of_birth = date_of_birth;
     }

     public String getSub_position() {
          return sub_position;
     }

     public void setSub_position(String sub_position) {
          this.sub_position = sub_position;
     }

     public String getPosition() {
          return position;
     }

     public void setPosition(String position) {
          this.position = position;
     }

     public String getFoot() {
          return foot;
     }

     public void setFoot(String foot) {
          this.foot = foot;
     }

     public Double getHeight_in_cm() {
          return height_in_cm;
     }

     public void setHeight_in_cm(Double height_in_cm) {
          this.height_in_cm = height_in_cm;
     }

     public Double getHighest_market_value_in_eur() {
          return highest_market_value_in_eur;
     }

     public void setHighest_market_value_in_eur(Double highest_market_value_in_eur) {
          this.highest_market_value_in_eur = highest_market_value_in_eur;
     }

     public String getImage_url() {
          return image_url;
     }

     public void setImage_url(String image_url) {
          this.image_url = image_url;
     }

     public String getCurrent_club_name() {
          return current_club_name;
     }

     public void setCurrent_club_name(String current_club_name) {
          this.current_club_name = current_club_name;
     }

     public LocalDate getContract_expiration() {
          return contract_expiration;
     }

     public void setContract_expiration(LocalDate contract_expiration) {
          this.contract_expiration = contract_expiration;
     }

     public Double getMarket_value_in_eur() {
          return market_value_in_eur;
     }

     public void setMarket_value_in_eur(Double market_value_in_eur) {
          this.market_value_in_eur = market_value_in_eur;
     }
}