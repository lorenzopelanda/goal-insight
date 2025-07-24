package iumtweb.jpa;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for web settings.
 * It implements the WebMvcConfigurer interface to provide custom configurations.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * This method is used to add Cross-Origin Resource Sharing (CORS) mappings.
     * It allows all methods from the origins "http://localhost:3000" and "http://localhost:3002".
     *
     * @param registry The CorsRegistry object to which the CORS mappings are to be added.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","http://localhost:3002")
                .allowedMethods("*");

    }
}