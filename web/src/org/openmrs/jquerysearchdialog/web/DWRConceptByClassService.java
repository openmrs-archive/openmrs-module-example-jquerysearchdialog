package org.openmrs.jquerysearchdialog.web;

import java.util.ArrayList;
import java.util.List;

import org.openmrs.Concept;
import org.openmrs.ConceptClass;
import org.openmrs.api.ConceptService;
import org.openmrs.api.context.Context;
import org.openmrs.web.dwr.ConceptListItem;
import org.springframework.util.StringUtils;



public class DWRConceptByClassService {
	
	/**
	 * Search concepts by concept class name and a matching word  
	 * 
	 * @param pattern
	 * @return
	 * @should return a valid lists
	 * @should not return anything if null or empty is passed
	 */
	public List<Object> FindConceptsByClass(String pattern, String conceptClass, boolean includeVoided) {
		if (!StringUtils.hasText(pattern)){
				return new ArrayList();
			}
		ConceptService sc = Context.getConceptService();
		ConceptClass cc = sc.getConceptClassByName(conceptClass);
		List<Concept> matchName = sc.getConceptsByName(pattern);
		
		List<Object> retorno = new ArrayList<Object>();
		for (Concept item : matchName) {
			if (item.getConceptClass().equals(cc)) { 
				if (item.isRetired() && includeVoided) {
					ConceptListItem conceptItem = new ConceptListItem(item, item.getPreferredName(Context.getLocale()),
					        Context.getLocale());
					retorno.add(conceptItem);
				} else {
					ConceptListItem conceptItem = new ConceptListItem(item, item.getPreferredName(Context.getLocale()),
					        Context.getLocale());
					retorno.add(conceptItem);
				}
			}
		}
		return retorno;
	}
	
}
