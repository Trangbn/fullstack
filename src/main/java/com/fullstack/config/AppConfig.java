package com.fullstack.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ComponentScan("com.fullstack.*")
public class AppConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/webjars/**",
                "/static/backend/css/**",
                "/static/backend/js/**",
                "/static/backend/images/**"
        ).addResourceLocations("classpath:/META-INF/resources/webjars/",
                "classpath:/static/backend/css/",
                "classpath:/static/backend/js/",
                "classpath:/static/backend/images/"
        );
    }
}
