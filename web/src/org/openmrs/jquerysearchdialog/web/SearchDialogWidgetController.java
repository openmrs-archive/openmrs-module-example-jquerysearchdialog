package org.openmrs.jquerysearchdialog.web;


import java.util.List;

import org.openmrs.ConceptClass;
import org.openmrs.api.context.Context;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
public class SearchDialogWidgetController {


	/**
	 * Sample handler to populate the view with a list of all openmrs concept classes.
	 * 
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/module/jquerysearchdialog/jquerysearchdialogwidget.form", method = RequestMethod.GET)
	public String handler(ModelMap  model) {
		List<ConceptClass> classes = Context.getConceptService().getAllConceptClasses();
		model.addAttribute("classes", classes);
		return "/module/jquerysearchdialog/jquerysearchdialogwidget";
		
	}
	

}
