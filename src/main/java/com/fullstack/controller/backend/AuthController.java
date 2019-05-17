package com.fullstack.controller.backend;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AuthController  {

    @RequestMapping(value = "/login.html", method = RequestMethod.GET)
    public String actionSignIn() {
        return "backend/login";
    }

    @RequestMapping(value = "/perform_login", method = RequestMethod.POST)
    public String actionLoginProcess() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails ) {

//            && "admin".equals(((UserDetails)principal).getUsername())
//                    && "adminPass".equals(((UserDetails)principal).getPassword())
//            return "backend/layouts/main";
            return "backend/login";
        }
        return "backend/layouts/main";
    }

    @RequestMapping(value = "/homepage.html", method = RequestMethod.GET)
    public String actionHome() {
        return "backend/layouts/main";
    }

    @RequestMapping(value = "/logout.html", method = RequestMethod.GET)
    public String actionLogout() {
//        return "backend/login";
        return "backend/layouts/main";
    }
}
