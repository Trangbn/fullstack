package com.fullstack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class BookController {

    @RequestMapping(value = {"/backend/index.html"}, method = RequestMethod.GET)
    public String actionIndex(){
        return "backend/layouts/main";
    }
}
